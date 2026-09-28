export const hlsStreamingCourse = {
  id: "hls-streaming-android",
  title: "HLS Streaming & Video Processing",
  category: "Media & Audio/Video",
  icon: "fa-play",
  color: "from-purple-500 to-indigo-600",
  badge: "Advanced",
  description: "Xử lý Media3 ExoPlayer, HLS Adaptive Bitrate Streaming, Video Trimming, Bitrate Compression & Frame Extraction.",
  lessons: [
    {
      id: "hls-abr-exoplayer",
      num: "01",
      badge: "Media3",
      title: "HLS Architecture & Adaptive Bitrate Streaming",
      desc: "Cách ExoPlayer parse Master Playlist (.m3u8), Chunklist và tự động điều chuyển chất lượng mạng với TrackSelection.",
      content: `
        <div class="space-y-6">
          <div>
            <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">Media Pipeline</span>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-2">1. HLS Architecture & Adaptive Bitrate Streaming</h1>
            <p class="text-slate-400 text-sm mt-1">Cơ chế phát luồng HTTP Live Streaming và tối ưu hóa Playback trên Android Media3.</p>
          </div>

          <div class="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-3">
            <h3 class="font-bold text-purple-400 text-base flex items-center gap-2">
              <i class="fa-solid fa-layer-group"></i> Master Playlist (.m3u8) & Media Segments
            </h3>
            <p class="text-slate-300 text-sm leading-relaxed">
              HLS chia nhỏ video thành các đoạn ngắn (MPEG-TS hoặc fMP4, thường từ 2 - 6 giây). Master Playlist đóng vai trò chỉ mục chứa danh sách các variant stream tương ứng với từng độ phân giải và bitrate khác nhau.
            </p>
            <pre class="p-3 rounded-lg bg-slate-900 text-slate-200 text-xs overflow-x-auto"><code>// Khởi tạo HlsMediaSource với AndroidX Media3
val mediaItem = MediaItem.fromUri("https://example.com/live/master.m3u8")
val mediaSource = HlsMediaSource.Factory(defaultDataSourceFactory)
    .setAllowChunklessPreparation(true)
    .createMediaSource(mediaItem)

player.setMediaSource(mediaSource)
player.prepare()</code></pre>
          </div>

          <div class="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-3">
            <h3 class="font-bold text-indigo-400 text-base">Adaptive Bitrate (ABR) Selection</h3>
            <p class="text-slate-300 text-sm">
              ExoPlayer liên tục đo đạc thông lượng mạng (BandwidthMeter) theo thời gian thực để chủ động switch giữa các variant playlist mà không gây giật/lag (buffering).
            </p>
          </div>
        </div>
      `
    },
    {
      id: "media3-transformer-compress",
      num: "02",
      badge: "Transformer",
      title: "Video Trimming & Bitrate Compression",
      desc: "Sử dụng AndroidX Media3 Transformer thay thế FFmpeg để cắt ghép video, chỉnh bitrate và trích xuất frame tối ưu hiệu năng.",
      content: `
        <div class="space-y-6">
          <div>
            <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">Video Processing</span>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-2">2. Video Trimming & Bitrate Compression</h1>
            <p class="text-slate-400 text-sm mt-1">Xử lý media native hiệu năng cao bằng Media3 Transformer API.</p>
          </div>

          <div class="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-3">
            <h3 class="font-bold text-purple-400 text-base flex items-center gap-2">
              <i class="fa-solid fa-scissors"></i> Chuyển đổi từ FFmpeg sang Media3 Transformer
            </h3>
            <p class="text-slate-300 text-sm leading-relaxed">
              Khác với FFmpeg sử dụng thông số <code>crf</code> (Constant Rate Factor), Media3 Transformer quản lý chất lượng qua việc đặt <code>target bitrate</code> cố định hoặc tùy chỉnh Encoder Factory.
            </p>
            <pre class="p-3 rounded-lg bg-slate-900 text-slate-200 text-xs overflow-x-auto"><code>// Cắt đoạn video (Trimming) & Export
val editedMediaItem = EditedMediaItem.Builder(MediaItem.fromUri(videoUri))
    .setRemoveAudio(false)
    .build()

val transformer = Transformer.Builder(context)
    .setVideoMimeType(MimeTypes.VIDEO_H264)
    .addListener(object : Transformer.Listener {
        override fun onCompleted(composition: Composition, exportResult: ExportResult) {
            // Processing done
        }
    })
    .build()

transformer.start(editedMediaItem, outputPath)</code></pre>
          </div>
        </div>
      `
    }
  ]
};