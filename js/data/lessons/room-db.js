export const roomCourse = {
  id: "room-database-senior",
  title: "Room Database & SQLite Architecture",
  category: "Persistence",
  icon: "fa-database",
  color: "from-amber-500 to-rose-600",
  badge: "Chuyên Sâu",
  description: "Tối ưu hóa Room, TypeConverters, Migration an toàn, Write-Ahead Logging (WAL) và multithreading access.",
  lessons: [
    {
      id: "room-sqlite-type-converter",
      num: "01",
      badge: "Architecture",
      title: "Room Architecture & Custom TypeConverters",
      desc: "Cách Room sinh mã _Impl, quản lý SQLite OpenHelper và xử lý phức tạp với TypeConverters.",
      content: `
        <div class="space-y-6">
          <div>
            <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Database Internal</span>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-2">1. Room Architecture & Custom TypeConverters</h1>
            <p class="text-slate-400 text-sm mt-1">Sức mạnh của Annotation Processing (KSP) trong Room ORM.</p>
          </div>
          <div class="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-3">
            <h3 class="font-bold text-amber-400 text-base">TypeConverter Best Practices</h3>
            <p class="text-slate-300 text-sm">Tránh parse JSON phức tạp bằng Gson/Moshi trong TypeConverter trực tiếp trên Main Thread để không làm nghẽn UI.</p>
          </div>
        </div>
      `
    }
  ]
};