import { coursesRepository } from './data/courses-repository.js';

let currentCourseId = coursesRepository[0]?.id || "";
let currentLessonId = coursesRepository[0]?.lessons[0]?.id || "";
let searchQuery = "";

export function initApp() {
  setupEventListeners();
  renderHomeView();
}

function setupEventListeners() {
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderHomeView();
    });
  }

  const logoBtn = document.getElementById("nav-logo-btn");
  if (logoBtn) {
    logoBtn.addEventListener("click", navigateToHome);
  }

  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }

  // Lắng nghe nút 3 gạch ở Header
  const toggleBtn = document.getElementById("toggle-sidebar-btn") || document.getElementById("mobile-sidebar-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleSidebar);
  }
}

export function renderHomeView() {
  const homeView = document.getElementById("home-view");
  const detailView = document.getElementById("course-detail-view");
  if (!homeView || !detailView) return;

  homeView.classList.remove("hidden");
  detailView.classList.add("hidden");

  const grid = document.getElementById("courses-grid");
  if (!grid) return;

  const filteredCourses = coursesRepository.filter(c =>
    c.title.toLowerCase().includes(searchQuery) ||
    c.description.toLowerCase().includes(searchQuery) ||
    c.category.toLowerCase().includes(searchQuery)
  );

  grid.innerHTML = filteredCourses.map(course => `
    <div onclick="window.app.openCourse('${course.id}')" class="group relative rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer flex flex-col justify-between">
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white shadow-lg text-xl">
            <i class="fa-solid ${course.icon}"></i>
          </div>
          <span class="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">${course.badge}</span>
        </div>
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-indigo-400">${course.category}</span>
          <h3 class="text-lg font-bold text-slate-100 group-hover:text-indigo-300 transition-colors mt-1">${course.title}</h3>
          <p class="text-slate-400 text-sm mt-2 line-clamp-2">${course.description}</p>
        </div>
      </div>
      <div class="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span><i class="fa-solid fa-book-open mr-1"></i> ${course.lessons.length} Bài học</span>
        <span class="text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">Vào học <i class="fa-solid fa-chevron-right text-[10px]"></i></span>
      </div>
    </div>
  `).join('');
}

export function openCourse(courseId) {
  const course = coursesRepository.find(c => c.id === courseId);
  if (!course) return;

  currentCourseId = courseId;
  currentLessonId = course.lessons[0]?.id || "";

  document.getElementById("home-view")?.classList.add("hidden");
  document.getElementById("course-detail-view")?.classList.remove("hidden");

  renderSidebarLessons();
  selectLesson(currentLessonId);
}

export function renderSidebarLessons() {
  const course = coursesRepository.find(c => c.id === currentCourseId);
  const container = document.getElementById("sidebar-lessons-list");
  if (!course || !container) return;

  const titleElem = document.getElementById("sidebar-course-title");
  if (titleElem) titleElem.innerText = course.title;

  container.innerHTML = course.lessons.map(lesson => `
    <button onclick="window.app.selectLesson('${lesson.id}')" id="lesson-btn-${lesson.id}" class="w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 border ${lesson.id === currentLessonId ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-300' : 'border-transparent hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'}">
      <span class="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 mt-0.5">${lesson.num}</span>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-semibold truncate">${lesson.title}</p>
        <p class="text-xs text-slate-500 truncate mt-0.5">${lesson.badge}</p>
      </div>
    </button>
  `).join('');
}

export function selectLesson(lessonId) {
  currentLessonId = lessonId;
  const course = coursesRepository.find(c => c.id === currentCourseId);
  if (!course) return;

  const lesson = course.lessons.find(l => l.id === lessonId);
  const contentContainer = document.getElementById("lesson-content");
  if (!lesson || !contentContainer) return;

  renderSidebarLessons();
  contentContainer.innerHTML = lesson.content;
}

export function navigateToHome() {
  renderHomeView();
}

export function toggleTheme() {
  document.documentElement.classList.toggle("dark");
}

export function toggleSidebar() {
  const sidebar = document.getElementById("course-sidebar");
  if (!sidebar) return;

  // Toggle thu gọn sidebar bằng margin âm hoặc hidden
  sidebar.classList.toggle("-ml-80");
}

// Bind các hàm điều hướng vào object window.app
window.app = {
  openCourse,
  selectLesson,
  navigateToHome,
  toggleTheme,
  toggleSidebar
};

// Khởi chạy khi DOM sẵn sàng
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}