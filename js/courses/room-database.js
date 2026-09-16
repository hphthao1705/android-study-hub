// js/courses/room-database.js
window.coursesRepository = window.coursesRepository || [];

window.coursesRepository.push({
  id: "room-database-deepdive",
  title: "Room Database Deep-dive & TypeConverters",
  category: "Local Storage",
  icon: "fa-database",
  color: "from-amber-500 to-rose-600",
  badge: "Storage",
  description: "Bản chất Room Annotation Processing (KSP vs KAPT), cơ chế TypeConverter, SQLite Threading Model và Reactive InvalidationTracker.",
  lessons: [
    {
      id: "ksp-vs-kapt-room",
      num: "01",
      badge: "Compiler & KSP",
      title: "KSP vs KAPT: Nút Thắt Stub Generation & Đột Phá Cho Room",
      desc: "Phân tích vì sao KSP thay thế hoàn toàn KAPT, cơ chế loại bỏ Java Stubs và mã nguồn Room sinh ra bên dưới.",
      content: `
        <div class="space-y-8 text-slate-200">
          <!-- Header Intro -->
          <div class="border-b border-slate-700/60 pb-5">
            <h2 class="text-2xl font-bold text-white tracking-tight">KSP vs KAPT: Cuộc Cách Mạng Về Tốc Độ & Mã Sinh Tự Động</h2>
            <p class="mt-2 text-slate-400 text-sm leading-relaxed">
              KAPT bản chất là một công cụ "chắp vá" mượn từ Java APT cổ điển, trong khi KSP (Kotlin Symbol Processing) được kiến tạo trực tiếp từ Kotlin Compiler Frontend để phân tích AST.
            </p>
          </div>

          <!-- Section 1: Bottleneck of KAPT -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-amber-400 flex items-center gap-2">
              <i class="fa-solid fa-triangle-exclamation text-amber-500"></i>
              1. Nút Thắt Cổ Chai Của KAPT (Java Stub Generation)
            </h3>
            <p class="text-slate-300 text-sm leading-relaxed">
              Để các Annotation Processor viết bằng Java (<code class="text-amber-300 bg-slate-800 px-1.5 py-0.5 rounded">javac APT</code>) có thể phân tích được mã Kotlin, KAPT buộc phải thực hiện bước trung gian tạo ra <strong>Java Stubs</strong>:
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-2">
                <div class="font-semibold text-rose-400 text-sm flex items-center gap-1.5">
                  <i class="fa-solid fa-xmark"></i> Quy trình KAPT (Cũ & Nặng nề)
                </div>
                <ol class="text-xs text-slate-300 space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li>Trình biên dịch quét toàn bộ code Kotlin để xuất ra các file Java rỗng ruột (Stubs).</li>
                  <li>Chiếm tới <strong>30% – 50% tổng thời gian compile</strong> chỉ để tạo stub.</li>
                  <li>APT của Java đọc stubs và sinh file mã nguồn.</li>
                  <li>Mất thông tin nullability phức tạp và tính năng gốc của Kotlin.</li>
                </ol>
              </div>

              <div class="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-2">
                <div class="font-semibold text-emerald-400 text-sm flex items-center gap-1.5">
                  <i class="fa-solid fa-check"></i> Quy trình KSP (Hiện Đại & Trực Tiếp)
                </div>
                <ol class="text-xs text-slate-300 space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li>Tích hợp trực tiếp vào <strong>Kotlin Compiler Frontend</strong>.</li>
                  <li>Đọc trực tiếp Kotlin AST (Abstract Syntax Tree) và Symbol mà <strong>không tạo Stub</strong>.</li>
                  <li>Tốc độ build nhanh hơn <strong>2x – 4x</strong>, tối ưu hóa Incremental Build vượt trội.</li>
                  <li>Hỗ trợ gốc Kotlin Multiplatform (Room KMP trên Android, iOS, Desktop).</li>
                </ol>
              </div>
            </div>
          </div>

          <!-- Section 2: Code Gen Under The Hood -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-emerald-400 flex items-center gap-2">
              <i class="fa-solid fa-code-branch text-emerald-500"></i>
              2. KSP Sinh Gì Dưới Mui Xe Cho Room?
            </h3>
            <p class="text-slate-300 text-sm leading-relaxed">
              Khi build project, Room KSP Processor (<code class="text-amber-300 bg-slate-800 px-1.5 py-0.5 rounded">androidx.room:room-compiler</code>) tạo ra các class thuần thực thi interface và abstract class:
            </p>

            <div class="space-y-3">
              <div class="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <div class="text-amber-400 font-medium text-sm mb-1 font-mono">AppDatabase_Impl.kt</div>
                <p class="text-xs text-slate-300 leading-relaxed">
                  Kế thừa abstract database của bạn, override <code class="text-rose-300">createOpenHelper()</code> chứa <code class="text-rose-300">RoomOpenHelper.Delegate</code> để quản lý lifecycle (tạo bảng <code class="text-sky-300">CREATE TABLE IF NOT EXISTS</code>, migration, và kiểm tra schema hash tại <code class="text-sky-300">room_master_table</code>).
                </p>
              </div>

              <div class="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <div class="text-amber-400 font-medium text-sm mb-1 font-mono">UserDao_Impl.kt</div>
                <p class="text-xs text-slate-300 leading-relaxed">
                  Chuyển đổi các câu SQL trong <code class="text-rose-300">@Query</code> thành đối tượng <code class="text-rose-300">RoomSQLiteQuery</code>. Với các hàm write, KSP sinh ra các anonymous instance của <code class="text-rose-300">EntityInsertionAdapter</code> để bind trực tiếp các field vào SQLite statement primitives (<code class="text-sky-300">stmt.bindString</code>, <code class="text-sky-300">stmt.bindLong</code>).
                </p>
              </div>
            </div>
          </div>
        </div>
      `
    },
    {
      id: "room-typeconverters-internals",
      num: "02",
      badge: "Data Mapping",
      title: "TypeConverters: Cơ Chế Mapping 2 Chiều & Granular Scoping",
      desc: "Nguyên lý cầu nối giữa kiểu dữ liệu phức tạp của Kotlin và 5 kiểu gốc của SQLite, cùng cơ chế @ProvidedTypeConverter với DI.",
      content: `
        <div class="space-y-8 text-slate-200">
          <div class="border-b border-slate-700/60 pb-5">
            <h2 class="text-2xl font-bold text-white tracking-tight">TypeConverters: Cầu Nối Giữa Kotlin & Primitive SQLite</h2>
            <p class="mt-2 text-slate-400 text-sm leading-relaxed">
              SQLite chỉ hỗ trợ đúng 5 storage classes: <code>NULL</code>, <code>INTEGER</code>, <code>REAL</code>, <code>TEXT</code>, <code>BLOB</code>. Bất kỳ cấu trúc dữ liệu nào khác đều phải thông qua TypeConverter.
            </p>
          </div>

          <!-- Section: Scope Hierarchy -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-sky-400 flex items-center gap-2">
              <i class="fa-solid fa-layer-group text-sky-500"></i>
              1. Thứ Bậc Áp Dụng (Granular Scoping)
            </h3>
            <p class="text-slate-300 text-sm leading-relaxed">
              Room giải quyết converter theo cơ chế phạm vi từ hẹp đến rộng. Bạn nên đặt converter ở phạm vi hẹp nhất có thể:
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="p-3.5 bg-slate-900 border border-slate-800 rounded-xl">
                <span class="text-xs uppercase font-semibold text-emerald-400 tracking-wider">Field Scope</span>
                <p class="text-xs text-slate-300 mt-1">Chỉ áp dụng chuyển đổi duy nhất cho thuộc tính được gắn annotation.</p>
              </div>
              <div class="p-3.5 bg-slate-900 border border-slate-800 rounded-xl">
                <span class="text-xs uppercase font-semibold text-sky-400 tracking-wider">Entity Scope</span>
                <p class="text-xs text-slate-300 mt-1">Áp dụng cho mọi trường dữ liệu nằm trong toàn bộ Entity đó.</p>
              </div>
              <div class="p-3.5 bg-slate-900 border border-slate-800 rounded-xl">
                <span class="text-xs uppercase font-semibold text-amber-400 tracking-wider">DAO Scope</span>
                <p class="text-xs text-slate-300 mt-1">Áp dụng cho các tham số truyền vào và kết quả trả về của các query trong DAO.</p>
              </div>
              <div class="p-3.5 bg-slate-900 border border-slate-800 rounded-xl">
                <span class="text-xs uppercase font-semibold text-rose-400 tracking-wider">Database Scope</span>
                <p class="text-xs text-slate-300 mt-1">Phạm vi toàn cục: Mọi Entity và DAO trực thuộc Database đều kế thừa.</p>
              </div>
            </div>
          </div>

          <!-- Section: ProvidedTypeConverter -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-emerald-400 flex items-center gap-2">
              <i class="fa-solid fa-wand-magic-sparkles text-emerald-500"></i>
              2. Static TypeConverter vs @ProvidedTypeConverter (Dagger/Hilt)
            </h3>
            <p class="text-slate-300 text-sm leading-relaxed">
              Mặc định Room tự khởi tạo converter bằng constructor không tham số (<code class="text-amber-300">Converters()</code>). Khi bạn cần inject dependency bên ngoài (như Moshi instance hoặc Json serializer đã cấu hình sẵn qua Hilt):
            </p>

            <div class="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <div class="text-xs font-mono text-slate-400">// Đánh dấu converter cần dependency</div>
              <pre class="text-xs text-amber-300 font-mono overflow-x-auto leading-relaxed"><code>@ProvidedTypeConverter
class JsonConverters @Inject constructor(private val json: Json) {
    @TypeConverter
    fun fromMetadata(value: String): Metadata = json.decodeFromString(value)

    @TypeConverter
    fun toMetadata(meta: Metadata): String = json.encodeToString(meta)
}</code></pre>
              <p class="text-xs text-slate-400 pt-2 border-t border-slate-800">
                Sau đó, truyền instance này vào Room Builder: <code class="text-sky-300">Room.databaseBuilder(...).addTypeConverter(jsonConverters).build()</code>
              </p>
            </div>
          </div>
        </div>
      `
    },
    {
      id: "room-sqlite-threading-flow",
      num: "03",
      badge: "Threading & Invalidation",
      title: "SQLite Threading, WAL Mode & InvalidationTracker",
      desc: "Bản chất file-locking, chế độ Write-Ahead Logging (WAL) và cách Flow tự động phát hiện thay đổi dữ liệu.",
      content: `
        <div class="space-y-8 text-slate-200">
          <div class="border-b border-slate-700/60 pb-5">
            <h2 class="text-2xl font-bold text-white tracking-tight">SQLite Threading Internals & InvalidationTracker</h2>
            <p class="mt-2 text-slate-400 text-sm leading-relaxed">
              SQLite bản chất là file-based engine. Hiểu rõ cách Room điều phối luồng và lắng nghe trigger thay đổi dữ liệu giúp tránh nghẽn thread và deadlock.
            </p>
          </div>

          <!-- Section: WAL Mode -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-rose-400 flex items-center gap-2">
              <i class="fa-solid fa-bolt text-rose-500"></i>
              1. WAL Mode (Write-Ahead Logging) vs Rollback Journal
            </h3>
            <p class="text-slate-300 text-sm leading-relaxed">
              Mặc định từ Android 9+, Room kích hoạt <strong>WAL mode</strong>. Khác với Rollback Journal (khóa toàn bộ database khi ghi), WAL cho phép:
            </p>
            <div class="p-4 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-300 space-y-2">
              <div class="flex items-center gap-2 text-emerald-400 font-semibold">
                <i class="fa-solid fa-arrows-split-up-and-left"></i> 1 Writer chạy đồng thời với nhiều Reader
              </div>
              <p class="text-xs text-slate-400 leading-relaxed">
                Các thao tác ghi được ghi nối đuôi vào file phụ <code class="text-amber-300">&lt;database-name&gt;-wal</code>. Các luồng đọc vẫn đọc snapshot an toàn từ file chính mà không bị chặn lại. Dữ liệu sau đó được gộp về file chính qua tiến trình Checkpoint.
              </p>
            </div>
          </div>

          <!-- Section: InvalidationTracker -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-amber-400 flex items-center gap-2">
              <i class="fa-solid fa-rotate text-amber-500"></i>
              2. Cơ Chế InvalidationTracker Thổi Dữ Liệu Lên Flow
            </h3>
            <p class="text-slate-300 text-sm leading-relaxed">
              Khi bạn khai báo DAO trả về <code class="text-sky-300 bg-slate-800 px-1.5 py-0.5 rounded">Flow&lt;List&lt;User&gt;&gt;</code>, Room vận hành theo chu trình 3 bước:
            </p>

            <ol class="space-y-3 text-xs text-slate-300">
              <li class="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                <strong class="text-white block mb-1">1. Đăng ký quan sát bảng:</strong>
                <code class="text-rose-300">InvalidationTracker</code> tạo bảng phụ tạm thời và gắn triggers theo dõi các bảng mục tiêu để phát hiện các lệnh <code class="text-amber-300">INSERT/UPDATE/DELETE</code>.
              </li>
              <li class="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                <strong class="text-white block mb-1">2. Đánh dấu bảng "Dirty":</strong>
                Khi có write transaction commit thành công, cờ trạng thái của bảng được đánh dấu là thay đổi (dirty).
              </li>
              <li class="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                <strong class="text-white block mb-1">3. Tự động re-query & emit:</strong>
                Tracker phát tín hiệu qua background dispatcher của Room, thực hiện re-query câu lệnh SELECT và phát giá trị mới nhất qua coroutine <code class="text-sky-300">Flow</code> cho UI layer.
              </li>
            </ol>
          </div>
        </div>
      `
    }
  ]
});