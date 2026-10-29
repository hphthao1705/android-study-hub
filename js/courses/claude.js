const header = (num, tag, title, subtitle) => `
  <div class="border-b border-slate-200 dark:border-slate-800 pb-6">
    <div class="flex items-center gap-2 mb-3">
      <span class="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-mono font-bold">Chuyên Đề ${num}</span>
      <span class="px-2.5 py-1 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 text-xs font-mono font-bold">${tag}</span>
    </div>
    <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">${title}</h2>
    <p class="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">${subtitle}</p>
  </div>
`;

const card = "p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 space-y-3";
const text = "text-slate-700 dark:text-slate-300 text-sm leading-relaxed";

export const claudeCourse = {
  id: "claude",
  title: "Claude",
  category: "AI Tools",
  icon: "fa-robot",
  color: "from-amber-500 to-orange-500",
  badge: "Đang Cập Nhật",
  description: "Làm việc với Claude trong quy trình phát triển Android.",
  lessons: [
    {
      id: "claude-intro",
      num: "01",
      badge: "Intro",
      title: "Giới Thiệu Claude",
      desc: "Nội dung đang được cập nhật.",
      content: `
        <div class="space-y-8">
          ${header("01", "Intro", "Giới Thiệu Claude", "Nội dung bài học đang được cập nhật.")}

          <div class="${card}">
            <p class="${text}"><i class="fa-solid fa-pen-to-square mr-1"></i> Nội dung sẽ được bổ sung sau.</p>
          </div>
        </div>
      `
    }
  ]
};
