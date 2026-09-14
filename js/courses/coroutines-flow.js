// js/courses/coroutines-flow.js
window.coursesRepository = window.coursesRepository || [];

window.coursesRepository.push({
  id: "coroutines-flow-core",
  title: "Coroutines & Flow Core Mechanics",
  category: "Concurrency",
  icon: "fa-bolt",
  color: "from-emerald-500 to-sky-600",
  badge: "Cốt Lõi",
  description: "Giải phẫu toàn diện biến đổi CPS, JVM bytecode, State Machine (label & bitmasking), JIT escape analysis và cơ chế hằng số COROUTINE_SUSPENDED.",
  lessons: [
    {
      id: "cps-decompile-jit",
      num: "01",
      badge: "Bytecode",
      title: "CPS, Decompile, JIT & COROUTINE_SUSPENDED",
      desc: "Continuation Passing Style, Virtual Program Counter, Sentinel Value & Escape Analysis.",
      content: `
        <div class="space-y-8">
          <div class="border-b border-slate-200 dark:border-slate-800 pb-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 text-xs font-mono font-bold">Chuyên Đề 01</span>
              <span class="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-mono font-bold">Bytecode & Runtime</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Giải Phẫu Toàn Diện: CPS, Decompile, JIT & COROUTINE_SUSPENDED
            </h2>
            <p class="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">
              Bản chất cơ học tầng sâu: Cách Kotlin biến đổi code bất đồng bộ thành State Machine, quản trị vòng đời Call Stack trên Heap, và cách runtime tối ưu cấp phát bộ nhớ.
            </p>
          </div>

          <!-- 1. CPS -->
          <section class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xs font-bold">1</span>
              Continuation Passing Style (CPS)
            </h3>
            <ul class="text-sm text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed list-disc pl-5">
              <li><strong>Bản chất:</strong> Kỹ thuật biến đổi luồng thực thi (control flow transformation) mà Kotlin Compiler áp dụng cho mọi hàm <code>suspend</code>.</li>
              <li><strong>Cơ chế chèn tham số ẩn:</strong> Compiler tự động gắn thêm một tham số ngầm định ở cuối danh sách tham số: <code>\\$completion: Continuation&lt;? super T&gt;</code>.</li>
              <li><strong>Chuyển dịch Call Stack sang Heap:</strong> Thay vì dựa vào Stack Frame của hệ điều hành, toàn bộ ngữ cảnh và biến cục bộ được đóng gói thành một đối tượng <code>Continuation</code> nằm trên <strong>Heap</strong>.</li>
              <li><strong>Kiểu trả về <code>Object</code> (Union Type):</strong> Trong Java bytecode, kiểu trả về của hàm luôn đổi thành <code>java.lang.Object</code> để chứa được cả giá trị thật <code>T</code> hoặc cờ hiệu <code>COROUTINE_SUSPENDED</code>.</li>
            </ul>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs mt-3">
              <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span class="text-slate-400 block mb-1 font-bold">// 1. Kotlin Source Code</span>
                <span class="text-purple-600 dark:text-purple-400">suspend fun</span> fetchUser(id: <span class="text-sky-600 dark:text-sky-400">String</span>): <span class="text-emerald-600 dark:text-emerald-400">User</span>
              </div>
              <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span class="text-slate-400 block mb-1 font-bold">// 2. Decompiled Java Bytecode (CPS)</span>
                <span class="text-sky-600 dark:text-sky-400">Object</span> fetchUser(<span class="text-sky-600 dark:text-sky-400">String</span> id, <span class="text-amber-600 dark:text-amber-400">Continuation&lt;? super User&gt;</span> \\$completion)
              </div>
            </div>
          </section>

          <!-- 2. Decompile & State Machine -->
          <section class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center text-xs font-bold">2</span>
              Decompile & Máy Trạng Thái (State Machine)
            </h3>
            <ul class="text-sm text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed list-disc pl-5">
              <li><strong>Bản chất:</strong> Quá trình dịch ngược từ file <code>.class</code> / <code>.dex</code> ra Java code để quan sát kiến trúc ẩn do compiler sinh ra.</li>
              <li><strong>Bản chất State Machine:</strong> Một hàm suspend chứa nhiều điểm dừng sẽ được compiler bao gói lại trong một lớp nội danh kế thừa <code>ContinuationImpl</code>, điều khiển qua lệnh <code>switch(this.label)</code>.</li>
              <li><strong>Biến <code>label</code>:</strong> Đóng vai trò <strong>Virtual Program Counter</strong>. Trước mỗi lần gọi hàm suspend con, <code>label</code> tăng lên; khi resume lại, <code>switch(label)</code> nhảy cóc thẳng tới nhãn tương ứng thay vì chạy lại từ đầu.</li>
              <li><strong>Tràn biến cục bộ (Spilling):</strong> Các biến cục bộ sống qua điểm suspend được compiler copy vào các trường <code>L\\$0, L\\$1</code> của State Machine để không bị mất khi nhả stack frame.</li>
            </ul>

            <div class="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-200 font-mono text-xs">
              <div class="bg-slate-950 px-4 py-2 text-[11px] text-slate-400 border-b border-slate-800 flex justify-between items-center">
                <span>Logic Máy Trạng Thái Được Compiler Tạo Ra Tự Động</span>
                <span class="text-amber-400">Java Decompile Trace</span>
              </div>
              <pre class="p-4 overflow-x-auto leading-relaxed custom-scroll"><code>class FetchUserStateMachine extends ContinuationImpl {
    Object result;
    int label; // Virtual Program Counter
    String id;

    FetchUserStateMachine(Continuation completion) { super(completion); }
    Object invokeSuspend(Object result) {
        this.result = result;
        this.label |= Integer.MIN_VALUE;
        return fetchUser(null, this);
    }
}

Object fetchUser(String id, Continuation \\$completion) {
    FetchUserStateMachine sm;
    if (\\$completion instanceof FetchUserStateMachine && ((\\$completion.label & Integer.MIN_VALUE) != 0)) {
        sm = (FetchUserStateMachine) \\$completion;
        sm.label -= Integer.MIN_VALUE; // Tái sử dụng instance
    } else {
        sm = new FetchUserStateMachine(\\$completion);
    }

    switch (sm.label) {
        case 0:
            sm.id = id;
            sm.label = 1;
            Object res = fetchFromNetwork(sm.id, sm);
            if (res == COROUTINE_SUSPENDED) {
                return COROUTINE_SUSPENDED; // Thoát Caller Frame ngay lập tức!
            }
        case 1:
            User user = (User) sm.result;
            return formatUser(user);
    }
}</code></pre>
            </div>
          </section>

          <!-- 3. JIT & ART Optimization -->
          <section class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center text-xs font-bold">3</span>
              JIT (Just-In-Time Compiler) & Tối Ưu Hóa ART
            </h3>
            <ul class="text-sm text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed list-disc pl-5">
              <li><strong>Escape Analysis & Scalar Replacement:</strong> Nếu hàm suspend chạy qua nhánh đồng bộ hoàn toàn (fast-path không suspend), JIT sẽ dùng <strong>Escape Analysis</strong> phát hiện đối tượng không thoát ra ngoài scope và thực hiện <strong>Scalar Replacement</strong> để bóc tách thành các biến CPU register/stack frame. Kết quả: <strong>0 cấp phát Heap, 0 áp lực GC</strong>.</li>
              <li><strong>Android Profile-guided JIT:</strong> ART kết hợp cả JIT và AOT, biên dịch native các hot-spot path để loại bỏ overhead ở các lần chạy sau.</li>
            </ul>
          </section>

          <!-- 4. COROUTINE_SUSPENDED -->
          <section class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center text-xs font-bold">4</span>
              Hằng Số Lính Gác: COROUTINE_SUSPENDED
            </h3>
            <ul class="text-sm text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed list-disc pl-5">
              <li><strong>Bản chất:</strong> Là Singleton duy nhất trên JVM thuộc enum <code>kotlin.coroutines.intrinsics.CoroutineSingletons.COROUTINE_SUSPENDED</code>.</li>
              <li><strong>So sánh con trỏ $O(1)$:</strong> Caller kiểm tra <code>res === COROUTINE_SUSPENDED</code> bằng toán tử so sánh tham chiếu. Nếu bằng, caller return ngay lập tức để giải phóng OS thread.</li>
            </ul>
          </section>
        </div>
      `
    },
    {
      id: "label-bitmasking",
      num: "02",
      badge: "State Machine",
      title: "Biến label & Kỹ Thuật Bitmasking Integer.MIN_VALUE",
      desc: "Virtual Program Counter, Tái sử dụng đối tượng Heap & Cơ chế phòng chống hỏng trạng thái đệ quy.",
      content: `
        <div class="space-y-8">
          <div class="border-b border-slate-200 dark:border-slate-800 pb-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-mono font-bold">Chuyên Đề 02</span>
              <span class="px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 text-xs font-mono font-bold">Bitwise & Memory</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Biến label & Kỹ Thuật Bitmasking Integer.MIN_VALUE
            </h2>
            <p class="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">
              Virtual Program Counter, Kỹ thuật tái sử dụng instance State Machine trên Heap và cơ chế bảo vệ trạng thái khi gọi hàm đệ quy.
            </p>
          </div>

          <!-- 1. Biến label -->
          <section class="space-y-3">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center text-xs font-bold">1</span>
              Biến label là gì?
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Mỗi hàm suspend được compiler biến đổi thành một lớp kế thừa từ <code>ContinuationImpl</code> chứa một biến trạng thái: <code class="font-mono text-purple-600 dark:text-purple-400 font-bold">int label</code>.
            </p>
            <ul class="text-sm text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed list-disc pl-5">
              <li><strong>Nhiệm vụ:</strong> Đóng vai trò là con trỏ chỉ số bước (<em>Virtual Program Counter / Step Index</em>) trong State Machine để điều hướng khối <code>switch (this.label)</code>.</li>
              <li><strong>Quy ước giá trị:</strong>
                <br/>• <code>label = 0</code>: Bắt đầu hàm, chưa suspend lần nào.
                <br/>• <code>label = 1, 2, ...</code>: Đang resume lại ngay sau điểm suspend thứ 1, thứ 2,...
              </li>
              <li><strong>Mục đích:</strong> Giúp khôi phục chính xác dòng lệnh cần chạy tiếp theo khi <code>resumeWith()</code> được kích hoạt mà không phải thực thi lại code từ đầu hàm.</li>
            </ul>
          </section>

          <!-- 2. Bitmasking -->
          <section class="space-y-3">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center text-xs font-bold">2</span>
              Kỹ Thuật Bitmasking Integer.MIN_VALUE Trong Java Decompile
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Khi decompile một hàm suspend sang Java, đoạn code mở đầu luôn có cấu trúc kiểm tra và gắn cờ tái sử dụng instance:
            </p>

            <div class="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-200 font-mono text-xs">
              <div class="bg-slate-950 px-4 py-2 text-[11px] text-slate-400 border-b border-slate-800 flex justify-between items-center">
                <span>Cấu Trúc Java Decompile Kiểm Tra Tái Sử Dụng</span>
                <span class="text-amber-400">Bytecode Flow</span>
              </div>
              <pre class="p-4 overflow-x-auto leading-relaxed custom-scroll"><code>public final Object loadData(Continuation completion) {
    MyContinuation \\$continuation;

    if (completion instanceof MyContinuation) {
        \\$continuation = (MyContinuation) completion;

        // KIỂM TRA VÀ BẬT/TẮT CỜ TÁI SỬ DỤNG
        if ((\\$continuation.label & Integer.MIN_VALUE) != 0) {
            \\$continuation.label -= Integer.MIN_VALUE; // Gỡ cờ dấu, khôi phục label gốc
            goto label_continue;
        }
    }
    \\$continuation = new MyContinuation(completion);

label_continue:
    ...
}

public final Object invokeSuspend(Object result) {
    this.result = result;
    this.label |= Integer.MIN_VALUE; // GẮN CỜ BIT ĐẦU TIÊN (MSB)
    return loadData(this);           // GỌI LẠI HÀM VỚI CHÍNH CONTINUATION NÀY
}</code></pre>
            </div>
          </section>

          <!-- 3. Tại sao dùng Integer.MIN_VALUE -->
          <section class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xs font-bold">3</span>
              Tại Sao Compiler Lại Dùng Integer.MIN_VALUE?
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <code>Integer.MIN_VALUE</code> trong Java là số nguyên có bit dấu (MSB - bit thứ 31) bằng 1 và tất cả các bit còn lại bằng 0:
            </p>

            <div class="p-3 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs text-center text-sky-600 dark:text-sky-400 font-bold overflow-x-auto">
              Integer.MIN_VALUE = 0x80000000 = 10000000_00000000_00000000_00000000 (Nhị phân)
            </div>

            <div class="space-y-3">
              <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <strong class="text-amber-600 dark:text-amber-400 block font-bold text-sm">1. Đánh dấu (Marking):</strong>
                <p>Khi coroutine resume, <code>invokeSuspend()</code> được kích hoạt. Lệnh <code class="font-mono font-bold">label |= Integer.MIN_VALUE</code> sẽ bật bit cao nhất lên 1.</p>
              </div>

              <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <strong class="text-sky-600 dark:text-sky-400 block font-bold text-sm">2. Kiểm tra (Checking):</strong>
                <p>Trong hàm cha, phép tính <code class="font-mono font-bold">(\\$continuation.label & Integer.MIN_VALUE) != 0</code> kiểm tra bit dấu. Nếu khác 0: Compiler lập tức tái sử dụng instance mà không cấp phát mới.</p>
              </div>

              <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <strong class="text-emerald-600 dark:text-emerald-400 block font-bold text-sm">3. Gỡ cờ (Unmarking):</strong>
                <p>Lệnh <code class="font-mono font-bold">\\$continuation.label -= Integer.MIN_VALUE</code> lật bit dấu trở về 0 để phục hồi chỉ số bước ban đầu.</p>
              </div>
            </div>

            <div class="p-4 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40 rounded-xl text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
              <strong class="text-purple-700 dark:text-purple-300 font-bold block">Tác dụng phòng chống hỏng trạng thái khi Đệ Quy (Recursion Safety):</strong>
              <p>Ngăn chặn trường hợp hàm gọi đệ quy chính nó vô tình ghi đè biến cục bộ của tầng cha do nhận nhầm instance cần tái sử dụng.</p>
            </div>
          </section>
        </div>
      `
    },
    {
      id: "coroutine-context",
      num: "03",
      badge: "Threading",
      title: "Đại Số CoroutineContext & Quản Trị Luồng Tầng Sâu",
      desc: "Monoid Pattern, CombinedContext Tree, CoroutineScheduler, Work-Stealing, CPU_PERMIT & Starvation Prevention.",
      content: `
        <div class="space-y-8">
          <div class="border-b border-slate-200 dark:border-slate-800 pb-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono font-bold">Chuyên Đề 03</span>
              <span class="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">Architecture & Threading</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Đại Số CoroutineContext & Quản Trị Luồng (CoroutineScheduler)
            </h2>
            <p class="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">
              Mổ xẻ bản chất toán học của Context (Monoid, Keyed Set, CombinedContext Tree) và cơ chế chia sẻ thread pool ngầm giữa Dispatchers.Default & Dispatchers.IO qua thuật toán Work-Stealing.
            </p>
          </div>

          <!-- 1. Monoid -->
          <section class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center text-xs font-bold">1</span>
              "Đại Số" CoroutineContext: Cấu Trúc Monoid & Keyed Set
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <code>CoroutineContext</code> là một cấu trúc dữ liệu bất biến (immutable keyed set) tối ưu cho các phép cộng tập hợp, tạo thành một <strong>Monoid</strong>:
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span class="text-slate-400 block mb-1 font-bold">// 1. Phần tử đơn vị</span>
                <span class="text-cyan-600 dark:text-cyan-400 font-bold">EmptyCoroutineContext</span>
                <p class="text-[11px] text-slate-500 mt-1 font-sans">A + EmptyCoroutineContext == A</p>
              </div>
              <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span class="text-slate-400 block mb-1 font-bold">// 2. Phép toán hai ngôi</span>
                <span class="text-emerald-600 dark:text-emerald-400 font-bold">Toán tử + (plus)</span>
                <p class="text-[11px] text-slate-500 mt-1 font-sans">Bảo toàn tính kết hợp (Associative)</p>
              </div>
            </div>

            <ul class="text-sm text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed list-disc pl-5">
              <li><strong>Right-side Override:</strong> Khi ghép <code>C = A + B</code>, nếu trùng <code>Key</code>, phần tử thuộc <strong>B sẽ đè A</strong>.</li>
              <li><strong>Cấu trúc CombinedContext:</strong> Dạng cây nhị phân liên kết <code>CombinedContext(left, element)</code>, tra cứu theo duyệt đệ quy.</li>
            </ul>
          </section>

          <!-- 2. CoroutineScheduler -->
          <section class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xs font-bold">2</span>
              Bản Chất Bên Dưới: CoroutineScheduler & Thuật Toán Work-Stealing
            </h3>
            <div class="p-4 bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/50 rounded-xl text-xs text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
              <p class="font-bold text-sky-700 dark:text-sky-300 text-sm">Cơ Chế Dùng Chung Thread Pool Qua Token CPU_PERMIT:</p>
              <ul class="list-disc pl-5 space-y-1">
                <li><code>Dispatchers.Default</code> và <code>Dispatchers.IO</code> chia sẻ chung pool qua <code>CoroutineScheduler</code>.</li>
                <li><strong>Default:</strong> Nắm giữ token <code>CPU_PERMIT</code>, giới hạn cứng bằng số CPU Core để loại bỏ Context Switching.</li>
                <li><strong>IO:</strong> Khi gặp blocking I/O, nhả token <code>CPU_PERMIT</code> sang trạng thái <code>BLOCKING</code>; scheduler lập tức spawn thêm worker khác để bù tải CPU.</li>
                <li><strong>Work-Stealing:</strong> Worker rảnh rỗi tự động đánh cắp 50% số task từ Local Queue của worker khác.</li>
              </ul>
            </div>
          </section>

          <!-- 3. LimitedParallelism -->
          <section class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center text-xs font-bold">3</span>
              Khoanh Vùng Tài Nguyên Bằng limitedParallelism
            </h3>
            <div class="p-4 bg-slate-900 rounded-xl font-mono text-xs text-slate-300 space-y-2">
              <span class="text-purple-400">val</span> imageIoDispatcher = <span class="text-sky-400">Dispatchers.IO.limitedParallelism</span>(4)<br/>
              <span class="text-purple-400">val</span> databaseDispatcher = <span class="text-sky-400">Dispatchers.IO.limitedParallelism</span>(8)
              <p class="text-[11px] text-slate-400 font-sans mt-2">
                Tạo ra view điều phối độc lập, bảo vệ 60 thread còn lại của IO pool khỏi tình trạng Thread Starvation khi có batch tác vụ nặng bị treo.
              </p>
            </div>
          </section>
        </div>
      `
    },
    {
      id: "flow-on-boundaries",
      num: "04",
      badge: "Context Safety",
      title: "Toán Tử flowOn Đa Tầng & Context Preservation",
      desc: "Ranh giới Upstream, bản chất ChannelFlowOperator, giải mã 2 tầng crash khi bọc withContext quanh emit và Context Fusion.",
      content: `
        <div class="space-y-8">
          <div class="border-b border-slate-200 dark:border-slate-800 pb-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">Chuyên Đề 04</span>
              <span class="px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 text-xs font-mono font-bold">Context Preservation</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Toán Tử flowOn Đa Tầng & Context Preservation
            </h2>
            <p class="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">
              Bất biến thiết kế cốt lõi của Flow: Ngữ cảnh thực thi của downstream luôn được tôn trọng và không bao giờ bị upstream âm thầm thay đổi.
            </p>
          </div>

          <!-- 1. Context Preservation -->
          <section class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xs font-bold">1</span>
              Nguyên Lý Context Preservation & Giải Mã 2 Tầng Crash
            </h3>
            <div class="p-4 bg-slate-900 rounded-xl font-mono text-xs text-red-400 border border-red-900/40">
              <div>fun loadData() = flow {</div>
              <div>&nbsp;&nbsp;<span class="line-through">withContext(Dispatchers.IO)</span> {</div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;emit("data") <span class="text-red-500 font-bold">// CRASH! Vi phạm Flow Invariant</span></div>
              <div>&nbsp;&nbsp;}</div>
              <div>}</div>
            </div>

            <div class="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <p><strong>• Tầng 1:</strong> <code>SafeCollector</code> phát hiện context lúc emit khác context lúc collect, ném ngay <code>IllegalStateException: Flow invariant is violated</code>.</p>
              <p><strong>• Tầng 2:</strong> Nếu không bị chặn, thao tác cập nhật UI sẽ bị kéo sang chạy trên background thread, ném <code>CalledFromWrongThreadException</code>.</p>
            </div>
          </section>

          <!-- 2. ChannelFlowOperator & Context Fusion -->
          <section class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center text-xs font-bold">2</span>
              Bản Chất Bên Dưới: ChannelFlowOperator & Context Fusion
            </h3>
            <ul class="text-sm text-slate-600 dark:text-slate-300 space-y-2 list-disc pl-5">
              <li><code>flowOn</code> tách Upstream sang một coroutine riêng biệt và đẩy dữ liệu vào <code>Channel(BUFFERED)</code> trung gian để Downstream đọc.</li>
              <li><strong>Context Fusion:</strong> Nếu gọi nhiều <code>flowOn</code> liên tiếp không qua toán tử trung gian, runtime tự động gộp context và chỉ tạo đúng 1 Channel duy nhất.</li>
            </ul>
          </section>
        </div>
      `
    },
    {
      id: "exception-transparency",
      num: "05",
      badge: "Exception Rules",
      title: "Exception Transparency (Minh Bạch Ngoại Lệ)",
      desc: "Flow Invariant, SafeCollector under-the-hood, thảm họa nuốt lỗi hạ lưu & ranh giới bất biến của toán tử .catch.",
      content: `
        <div class="space-y-8">
          <div class="border-b border-slate-200 dark:border-slate-800 pb-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2.5 py-1 rounded-md bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20 text-xs font-mono font-bold">Chuyên Đề 05</span>
              <span class="px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-mono font-bold">Architecture Safety</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Exception Transparency (Minh Bạch Ngoại Lệ)
            </h2>
            <p class="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">
              Một Flow không bao giờ được phép bắt hoặc nuốt ngoại lệ xảy ra ở downstream một cách âm thầm. Ngoại lệ phát sinh từ downstream luôn phải được ném thẳng về phía nơi gọi collect.
            </p>
          </div>

          <section class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-pink-500/10 text-pink-500 flex items-center justify-center text-xs font-bold">1</span>
              Ranh Giới Bắt Lỗi Chuẩn Mực Của Toán Tử .catch {}
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Toán tử <code>.catch</code> <strong>CHỈ BẮT NGOẠI LỆ XẢY RA Ở UPSTREAM</strong> (phía trước nó), không bao giờ can thiệp vào downstream:
            </p>

            <pre class="p-3.5 bg-slate-950 text-slate-200 font-mono text-xs rounded-xl overflow-x-auto custom-scroll"><code>repository.fetchUsers() // upstream
    .map { parseUsers(it) } // upstream
    .catch { throwable ->
        // Chỉ bắt lỗi từ fetchUsers hoặc parseUsers
        emit(emptyList())
    }
    .collect { users ->
        // Downstream: Lỗi ném ra tại đây .catch TRÊN SẼ KHÔNG BẮT!
        renderUI(users)
    }</code></pre>

            <div class="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xl text-xs text-slate-700 dark:text-slate-300">
              <strong>Pattern gom cụm:</strong> Dùng <code>flow.onEach { renderUI(it) }.catch { handleError(it) }.launchIn(scope)</code> để đưa toàn bộ logic downstream vào trước toán tử catch một cách an toàn.
            </div>
          </section>
        </div>
      `
    },
    {
      id: "flow-advanced-backpressure",
      num: "06",
      badge: "Reactive Flow",
      title: "Flow Nâng Cao: Backpressure & Operators",
      desc: "Bản chất Backpressure qua suspend, Buffer Overflow, Flattening (Concat/Merge/Latest), Throttling & Context Preservation.",
      content: `
        <div class="space-y-8">
          <div class="border-b border-slate-200 dark:border-slate-800 pb-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2.5 py-1 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 text-xs font-mono font-bold">Chuyên Đề 06</span>
              <span class="px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 text-xs font-mono font-bold">Reactive Architecture</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Kotlin Flow Nâng Cao: Backpressure & Operators
            </h2>
            <p class="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">
              Bản chất Backpressure tự nhiên qua cơ chế suspend, 3 chiến lược buffer, và phân loại Flattening/Throttling operators.
            </p>
          </div>

          <section class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-teal-500/10 text-teal-500 flex items-center justify-center text-xs font-bold">1</span>
              3 Chiến Lược Xử Lý Khi Tách Biệt Concurrency
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <span class="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400">buffer()</span>
                <h4 class="font-bold text-slate-900 dark:text-white">Đệm Dữ Liệu</h4>
                <p class="text-slate-500 dark:text-slate-400">Tách Emitter và Collector sang 2 coroutine nối qua Channel ngầm với các chiến lược SUSPEND, DROP_OLDEST, DROP_LATEST.</p>
              </div>

              <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <span class="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-teal-500/10 text-teal-600 dark:text-teal-400">conflate()</span>
                <h4 class="font-bold text-slate-900 dark:text-white">Gộp Giá Trị Mới Nhất</h4>
                <p class="text-slate-500 dark:text-slate-400">Tương đương <code>buffer(1, DROP_OLDEST)</code>. Bỏ qua các giá trị trung gian khi collector đang bận.</p>
              </div>

              <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <span class="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400">collectLatest { }</span>
                <h4 class="font-bold text-slate-900 dark:text-white">Hủy Xử Lý Cũ</h4>
                <p class="text-slate-500 dark:text-slate-400">Hủy bỏ ngay lập tức coroutine của phần tử cũ nếu có phần tử mới xuất hiện.</p>
              </div>
            </div>
          </section>
        </div>
      `
    },
    {
      id: "compose-lifecycle-collection",
      num: "07",
      badge: "Compose Lifecycle",
      title: "Jetpack Compose & Vòng Đời Thu Thập An Toàn",
      desc: "collectAsStateWithLifecycle, repeatOnLifecycle, cạm bẫy Deadlock tuần tự & bí mật 5000ms.",
      content: `
        <div class="space-y-8">
          <div class="border-b border-slate-200 dark:border-slate-800 pb-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-mono font-bold">Chuyên Đề 07</span>
              <span class="px-2.5 py-1 rounded-md bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 text-xs font-mono font-bold">UI Lifecycle</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Jetpack Compose & Vòng Đời Thu Thập An Toàn
            </h2>
            <p class="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">
              Nhận biết Android OS Lifecycle trong Declarative UI: triệt tiêu rò rỉ bộ nhớ, hao pin ngầm và giải mã cơ chế 5000ms WhileSubscribed.
            </p>
          </div>

          <section class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xs font-bold">1</span>
              collectAsStateWithLifecycle vs collectAsState
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <code>collectAsState()</code> chỉ gắn với Composition Lifecycle. Khi app rơi vào Background, luồng vẫn tiếp tục collect gây hao pin. <code>collectAsStateWithLifecycle()</code> tự động dừng thu thập khi vòng đời xuống dưới <code>STARTED</code>.
            </p>

            <div class="p-4 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40 rounded-xl text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
              <strong class="text-purple-700 dark:text-purple-300 font-bold block">Bí Mật Con Số 5000ms Trong SharingStarted.WhileSubscribed(5_000):</strong>
              <p>Khoảng trễ 5 giây đóng vai trò vùng đệm (grace period) giữ upstream không bị hủy khi xoay màn hình (Activity recreate mất 200-500ms), tránh lãng phí request dữ liệu mới.</p>
            </div>
          </section>
        </div>
      `
    },
    {
      id: "channels-concurrency-select",
      num: "08",
      badge: "Concurrency",
      title: "Channels, Concurrency & Biểu Thức Select",
      desc: "Triết lý CSP, Buffer Types, Pipelines, Fan-in/Fan-out, Atomic Multiplexing và so sánh Channel vs Flow.",
      content: `
        <div class="space-y-8">
          <div class="border-b border-slate-200 dark:border-slate-800 pb-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-mono font-bold">Chuyên Đề 08</span>
              <span class="px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 text-xs font-mono font-bold">CSP Architecture</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Channels, Concurrency & Biểu Thức Select
            </h2>
            <p class="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">
              Triển khai lý thuyết CSP: Kênh truyền thông điệp bất đồng bộ (hot stream), các mô hình Fan-in, Fan-out và biểu thức ghép kênh atomic <code>select</code>.
            </p>
          </div>

          <section class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-xs font-bold">1</span>
              Phân Biệt Cốt Lõi: Channel vs Flow
            </h3>
            <div class="overflow-x-auto custom-scroll border border-slate-200 dark:border-slate-800 rounded-xl">
              <table class="w-full text-left text-xs">
                <thead class="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th class="p-3">Đặc Tính</th>
                    <th class="p-3">Channel</th>
                    <th class="p-3">StateFlow / SharedFlow</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                  <tr>
                    <td class="p-3 font-bold">Mô hình</td>
                    <td class="p-3 text-indigo-500 font-semibold">Unicast (1 - 1, chia nhau nhận)</td>
                    <td class="p-3 text-sky-500 font-semibold">Multicast (1 - N, phát sóng tất cả)</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-bold">Mục đích</td>
                    <td class="p-3">Hàng đợi công việc, Single-run tasks</td>
                    <td class="p-3">Lưu trữ UI State, Broadcast Events</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      `
    }
  ]
});