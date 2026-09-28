import { coroutinesCourse } from './lessons/coroutines.js';
import { roomCourse } from '../courses/room-database.js';
import { hlsStreamingCourse } from '../courses/hls-streaming.js';

export const coursesRepository = [
  {
    id: "coroutines-flow-core",
    title: "Coroutines & Flow Core Mechanics",
    category: "Concurrency",
    icon: "fa-bolt",
    color: "from-emerald-500 to-sky-600",
    badge: "Cốt Lõi",
    description: "Giải phẫu toàn diện biến đổi CPS, JVM bytecode, State Machine, Dispatchers, Exception Handling và Cold/Hot Flow.",
    lessons: [
      {
        id: "cps-decompile-jit",
        num: "01",
        badge: "Bytecode",
        title: "CPS, Decompile, JIT & COROUTINE_SUSPENDED",
        desc: "Continuation Passing Style, Virtual Program Counter, Liveness Analysis và hành vi JIT Optimizer.",
        content: `
          <div class="space-y-6">
            <div>
              <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Cơ chế JVM</span>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-2">1. CPS, Decompile, JIT & COROUTINE_SUSPENDED</h1>
              <p class="text-slate-400 text-sm mt-1">Phân tích sâu bản chất Suspend Function dưới góc độ Bytecode và JVM execution.</p>
            </div>
            
            <div class="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-3">
              <h3 class="font-bold text-emerald-400 text-base flex items-center gap-2"><i class="fa-solid fa-microchip"></i> Bản chất của Continuation Passing Style (CPS)</h3>
              <p class="text-slate-300 text-sm leading-relaxed">
                Trình biên dịch Kotlin biến đổi mọi <code>suspend</code> function bằng cách chèn thêm tham số ẩn <code>Continuation&lt;T&gt;</code> vào cuối danh sách tham số. Quá trình này được gọi là <strong>Continuation Passing Style Transformation</strong>.
              </p>
              <pre class="p-3 rounded-lg bg-slate-900 text-slate-200 text-xs overflow-x-auto"><code>// Kotlin source
suspend meow(): String

// Sau khi biên dịch sang Java Bytecode Signature:
Object meow(Continuation&lt;? super String&gt; $completion)</code></pre>
            </div>
          </div>
        `
      },
      {
        id: "state-machine-label",
        num: "02",
        badge: "Internal",
        title: "State Machine & Suspension Points",
        desc: "Cách compiler tạo lớp ContinuationImpl匿名, switch-case label và bảo lưu state qua khôi phục.",
        content: `
          <div class="space-y-6">
            <div>
              <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">State Machine</span>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-2">2. State Machine & Suspension Points</h1>
              <p class="text-slate-400 text-sm mt-1">Cơ chế quản lý trạng thái khi coroutine tạm ngưng và tiếp tục.</p>
            </div>
            <div class="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <p class="text-slate-300 text-sm">Mỗi điểm suspend tương ứng với một <code>label</code> trong bảng State Machine của phương thức được decompiled.</p>
            </div>
          </div>
        `
      }
    ]
  },
  {
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
        desc: "Cách Room sinh mã `_Impl`, quản lý SQLite OpenHelper và xử lý phức tạp với TypeConverters.",
        content: `
          <div class="space-y-6">
            <div>
              <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Database Internal</span>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-2">1. Room Architecture & Custom TypeConverters</h1>
              <p class="text-slate-400 text-sm mt-1">Sức mạnh của Annotation Processing (KSP) trong Room ORM.</p>
            </div>
            <div class="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-3">
              <h3 class="font-bold text-amber-400 text-base">TypeConverter Best Practices</h3>
              <p class="text-slate-300 text-sm">Hạn chế chuyển đổi JSON phức tạp bằng Gson/Moshi trong TypeConverter trên UI Thread để tránh nghẽn I/O.</p>
            </div>
          </div>
        `
      }
    ]
  }
];