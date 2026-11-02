const header = (num, tag, title, subtitle) => `
  <div class="border-b border-slate-200 dark:border-slate-800 pb-6">
    <div class="flex items-center gap-2 mb-3">
      <span class="px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 text-xs font-mono font-bold">Chuyên Đề ${num}</span>
      <span class="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-mono font-bold">${tag}</span>
    </div>
    <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">${title}</h2>
    <p class="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">${subtitle}</p>
  </div>
`;

const sectionTitle = (num, title) => `
  <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
    <span class="w-6 h-6 shrink-0 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center text-xs font-bold">${num}</span>
    ${title}
  </h3>
`;

const card = "p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 space-y-3";
const text = "text-slate-700 dark:text-slate-300 text-sm leading-relaxed";
const code = "p-3 rounded-lg bg-slate-900 text-slate-200 text-xs overflow-x-auto";
const inlineCode = "px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-300 text-xs";
const th = "p-3 text-left font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700";
const td = "p-3 align-top text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800";

export const playReleaseCourse = {
  id: "play-release",
  title: "Build & Release trên Google Play",
  category: "Build & Release",
  icon: "fa-rocket",
  color: "from-sky-500 to-indigo-500",
  badge: "Thực Chiến",
  description: "Đưa app từ build đến Production trên Google Play Console: đặt tên build (versionCode / versionName), testing tracks, Internal app sharing, Pre-launch report, tạo release trên Closed testing để Google review và chuẩn bị Go-live.",
  lessons: [
    {
      id: "testing-tracks",
      num: "01",
      badge: "Testing",
      title: "Testing Tracks: Internal, Closed, Open & Internal App Sharing",
      desc: "Các mục trong menu Testing của Play Console: phạm vi tester, thời gian review, Pre-launch report, cách gửi build cho Google review mà chưa public, và khai báo App access cho app có đăng nhập.",
      content: `
        <div class="space-y-8">
          ${header("01", "Release Pipeline", "Testing Tracks: Internal, Closed, Open & Internal App Sharing", "Menu Testing trong Google Play Console gồm các track phát hành thử nghiệm và một công cụ kiểm thử tự động, sắp xếp từ phạm vi hẹp, nhanh nhất đến diện rộng.")}

          <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
            <p class="text-emerald-700 dark:text-emerald-300 text-sm font-bold"><i class="fa-solid fa-circle-check mr-1"></i> Ý chính</p>
            <ul class="list-disc pl-5 space-y-1.5 text-emerald-700 dark:text-emerald-300 text-sm">
              <li>Gửi nhanh một build cho đồng nghiệp &rarr; <strong>Internal app sharing</strong>.</li>
              <li>Dev/QA test tính năng &rarr; <strong>Internal testing</strong>.</li>
              <li>Muốn Google <strong>review thật</strong> (policy + kỹ thuật) mà chưa public &rarr; <strong>Closed testing</strong> với danh sách tester riêng.</li>
            </ul>
          </div>

          <section class="space-y-4">
            ${sectionTitle(1, "Internal testing (Kiểm thử nội bộ)")}
            <div class="${card}">
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li><strong>Mục đích:</strong> cho đội phát triển, QA hoặc các bên liên quan nội bộ dự án.</li>
                <li><strong>Số lượng tester:</strong> tối đa <strong>100 người</strong>, thêm qua danh sách email.</li>
                <li><strong>Thời gian khả dụng:</strong> rất nhanh, thường vài phút đến vài giờ; không phải qua quy trình review đầy đủ như Production.</li>
                <li><strong>Đặc điểm:</strong> tester nhận một liên kết opt-in riêng để tham gia rồi tải app từ Play Store. Đánh giá/nhận xét của tester gửi riêng cho developer, không hiển thị công khai.</li>
              </ul>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(2, "Closed testing (Kiểm thử kín)")}
            <div class="${card}">
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li><strong>Mục đích:</strong> thử nghiệm với tệp người dùng mục tiêu, đối tác hoặc danh sách tester chỉ định trước khi mở rộng.</li>
                <li><strong>Số lượng tester:</strong> quản lý qua danh sách email hoặc Google Groups, có thể lên tới hàng nghìn người.</li>
                <li><strong>Thời gian review:</strong> bắt buộc qua quy trình xét duyệt đầy đủ của Google (tương tự Production), thường từ vài giờ đến vài ngày.</li>
              </ul>
            </div>
            <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p class="text-amber-700 dark:text-amber-300 text-sm"><i class="fa-solid fa-lightbulb mr-1"></i> <strong>Tài khoản developer cá nhân</strong> tạo từ ngày <strong>13/11/2023</strong> trở đi phải chạy Closed testing với một số lượng tối thiểu tester opt-in <strong>liên tục ít nhất 14 ngày</strong> thì mới được xin quyền phát hành Production. Mức ban đầu là 20 tester, từ cuối 2024 Google đã giảm xuống <strong>12 tester</strong>; kiểm tra lại con số hiện hành trên Play Console Help trước khi lên kế hoạch. Tài khoản tổ chức (Organization) không bị yêu cầu này.</p>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(3, "Open testing (Kiểm thử mở / Public Beta)")}
            <div class="${card}">
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li><strong>Mục đích:</strong> thu phản hồi từ cộng đồng người dùng thật trên diện rộng.</li>
                <li><strong>Số lượng tester:</strong> không giới hạn (có thể tự đặt giới hạn tối đa).</li>
                <li><strong>Cách truy cập:</strong> app hiển thị công khai trên Play Store với nhãn <strong>Early access</strong>; bất kỳ ai cũng có thể bấm tham gia chương trình beta để tải.</li>
                <li><strong>Thời gian review:</strong> cần Google duyệt đầy đủ mỗi khi ra build mới.</li>
                <li><strong>Đánh giá:</strong> tester chỉ gửi được <strong>private feedback</strong> cho developer; không ảnh hưởng điểm rating công khai của app.</li>
              </ul>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(4, "Internal app sharing (Chia sẻ ứng dụng nội bộ)")}
            <div class="${card}">
              <p class="${text}"><strong>Mục đích:</strong> chia sẻ siêu tốc một bản build (<code class="${inlineCode}">.aab</code> hoặc <code class="${inlineCode}">.apk</code>) qua đường link trực tiếp, tương tự Firebase App Distribution nhưng là tính năng của chính <strong>Google Play Store</strong>.</p>
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li><strong>Không cần Google review:</strong> link dùng được ngay vài giây sau khi upload.</li>
                <li><strong>Linh hoạt:</strong> không cần tăng <code class="${inlineCode}">versionCode</code>, không cần ký bằng key chính thức (dùng debug key cũng được).</li>
                <li><strong>Phù hợp nhất:</strong> gửi nhanh một bản hotfix hoặc một branch tính năng cho đồng nghiệp/QA test ngay.</li>
              </ul>
            </div>
            <div class="${card}">
              <p class="${text}"><strong>Tester có cần cài app Firebase App Tester không?</strong> <strong>Không.</strong> Internal app sharing độc lập với hệ sinh thái Firebase; tester chỉ cần Play Store.</p>
              <p class="${text}"><strong>Bước 1: Bật quyền nhận link (chỉ làm 1 lần trên mỗi máy):</strong></p>
              <ol class="list-decimal pl-5 space-y-1.5 ${text}">
                <li>Mở <strong>Google Play Store</strong> &rarr; bấm avatar ở góc trên bên phải &rarr; <strong>Settings</strong> &rarr; <strong>About</strong>.</li>
                <li>Nhấn liên tục <strong>7 lần</strong> vào <strong>Play Store version</strong> đến khi hiện thông báo <em>"You are now a developer!"</em>.</li>
                <li>Quay lại <strong>General</strong> &rarr; bật <strong>Internal app sharing</strong>.</li>
              </ol>
              <p class="${text}"><strong>Bước 2: Cài app:</strong> developer gửi link lấy từ Play Console; tester mở link trên điện thoại, Play Store hiện ra và bấm <strong>Install</strong> như mọi app khác.</p>
            </div>
            <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p class="text-amber-700 dark:text-amber-300 text-sm"><i class="fa-solid fa-lightbulb mr-1"></i> <strong>Lưu ý:</strong> build qua Internal app sharing được Google ký lại bằng key riêng cho tính năng này. Nếu máy đang có bản cài từ track khác (hoặc ngược lại), có thể phải gỡ app trước khi cài vì khác chữ ký.</p>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(5, "Pre-launch report (Báo cáo trước khi ra mắt)")}
            <div class="${card}">
              <p class="${text}"><strong>Bản chất:</strong> không phải track gửi app cho người dùng, mà là hệ thống kiểm thử tự động của Google chạy trên <strong>Firebase Test Lab</strong>.</p>
              <p class="${text}"><strong>Cách hoạt động:</strong> khi upload build lên track testing (Closed/Open), robot của Google tự cài và chạy thử app trên nhiều thiết bị Android thật khác nhau về kích thước màn hình, phần cứng, ngôn ngữ và phiên bản Android.</p>
              <p class="${text}"><strong>Kết quả cung cấp:</strong></p>
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li><strong>Sự cố:</strong> Crash, ANR (App Not Responding).</li>
                <li><strong>UI:</strong> tràn màn hình, vỡ layout, tỷ lệ co giãn không chuẩn, vấn đề accessibility.</li>
                <li><strong>Hiệu năng:</strong> thời gian khởi động (cold/warm start), RAM/CPU tiêu thụ.</li>
                <li><strong>Bảo mật:</strong> cảnh báo thư viện cũ, rủi ro bảo mật tiềm ẩn.</li>
              </ul>
            </div>
            <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p class="text-amber-700 dark:text-amber-300 text-sm"><i class="fa-solid fa-lightbulb mr-1"></i> <strong>App có màn hình đăng nhập:</strong> robot chỉ thấy được màn login nếu không có thông tin đăng nhập. Cung cấp tài khoản test trong phần cấu hình Pre-launch report để robot đi sâu được vào app.</p>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(6, "Gửi build cho Google review mà chưa public: dùng Closed testing")}
            <div class="${card}">
              <p class="${text}"><strong>Vì sao Closed testing là lựa chọn phù hợp nhất:</strong></p>
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li><strong>Review thật:</strong> Google quét policy, permissions, Target SDK và thông tin App content như với Production. Nếu thiếu Data safety, Privacy Policy, Account deletion..., bản build bị <strong>Rejected</strong> kèm lý do để sửa sớm, tránh bị chặn bất ngờ vào ngày Go-live.</li>
                <li><strong>Tự động có Pre-launch report:</strong> phát hiện sớm crash, ANR, lỗi layout và cảnh báo bảo mật.</li>
                <li><strong>Không lộ app:</strong> chỉ tài khoản trong danh sách tester mới thấy và tải được. Có thể chỉ thêm đúng email của mình.</li>
              </ul>
            </div>
            <div class="${card}">
              <p class="${text}"><strong>Quy trình:</strong></p>
              <ol class="list-decimal pl-5 space-y-1.5 ${text}">
                <li><strong>Chuẩn bị file:</strong> build <code class="${inlineCode}">.aab</code> ở chế độ <strong>Release</strong>, ký bằng upload key chính thức sẽ dùng cho Go-live.</li>
                <li><strong>Tạo release:</strong> Play Console &rarr; chọn app &rarr; <strong>Testing &rarr; Closed testing</strong> &rarr; chọn track mặc định (Alpha) hoặc <strong>Create track</strong> &rarr; <strong>Create new release</strong> &rarr; upload <code class="${inlineCode}">.aab</code>, điền Release name và Release notes &rarr; <strong>Next</strong>.</li>
                <li><strong>Cấu hình tester:</strong> tab <strong>Testers</strong> &rarr; tạo email list (1 email cũng đủ để hoàn tất điều kiện track).</li>
                <li><strong>Gửi review:</strong> lần đầu đưa app lên Play thì hoàn thành hết <strong>Policy and programs &rarr; App content</strong>; sau đó <strong>Save &rarr; Review release &rarr; Start rollout to Closed testing</strong>.</li>
                <li><strong>Theo dõi:</strong> trạng thái duyệt ở <strong>Publishing overview</strong>; vài giờ sau vào <strong>Testing &rarr; Pre-launch report</strong> để xem lỗi kỹ thuật robot tìm thấy.</li>
              </ol>
            </div>
            <div class="${card}">
              <p class="${text}"><strong>Chuẩn bị cho ngày Go-live:</strong></p>
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li><strong>Bật Managed publishing</strong> trong <strong>Publishing overview</strong> trước khi gửi bản Production: Google review và duyệt trước, nhưng app chỉ lên Store đúng lúc bạn bấm <strong>Publish</strong>.</li>
                <li><strong>Promote release:</strong> bản Closed testing đã duyệt và ổn định có thể đẩy thẳng sang <strong>Production</strong> mà không cần upload lại bundle.</li>
              </ul>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(7, "App có đăng nhập: bắt buộc khai báo App access")}
            <div class="${card}">
              <p class="${text}">Nếu app yêu cầu đăng nhập để dùng toàn bộ hoặc một phần tính năng, phải cung cấp <strong>tài khoản demo</strong> cho reviewer. Thiếu hoặc tài khoản không hoạt động &rarr; bản phát hành bị <strong>Rejected</strong> với lý do vi phạm <strong>App access</strong>.</p>
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li><strong>Cần cung cấp:</strong> app bắt buộc đăng nhập bằng tài khoản/mật khẩu, OTP, tài khoản mạng xã hội (Google, Facebook, Apple ID...), hoặc chỉ dùng được sau khi quét QR/nhập mã kích hoạt.</li>
                <li><strong>Không cần:</strong> app dùng tự do không cần đăng nhập, hoặc có Guest mode xem được toàn bộ tính năng chính.</li>
              </ul>
            </div>
            <div class="${card}">
              <p class="${text}"><strong>Các bước cấu hình:</strong></p>
              <ol class="list-decimal pl-5 space-y-1.5 ${text}">
                <li>Play Console &rarr; chọn app &rarr; <strong>Policy and programs &rarr; App content</strong>.</li>
                <li>Mục <strong>App access</strong> &rarr; <strong>Manage</strong> (hoặc <strong>Start</strong>).</li>
                <li>Chọn <strong>All or some functionality is restricted</strong>.</li>
                <li><strong>+ Add instructions</strong> và điền: tên gợi nhớ (ví dụ <code class="${inlineCode}">Test Account Demo</code>), username/số điện thoại, password, và hướng dẫn đặc biệt nếu có (ví dụ tài khoản đã tắt 2FA, hoặc OTP cố định cho tài khoản test như <code class="${inlineCode}">123456</code>).</li>
                <li><strong>Save</strong>.</li>
              </ol>
            </div>
            <div class="p-4 rounded-xl bg-red-500/10 border border-red-500/20 space-y-2">
              <p class="text-red-700 dark:text-red-300 text-sm font-bold"><i class="fa-solid fa-triangle-exclamation mr-1"></i> Để không bị từ chối duyệt</p>
              <ul class="list-disc pl-5 space-y-1.5 text-red-700 dark:text-red-300 text-sm">
                <li><strong>Tắt 2FA / OTP động</strong> cho tài khoản demo: reviewer không nhận được mã SMS hay Authenticator.</li>
                <li><strong>Có sẵn dữ liệu mẫu:</strong> app có danh sách, biểu đồ, giao dịch thì tạo trước vài bản ghi để reviewer thao tác được.</li>
                <li><strong>Giữ tài khoản sống suốt vòng đời app:</strong> không khóa, xóa hay đổi mật khẩu, vì Google có thể đăng nhập kiểm tra lại ở mọi bản cập nhật sau.</li>
              </ul>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(8, "Tóm tắt luồng phát hành chuẩn")}
            <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/50">
              <table class="w-full text-sm bg-white dark:bg-slate-800/30">
                <thead class="bg-slate-50 dark:bg-slate-800/60">
                  <tr>
                    <th class="${th}">Bước</th>
                    <th class="${th}">Tester</th>
                    <th class="${th}">Google review</th>
                    <th class="${th}">Dùng khi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td class="${td}"><strong>Internal app sharing</strong></td><td class="${td}">Ai có link (đã bật tính năng)</td><td class="${td}">Không</td><td class="${td}">Test nhánh, hotfix</td></tr>
                  <tr><td class="${td}"><strong>Internal testing</strong></td><td class="${td}">Tối đa 100 email</td><td class="${td}">Nhanh, không review đầy đủ</td><td class="${td}">Dev &amp; QA kiểm tra tính năng</td></tr>
                  <tr><td class="${td}"><strong>Closed testing</strong></td><td class="${td}">Email list / Google Groups</td><td class="${td}">Đầy đủ</td><td class="${td}">Beta kín, xin review trước Go-live, Pre-launch report</td></tr>
                  <tr><td class="${td}"><strong>Open testing</strong></td><td class="${td}">Bất kỳ ai trên Store</td><td class="${td}">Đầy đủ</td><td class="${td}">Mở rộng cộng đồng thử nghiệm</td></tr>
                  <tr><td class="${td}"><strong>Production</strong></td><td class="${td}">Tất cả người dùng</td><td class="${td}">Đầy đủ</td><td class="${td}">Phát hành chính thức</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      `
    },
    {
      id: "build-naming",
      num: "02",
      badge: "Versioning",
      title: "Đặt Tên Build: versionCode, versionName & Release Name",
      desc: "Ba thứ đều gọi là \"tên build\" nhưng quy tắc khác nhau: cái nào được trùng, cái nào không, chuẩn SemVer, công thức versionCode và gắn Git tag trước Go-live.",
      content: `
        <div class="space-y-8">
          ${header("02", "Versioning", "Đặt Tên Build: versionCode, versionName & Release Name", "\"Tên build\" trên Android và Play Console gồm các thành phần kỹ thuật hoàn toàn khác nhau. Hiểu đúng để không bị Console từ chối upload và không tự khóa mình vào một dãy số khó quản lý.")}

          <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
            <p class="text-emerald-700 dark:text-emerald-300 text-sm font-bold"><i class="fa-solid fa-circle-check mr-1"></i> Ý chính</p>
            <ul class="list-disc pl-5 space-y-1.5 text-emerald-700 dark:text-emerald-300 text-sm">
              <li><strong>versionCode:</strong> không bao giờ được trùng, mỗi lần upload phải tăng.</li>
              <li><strong>versionName</strong> và <strong>Release name:</strong> trùng thoải mái, chỉ để hiển thị.</li>
              <li>App mới: <code class="${inlineCode}">versionCode = 1</code>, <code class="${inlineCode}">versionName = "1.0.0"</code>, Release name <code class="${inlineCode}">1.0.0 (1)</code>. Mỗi lần build lại chỉ cần tăng versionCode.</li>
            </ul>
          </div>

          <section class="space-y-4">
            ${sectionTitle(1, "Thành phần nào được đặt trùng?")}
            <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/50">
              <table class="w-full text-sm bg-white dark:bg-slate-800/30">
                <thead class="bg-slate-50 dark:bg-slate-800/60">
                  <tr>
                    <th class="${th}">Thành phần</th>
                    <th class="${th}">Được trùng?</th>
                    <th class="${th}">Bản chất &amp; quy định của Google Play</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="${td}"><code class="${inlineCode}">versionCode</code></td>
                    <td class="${td}"><strong class="text-red-600 dark:text-red-400">Không</strong></td>
                    <td class="${td}">Số nguyên dương, Google Play dùng để so sánh bản nào mới hơn. Mỗi file <code class="${inlineCode}">.aab</code> upload lên Console (Internal, Closed hay Production đều vậy) phải có versionCode <strong>chưa từng dùng</strong>, kể cả bản đã xóa khỏi draft. Trên thực tế luôn phải <strong>tăng dần</strong>, vì thiết bị chỉ cập nhật lên bản có versionCode lớn hơn bản đang cài.</td>
                  </tr>
                  <tr>
                    <td class="${td}"><code class="${inlineCode}">versionName</code></td>
                    <td class="${td}"><strong class="text-emerald-600 dark:text-emerald-400">Được</strong></td>
                    <td class="${td}">Chuỗi hiển thị cho người dùng trên Play Store và trong App info (ví dụ <code class="${inlineCode}">1.0.0</code>). Có thể giữ nguyên <code class="${inlineCode}">1.0.0</code> qua nhiều lần upload fix lỗi nội bộ, miễn mỗi lần đều tăng versionCode.</td>
                  </tr>
                  <tr>
                    <td class="${td}"><strong>Release name</strong> (trên Play Console)</td>
                    <td class="${td}"><strong class="text-emerald-600 dark:text-emerald-400">Được</strong></td>
                    <td class="${td}">Tên của một lần phát hành trên giao diện Console, mặc định tự sinh dạng <code class="${inlineCode}">1.0.0 (12)</code> = versionName (versionCode). Đổi tùy ý để phân biệt các đợt phát hành nội bộ; người dùng không thấy.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="${card}">
              <p class="${text}">Cả hai giá trị khai báo trong <code class="${inlineCode}">build.gradle.kts</code> của module app:</p>
              <pre class="${code}"><code>android {
    defaultConfig {
        versionCode = 15        // số nội bộ, luôn tăng
        versionName = "1.0.0"   // tên hiển thị, được trùng
    }
}</code></pre>
            </div>
            <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p class="text-amber-700 dark:text-amber-300 text-sm"><i class="fa-solid fa-lightbulb mr-1"></i> <strong>versionCode dùng chung cho mọi track:</strong> mọi file <code class="${inlineCode}">.aab</code> đã upload nằm chung một kho (<strong>App bundle explorer</strong>), không tách theo track. Đã upload <code class="${inlineCode}">versionCode = 1</code> lên Internal testing thì không build một file khác cũng mang số <code class="${inlineCode}">1</code> để upload lên Closed testing được; phải tăng lên <code class="${inlineCode}">2</code>, hoặc dùng lại đúng file cũ (xem bài 03). versionName và Release name thì trùng giữa các track thoải mái.</p>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(2, "Áp dụng Semantic Versioning cho versionName")}
            <div class="${card}">
              <p class="${text}">Định dạng chuẩn <code class="${inlineCode}">MAJOR.MINOR.PATCH</code>, ví dụ <code class="${inlineCode}">1.0.0</code>:</p>
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li><strong>MAJOR:</strong> thay đổi lớn, đổi luồng hoặc kiến trúc không tương thích ngược.</li>
                <li><strong>MINOR:</strong> thêm tính năng mới nhưng vẫn tương thích ngược.</li>
                <li><strong>PATCH:</strong> sửa lỗi nhỏ, hotfix, tối ưu hiệu năng.</li>
              </ul>
            </div>
            <div class="${card}">
              <p class="${text}"><strong>Làm sạch hậu tố trước khi lên Production:</strong></p>
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li>Bản test nội bộ có thể đặt <code class="${inlineCode}">1.0.0-beta01</code>, <code class="${inlineCode}">1.0.0-rc01</code> để dễ phân biệt.</li>
                <li>Bản Production nên bỏ hết hậu tố thử nghiệm, chỉ để <code class="${inlineCode}">1.0.0</code>. Người dùng phổ thông thấy <code class="${inlineCode}">-beta</code> hay <code class="${inlineCode}">-rc</code> sẽ có cảm giác app chưa hoàn thiện.</li>
                <li>Quy tắc này chỉ áp dụng cho <strong>versionName</strong> (người dùng thấy). Gắn hậu tố vào <strong>Release name</strong> trên Console thì để nguyên cũng không sao, vì chỉ team mới thấy.</li>
              </ul>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(3, "Đánh số versionCode: 2 cách")}
            <div class="grid gap-3 sm:grid-cols-2">
              <div class="${card}">
                <p class="text-sm font-bold text-slate-900 dark:text-white"><i class="fa-solid fa-star text-emerald-500 mr-1"></i> Cách 1: Tăng dần 1, 2, 3... (khuyên dùng)</p>
                <ul class="list-disc pl-5 space-y-1.5 ${text}">
                  <li>Bắt đầu từ <code class="${inlineCode}">1</code>, mỗi lần upload tăng thêm 1.</li>
                  <li>Đơn giản nhất, không cần tính toán, phù hợp app mới.</li>
                </ul>
              </div>
              <div class="${card}">
                <p class="text-sm font-bold text-slate-900 dark:text-white"><i class="fa-solid fa-calculator text-sky-500 mr-1"></i> Cách 2: Tính theo versionName</p>
                <ul class="list-disc pl-5 space-y-1.5 ${text}">
                  <li>Nhìn versionCode là biết version: <code class="${inlineCode}">1.2.3</code> build 2 &rarr; <code class="${inlineCode}">1020302</code>.</li>
                  <li>Cần chừa số <strong>BUILD</strong> để build lại nhiều lần cho cùng một version.</li>
                </ul>
              </div>
            </div>
            <div class="${card}">
              <p class="${text}"><strong>Công thức cho cách 2</strong>, tính luôn trong Gradle:</p>
              <pre class="${code}"><code>val major = 1
val minor = 2
val patch = 3
val build = 2

android {
    defaultConfig {
        // 1.2.3 build 2 -&gt; 1020302
        versionCode = major * 1_000_000 + minor * 10_000 + patch * 100 + build
        versionName = "$major.$minor.$patch"
    }
}</code></pre>
            </div>
            <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p class="text-amber-700 dark:text-amber-300 text-sm"><i class="fa-solid fa-lightbulb mr-1"></i> <strong>Đổi cách sau được không?</strong> Từ cách 1 sang cách 2 thì được: versionCode được nhảy lên (ví dụ 5 &rarr; 1000100), chỉ không được đi xuống. Từ cách 2 về cách 1 thì không. Giá trị tối đa là <code class="${inlineCode}">2100000000</code>.</p>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(4, "Thiết lập cho bản phát hành đầu tiên")}
            <div class="${card}">
              <p class="${text}"><strong>Trong <code class="${inlineCode}">build.gradle.kts</code>:</strong></p>
              <pre class="${code}"><code>android {
    defaultConfig {
        versionCode = 1         // build lại thì tăng lên 2, 3, 4...
        versionName = "1.0.0"   // giữ nguyên đến ngày Go-live
    }
}</code></pre>
              <p class="${text}">Nếu trong lúc Closed testing Google yêu cầu sửa lỗi, build lại <code class="${inlineCode}">.aab</code> với <code class="${inlineCode}">versionCode = 2</code> và vẫn giữ <code class="${inlineCode}">1.0.0</code>.</p>
            </div>
            <div class="${card}">
              <p class="${text}"><strong>Ô Release name trên Play Console:</strong></p>
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li><strong>Khuyên dùng:</strong> <code class="${inlineCode}">1.0.0 (1)</code>, tức versionName (versionCode). Build lại thì thành <code class="${inlineCode}">1.0.0 (2)</code>, <code class="${inlineCode}">1.0.0 (3)</code>, rất dễ theo dõi.</li>
                <li><strong>Hoặc theo cách gọi nội bộ:</strong> <code class="${inlineCode}">1.0.0-rc01</code>, <code class="${inlineCode}">1.0.0-beta01</code>. Dùng được, nhưng cách trên gọn và khớp với Console hơn.</li>
              </ul>
            </div>
            <div class="${card}">
              <p class="${text}"><strong>Ô Release notes</strong> (bắt buộc nhập, tester sẽ đọc). Bản đầu tiên chỉ cần:</p>
              <pre class="${code}"><code>- Bản phát hành đầu tiên phục vụ kiểm thử tính năng và duyệt ứng dụng.
- Initial release for closed testing and review.</code></pre>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(5, "Gắn Git tag cho build gửi review")}
            <div class="${card}">
              <p class="${text}">Mỗi khi chốt một build để gửi Google review cho Go-live, tạo Git tag trỏ đúng commit đó. Sau này dễ truy lại chính xác mã nguồn của bản đang chạy trên Store và tạo nhánh hotfix ngay khi cần.</p>
              <pre class="${code}"><code>git tag v1.0.0-build1
git push origin v1.0.0-build1

# Cần hotfix cho đúng bản đang live
git checkout -b hotfix/1.0.1 v1.0.0-build1</code></pre>
              <p class="${text}">Đặt tên tag gồm cả versionName và versionCode (<code class="${inlineCode}">build1</code>) để khớp 1-1 với dòng <strong>1.0.0 (1)</strong> trên Play Console.</p>
            </div>
          </section>
        </div>
      `
    },
    {
      id: "closed-testing-release",
      num: "03",
      badge: "Thực Hành",
      title: "Thực Hành: Tạo Release Trên Closed Testing",
      desc: "Đọc màn hình Closed testing khi có 2 track trùng tên Alpha, chọn track nào, rồi đi từng bước: tạo release, thêm tester, rollout để Google review. Dùng lại build Internal testing qua Add from library.",
      content: `
        <div class="space-y-8">
          ${header("03", "Thực Hành", "Thực Hành: Tạo Release Trên Closed Testing", "Đi theo màn hình thật của Play Console: từ danh sách Active tracks đến lúc bấm Start rollout để gửi build cho Google review.")}

          <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
            <p class="text-emerald-700 dark:text-emerald-300 text-sm font-bold"><i class="fa-solid fa-circle-check mr-1"></i> Ý chính</p>
            <ul class="list-disc pl-5 space-y-1.5 text-emerald-700 dark:text-emerald-300 text-sm">
              <li>Chỉ cần <strong>một</strong> closed track để gửi review; dùng track mặc định <strong>Closed testing - Alpha</strong>.</li>
              <li>Thứ tự: <strong>Manage track</strong> &rarr; <strong>Create new release</strong> &rarr; upload <code class="${inlineCode}">.aab</code> &rarr; thêm <strong>Testers</strong> &rarr; <strong>Start rollout to Closed testing</strong>.</li>
            </ul>
          </div>

          <section class="space-y-4">
            ${sectionTitle(1, "Đọc màn hình Closed testing")}
            <figure class="space-y-2">
              <img src="images/play-release/closed-testing-tracks.png" alt="Màn hình Closed testing trên Google Play Console với 2 active track: Closed testing - Closed testing - Alpha và Closed testing - Alpha, cả hai chưa có release" class="w-full rounded-xl border border-slate-200 dark:border-slate-700/50" loading="lazy">
              <figcaption class="text-xs text-slate-500 dark:text-slate-400 text-center">Test and release &rarr; Testing &rarr; Closed testing</figcaption>
            </figure>
            <div class="${card}">
              <p class="${text}">Mục <strong>Active tracks</strong> đang có 2 track, cả hai đều báo <em>"There is no release on this track"</em>:</p>
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li><strong>Closed testing - Alpha:</strong> track mặc định Play Console tạo sẵn (tên gốc là <code class="${inlineCode}">Alpha</code>).</li>
                <li><strong>Closed testing - Closed testing - Alpha:</strong> track tạo thêm qua nút <strong>Create track</strong>. Console tự gắn tiền tố <code class="${inlineCode}">Closed testing - </code> vào trước tên bạn nhập, nên đặt tên là "Closed testing - Alpha" sẽ ra tên lặp như vậy.</li>
              </ul>
              <p class="${text}">Hai track hoạt động độc lập (release, danh sách tester riêng). Chọn <strong>một</strong> track để dùng, không cần cả hai.</p>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(2, "Các bước tạo bản build gửi review")}
            <div class="${card}">
              <p class="${text}"><strong>Bước 1: Chọn track.</strong> Bấm <strong>Manage track</strong> bên phải dòng <strong>Closed testing - Alpha</strong>.</p>
            </div>
            <div class="${card}">
              <p class="${text}"><strong>Bước 2: Tạo release mới.</strong></p>
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li>Bấm <strong>Create new release</strong> ở góc trên bên phải.</li>
                <li>Kéo thả file <code class="${inlineCode}">.aab</code> vào khu vực upload.</li>
                <li><strong>Release name:</strong> Console tự điền theo dạng <code class="${inlineCode}">versionName (versionCode)</code>, ví dụ <code class="${inlineCode}">1.0.0 (1)</code>; sửa được tùy ý (xem bài 02).</li>
                <li><strong>Release notes:</strong> ghi chú thay đổi cho tester.</li>
              </ul>
            </div>
            <div class="${card}">
              <p class="${text}"><strong>Bước 3: Cấu hình tester.</strong></p>
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li>Quay lại trang quản lý track, chuyển sang tab <strong>Testers</strong>.</li>
                <li><strong>Create email list</strong> (hoặc chọn list có sẵn) và thêm ít nhất một email, ví dụ email của chính bạn.</li>
                <li>Nếu Console báo thiếu phạm vi phát hành, vào tab <strong>Countries / regions</strong> và chọn ít nhất một quốc gia.</li>
              </ul>
            </div>
            <div class="${card}">
              <p class="${text}"><strong>Bước 4: Kiểm tra và rollout.</strong></p>
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li>Bấm <strong>Next</strong> / <strong>Review release</strong>.</li>
                <li>Đọc kỹ các cảnh báo (warning có thể bỏ qua, error thì phải sửa mới đi tiếp được).</li>
                <li>Bấm <strong>Start rollout to Closed testing</strong> để gửi build cho Google review. Theo dõi trạng thái ở <strong>Publishing overview</strong>.</li>
              </ul>
            </div>
            <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p class="text-amber-700 dark:text-amber-300 text-sm"><i class="fa-solid fa-lightbulb mr-1"></i> <strong>Sau khi được duyệt:</strong> tester phải mở <strong>link opt-in</strong> trong tab Testers, bấm tham gia bằng đúng tài khoản Google trong email list, rồi mới thấy và cài được app trên Play Store.</p>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(3, "Dùng lại build từ Internal testing, không cần build lại")}
            <div class="${card}">
              <p class="${text}">Đã có một build chạy ổn trên Internal testing và muốn gửi <strong>đúng build đó</strong> sang Closed testing để Google duyệt? Không cần build lại trong Android Studio, không cần tăng versionCode.</p>
              <ol class="list-decimal pl-5 space-y-1.5 ${text}">
                <li>Vào track Closed testing &rarr; <strong>Create new release</strong>.</li>
                <li>Thay vì upload file, bấm <strong>Add from library</strong>.</li>
                <li>Chọn file <code class="${inlineCode}">.aab</code> đang dùng ở Internal testing &rarr; <strong>Add to release</strong>, rồi làm tiếp các bước như trên.</li>
              </ol>
              <p class="${text}">Cách khác: ở trang release của Internal testing, dùng <strong>Promote release</strong> để đẩy thẳng release đó sang Closed testing.</p>
            </div>
            <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p class="text-amber-700 dark:text-amber-300 text-sm"><i class="fa-solid fa-lightbulb mr-1"></i> <strong>Lợi ích:</strong> bản Google duyệt chính là bản QC đã test, không lo lệch code giữa hai lần build.</p>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(4, "Dọn track tạo thừa (tùy chọn)")}
            <div class="${card}">
              <p class="${text}">Track <strong>Closed testing - Closed testing - Alpha</strong> không gây hại gì, chỉ làm danh sách rối. Play Console không có nút xóa track; nếu muốn ẩn khỏi luồng làm việc thì vào <strong>Manage track</strong> của track đó và dùng tùy chọn <strong>Pause track</strong>.</p>
            </div>
            <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p class="text-amber-700 dark:text-amber-300 text-sm"><i class="fa-solid fa-lightbulb mr-1"></i> <strong>Lưu ý khi tạo track mới:</strong> chỉ nhập phần tên riêng (ví dụ <code class="${inlineCode}">QC</code>, <code class="${inlineCode}">Partner</code>), không gõ lại "Closed testing", để tránh tên bị lặp.</p>
            </div>
          </section>
        </div>
      `
    }
  ]
};
