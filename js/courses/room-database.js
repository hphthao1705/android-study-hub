// js/courses/room-database.js
window.coursesRepository = window.coursesRepository || [];

window.coursesRepository.push({
  id: "room-database-deepdive",
  title: "Room Database Deep-dive & TypeConverters",
  category: "Local Storage",
  icon: "fa-database",
  color: "from-amber-500 to-rose-600",
  badge: "Storage",
  description: "Room annotation processing (KSP), SQLite threading, InvalidationTracker...",
  lessons: [
    {
      id: "ksp-vs-kapt-room",
      num: "01",
      badge: "Compiler & KSP",
      title: "KSP vs KAPT: Nút Thắt Stub Generation & Đột Phá Cho Room",
      desc: "Tại sao KSP thay thế hoàn toàn KAPT...",
      content: `
        <div class="space-y-8">
          <!-- HTML bài học ở đây -->
        </div>
      `
    }
    // Các bài học khác của Room viết tiếp ở đây...
  ]
});