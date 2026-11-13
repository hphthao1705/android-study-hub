const header = (num, tag, title, subtitle) => `
  <div class="border-b border-slate-200 dark:border-slate-800 pb-6">
    <div class="flex items-center gap-2 mb-3">
      <span class="px-2.5 py-1 rounded-md bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 text-xs font-mono font-bold">Chuyên Đề ${num}</span>
      <span class="px-2.5 py-1 rounded-md bg-lime-500/10 text-lime-600 dark:text-lime-400 border border-lime-500/20 text-xs font-mono font-bold">${tag}</span>
    </div>
    <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">${title}</h2>
    <p class="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">${subtitle}</p>
  </div>
`;

const sectionTitle = (num, title) => `
  <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
    <span class="w-6 h-6 shrink-0 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center text-xs font-bold">${num}</span>
    ${title}
  </h3>
`;

const card = "p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 space-y-3";
const text = "text-slate-700 dark:text-slate-300 text-sm leading-relaxed";
const code = "p-3 rounded-lg bg-slate-900 text-slate-200 text-xs overflow-x-auto";
const inlineCode = "px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-green-600 dark:text-green-300 text-xs";

export const androidStudioCourse = {
  id: "android-studio",
  title: "Android Studio",
  category: "Developer Tools",
  icon: "fa-screwdriver-wrench",
  color: "from-green-500 to-lime-500",
  badge: "Mẹo Hay",
  description: "Mẹo và cấu hình Android Studio giúp làm việc hằng ngày gọn gàng hơn: Git, GitHub CLI, IDE settings, công cụ debug.",
  lessons: [
    {
      id: "git-branch-cleanup",
      num: "01",
      badge: "Git",
      title: "Đồng Bộ & Dọn Dẹp Branch Git",
      desc: "Remote branch đã xóa trên GitHub/GitLab nhưng Android Studio vẫn hiển thị: bật fetch.prune và dọn branch local đã merge.",
      content: `
        <div class="space-y-8">
          ${header("01", "Git", "Đồng Bộ & Dọn Dẹp Branch Git Trong Android Studio", "Giữ danh sách branch trong Android Studio khớp với server và xóa các branch local không còn dùng.")}

          <section class="space-y-4">
            ${sectionTitle(1, "Vấn đề")}
            <div class="${card}">
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li>Nhánh <strong>Remote</strong> trên GitHub/GitLab đã xóa (thường sau khi merge PR) nhưng Android Studio <strong>vẫn hiển thị</strong> trong danh sách branch.</li>
                <li>Các phiên bản Android Studio mới <strong>không còn checkbox Prune</strong> trực tiếp trong <code class="${inlineCode}">Settings &rarr; Version Control &rarr; Git</code>.</li>
              </ul>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(2, "Giải pháp tốt nhất: Tự động Prune qua Git Config")}
            <div class="${card}">
              <p class="${text}">Chạy lệnh sau trong Terminal (<strong>chỉ cần cấu hình 1 lần duy nhất</strong>):</p>
              <pre class="${code}"><code>git config --global fetch.prune true</code></pre>
              <p class="${text}"><strong>Tác dụng:</strong> mỗi lần chọn <code class="${inlineCode}">Git &rarr; Fetch</code> trên thanh menu Android Studio, danh sách Remote Branch sẽ tự động đồng bộ sạch sẽ với server.</p>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(3, "Dọn dẹp thủ công bằng lệnh (khi cần)")}
            <div class="${card}">
              <p class="${text}"><strong>Xóa tracking branch remote đã mất:</strong></p>
              <pre class="${code}"><code>git fetch -p</code></pre>
            </div>
            <div class="${card}">
              <p class="${text}"><strong>Xóa các branch Local đã merge vào main/master:</strong></p>
              <pre class="${code}"><code>git branch --merged | grep -v "\\*" | grep -v -E "(main|master|develop)" | xargs -n 1 git branch -d</code></pre>
            </div>
          </section>
        </div>
      `
    },
    {
      id: "gh-cli-clone-private-repo",
      num: "02",
      badge: "GitHub CLI",
      title: "Clone Private Repo Bằng GitHub CLI (gh)",
      desc: "Cài gh trên Windows qua winget, đăng nhập bằng trình duyệt (không cần tự tạo PAT) và clone private repository.",
      content: `
        <div class="space-y-8">
          ${header("02", "GitHub CLI", "Clone Private Repository Với GitHub CLI (gh)", "Quy trình cài đặt, xác thực và dùng gh để clone private repo trên Windows.")}

          <section class="space-y-4">
            ${sectionTitle(1, "Cài đặt GitHub CLI trên Windows")}
            <div class="${card}">
              <p class="${text}">Mở PowerShell và cài tự động qua <code class="${inlineCode}">winget</code>:</p>
              <pre class="${code}"><code>winget install GitHub.cli</code></pre>
              <p class="${text}"><strong>Lưu ý:</strong> cài xong cần <strong>tắt hẳn và mở lại</strong> Terminal (hoặc IDE như Android Studio / VS Code) để hệ thống cập nhật biến môi trường <code class="${inlineCode}">PATH</code>.</p>
              <p class="${text}"><strong>Kiểm tra cài đặt:</strong></p>
              <pre class="${code}"><code>gh --version</code></pre>
              <p class="${text}"><strong>Xử lý nhanh nếu terminal chưa nhận lệnh:</strong> thêm đường dẫn tạm thời vào phiên làm việc hiện tại:</p>
              <pre class="${code}"><code>$env:Path += ";$env:ProgramFiles\\GitHub CLI"</code></pre>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(2, "Xác thực tài khoản GitHub (gh auth login)")}
            <div class="${card}">
              <p class="${text}">Đăng nhập nhanh qua trình duyệt, <strong>không cần tự tạo Personal Access Token (PAT)</strong> thủ công:</p>
              <pre class="${code}"><code>gh auth login -h github.com -p https -w</code></pre>
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li><code class="${inlineCode}">-h github.com</code>: chọn host GitHub.com.</li>
                <li><code class="${inlineCode}">-p https</code>: chọn giao thức HTTPS.</li>
                <li><code class="${inlineCode}">-w</code>: mở luồng đăng nhập qua Web Browser.</li>
              </ul>
            </div>
            <div class="${card}">
              <p class="${text}"><strong>Các bước thực hiện:</strong></p>
              <ol class="list-decimal pl-5 space-y-1.5 ${text}">
                <li>Terminal hiển thị mã xác thực 8 ký tự dạng <code class="${inlineCode}">XXXX-XXXX</code>. Copy mã này.</li>
                <li>Nhấn <strong>Enter</strong> để mở trang <code class="${inlineCode}">https://github.com/login/device</code> trên trình duyệt.</li>
                <li>Dán mã vào ô xác nhận &rarr; <strong>Continue</strong> &rarr; <strong>Authorize github</strong>.</li>
                <li>Kiểm tra trạng thái đăng nhập:</li>
              </ol>
              <pre class="${code}"><code>gh auth status</code></pre>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(3, "Clone repository về máy")}
            <div class="${card}">
              <p class="${text}">Di chuyển terminal đến <strong>thư mục cha</strong> nơi muốn lưu dự án (ví dụ <code class="${inlineCode}">D:\\</code>), rồi chạy:</p>
              <pre class="${code}"><code>gh repo clone &lt;ten-to-chuc-hoac-username&gt;/&lt;ten-repo&gt;</code></pre>
              <p class="${text}"><strong>Ví dụ:</strong></p>
              <pre class="${code}"><code>gh repo clone Ganbaru-Method/dailystrong-android</code></pre>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(4, "Mẹo & lưu ý quan trọng")}
            <div class="${card}">
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li><strong>Vị trí lưu thư mục:</strong> <code class="${inlineCode}">gh repo clone</code> tạo thư mục dự án mới ngay tại thư mục hiện hành của terminal. Tránh đứng bên trong một dự án Git khác khi chạy lệnh để không bị lồng repository (<em>nested repo</em>).</li>
                <li><strong>Lỡ clone nhầm chỗ?</strong> Di chuyển thư mục bằng PowerShell:</li>
              </ul>
              <pre class="${code}"><code>Move-Item -Path "ten-thu-muc-repo" -Destination "D:\\"</code></pre>
            </div>
          </section>
        </div>
      `
    }
  ]
};
