export const roomSeniorGuideLesson = {
  id: "room-senior-guide",
  num: "01",
  badge: "Architecture & Data",
  title: "Room Database: Từ Nền Tảng Đến Kiến Trúc Senior",
  desc: "Cẩm nang chuyên sâu về SQLite Type Affinity, @TypeConverter, chuẩn hóa quan hệ 1-N, Concurrency WAL, InvalidationTracker, Transaction an toàn, tối ưu Indexing, Migration chuẩn Production và tích hợp Clean Architecture.",
  content: `
  <div class="lesson-prose">
    <h1>Room Database: Từ Nền Tảng Đến Kiến Trúc Senior</h1>
    <h2>1. Nền Tảng SQLite & Hệ Thống Kiểu Dữ Liệu</h2>
    <p>Khác với các hệ quản trị CSDL dùng Static Typing (PostgreSQL, MySQL), SQLite hoạt động theo cơ chế <strong>Dynamic Typing thông qua Type Affinity</strong>. Kiểu dữ liệu gắn liền với <em>giá trị thực tế được lưu</em>, không gắn cố định vào định nghĩa cột.</p>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Kiểu dữ liệu SQLite</th>
            <th>Bản chất kỹ thuật</th>
            <th>Ánh xạ Kotlin mặc định</th>
            <th>Lưu ý thực tế khi thiết kế Schema</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>NULL</code></td>
            <td>Giá trị rỗng / không tồn tại</td>
            <td><code>null</code> (<code>String?</code>, <code>Int?</code>)</td>
            <td>Chiếm ít dung lượng nhất. Trong mệnh đề so sánh: <code>NULL = NULL</code> luôn trả về <code>false</code>.</td>
          </tr>
          <tr>
            <td><code>INTEGER</code></td>
            <td>Số nguyên có dấu, tự co giãn 1 đến 8 bytes</td>
            <td><code>Byte</code>, <code>Short</code>, <code>Int</code>, <code>Long</code>, <code>Boolean</code></td>
            <td>Tiết kiệm bộ nhớ tối đa. Ví dụ số <code>5</code> chỉ tốn 1 byte lưu trữ dù khai báo 64-bit.</td>
          </tr>
          <tr>
            <td><code>REAL</code></td>
            <td>Số thực 8-byte IEEE floating point</td>
            <td><code>Float</code>, <code>Double</code></td>
            <td>Thích hợp cho tọa độ GPS, chỉ số vật lý. <strong>Không dùng lưu tiền tệ</strong> do sai số dấu phẩy động (nên dùng <code>Long</code> cents).</td>
          </tr>
          <tr>
            <td><code>TEXT</code></td>
            <td>Chuỗi mã hóa UTF-8, UTF-16</td>
            <td><code>String</code>, <code>Char</code></td>
            <td>Không cần giới hạn độ dài như <code>VARCHAR(255)</code>. Giới hạn mặc định lên đến 1GB.</td>
          </tr>
          <tr>
            <td><code>BLOB</code></td>
            <td>Binary Large Object (chuỗi bytes nguyên bản)</td>
            <td><code>ByteArray</code></td>
            <td>Lưu vector nhị phân, dữ liệu mã hóa. Tránh lưu ảnh lớn (&gt; 1–2MB) trực tiếp để tránh tràn <code>CursorWindow</code>.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <hr/>

    <h2>2. Kiến Trúc Cốt Lõi Của Room</h2>
    <p>Room là tầng ORM bọc quanh SQLite, loại bỏ mã khung lặp đi lặp lại và kiểm tra xác thực câu lệnh SQL ngay thời điểm biên dịch thông qua KSP.</p>

    <ul>
      <li><strong><code>@Entity</code> (Data Model):</strong> Định nghĩa bảng trong SQLite. Mỗi instance đại diện cho một bản ghi (row). Hỗ trợ <code>@PrimaryKey(autoGenerate = true)</code>, <code>@ColumnInfo(name = "...")</code> và <code>@Ignore</code>.</li>
      <li><strong><code>@Dao</code> (Data Access Object):</strong> Interface định nghĩa các truy vấn CRUD (<code>@Insert</code>, <code>@Update</code>, <code>@Delete</code>, <code>@Query</code>). Mọi thao tác I/O thông thường bắt buộc là <code>suspend fun</code> chạy trên background thread.</li>
      <li><strong><code>@Database</code>:</strong> Abstract class kế thừa <code>RoomDatabase</code>, giữ kết nối database, quản lý version và migration.</li>
    </ul>

    <hr/>

    <h2>3. Chuyển Đổi Dữ Liệu Với @TypeConverter</h2>
    <p>Bản chất của <code>@TypeConverter</code> không chỉ giới hạn ở <code>String &harr; TEXT</code>, mà là cung cấp cặp hàm 2 chiều để chuyển đổi một kiểu dữ liệu Kotlin phức tạp thành một trong 5 kiểu SQLite hiểu được (<code>NULL</code>, <code>INTEGER</code>, <code>REAL</code>, <code>TEXT</code>, <code>BLOB</code>) và ngược lại.</p>

    <pre><code class="language-kotlin">import androidx.room.TypeConverter
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import java.time.Instant

class AppTypeConverters {

    // 1. Instant <-> Long (INTEGER)
    @TypeConverter
    fun fromInstant(instant: Instant?): Long? = instant?.toEpochMilli()

    @TypeConverter
    fun toInstant(millis: Long?): Instant? = millis?.let { Instant.ofEpochMilli(it) }

    // 2. List&lt;String&gt; <-> JSON String (TEXT)
    @TypeConverter
    fun fromStringList(tags: List&lt;String&gt;?): String? = tags?.let { Json.encodeToString(it) }

    @TypeConverter
    fun toStringList(jsonString: String?): List&lt;String&gt;? = 
        jsonString?.let { Json.decodeFromString&lt;List&lt;String&gt;&gt;(it) }
}
</code></pre>

    <p>Đăng ký cấp Database để áp dụng toàn cục:</p>
    <pre><code class="language-kotlin">@Database(entities = [NoteEntity::class], version = 1, exportSchema = true)
@TypeConverters(AppTypeConverters::class)
abstract class AppDatabase : RoomDatabase() {
    abstract fun noteDao(): NoteDao
}
</code></pre>

    <hr/>

    <h2>4. Chuẩn Hóa Dữ Liệu: Quan Hệ 1-N (One-to-Many) Thay Thế JSON</h2>
    <p>Lưu danh sách dạng chuỗi JSON khiến truy vấn tìm kiếm <code>WHERE tag = ?</code> rơi vào $O(N)$ (Full Table Scan). Chuẩn hóa sang quan hệ 1-N giúp đạt tốc độ truy vấn $O(\\log N)$ nhờ B-Tree Index và đảm bảo toàn vẹn dữ liệu.</p>

    <pre><code class="language-kotlin">// Bảng Cha: notes (1)
@Entity(tableName = "notes")
data class NoteEntity(
    @PrimaryKey(autoGenerate = true)
    @ColumnInfo(name = "note_id")
    val noteId: Long = 0,
    val title: String,
    val content: String
)

// Bảng Con: tags (N)
@Entity(
    tableName = "tags",
    foreignKeys = [
        ForeignKey(
            entity = NoteEntity::class,
            parentColumns = ["note_id"],
            childColumns = ["note_id"],
            onDelete = ForeignKey.CASCADE // Xóa Note -> Tự xóa hết Tag liên quan
        )
    ],
    indices = [
        Index(value = ["note_id"]),  // Tối ưu JOIN
        Index(value = ["tag_name"]) // Tối ưu tìm kiếm theo tên tag
    ]
)
data class TagEntity(
    @PrimaryKey(autoGenerate = true)
    @ColumnInfo(name = "tag_id")
    val tagId: Long = 0,
    @ColumnInfo(name = "note_id")
    val noteId: Long,
    @ColumnInfo(name = "tag_name")
    val tagName: String
)
</code></pre>

    <p>Tạo DTO trung gian và DAO với <code>@Transaction</code>:</p>
    <pre><code class="language-kotlin">data class NoteWithTags(
    @Embedded val note: NoteEntity,
    @Relation(
        parentColumn = "note_id",
        entityColumn = "note_id"
    )
    val tags: List&lt;TagEntity&gt;
)

@Dao
interface NoteDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertNote(note: NoteEntity): Long

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertTags(tags: List&lt;TagEntity&gt;)

    @Transaction
    suspend fun insertNoteWithTags(note: NoteEntity, tags: List&lt;String&gt;) {
        val noteId = insertNote(note)
        val tagEntities = tags.map { TagEntity(noteId = noteId, tagName = it) }
        insertTags(tagEntities)
    }

    // Luôn cần @Transaction khi query Relation để tránh Dirty Read
    @Transaction
    @Query("SELECT * FROM notes")
    fun getNotesWithTags(): Flow&lt;List&lt;NoteWithTags&gt;&gt;

    @Transaction
    @Query("""
        SELECT * FROM notes 
        INNER JOIN tags ON notes.note_id = tags.note_id 
        WHERE tags.tag_name = :tagQuery
    """)
    fun getNotesByTag(tagQuery: String): Flow&lt;List&lt;NoteWithTags&gt;&gt;
}
</code></pre>

    <hr/>

    <h2>5. Concurrency & Quản Lý Dữ Liệu Tầng Thấp</h2>
    <ul>
      <li><strong>Cơ chế InvalidationTracker:</strong> Room tạo bảng ngầm <code>room_table_modification_log</code> và gắn triggers (<code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>) lên các bảng quan sát. Khi dữ liệu đổi, tracker trên background thread phát hiện cờ và kích hoạt re-query cho các luồng <code>Flow&lt;T&gt;</code>.</li>
      <li><strong>WAL (Write-Ahead Logging) vs Rollback Journal:</strong>
        <ul>
          <li><em>Rollback Journal:</em> Tạo bản sao trang dữ liệu cũ vào journal file khi ghi. Khóa toàn bộ database (Read chặn Write, Write chặn Read).</li>
          <li><em>WAL Mode (Mặc định từ Android 9):</em> Thao tác ghi được nối vào file <code>-wal</code> riêng biệt. Cho phép <strong>1 Writer hoạt động song song với nhiều Reader</strong> mà không gây nghẽn.</li>
        </ul>
      </li>
      <li><strong>ACID & Transactions:</strong>
        <ul>
          <li>Đảm bảo tính Nguyên tử (Atomicity), Nhất quán (Consistency), Cô lập (Isolation) và Bền bỉ (Durability).</li>
          <li>Sử dụng khi cập nhật nhiều bảng liên quan, xử lý batch insert hàng loạt để tăng tốc ghi, và bọc các truy vấn <code>@Relation</code>.</li>
        </ul>
      </li>
    </ul>

    <hr/>

    <h2>6. Tối Ưu Hiệu Năng Truy Vấn (Performance Tuning)</h2>
    <ol>
      <li><strong>Đánh Index có chọn lọc:</strong> Thêm <code>indices = [Index(value = ["col_name"])]</code> cho các cột hay dùng trong <code>WHERE</code>, <code>JOIN</code>, <code>ORDER BY</code>. Tránh đánh dư thừa vì sẽ làm chậm các lệnh ghi (phải cập nhật lại cây B-Tree).</li>
      <li><strong>Tránh <code>SELECT *</code> bằng Partial Entities:</strong> Chỉ select những cột cần hiển thị trên UI vào một data class riêng để giảm dung lượng tải qua <code>CursorWindow</code> (giới hạn 2MB).</li>
      <li><strong>Tận dụng Paging 3:</strong> Trả về <code>PagingSource&lt;Int, Entity&gt;</code> từ DAO để tải dữ liệu theo từng trang nhỏ thay vì load hàng ngàn items vào RAM.</li>
    </ol>

    <hr/>

    <h2>7. Chiến Lược Database Migration Chuẩn Production</h2>
    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Chiến lược</th>
            <th>Cơ chế</th>
            <th>Trường hợp áp dụng</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Destructive Migration</strong></td>
            <td>Xóa sạch file database cũ và tạo lại từ đầu.</td>
            <td>Giai đoạn dev, testing hoặc dữ liệu chỉ là cache tạm từ API.</td>
          </tr>
          <tr>
            <td><strong>Auto Migration</strong></td>
            <td>Dùng <code>@AutoMigration</code>, Room đối chiếu file schema JSON để tự sinh script.</td>
            <td>Thêm bảng mới, thêm cột có giá trị mặc định hoặc cho phép null.</td>
          </tr>
          <tr>
            <td><strong>Manual Migration</strong></td>
            <td>Tự viết SQL thô qua <code>Migration(from, to)</code>.</td>
            <td>Đổi kiểu cột, tách/gộp bảng, di chuyển dữ liệu phức tạp.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h4>Quy trình 4 bước an toàn trên Production:</h4>
    <ol>
      <li><strong>Export Schema:</strong> Bật <code>room.schemaLocation</code> trong Gradle để kiểm soát lịch sử schema qua file JSON.</li>
      <li><strong>Xử lý giới hạn SQLite (Migration 4 bước):</strong> Tạo bảng tạm mới &rarr; Chép dữ liệu từ bảng cũ sang &rarr; Xóa bảng cũ &rarr; Đổi tên bảng tạm thành bảng chính.</li>
      <li><strong>Hỗ trợ nhảy cóc phiên bản:</strong> Định nghĩa chuỗi migration tuần tự (<code>1 -> 2</code>, <code>2 -> 3</code>) để người dùng cập nhật từ bản bất kỳ không bị crash <code>IllegalStateException</code>.</li>
      <li><strong>Kiểm thử tự động:</strong> Sử dụng <code>MigrationTestHelper</code> để kiểm tra tính toàn vẹn của dữ liệu trước khi phát hành.</li>
    </ol>

    <hr/>

    <h2>8. Tích Hợp Chuẩn Clean Architecture</h2>
    <ul>
      <li><strong>Phân tách Model:</strong> Không truyền trực tiếp <code>@Entity</code> lên Domain Layer hoặc Compose UI. Luôn dùng mapper (<code>Entity.toDomain()</code>) chuyển đổi sang Domain Model.</li>
      <li><strong>Single Source of Truth (SSOT):</strong> Repository điều phối: Kéo dữ liệu từ API &rarr; Lưu vào Room Database &rarr; Phát luồng <code>Flow&lt;DomainModel&gt;</code> từ Room lên ViewModel.</li>
      <li><strong>Dependency Injection:</strong> Cung cấp <code>RoomDatabase</code> dưới dạng <code>@Singleton</code> bằng Hilt, chỉ inject interface DAO vào Repository Implementation.</li>
    </ul>
  </div>
  `
};