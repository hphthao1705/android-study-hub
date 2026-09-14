// js/app.js
let currentCourseId = "coroutines-flow-core";
let currentLessonId = "cps-decompile-jit";
let searchQuery = "";

const homeView = document.getElementById("home-view");
const courseDetailView = document.getElementById("course-detail-view");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const navHomeBtn = document.getElementById("nav-home-btn");

function renderHomeView() {
  const courseGrid = document.getElementById("course-grid");
  if (!courseGrid) return;

  const courses = window.coursesRepository || [];
  const filteredCourses = courses.filter(c => {
    const q = searchQuery.toLowerCase();
    const matchTitle = c.title.toLowerCase().includes(q);
    const matchDesc = c.description.toLowerCase().includes(q);
    const matchLessons = c.lessons.some(l => l.title.toLowerCase().includes(q) || l.desc.toLowerCase().includes(q));
    return matchTitle || matchDesc || matchLessons;
  });

  if (filteredCourses.length === 0) {
    courseGrid.innerHTML = `
      <div class="col-span-full text-center py-12 text-slate-400">
        <i class="fa-solid fa-magnifying-glass text-3xl mb-3 text-slate-500"></i>
        <p class="text-sm font-semibold">Không tìm thấy khóa học hoặc bài giảng nào phù hợp</p>
      </div>
    `;
    return;
  }

  courseGrid.innerHTML = filteredCourses.map(course => `
    <div onclick="openCourse('${course.id}')" class="group bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:border-emerald-500/50 transition cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between">
      <div>
        <div class="flex items-start justify-between gap-3 mb-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr ${course.color} flex items-center justify-center text-white shadow-md shadow-emerald-500/10 group-hover:scale-105 transition shrink-0">
            <i class="fa-solid ${course.icon} text-base"></i>
          </div>
          <span class="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            ${course.lessons.length} Bài Học
          </span>
        </div>
        <span class="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-mono">${course.category}</span>
        <h3 class="font-bold text-slate-900 dark:text-white text-sm sm:text-base mt-1 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition">
          ${course.title}
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
          ${course.description}
        </p>
      </div>
      <div class="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <span class="text-[11px] font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
          Vào học ngay <i class="fa-solid fa-arrow-right text-[10px] text-emerald-500"></i>
        </span>
        <span class="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">${course.badge}</span>
      </div>
    </div>
  `).join("");
}

function handleSearch(val) {
  searchQuery = val.trim();
  renderHomeView();
}

function navigateToHome() {
  homeView.classList.remove("hidden");
  courseDetailView.classList.add("hidden");
  mobileMenuBtn.classList.add("hidden");
  navHomeBtn.classList.add("ring-2", "ring-emerald-500/40");
  renderHomeView();
}

function openCourse(courseId) {
  currentCourseId = courseId;
  const course = (window.coursesRepository || []).find(c => c.id === courseId);
  if (!course || course.lessons.length === 0) return;

  currentLessonId = course.lessons[0].id;
  homeView.classList.add("hidden");
  courseDetailView.classList.remove("hidden");
  mobileMenuBtn.classList.remove("hidden");
  navHomeBtn.classList.remove("ring-2", "ring-emerald-500/40");

  document.getElementById("current-course-title").innerText = course.title;
  document.getElementById("current-course-count").innerText = `${course.lessons.length} Bài`;

  renderSidebarLessons();
  renderLessonContent(currentLessonId);
}

function renderSidebarLessons() {
  const container = document.getElementById("lesson-list");
  const course = (window.coursesRepository || []).find(c => c.id === currentCourseId);
  if (!container || !course) return;

  container.innerHTML = course.lessons.map(lesson => {
    const isActive = lesson.id === currentLessonId;
    return `
      <button onclick="selectLesson('${lesson.id}')" class="w-full text-left p-3 rounded-xl transition flex flex-col gap-1 border ${
        isActive 
          ? 'bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/40 text-emerald-700 dark:text-emerald-300' 
          : 'bg-transparent border-transparent hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
      }">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-mono font-bold ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}">${lesson.num}</span>
          <span class="text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase ${
            isActive ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
          }">${lesson.badge}</span>
        </div>
        <h4 class="font-bold text-xs leading-snug line-clamp-2">${lesson.title}</h4>
      </button>
    `;
  }).join("");
}

function selectLesson(lessonId) {
  currentLessonId = lessonId;
  renderSidebarLessons();
  renderLessonContent(lessonId);

  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  sidebar.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
}

function renderLessonContent(lessonId) {
  const course = (window.coursesRepository || []).find(c => c.id === currentCourseId);
  const lesson = course ? course.lessons.find(l => l.id === lessonId) : null;
  const main = document.getElementById("article-container");
  if (main && lesson) {
    main.innerHTML = lesson.content;
  }
}

function toggleSidebarMobile() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  if (!sidebar || !overlay) return;
  const isClosed = sidebar.classList.contains("-translate-x-full");
  if (isClosed) {
    sidebar.classList.remove("-translate-x-full");
    overlay.classList.remove("hidden");
  } else {
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
  }
}

function toggleTheme() {
  const html = document.documentElement;
  const themeIcon = document.getElementById('theme-icon');
  const isDark = html.classList.contains('dark');
  if (isDark) {
    html.classList.remove('dark');
    themeIcon.className = 'fa-solid fa-moon text-sm text-slate-700';
  } else {
    html.classList.add('dark');
    themeIcon.className = 'fa-solid fa-sun text-sm text-amber-400';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderHomeView();
});