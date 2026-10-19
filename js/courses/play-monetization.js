const header = (num, tag, title, subtitle) => `
  <div class="border-b border-slate-200 dark:border-slate-800 pb-6">
    <div class="flex items-center gap-2 mb-3">
      <span class="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">Chuyên Đề ${num}</span>
      <span class="px-2.5 py-1 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 text-xs font-mono font-bold">${tag}</span>
    </div>
    <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">${title}</h2>
    <p class="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">${subtitle}</p>
  </div>
`;

const sectionTitle = (num, title) => `
  <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
    <span class="w-6 h-6 shrink-0 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xs font-bold">${num}</span>
    ${title}
  </h3>
`;

const card = "p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 space-y-3";
const text = "text-slate-700 dark:text-slate-300 text-sm leading-relaxed";
const code = "p-3 rounded-lg bg-slate-900 text-slate-200 text-xs overflow-x-auto";
const inlineCode = "px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-300 text-xs";
const th = "p-3 text-left font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700";
const td = "p-3 align-top text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800";

export const playMonetizationCourse = {
  id: "google-play-monetization",
  title: "Google Play Monetization",
  category: "Publishing",
  icon: "fa-sack-dollar",
  color: "from-emerald-500 to-teal-500",
  badge: "New",
  description: "Thiết lập giá tiền và mô hình kiếm tiền trên Google Play Console: Paid App, In-app Products, Subscriptions và Play Billing Library.",
  lessons: [
    {
      id: "monetization-models",
      num: "01",
      badge: "Pricing",
      title: "3 Mô Hình Kiếm Tiền Trên Google Play",
      desc: "App Pricing (Paid App), One-time Products (Consumable / Non-consumable) và Subscriptions: bản chất, cơ chế và ràng buộc kỹ thuật.",
      content: `
        <div class="space-y-8">
          ${header("01", "Pricing Models", "3 Mô Hình Kiếm Tiền Trên Google Play", "Hiểu rõ bản chất, cơ chế hoạt động và các ràng buộc kỹ thuật của từng loại hình trước khi thiết lập giá trên Google Play Console.")}

          <section class="space-y-4">
            ${sectionTitle(1, "App Pricing (Giá ứng dụng / Paid App)")}
            <div class="${card}">
              <p class="${text}"><strong>Bản chất:</strong> Người dùng phải trả tiền <strong>ngay trước khi tải ứng dụng</strong> về thiết bị từ Google Play Store.</p>
              <p class="${text}"><strong>Cơ chế hoạt động:</strong></p>
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li>Người dùng thanh toán <strong>một lần duy nhất</strong> qua tài khoản Google Play để có quyền cài đặt và sở hữu giấy phép (license) sử dụng ứng dụng.</li>
                <li>Việc xác thực quyền sở hữu được Google Play xử lý tự động thông qua dịch vụ cấp phép (<em>Google Play Licensing / LVL</em>).</li>
              </ul>
            </div>
            <div class="p-4 rounded-xl bg-red-500/10 border border-red-500/20 space-y-2">
              <p class="text-red-700 dark:text-red-300 text-sm font-bold"><i class="fa-solid fa-triangle-exclamation mr-1"></i> Ràng buộc quan trọng: Quy tắc một chiều</p>
              <ul class="list-disc pl-5 space-y-1.5 text-red-700 dark:text-red-300 text-sm">
                <li>Nếu ứng dụng khởi tạo là <strong>Free</strong> khi xuất bản, bạn <strong>vĩnh viễn không thể chuyển thành Paid</strong>.</li>
                <li>Muốn thu phí tải, ứng dụng bắt buộc phải đặt là <strong>Paid ngay từ lần phát hành đầu tiên</strong>.</li>
                <li>Có thể đổi <strong>Paid &rarr; Free</strong> bất kỳ lúc nào, nhưng một khi đã sang Free thì <strong>không thể quay lại Paid</strong>.</li>
              </ul>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(2, "One-Time Products (In-App Products / Sản phẩm mua một lần)")}
            <div class="${card}">
              <p class="${text}"><strong>Bản chất:</strong> Vật phẩm, tính năng hoặc nội dung số được mua <strong>bên trong ứng dụng</strong> thông qua <strong>Google Play Billing Library</strong>. Người dùng thanh toán một lần cho mỗi lượt mua.</p>
              <p class="${text}">Được chia thành 2 nhóm kỹ thuật chính:</p>
            </div>
            <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/50">
              <table class="w-full text-sm bg-white dark:bg-slate-800/30">
                <thead class="bg-slate-50 dark:bg-slate-800/60">
                  <tr>
                    <th class="${th}">Loại</th>
                    <th class="${th}">Đặc điểm</th>
                    <th class="${th}">Trường hợp sử dụng thực tế</th>
                    <th class="${th}">Xử lý trong Code</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="${td}"><strong>Consumable</strong><br/><em>Sản phẩm tiêu hao</em></td>
                    <td class="${td}">Có thể mua <strong>nhiều lần</strong>. Mua xong, app phải gọi lệnh tiêu thụ để người dùng có thể mua tiếp lượt sau.</td>
                    <td class="${td}">Coin, kim cương, mạng chơi game, lượt gọi API, lượt spin/quay thưởng.</td>
                    <td class="${td}">Gọi <code class="${inlineCode}">consumeAsync()</code> sau khi xác nhận thanh toán thành công.</td>
                  </tr>
                  <tr>
                    <td class="${td}"><strong>Non-Consumable</strong><br/><em>Sản phẩm vĩnh viễn</em></td>
                    <td class="${td}">Chỉ mua <strong>một lần duy nhất</strong> cho mỗi tài khoản Google Play.</td>
                    <td class="${td}">Mở khóa Pro/Premium trọn đời, gỡ quảng cáo (Remove Ads), mở khóa toàn bộ bài học.</td>
                    <td class="${td}">Không consume. Chỉ gọi <code class="${inlineCode}">acknowledgePurchase()</code> để ghi nhận quyền sở hữu vĩnh viễn.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="${card}">
              <p class="${text}"><strong>Ví dụ:</strong> xử lý purchase theo từng loại sản phẩm.</p>
              <pre class="${code}"><code>fun handlePurchase(purchase: Purchase) {
    if (purchase.purchaseState != Purchase.PurchaseState.PURCHASED) return

    if (isConsumable(purchase.products.first())) {
        // Consumable: consume để user mua lại được (consume cũng tự acknowledge)
        val params = ConsumeParams.newBuilder()
            .setPurchaseToken(purchase.purchaseToken)
            .build()
        billingClient.consumeAsync(params) { result, _ ->
            if (result.responseCode == BillingResponseCode.OK) grantCoins()
        }
    } else if (!purchase.isAcknowledged) {
        // Non-consumable: chỉ acknowledge, quyền sở hữu giữ vĩnh viễn
        val params = AcknowledgePurchaseParams.newBuilder()
            .setPurchaseToken(purchase.purchaseToken)
            .build()
        billingClient.acknowledgePurchase(params) { result ->
            if (result.responseCode == BillingResponseCode.OK) unlockPremium()
        }
    }
}</code></pre>
            </div>
            <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p class="text-amber-700 dark:text-amber-300 text-sm"><i class="fa-solid fa-lightbulb mr-1"></i> <strong>Lưu ý:</strong> Purchase không được acknowledge (hoặc consume) trong vòng <strong>3 ngày</strong> sẽ bị Google Play <strong>tự động hoàn tiền</strong> và thu hồi quyền.</p>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(3, "Subscriptions (Gói đăng ký / Gói thuê bao)")}
            <div class="${card}">
              <p class="${text}"><strong>Bản chất:</strong> Mô hình tính phí <strong>lặp lại định kỳ</strong> (tuần, tháng, quý hoặc năm) cho quyền truy cập liên tục vào nội dung, dịch vụ đám mây hoặc tính năng cao cấp.</p>
              <p class="${text}"><strong>Cơ chế hoạt động:</strong></p>
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li>Google Play tự động trừ tiền theo chu kỳ đã chọn cho đến khi người dùng chủ động hủy.</li>
                <li>Cấu trúc trên Google Play Console:</li>
              </ul>
              <div class="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span class="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">Subscription ID</span>
                <i class="fa-solid fa-arrow-right text-slate-400"></i>
                <span class="px-2.5 py-1.5 rounded-lg bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">Base Plan <span class="opacity-70">(chu kỳ, giá cố định)</span></span>
                <i class="fa-solid fa-arrow-right text-slate-400"></i>
                <span class="px-2.5 py-1.5 rounded-lg bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20">Offers <span class="opacity-70">(giảm giá đợt đầu, Free Trial)</span></span>
              </div>
            </div>
            <div class="grid gap-3 sm:grid-cols-3">
              <div class="${card}">
                <p class="text-sm font-bold text-slate-900 dark:text-white"><i class="fa-solid fa-gift text-emerald-500 mr-1"></i> Free trial</p>
                <p class="${text}">Dùng đầy đủ tính năng trong 3, 7 hoặc 14 ngày trước khi bắt đầu tính chu kỳ đầu tiên.</p>
              </div>
              <div class="${card}">
                <p class="text-sm font-bold text-slate-900 dark:text-white"><i class="fa-solid fa-hourglass-half text-amber-500 mr-1"></i> Grace period</p>
                <p class="${text}">Thẻ hết tiền hoặc lỗi thanh toán: Google Play gia hạn vài ngày để người dùng cập nhật thẻ, <strong>vẫn giữ quyền truy cập</strong>.</p>
              </div>
              <div class="${card}">
                <p class="text-sm font-bold text-slate-900 dark:text-white"><i class="fa-solid fa-pause text-red-500 mr-1"></i> Account hold</p>
                <p class="${text}">Trạng thái chờ xử lý thanh toán khi hết thời gian ân hạn. Người dùng <strong>mất quyền truy cập</strong> cho tới khi thanh toán thành công.</p>
              </div>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(4, "Bảng so sánh tổng quan")}
            <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/50">
              <table class="w-full text-sm bg-white dark:bg-slate-800/30">
                <thead class="bg-slate-50 dark:bg-slate-800/60">
                  <tr>
                    <th class="${th}">Tiêu chí</th>
                    <th class="${th}">App Pricing (Paid App)</th>
                    <th class="${th}">One-time Products</th>
                    <th class="${th}">Subscriptions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="${td}"><strong>Thời điểm thanh toán</strong></td>
                    <td class="${td}">Trước khi cài đặt app</td>
                    <td class="${td}">Sau khi vào trong app</td>
                    <td class="${td}">Sau khi vào trong app</td>
                  </tr>
                  <tr>
                    <td class="${td}"><strong>Tần suất thu phí</strong></td>
                    <td class="${td}">1 lần duy nhất</td>
                    <td class="${td}">1 lần / nhiều lần tùy loại</td>
                    <td class="${td}">Định kỳ (tuần/tháng/năm)</td>
                  </tr>
                  <tr>
                    <td class="${td}"><strong>Dòng tiền cho Developer</strong></td>
                    <td class="${td}">Một lần ban đầu</td>
                    <td class="${td}">Theo nhu cầu người dùng</td>
                    <td class="${td}">Ổn định, tái diễn (MRR/ARR)</td>
                  </tr>
                  <tr>
                    <td class="${td}"><strong>Tỷ lệ phí nền tảng</strong></td>
                    <td class="${td}">15% (cho 1 triệu USD đầu tiên/năm)</td>
                    <td class="${td}">15% (cho 1 triệu USD đầu tiên/năm)</td>
                    <td class="${td}">15% ngay từ ngày đầu</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      `
    },
    {
      id: "play-console-vs-gcp",
      num: "02",
      badge: "Setup",
      title: "Google Play Console vs Google Cloud",
      desc: "Phân định vai trò giữa Google Play Console và Google Cloud Platform (GCP), và khi nào mới cần đụng đến GCP (Server-side Receipt Validation).",
      content: `
        <div class="space-y-8">
          ${header("02", "Console Setup", "Google Play Console vs Google Cloud", "Hai nền tảng, hai vai trò tách biệt: Play Console lo sản phẩm &amp; thương mại, Google Cloud lo hạ tầng API &amp; backend.")}

          <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <p class="text-emerald-700 dark:text-emerald-300 text-sm"><i class="fa-solid fa-circle-check mr-1"></i> <strong>Ý chính:</strong> Toàn bộ việc cấu hình giá bán, tiền tệ và gói sản phẩm được thực hiện trực tiếp trên <strong>Google Play Console</strong>. Google Cloud chỉ là hạ tầng kỹ thuật phía backend.</p>
          </div>

          <section class="space-y-4">
            ${sectionTitle(1, "Phân định vai trò giữa Google Play Console và Google Cloud")}
            <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/50">
              <table class="w-full text-sm bg-white dark:bg-slate-800/30">
                <thead class="bg-slate-50 dark:bg-slate-800/60">
                  <tr>
                    <th class="${th}">Nền tảng</th>
                    <th class="${th}">Vai trò chính</th>
                    <th class="${th}">Những việc thực hiện tại đây</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="${td}"><strong>Google Play Console</strong><br/><em>Nơi bạn thiết lập giá</em></td>
                    <td class="${td}">Quản lý sản phẩm, thương mại và phân phối app</td>
                    <td class="${td}">
                      <ul class="list-disc pl-5 space-y-1">
                        <li>Đặt giá ứng dụng (Paid App)</li>
                        <li>Tạo In-app Products &amp; Subscriptions</li>
                        <li>Cấu hình thuế, tiền tệ theo từng quốc gia</li>
                        <li>Quản lý Merchant Profile &amp; tài khoản ngân hàng nhận tiền</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td class="${td}"><strong>Google Cloud Platform (GCP)</strong><br/><em>Hạ tầng kỹ thuật</em></td>
                    <td class="${td}">Quản lý API, xác thực backend và tài nguyên server</td>
                    <td class="${td}">
                      <ul class="list-disc pl-5 space-y-1">
                        <li>Bật <strong>Google Play Android Developer API</strong></li>
                        <li>Tạo Service Account (<code class="${inlineCode}">.json</code>) để backend xác thực đơn hàng tự động</li>
                        <li>Cấu hình <strong>Pub/Sub</strong> nhận Real-time Developer Notifications (RTDN) khi user gia hạn/hủy subscription</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(2, "Khi nào mới cần đụng đến Google Cloud?")}
            <div class="${card}">
              <p class="${text}">Chỉ khi triển khai <strong>Server-side Receipt Validation</strong>: xác thực biên lai mua hàng từ server backend của bạn.</p>
              <ol class="list-decimal pl-5 space-y-2 ${text}">
                <li><strong>Tạo Service Account trên GCP:</strong> cấp quyền để backend gọi sang API của Google Play kiểm tra đơn hàng có hợp lệ không (<code class="${inlineCode}">purchases.products.get</code> hoặc <code class="${inlineCode}">purchases.subscriptions.get</code>).</li>
                <li><strong>Liên kết với Play Console:</strong> vào <strong>Play Console &rarr; API access</strong>, liên kết dự án Google Cloud đó và cấp quyền quản trị tài chính/đơn hàng cho Service Account.</li>
              </ol>
            </div>
            <div class="${card}">
              <p class="${text}"><strong>Luồng xác thực đơn hàng:</strong></p>
              <div class="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span class="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">App nhận purchaseToken</span>
                <i class="fa-solid fa-arrow-right text-slate-400"></i>
                <span class="px-2.5 py-1.5 rounded-lg bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">Gửi lên Backend</span>
                <i class="fa-solid fa-arrow-right text-slate-400"></i>
                <span class="px-2.5 py-1.5 rounded-lg bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20">Backend gọi Play Developer API (Service Account)</span>
                <i class="fa-solid fa-arrow-right text-slate-400"></i>
                <span class="px-2.5 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">Hợp lệ &rarr; cấp quyền</span>
              </div>
            </div>
            <div class="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20">
              <p class="text-sky-700 dark:text-sky-300 text-sm"><i class="fa-solid fa-circle-info mr-1"></i> <strong>Cập nhật:</strong> Play Console hiện không còn bắt buộc liên kết dự án GCP ở trang API access. Chỉ cần bật API trên GCP, rồi mời email của Service Account vào <strong>Users and permissions</strong> và cấp quyền (xem dữ liệu tài chính, quản lý đơn hàng &amp; subscription). Với subscription, nên dùng endpoint mới <code class="${inlineCode}">purchases.subscriptionsv2.get</code>.</p>
            </div>
          </section>

          <section class="space-y-4">
            ${sectionTitle(3, "Khi nào thực sự cần Google Cloud?")}
            <div class="${card}">
              <p class="${text}"><strong>Google Cloud không bắt buộc.</strong> Một app vẫn có thể publish lên Google Play, bán Paid App, In-app Products hay Subscriptions mà không cần mở GCP. Nhưng khi app có backend hoặc dùng các dịch vụ của Google, gần như chắc chắn bạn sẽ cần nó.</p>
            </div>

            <div class="grid gap-3 sm:grid-cols-2">
              <div class="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 space-y-3">
                <p class="text-sm font-bold text-slate-900 dark:text-white"><i class="fa-solid fa-circle-xmark text-slate-400 mr-1"></i> Không cần GCP khi</p>
                <ul class="list-disc pl-5 space-y-1.5 ${text}">
                  <li>App chạy hoàn toàn offline, hoặc chỉ dùng backend riêng không liên quan đến Google (AWS, VPS…).</li>
                  <li>Chỉ bán Paid App, hoặc bán IAP/Subscription và <strong>xác thực ngay trên app</strong> (client-side): Billing Library vẫn chạy bình thường.</li>
                  <li>Không dùng Firebase, Google Maps, Google Sign-In hay API nào khác của Google.</li>
                </ul>
              </div>
              <div class="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 space-y-3">
                <p class="text-sm font-bold text-slate-900 dark:text-white"><i class="fa-solid fa-circle-check text-emerald-500 mr-1"></i> Cần GCP khi</p>
                <ul class="list-disc pl-5 space-y-1.5 ${text}">
                  <li>Có backend xác thực đơn hàng (Server-side Receipt Validation).</li>
                  <li>Bán Subscription và cần backend biết trạng thái gia hạn/hủy (RTDN).</li>
                  <li>Dùng Play Integrity, Firebase, Google Sign-In, Maps…</li>
                  <li>Tự động publish bản build qua CI/CD.</li>
                </ul>
              </div>
            </div>

            <div class="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <p class="text-red-700 dark:text-red-300 text-sm"><i class="fa-solid fa-triangle-exclamation mr-1"></i> <strong>Rủi ro:</strong> Chỉ xác thực trên client thì dễ bị crack hoặc giả giao dịch. Cách này chỉ chấp nhận được với app nhỏ hoặc sản phẩm giá trị thấp.</p>
            </div>

            <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/50">
              <table class="w-full text-sm bg-white dark:bg-slate-800/30">
                <thead class="bg-slate-50 dark:bg-slate-800/60">
                  <tr>
                    <th class="${th}">Tình huống</th>
                    <th class="${th}">Vì sao cần GCP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="${td}"><strong>Server-side Receipt Validation</strong></td>
                    <td class="${td}">Cần Service Account để backend gọi Play Developer API kiểm tra <code class="${inlineCode}">purchaseToken</code>.</td>
                  </tr>
                  <tr>
                    <td class="${td}"><strong>Subscription thực tế</strong></td>
                    <td class="${td}">Cần <strong>Pub/Sub</strong> để nhận RTDN khi user gia hạn, hủy, rơi vào grace period hoặc account hold. Không có thì backend không biết trạng thái subscription.</td>
                  </tr>
                  <tr>
                    <td class="${td}"><strong>Play Integrity API</strong></td>
                    <td class="${td}">Phải gắn với một Cloud project để giải mã và kiểm tra token chống gian lận.</td>
                  </tr>
                  <tr>
                    <td class="${td}"><strong>Firebase</strong><br/><em>FCM, Crashlytics, Analytics, Remote Config…</em></td>
                    <td class="${td}">Mỗi Firebase project thực chất là một GCP project. Dùng Firebase tức là bạn đã có GCP, chỉ là chưa mở console GCP ra xem.</td>
                  </tr>
                  <tr>
                    <td class="${td}"><strong>Google Sign-In, Maps SDK, Places, YouTube API…</strong></td>
                    <td class="${td}">API key và OAuth Client ID được tạo trong GCP project.</td>
                  </tr>
                  <tr>
                    <td class="${td}"><strong>Tự động hóa publish</strong><br/><em>Fastlane, Gradle Play Publisher, CI/CD</em></td>
                    <td class="${td}">Cần Service Account có quyền trên Play Console để upload bản build.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="${card}">
              <p class="${text}"><strong>Quy tắc dễ nhớ:</strong></p>
              <ul class="list-disc pl-5 space-y-1.5 ${text}">
                <li><strong>Có server, hoặc có subscription &rarr; cần GCP.</strong></li>
                <li><strong>Dùng bất kỳ dịch vụ nào của Google ngoài Billing &rarr; đã có GCP</strong>, thường thông qua Firebase.</li>
                <li><strong>App thuần client, không dùng dịch vụ của Google &rarr; không cần.</strong></li>
              </ul>
              <p class="${text}">Thực tế, hầu hết app thương mại đều dùng Firebase nên lúc nào cũng có sẵn một GCP project. Câu hỏi thường không phải "có cần GCP không" mà là "có cần mở GCP console để cấu hình thêm không": cần khi làm server validation, RTDN, Play Integrity hoặc CI publish.</p>
            </div>
          </section>

          <div class="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <p class="text-amber-700 dark:text-amber-300 text-sm"><i class="fa-solid fa-lightbulb mr-1"></i> <strong>Tóm lại:</strong> Định giá bao nhiêu tiền (USD, VND...), hiển thị trên Store bao nhiêu, bạn <strong>chỉ thao tác duy nhất tại Google Play Console</strong> (mục <strong>Monetize &rarr; Products</strong>).</p>
          </div>
        </div>
      `
    }
  ]
};
