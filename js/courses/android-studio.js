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
  description: "Mẹo và cấu hình Android Studio giúp làm việc hằng ngày gọn gàng hơn: Git, IDE settings, công cụ debug.",
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
    }
  ]
};
