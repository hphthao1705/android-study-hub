const header = (num, tag, title, subtitle) => `
  <div class="border-b border-slate-200 dark:border-slate-800 pb-6">
    <div class="flex items-center gap-2 mb-3">
      <span class="px-2.5 py-1 rounded-md bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20 text-xs font-mono font-bold">Chuyên Đề ${num}</span>
      <span class="px-2.5 py-1 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 text-xs font-mono font-bold">${tag}</span>
    </div>
    <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">${title}</h2>
    <p class="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">${subtitle}</p>
  </div>
`;

const sectionTitle = (num, title) => `
  <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
    <span class="w-6 h-6 shrink-0 rounded-lg bg-pink-500/10 text-pink-500 flex items-center justify-center text-xs font-bold">${num}</span>
    ${title}
  </h3>
`;

const card = "p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 space-y-3";
const text = "text-slate-700 dark:text-slate-300 text-sm leading-relaxed";
const code = "p-3 rounded-lg bg-slate-900 text-slate-200 text-xs overflow-x-auto";
const inlineCode = "px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-pink-600 dark:text-pink-300 text-xs";
const th = "p-3 text-left font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700";
const td = "p-3 align-top text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800";

export const graphicsAssetsCourse = {
  id: "android-graphics-assets",
  title: "Android Graphics & Image Assets",
  category: "UI & Performance",
  icon: "fa-image",
  color: "from-pink-500 to-orange-500",
  badge: "Best Practice",
  description: "Quy tắc chọn Vector vs Raster, xử lý hình theo độ chi tiết, Density Buckets & quản lý bộ nhớ Bitmap, và quy chuẩn xuất ảnh Feed/Story cho Facebook & Instagram.",
  lessons: [
    {
      id: "asset-selection-rules",
      num: "01",
      badge: "Asset Types",
      title: "Phân Loại Assets: Vector vs Raster (Bitmap)",
      desc: "VectorDrawable, AnimatedVectorDrawable, Lottie vs WebP/PNG/JPEG/Nine-Patch: khi nào dùng loại nào và vì sao.",
      content: `
        <div class="space-y-8">
          ${header("01", "Asset Selection", "Phân Loại Assets: Vector vs Raster (Bitmap)", "Quy tắc chọn đúng loại đồ họa để tối ưu dung lượng APK, RAM và hiệu năng render.")}

          <section class="space-y-4">
            ${sectionTitle(1, "Vector Asset (Đồ họa Vector)")}
            <div class="${card}">
              <p class="${text}"><strong>Các dạng:</strong> VectorDrawable (<code class="${inlineCode}">.xml</code>), AnimatedVectorDrawable (<code class="${inlineCode}">.xml</code>), Lottie (<code class="${inlineCode}">.json</code>).</p>
              <p class="${text}"><strong>Khi nào dùng:</strong> Icon, logo, UI element đơn giản, hình 1–2 màu, nét vẽ đơn giản.</p>
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li>Dung lượng cực nhỏ (vài KB).</li>
                <li>Co giãn không giới hạn, không vỡ nét trên bất kỳ màn hình nào.</li>
                <li>Hỗ trợ <strong>Dynamic Tinting</strong>: đổi màu qua <code class="${inlineCode}">tint</code> trong Compose/XML mà không cần xuất thêm file.</li>
                <li>Tránh triệt để lỗi <strong>Out Of Memory (OOM)</strong> do không phải giải mã Bitmap lớn vào RAM.</li>
              </ul>
              <pre class="${code}"><code>// Compose: một file vector, nhiều màu theo theme
Icon(
    painter = painterResource(R.drawable.ic_heart),
    contentDescription = "Yêu thích",
    tint = MaterialTheme.colorScheme.primary
)

&lt;!-- XML View --&gt;
&lt;ImageView
    android:src="@drawable/ic_heart"
    app:tint="?attr/colorPrimary" /&gt;</code></pre>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(2, "Raster Asset / Bitmap (Đồ họa điểm ảnh)")}
            <div class="${card}">
              <p class="${text}"><strong>Các dạng:</strong> WebP (<code class="${inlineCode}">.webp</code>), PNG (<code class="${inlineCode}">.png</code>), JPEG (<code class="${inlineCode}">.jpg</code>), Nine-Patch (<code class="${inlineCode}">.9.png</code>).</p>
              <p class="${text}"><strong>Khi nào dùng:</strong> Hình chụp thực tế, illustration phức tạp, hình nhiều màu sắc / độ dốc màu chi tiết.</p>
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li><strong>Ưu tiên số 1:</strong> Luôn convert PNG/JPG sang <strong>WebP</strong> (nhẹ hơn khoảng 25–35% mà không giảm chất lượng cảm nhận). Android Studio hỗ trợ sẵn: chuột phải file &rarr; <em>Convert to WebP</em>.</li>
                <li><strong>Không</strong> chuyển ảnh chụp phức tạp sang Vector: CPU phải tính toán hàng nghìn đường <code class="${inlineCode}">path</code> mỗi lần vẽ, gây giật lag UI (jank).</li>
              </ul>
            </div>
          </section>

          <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <p class="text-amber-700 dark:text-amber-300 text-sm"><i class="fa-solid fa-lightbulb mr-1"></i> <strong>Câu hỏi phỏng vấn:</strong> "Vì sao không dùng VectorDrawable cho mọi thứ?" &rarr; Vector được rasterize lúc runtime; hình càng phức tạp thì chi phí CPU càng cao, trong khi Bitmap chỉ cần decode một lần và vẽ trực tiếp.</p>
          </div>
        </div>
      `
    },
    {
      id: "asset-detail-workflow",
      num: "02",
      badge: "Workflow",
      title: "Quy Trình Xử Lý Theo Độ Chi Tiết Của Hình",
      desc: "Hình đơn giản dùng VectorDrawable/ImageVector, hình phức tạp dùng WebP kèm resize và Coil/Glide.",
      content: `
        <div class="space-y-8">
          ${header("02", "Processing Workflow", "Quy Trình Xử Lý Theo Độ Chi Tiết Của Hình", "Bảng quyết định nhanh: chọn định dạng và kỹ thuật tối ưu dựa trên tính chất ít/nhiều chi tiết của hình.")}

          <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/50">
            <table class="w-full text-sm bg-white dark:bg-slate-800/30">
              <thead class="bg-slate-50 dark:bg-slate-800/60">
                <tr>
                  <th class="${th}">Loại hình</th>
                  <th class="${th}">Định dạng ưu tiên</th>
                  <th class="${th}">Kỹ thuật xử lý / Tối ưu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="${td}"><strong>Đơn giản / Ít chi tiết</strong><br/><em>Icon, Logo, Badges</em></td>
                  <td class="${td}"><code class="${inlineCode}">VectorDrawable</code> (.xml) / Compose <code class="${inlineCode}">ImageVector</code></td>
                  <td class="${td}">Export SVG &rarr; convert sang VectorDrawable. Đặt trong <code class="${inlineCode}">res/drawable</code>. Đổi màu linh hoạt bằng <code class="${inlineCode}">ColorFilter</code> / <code class="${inlineCode}">tint</code>.</td>
                </tr>
                <tr>
                  <td class="${td}"><strong>Phức tạp / Nhiều chi tiết</strong><br/><em>Photos, Banners, Artwork</em></td>
                  <td class="${td}"><code class="${inlineCode}">WebP</code></td>
                  <td class="${td}">Resize đúng kích thước hiển thị tối đa (không nhét ảnh 4K vào app). Đặt vào các thư mục density phù hợp. Dùng Coil/Glide để load &amp; cache.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <section class="space-y-4">
            ${sectionTitle(1, "Hình đơn giản: SVG → VectorDrawable")}
            <div class="${card}">
              <p class="${text}">Trong Android Studio: <em>File &rarr; New &rarr; Vector Asset &rarr; Local file (SVG)</em>. File sinh ra nằm trong <code class="${inlineCode}">res/drawable</code>, dùng chung cho mọi density.</p>
              <pre class="${code}"><code>Image(
    imageVector = ImageVector.vectorResource(R.drawable.ic_badge),
    contentDescription = null,
    colorFilter = ColorFilter.tint(Color.White)
)</code></pre>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(2, "Hình phức tạp: WebP + Coil")}
            <div class="${card}">
              <p class="${text}">Ảnh từ network hoặc ảnh lớn nên load qua thư viện có cache bộ nhớ/đĩa và tự downsample theo kích thước View/Composable, thay vì tự decode Bitmap.</p>
              <pre class="${code}"><code>AsyncImage(
    model = ImageRequest.Builder(LocalContext.current)
        .data(bannerUrl)
        .crossfade(true)
        .build(),
    contentDescription = "Banner",
    contentScale = ContentScale.Crop,
    modifier = Modifier.fillMaxWidth().height(180.dp)
)</code></pre>
            </div>
          </section>
        </div>
      `
    },
    {
      id: "density-memory",
      num: "03",
      badge: "Density & RAM",
      title: "Density Buckets & Quản Lý Bộ Nhớ Bitmap",
      desc: "Công thức dp → px, tỉ lệ mdpi → xxxhdpi, vì sao Bitmap phải chia theo density và lợi ích của App Bundle.",
      content: `
        <div class="space-y-8">
          ${header("03", "Density & Memory", "Density Buckets & Quản Lý Bộ Nhớ Bitmap", "Hiểu cách Android chọn tài nguyên theo mật độ màn hình để ảnh luôn sắc nét mà không lãng phí RAM.")}

          <section class="space-y-4">
            ${sectionTitle(1, "Mật độ màn hình & tỉ lệ quy đổi")}
            <div class="${card}">
              <p class="${text}">Công thức: <code class="${inlineCode}">Pixel = dp × (DPI / 160)</code></p>
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead>
                    <tr><th class="${th}">Bucket</th><th class="${th}">DPI</th><th class="${th}">Tỉ lệ</th><th class="${th}">Icon 24dp =</th></tr>
                  </thead>
                  <tbody>
                    <tr><td class="${td}"><code class="${inlineCode}">mdpi</code></td><td class="${td}">160</td><td class="${td}">1x</td><td class="${td}">24px</td></tr>
                    <tr><td class="${td}"><code class="${inlineCode}">hdpi</code></td><td class="${td}">240</td><td class="${td}">1.5x</td><td class="${td}">36px</td></tr>
                    <tr><td class="${td}"><code class="${inlineCode}">xhdpi</code></td><td class="${td}">320</td><td class="${td}">2x</td><td class="${td}">48px</td></tr>
                    <tr><td class="${td}"><code class="${inlineCode}">xxhdpi</code></td><td class="${td}">480</td><td class="${td}">3x</td><td class="${td}">72px</td></tr>
                    <tr><td class="${td}"><code class="${inlineCode}">xxxhdpi</code></td><td class="${td}">640</td><td class="${td}">4x</td><td class="${td}">96px</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(2, "Vì sao bắt buộc chia Density cho Bitmap?")}
            <div class="grid gap-3 sm:grid-cols-3">
              <div class="${card}">
                <h4 class="font-bold text-pink-600 dark:text-pink-400 text-sm"><i class="fa-solid fa-magnifying-glass-plus mr-1"></i> Tránh mờ / vỡ ảnh</h4>
                <p class="${text}">Ảnh nhỏ trên màn hình DPI cao sẽ bị upscale, gây nhòe.</p>
              </div>
              <div class="${card}">
                <h4 class="font-bold text-pink-600 dark:text-pink-400 text-sm"><i class="fa-solid fa-memory mr-1"></i> Tránh OOM &amp; tốn RAM</h4>
                <p class="${text}">Ảnh quá to trên màn hình DPI thấp tốn CPU/GPU để downscale và chiếm RAM vô ích.</p>
              </div>
              <div class="${card}">
                <h4 class="font-bold text-pink-600 dark:text-pink-400 text-sm"><i class="fa-solid fa-box mr-1"></i> App Bundle (.aab)</h4>
                <p class="${text}">Google Play chỉ tải đúng thư mục density của thiết bị, giảm tối đa kích thước tải về.</p>
              </div>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(3, "RAM thực tế của một Bitmap")}
            <div class="${card}">
              <p class="${text}">Dung lượng trong RAM không phụ thuộc vào kích thước file WebP/PNG mà vào số pixel sau khi decode: <code class="${inlineCode}">width × height × 4 bytes</code> (ARGB_8888). Một ảnh 4000×3000 chiếm khoảng <strong>48MB</strong> RAM dù file chỉ vài trăm KB.</p>
              <pre class="${code}"><code>res/
 ├─ drawable/            // VectorDrawable dùng chung
 ├─ drawable-mdpi/       // banner.webp  360×160
 ├─ drawable-xhdpi/      // banner.webp  720×320
 ├─ drawable-xxhdpi/     // banner.webp 1080×480
 └─ drawable-xxxhdpi/    // banner.webp 1440×640</code></pre>
            </div>
          </section>
        </div>
      `
    },
    {
      id: "social-export-feed-story",
      num: "04",
      badge: "Social Export",
      title: "Xuất Ảnh Đăng Facebook & Instagram: Feed vs Story",
      desc: "Story 9:16 dùng canvas nền đen để tránh gradient tự động của Meta; Feed giữ 1:1 chuẩn 1080×1080.",
      content: `
        <div class="space-y-8">
          ${header("04", "Social Export", "Xuất Ảnh Đăng Facebook & Instagram: Feed vs Story", "Chủ động kiểm soát tỉ lệ và nền ảnh khi share, thay vì để Meta tự xử lý và làm lộ góc bo.")}

          <section class="space-y-4">
            ${sectionTitle(1, "Bối cảnh & vấn đề")}
            <div class="${card}">
              <p class="${text}">Story (Facebook / Instagram) có tỉ lệ chuẩn <strong>9:16</strong>, thường là <code class="${inlineCode}">1080 × 1920 px</code>.</p>
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li>Khi đăng thẳng ảnh vuông (<strong>1:1</strong>) hoặc ảnh sai tỉ lệ lên Story, Meta tự phân tích màu ảnh rồi chèn <strong>gradient background</strong> vào phần trống.</li>
                <li>Nếu ảnh có <strong>bo góc</strong> hoặc đổ bóng, nền gradient này làm lộ rõ các góc bo, nhìn chắp vá và lệch khỏi giao diện của app.</li>
                <li><strong>Mục tiêu:</strong> tự gắn nền đen cố định khi xuất cho Story, và giữ đúng tỉ lệ, chất lượng khi xuất cho Feed.</li>
              </ul>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(2, "Quy tắc xuất ảnh")}
            <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/50">
              <table class="w-full text-sm bg-white dark:bg-slate-800/30">
                <thead class="bg-slate-50 dark:bg-slate-800/60">
                  <tr>
                    <th class="${th}">Vị trí đăng</th>
                    <th class="${th}">Tỉ lệ</th>
                    <th class="${th}">Độ phân giải</th>
                    <th class="${th}">Nền &amp; bo góc</th>
                    <th class="${th}">Định dạng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="${td}"><strong>Story</strong><br/><em>IG / FB Story</em></td>
                    <td class="${td}"><strong>9:16</strong></td>
                    <td class="${td}"><code class="${inlineCode}">1080 × 1920</code></td>
                    <td class="${td}">Nền đen <code class="${inlineCode}">#000000</code>, ảnh 1:1 đặt chính giữa. Giữ nguyên bo góc nếu có.</td>
                    <td class="${td}">PNG / JPG (quality 90–95%)</td>
                  </tr>
                  <tr>
                    <td class="${td}"><strong>Feed</strong><br/><em>IG / FB Feed</em></td>
                    <td class="${td}"><strong>1:1</strong></td>
                    <td class="${td}"><code class="${inlineCode}">1080 × 1080</code> (hoặc giữ gốc nếu ≥ 1080)</td>
                    <td class="${td}">Giữ nguyên 1:1, <strong>không</strong> thêm padding đen.</td>
                    <td class="${td}">PNG / JPG (quality 90–95%)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(3, "Story 9:16: Black Canvas")}
            <div class="${card}">
              <ol class="list-decimal pl-5 space-y-1.5 ${text}">
                <li><strong>Tạo canvas</strong> <code class="${inlineCode}">Bitmap</code> trống <code class="${inlineCode}">1080 × 1920 px</code>.</li>
                <li><strong>Fill nền đen tuyền</strong> <code class="${inlineCode}">#000000</code> (alpha 255). Nền đen trùng với theme mặc định của trình xem Story nên Meta không chèn gradient nữa.</li>
                <li><strong>Scale ảnh vuông</strong> về <code class="${inlineCode}">1080 × 1080</code> (chạm sát hai mép) hoặc <code class="${inlineCode}">960 × 960</code> nếu muốn chừa safe margin.</li>
                <li><strong>Căn giữa:</strong> <code class="${inlineCode}">x = (1080 − width) / 2</code>, <code class="${inlineCode}">y = (1920 − height) / 2</code>.</li>
                <li><strong>Bo góc:</strong> clip path bo góc (ví dụ 16dp / 24dp) lên ảnh nội dung <em>trước</em> khi vẽ lên canvas đen.</li>
              </ol>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(4, "Feed 1:1")}
            <div class="${card}">
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li>Giữ nguyên tỉ lệ <strong>1:1</strong>, chuẩn <code class="${inlineCode}">1080 × 1080 px</code>: Meta nén tốt nhất ở độ phân giải này, ảnh ít bị vỡ / nhoè.</li>
                <li>Nền trong suốt (nếu xuất PNG) hoặc theo màu user cấu hình.</li>
                <li><strong>Không</strong> chèn viền / padding đen, vì ảnh sẽ bị thu nhỏ khi hiển thị trên lưới Feed (Feed Grid).</li>
              </ul>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(5, "Code mẫu: Kotlin Bitmap Processing")}
            <div class="${card}">
              <p class="${text}">Vẽ thẳng ảnh gốc vào vùng đích bằng <code class="${inlineCode}">drawBitmap(src, null, dstRect, paint)</code> thay vì <code class="${inlineCode}">createScaledBitmap</code> để không phải cấp phát thêm một Bitmap trung gian. Bo góc được áp bằng <code class="${inlineCode}">clipPath</code> ngay trên canvas.</p>
              <pre class="${code}"><code>enum class ShareDestination { FEED_1_1, STORY_9_16 }

object ImageExportHelper {

    private const val FEED_SIZE = 1080
    private const val STORY_WIDTH = 1080
    private const val STORY_HEIGHT = 1920

    fun exportImage(
        source: Bitmap,
        destination: ShareDestination,
        cornerRadiusPx: Float = 0f,
        contentSize: Int = STORY_WIDTH      // 960 nếu muốn safe margin
    ): Bitmap = when (destination) {
        ShareDestination.FEED_1_1 ->
            Bitmap.createScaledBitmap(source, FEED_SIZE, FEED_SIZE, true)
        ShareDestination.STORY_9_16 ->
            createStoryCanvas(source, cornerRadiusPx, contentSize)
    }

    private fun createStoryCanvas(
        content: Bitmap,
        cornerRadiusPx: Float,
        contentSize: Int
    ): Bitmap {
        val result = Bitmap.createBitmap(STORY_WIDTH, STORY_HEIGHT, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(result)

        // 1. Nền đen tuyệt đối để Meta không chèn gradient tự động
        canvas.drawColor(Color.BLACK)

        // 2. Vùng đích căn giữa cả hai trục
        val left = (STORY_WIDTH - contentSize) / 2f
        val top = (STORY_HEIGHT - contentSize) / 2f
        val dst = RectF(left, top, left + contentSize, top + contentSize)

        // 3. Clip bo góc rồi vẽ ảnh nội dung vào vùng đích
        canvas.save()
        if (cornerRadiusPx > 0f) {
            val path = Path().apply {
                addRoundRect(dst, cornerRadiusPx, cornerRadiusPx, Path.Direction.CW)
            }
            canvas.clipPath(path)
        }
        val paint = Paint(Paint.ANTI_ALIAS_FLAG or Paint.FILTER_BITMAP_FLAG)
        canvas.drawBitmap(content, null, dst, paint)
        canvas.restore()

        return result
    }
}

// Lưu file: JPG quality 90–95
result.compress(Bitmap.CompressFormat.JPEG, 92, outputStream)</code></pre>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(6, "UI/UX flow khuyến nghị")}
            <div class="grid gap-3 sm:grid-cols-2">
              <div class="${card}">
                <h4 class="font-bold text-pink-600 dark:text-pink-400 text-sm"><i class="fa-solid fa-mobile-screen mr-1"></i> Story (9:16)</h4>
                <p class="${text}">Tối ưu cho Instagram Story, Facebook Story, tự thêm nền đen.</p>
              </div>
              <div class="${card}">
                <h4 class="font-bold text-pink-600 dark:text-pink-400 text-sm"><i class="fa-solid fa-image mr-1"></i> Feed / Bảng tin (1:1)</h4>
                <p class="${text}">Tối ưu cho bài đăng vuông, giữ nguyên ảnh không padding.</p>
              </div>
            </div>
            <p class="${text}">Khi user bấm <strong>Share / Xuất ảnh</strong>, hiển thị hai lựa chọn trên. Có thể thêm toggle nhanh <em>"Tối ưu nền khi đăng Story"</em> để user tự bật / tắt.</p>
          </section>

          <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <p class="text-amber-700 dark:text-amber-300 text-sm"><i class="fa-solid fa-lightbulb mr-1"></i> <strong>Lưu ý:</strong> Canvas <code class="${inlineCode}">1080 × 1920</code> ARGB_8888 chiếm khoảng <strong>8MB</strong> RAM. Nên xử lý trên background thread (<code class="${inlineCode}">Dispatchers.Default</code>) và <code class="${inlineCode}">recycle()</code> / giải phóng Bitmap sau khi đã lưu file.</p>
          </div>
        </div>
      `
    }
  ]
};
