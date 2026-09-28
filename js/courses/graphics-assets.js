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
  description: "Quy tắc chọn Vector vs Raster, xử lý hình theo độ chi tiết, Density Buckets & quản lý bộ nhớ Bitmap, và kỹ thuật Gradient Scrim đảm bảo tương phản trong Jetpack Compose.",
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
      id: "contrast-scrim-overlay",
      num: "04",
      badge: "UI/UX",
      title: "Tương Phản Hình Ảnh: Gradient Scrim & Overlay",
      desc: "Bắt buộc dùng Top/Bottom Gradient Scrim hoặc chip background khi đặt text/logo sáng lên ảnh do user chọn; vẽ bằng drawWithCache.",
      content: `
        <div class="space-y-8">
          ${header("04", "Contrast & Overlay", "Tương Phản Hình Ảnh: Gradient Scrim & Overlay", "Đảm bảo text và logo luôn đọc được trên mọi ảnh nền, kể cả ảnh user tự chụp.")}

          <section class="space-y-4">
            ${sectionTitle(1, "Quy tắc bắt buộc")}
            <div class="${card}">
              <p class="${text}">Khi hiển thị Text / Branding Logo màu sáng (ví dụ chữ trắng) đè lên ảnh nền do user chụp/chọn:</p>
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li><strong>BẮT BUỘC</strong> thêm một dải màu dốc đen mờ (<strong>Top/Bottom Gradient Scrim</strong>) hoặc background container (<code class="${inlineCode}">chipBgColor</code>) phía sau.</li>
                <li><strong>Lý do:</strong> Nếu user chọn ảnh nền màu trắng, text/logo trắng sẽ bị chìm hoàn toàn.</li>
              </ul>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(2, "Jetpack Compose: drawWithCache + Brush.verticalGradient")}
            <div class="${card}">
              <p class="${text}"><code class="${inlineCode}">drawWithCache</code> chỉ tạo lại <code class="${inlineCode}">Brush</code> khi kích thước thay đổi, tránh cấp phát object mới mỗi lần recomposition/redraw như khi tạo Brush trực tiếp trong <code class="${inlineCode}">drawBehind</code> hay <code class="${inlineCode}">background()</code>.</p>
              <pre class="${code}"><code>fun Modifier.bottomScrim(
    color: Color = Color.Black.copy(alpha = 0.6f),
    fraction: Float = 0.4f
) = drawWithCache {
    val scrimTop = size.height * (1f - fraction)
    val brush = Brush.verticalGradient(
        colors = listOf(Color.Transparent, color),
        startY = scrimTop,
        endY = size.height
    )
    onDrawWithContent {
        drawContent()                       // vẽ ảnh trước
        drawRect(brush, topLeft = Offset(0f, scrimTop))  // rồi phủ scrim lên
    }
}

Box {
    AsyncImage(
        model = userPhotoUri,
        contentDescription = null,
        contentScale = ContentScale.Crop,
        modifier = Modifier.fillMaxSize().bottomScrim()
    )
    Text(
        text = "Brand",
        color = Color.White,
        modifier = Modifier.align(Alignment.BottomStart).padding(16.dp)
    )
}</code></pre>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(3, "Phương án thay thế: Chip background")}
            <div class="${card}">
              <p class="${text}">Với logo hoặc nhãn nhỏ, bọc trong container có nền bán trong suốt thay vì phủ gradient lên toàn bộ ảnh.</p>
              <pre class="${code}"><code>Text(
    text = "PREMIUM",
    color = Color.White,
    modifier = Modifier
        .background(chipBgColor, RoundedCornerShape(50))
        .padding(horizontal = 10.dp, vertical = 4.dp)
)</code></pre>
            </div>
          </section>
        </div>
      `
    }
  ]
};
