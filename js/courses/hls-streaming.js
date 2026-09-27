// js/courses/hls-streaming.js
window.coursesRepository = window.coursesRepository || [];

window.coursesRepository.push({
  id: "hls-streaming-deep-dive",
  title: "HTTP Live Streaming (HLS) Deep Dive",
  category: "Media & Streaming",
  icon: "fa-video",
  color: "from-amber-500 to-rose-600",
  badge: "Streaming",
  description: "Giải phẫu toàn diện giao thức Apple HLS: Cơ chế cắt lát I-Frame, phân tích .ts vs .m4s (fMP4), đột phá giảm trễ LL-HLS, nghệ thuật Playlist (VOD/Live/DVR, Demuxed Streams, SSAI Discontinuity) và DRM phần cứng.",
  lessons: [
    {
      id: "hls-architecture-segmentation",
      num: "01",
      badge: "Architecture",
      title: "Bản Chất Phân Đoạn IDR-Frame, Port 80/443 & Container .ts vs .m4s",
      desc: "Quy tắc cắt lát I-Frame/IDR, vai trò của GOP, so sánh Container .ts vs .m4s và ưu thế cổng 80/443 qua hạ tầng CDN.",
      content: `
        <div class="space-y-8">
          <div class="border-b border-slate-200 dark:border-slate-800 pb-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-mono font-bold">Chuyên Đề 01</span>
              <span class="px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-mono font-bold">Architecture & Packaging</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Bản Chất Phân Đoạn IDR-Frame, Port 80/443 & Container .ts vs .m4s
            </h2>
            <p class="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">
              Bản chất chuyển đổi video stream thành các đoạn tĩnh độc lập (2s–10s) phân phối qua HTTP thông thường, cơ chế lập chỉ mục hai tầng và nguyên lý tối ưu hóa hạ tầng CDN.
            </p>
          </div>

          <section class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center text-xs font-bold">1</span>
              Cơ Chế Phân Đoạn & Ranh Giới Keyframe (IDR-Frame)
            </h3>
            <ul class="text-sm text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed list-disc pl-5">
              <li><strong>Bản chất:</strong> Luồng video gốc được bộ nén (encoder) chia thành các khối GOP (Group of Pictures) có độ dài cố định.</li>
              <li><strong>Ranh giới IDR-Frame (Instantaneous Decoder Refresh):</strong> Mọi phân đoạn (segment) bắt buộc phải bắt đầu bằng một I-frame độc lập. Điều này cho phép video decoder giải phóng bộ nhớ đệm khung hình cũ và giải mã ngay lập tức khi người xem tua (seek) hoặc chuyển đổi độ phân giải.</li>
              <li><strong>Phân phối qua Port 80/443:</strong> Sử dụng giao thức HTTP/HTTPS tiêu chuẩn, giúp luồng phát vượt qua 100% tường lửa (firewall) doanh nghiệp mà không cần mở các cổng streaming chuyên dụng như RTMP/RTSP.</li>
            </ul>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs mt-3">
              <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span class="text-slate-400 block mb-1 font-bold">// 1. Master Playlist (master.m3u8)</span>
                <span class="text-purple-600 dark:text-purple-400">#EXT-X-STREAM-INF:</span>BANDWIDTH=5000000,RESOLUTION=1920x1080<br/>
                <span class="text-sky-600 dark:text-sky-400">1080p/index.m3u8</span><br/>
                <span class="text-purple-600 dark:text-purple-400">#EXT-X-STREAM-INF:</span>BANDWIDTH=2500000,RESOLUTION=1280x720<br/>
                <span class="text-sky-600 dark:text-sky-400">720p/index.m3u8</span>
              </div>
              <div class="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span class="text-slate-400 block mb-1 font-bold">// 2. Media Playlist (1080p/index.m3u8)</span>
                <span class="text-purple-600 dark:text-purple-400">#EXT-X-TARGETDURATION:</span>6<br/>
                <span class="text-purple-600 dark:text-purple-400">#EXTINF:</span>6.000,<br/>
                <span class="text-emerald-600 dark:text-emerald-400">segment_001.m4s</span><br/>
                <span class="text-purple-600 dark:text-purple-400">#EXTINF:</span>6.000,<br/>
                <span class="text-emerald-600 dark:text-emerald-400">segment_002.m4s</span>
              </div>
            </div>
          </section>

          <section class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center text-xs font-bold">2</span>
              So Sánh Container: MPEG-2 TS (.ts) vs Fragmented MP4 (.m4s)
            </h3>
            <div class="overflow-x-auto custom-scroll border border-slate-200 dark:border-slate-800 rounded-xl">
              <table class="w-full text-left text-xs">
                <thead class="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th class="p-3">Đặc Tính</th>
                    <th class="p-3">MPEG-2 TS (.ts)</th>
                    <th class="p-3">Fragmented MP4 (.m4s / fMP4)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                  <tr>
                    <td class="p-3 font-bold">Tổ chức Metadata</td>
                    <td class="p-3">Lặp lại header/metadata trong từng phân đoạn</td>
                    <td class="p-3 text-emerald-500 font-semibold">Tách riêng init.mp4 (moov) và chunks (moof + mdat)</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-bold">Overhead Băng Thông</td>
                    <td class="p-3 text-rose-500 font-semibold">Cao (tốn thêm ~2-5% dung lượng cho header)</td>
                    <td class="p-3 text-emerald-500 font-semibold">Cực thấp, dữ liệu payload thuần khiết</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-bold">Khả năng tái sử dụng</td>
                    <td class="p-3">Chỉ dùng hiệu quả trên hệ sinh thái HLS cổ điển</td>
                    <td class="p-3 text-sky-500 font-semibold">Chia sẻ chung 1 kho file tĩnh cho cả HLS & MPEG-DASH</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center text-xs font-bold">3</span>
              Chiến Lược Codec: H.264 (AVC) vs H.265 (HEVC) Trên Android
            </h3>
            <ul class="text-sm text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed list-disc pl-5">
              <li><strong>H.265 (HEVC):</strong> Tiết kiệm <strong>40% – 50%</strong> băng thông ở cùng mức chất lượng so với H.264. Tuy nhiên, đòi hỏi thiết bị phải có chip hỗ trợ giải mã phần cứng (Hardware Decoder) để tránh nghẽn CPU và quá nhiệt.</li>
              <li><strong>Khuyến nghị Android:</strong> Tận dụng Hardware Decoder từ <strong>Android 8.0 (API 26+)</strong>. Sử dụng H.265 cho các biến thể 1080p/4K để tiết kiệm 4G/5G, duy trì luồng fallback 480p/720p dùng H.264 cho các thiết bị đời thấp.</li>
            </ul>
          </section>
        </div>
      `
    },
    {
      id: "player-mechanics-latency",
      num: "02",
      badge: "Runtime Engine",
      title: "Cơ Chế Trình Phát, Low-Latency HLS & Điều Phối ABR",
      desc: "Double Buffering, PTS Matching, nguyên nhân gây trễ 10-30s và cơ chế 1-3s của LL-HLS.",
      content: `
        <div class="space-y-8">
          <div class="border-b border-slate-200 dark:border-slate-800 pb-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 text-xs font-mono font-bold">Chuyên Đề 02</span>
              <span class="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">Player Engine & Latency</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Cơ Chế Trình Phát, Đột Phá Low-Latency HLS & Điều Phối ABR
            </h2>
            <p class="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">
              Cách player ghép nối các file rời rạc thành dòng dữ liệu liên tục, giải phẫu nguyên nhân trễ lớn và cơ chế kỹ thuật giúp LL-HLS đạt độ trễ 1–3s mà vẫn tận dụng được CDN.
            </p>
          </div>

          <section class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center text-xs font-bold">1</span>
              Cách Trình Phát Ghép Phân Đoạn Liền Mạch (Seamless Playback)
            </h3>
            <ul class="text-sm text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed list-disc pl-5">
              <li><strong>Double Buffering:</strong> Trong khi giải mã và hiển thị phân đoạn hiện tại trên màn hình, tiến trình nền của Player đã tải trước từ 2–3 phân đoạn kế tiếp vào bộ nhớ đệm RAM.</li>
              <li><strong>Khớp Presentation Time Stamp (PTS):</strong> Mỗi khung hình đều mang nhãn PTS nội tại. Player đẩy các bitstream vào chung một decoder pipeline, phần cứng giải mã tuần tự dựa trên trục thời gian này mà không quan tâm các frame thuộc file vật lý nào.</li>
            </ul>
          </section>

          <section class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center text-xs font-bold">2</span>
              Độ Trễ & Giải Pháp Low-Latency HLS (LL-HLS)
            </h3>
            <div class="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-xl text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <strong class="text-rose-700 dark:text-rose-300 text-sm font-bold block">Nguyên nhân trễ (10–30s) ở HLS truyền thống:</strong>
              <p>Do server phải tạo đủ phân đoạn lớn (thường là 6s) mới ghi vào file playlist và client phải gom tối thiểu 3 phân đoạn vào bộ đệm an toàn trước khi hiển thị (3 đoạn × 6s = 18s cộng trễ mạng).</p>
            </div>

            <div class="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xl text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <strong class="text-emerald-700 dark:text-emerald-300 text-sm font-bold block">Cơ chế LL-HLS rút ngắn độ trễ về 1–3s:</strong>
              <ul class="list-disc pl-5 space-y-1.5">
                <li><strong>Partial Segments (Part):</strong> Cắt nhỏ phân đoạn thành các <code>Part</code> fMP4 chỉ dài <strong>200–500ms</strong>. Vừa encode xong part nào là có thể phát hành ngay lập tức.</li>
                <li><strong>HTTP/2 Chunked Transfer:</strong> Stream trực tiếp các part vừa sinh ra về client qua một kết nối HTTP/2 duy nhất mà không cần đợi đóng gói hoàn tất cả file lớn.</li>
                <li><strong>Pre-load Hints:</strong> Sử dụng thẻ <code>#EXT-X-PRELOAD-HINT</code> trong playlist để báo trước URL của part sắp xuất hiện, giúp Client chủ động gửi request kéo dữ liệu ngay thời điểm server phát hành.</li>
              </ul>
            </div>
          </section>

          <section class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xs font-bold">3</span>
              Thuật Toán Thích Ứng Băng Thông (ABR Dynamics)
            </h3>
            <div class="p-4 bg-slate-900 rounded-xl font-mono text-xs text-slate-200 border border-slate-800 space-y-2">
              <p><strong>• Throughput-based:</strong> Đo tốc độ tải về thực tế của phân đoạn gần nhất. Dễ bị dao động giả khi mạng di động (4G/5G) chập chờn.</p>
              <p><strong>• Buffer-based:</strong> Đo lượng video dự trữ trong RAM. Nếu buffer dồi dào (>15s), player kiên trì giữ độ phân giải cao; nếu buffer nguy hiểm (&lt;3s), lập tức hạ bitrate để cứu luồng phát không bị xoay tròn (rebuffering).</p>
            </div>
          </section>
        </div>
      `
    },
    {
      id: "hls-advanced-playlist-security",
      num: "03",
      badge: "Enterprise Ops",
      title: "Playlist Nâng Cao, Bảo Mật DRM Phần Cứng & Caching CDN",
      desc: "VOD vs Live vs Event DVR, cờ #EXT-X-DISCONTINUITY, Demuxed Streams, AES-128 vs DRM CENC và Cache-Control.",
      content: `
        <div class="space-y-8">
          <div class="border-b border-slate-200 dark:border-slate-800 pb-6">
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-mono font-bold">Chuyên Đề 03</span>
              <span class="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-mono font-bold">Security & Production Ops</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Playlist Chuyên Sâu, Vận Hành Nâng Cao & Bảo Mật DRM
            </h2>
            <p class="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">
              Các kỹ thuật vận hành quy mô lớn: Phân loại Playlist, chèn quảng cáo SSAI qua Discontinuity, tách kênh âm thanh, bảo mật luồng cấp Studio và thiết lập Cache Policy.
            </p>
          </div>

          <section class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-xs font-bold">1</span>
              Chuyên Sâu: Playlist & Vận Hành Nâng Cao
            </h3>

            <div class="space-y-3">
              <h4 class="text-sm font-bold text-slate-900 dark:text-white">VOD vs Live Playlist:</h4>
              <ul class="text-sm text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed list-disc pl-5">
                <li><strong>VOD (Video on Demand):</strong> Danh sách cố định chứa toàn bộ phân đoạn từ đầu đến cuối, kết thúc bằng thẻ <code>#EXT-X-ENDLIST</code>. Client tải manifest một lần duy nhất.</li>
                <li><strong>Live (Sliding Window):</strong> Không có <code>#EXT-X-ENDLIST</code>. Danh sách liên tục đẩy phân đoạn mới vào cuối và gạt bỏ phân đoạn cũ ở đầu (giữ 3–5 đoạn mới nhất); client phải liên tục gửi request thăm dò (polling) để lấy dữ liệu mới.</li>
                <li><strong>Event Playlist (<code>#EXT-X-PLAYLIST-TYPE:EVENT</code>):</strong> Phân đoạn mới liên tục bổ sung nhưng không xóa các đoạn cũ, hỗ trợ tính năng xem lại từ đầu (DVR Playback).</li>
              </ul>
            </div>

            <div class="p-4 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40 rounded-xl text-xs text-slate-700 dark:text-slate-300 space-y-1.5 mt-2">
              <strong class="text-purple-700 dark:text-purple-300 text-sm font-bold block">Thẻ #EXT-X-DISCONTINUITY:</strong>
              <p>Báo hiệu sự thay đổi đột ngột về codec, tỉ lệ khung hình (aspect ratio) hoặc thời điểm reset timecode (thường gặp khi chèn quảng cáo Mid-roll hoặc đổi nguồn phát), giúp Player reset bộ giải mã mà không bị lỗi crash/vỡ hình.</p>
            </div>

            <div class="p-4 bg-sky-50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900/40 rounded-xl text-xs text-slate-700 dark:text-slate-300 space-y-1.5 mt-2">
              <strong class="text-sky-700 dark:text-sky-300 text-sm font-bold block">Tách rời luồng Video & Audio (Demuxed Streams):</strong>
              <p>Sử dụng thẻ <code>#EXT-X-MEDIA:TYPE=AUDIO</code> để kết hợp linh hoạt 1 luồng âm thanh duy nhất với nhiều biến thể độ phân giải khác nhau, hoặc phục vụ đa ngôn ngữ mà không cần nhân bản dữ liệu hình ảnh, giúp tiết kiệm dung lượng lưu trữ server cấp số nhân.</p>
            </div>
          </section>

          <section class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center text-xs font-bold">2</span>
              Bảo Mật Nội Dung: AES-128 vs Chuẩn DRM Cấp Studio (Widevine)
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <span class="text-amber-500 font-bold block text-sm">// Mã Hóa AES-128 (#EXT-X-KEY)</span>
                <p class="font-sans text-slate-600 dark:text-slate-300">Khóa đối xứng 16-byte được gửi trực tiếp về app qua URL HTTP. Khóa tồn tại trong RAM thông thường, chỉ phòng chống việc bắt trộm link tải lén sơ cấp; dễ bị bẻ khóa trên thiết bị rooted/jailbreak.</p>
              </div>
              <div class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <span class="text-emerald-500 font-bold block text-sm">// Chuẩn DRM CENC (Widevine / FairPlay)</span>
                <p class="font-sans text-slate-600 dark:text-slate-300">Áp dụng mã hóa mẫu <code>SAMPLE-AES</code>. Khóa giải mã được bơm trực tiếp vào môi trường thực thi phần cứng an toàn (<strong>Hardware TEE / TrustZone</strong>). Cả App và Android OS đều không chạm được frame thô, ngăn chặn triệt để hành vi quay màn hình hoặc rip stream.</p>
              </div>
            </div>
          </section>

          <section class="space-y-4">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xs font-bold">3</span>
              Chiến Lược Caching Trên Hạ Tầng Mạng Phân Phối (CDN)
            </h3>
            <div class="p-4 bg-slate-900 rounded-xl font-mono text-xs text-slate-300 space-y-2">
              <span class="text-purple-400">// 1. File Playlist Trực Tiếp (.m3u8 Live)</span><br/>
              <span class="text-sky-400">Cache-Control:</span> no-cache, no-store, max-age=1<br/>
              <span class="text-slate-500 text-[11px] font-sans block mb-2">Tránh lưu cache lâu khiến client không cập nhật được phân đoạn mới, dẫn đến đứng hình luồng phát.</span>

              <span class="text-purple-400">// 2. File Phân Đoạn Video Tĩnh (.ts / .m4s)</span><br/>
              <span class="text-sky-400">Cache-Control:</span> public, max-age=31536000, immutable<br/>
              <span class="text-slate-500 text-[11px] font-sans block">Dữ liệu bất biến một khi đã xuất bản. Giữ vĩnh viễn trên Edge Server để triệt tiêu tải cho Origin Server.</span>
            </div>
          </section>
        </div>
      `
    }
  ]
});