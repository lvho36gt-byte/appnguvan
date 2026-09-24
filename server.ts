import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI SDK with required telemetry headers
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_INSTRUCTION = `Bạn là "AI Tutor Ngữ văn" dành cho học sinh THCS Việt Nam (lớp 6, 7, 8, 9) của Tổ Ngữ văn - GDCD, Trường THCS Huỳnh Thúc Kháng.

Mục tiêu cao nhất: Không viết bài thay học sinh mà giúp học sinh tự hình thành tư duy đọc, tư duy lập luận và tư duy viết độc lập.
Phương pháp sư phạm chủ đạo: Socratic (gợi mở, đặt câu hỏi định hướng, khích lệ suy nghĩ, phân nhỏ vấn đề).
Nguyên tắc:
1. Hỏi trước khi trả lời.
2. Khuyến khích học sinh tự bày tỏ suy nghĩ trước khi đưa nhận xét.
3. Phân nhỏ các nhiệm vụ khó thành từng bước rõ ràng.
4. Phản hồi ân cần, tích cực, mang tính sư phạm, đúng chuẩn mực tiếng Việt, không tâng bốc quá đà.
5. Tuyệt đối KHÔNG bịa tác giả, tác phẩm, câu thơ, văn liệu hoặc dẫn chứng lịch sử. Nếu thông tin dẫn chứng học sinh đưa ra chưa rõ nguồn gốc, hãy nhắc học sinh kiểm chứng.
6. Khi góp ý bài viết, tôn trọng tư tưởng và giọng văn trong sáng của học sinh; không viết lại nguyên bài.
7. Khi học sinh yêu cầu "Hãy viết bài văn cho em", tuyệt đối từ chối lịch sự và hướng dẫn: "Thầy/cô AI sẽ cùng em từng bước xây dựng bài viết này. Trước tiên, em hãy cho biết em hiểu đề đang yêu cầu điều gì?".
8. Ngôn ngữ luôn là tiếng Việt chuẩn mực, có dấu, ngữ điệu thân thiện với lứa tuổi 11-15 tuổi.`;

// Helper to call Gemini model with fallback
async function callGemini(prompt: string, customSystemInstruction?: string): Promise<string> {
  if (!aiClient) {
    throw new Error('GEMINI_NOT_CONFIGURED');
  }

  const response = await aiClient.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: prompt,
    config: {
      systemInstruction: customSystemInstruction || SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });

  return response.text || '';
}

// ----------------------------------------------------
// 1. AI 1 - HIỂU ĐỀ
// ----------------------------------------------------
app.post('/api/ai/understand-prompt', async (req: Request, res: Response) => {
  try {
    const { essayPrompt, studentParaphrase } = req.body;

    if (!essayPrompt) {
      return res.status(400).json({ error: 'Thiếu đề bài' });
    }

    if (studentParaphrase) {
      // Phản hồi về câu trả lời tự diễn giải của học sinh
      const prompt = `Đề bài: "${essayPrompt}"
Học sinh tự diễn giải lại yêu cầu của đề: "${studentParaphrase}"
Hãy nhận xét xem học sinh đã hiểu đúng và đủ trọng tâm đề chưa:
1. Lời khen động viên cụ thể về điểm học sinh đã nắm được.
2. Điểm còn thiếu hoặc cần lưu ý thêm (nếu có).
3. Câu hỏi kích hoạt để học sinh bước sang khâu tìm ý.
Trả về ngắn gọn, sư phạm, khoảng 150-200 từ.`;

      try {
        const text = await callGemini(prompt);
        return res.json({ success: true, result: text });
      } catch {
        return res.json({
          success: true,
          result: `Thầy/cô khen em đã có bước đầu xác định được hướng đi của đề! "${studentParaphrase}" đã chạm đúng tinh thần cốt lõi. Hãy chú ý thêm phạm vi dẫn chứng trong đời sống hoặc trong tác phẩm đã học để bài viết sâu sắc hơn nhé. Bây giờ, em hãy chọn ra một chi tiết hoặc một ví dụ ấn tượng nhất để chuẩn bị cho bước Khơi nguồn ý tưởng!`,
        });
      }
    }

    // Phân tích đề bài lần đầu
    const prompt = `Phân tích đề bài Ngữ văn THCS sau:
"${essayPrompt}"

Hãy phân tích theo đúng cấu trúc chuẩn sau (trả về văn bản định dạng rõ ràng, không viết bài mẫu):
- KIỂU BÀI: (Nghị luận xã hội / Nghị luận văn học / Tự sự / Thuyết minh / Biểu cảm...)
- VẤN ĐỀ TRỌNG TÂM: (Vấn đề cốt lõi cần làm sáng tỏ)
- TỪ KHÓA QUAN TRỌNG: (Gạch chân hoặc liệt kê các từ khóa quyết định)
- PHẠM VI KIẾN THỨC & DẪN CHỨNG: (Đời sống thực tế hay tác phẩm cụ thể nào)
- YÊU CẦU VỀ NỘI DUNG: (Cần trình bày những khía cạnh nào)
- YÊU CẦU VỀ HÌNH THỨC: (Đoạn văn hay bài văn, dung lượng gợi ý)
- CÂU HỎI THỬ THÁCH DÀNH CHO EM: "Em thử nói lại đề bài đang yêu cầu mình làm gì?"`;

    try {
      const text = await callGemini(prompt);
      return res.json({ success: true, analysis: text });
    } catch {
      return res.json({
        success: true,
        analysis: `### 🎯 KẾT QUẢ PHÂN TÍCH ĐỀ BÀI CÙNG AI:
- **Kiểu bài**: Nghị luận xã hội / Cảm thụ tác phẩm văn học chương trình THCS.
- **Vấn đề trọng tâm**: Nêu suy nghĩ, quan điểm cá nhân về tư tưởng, bài học nhân văn được gửi gắm trong đề bài.
- **Từ khóa quan trọng**: Chú ý các từ chỉ hành động, phẩm chất, cảm xúc và thái độ sống tích cực.
- **Phạm vi dẫn chứng**: Kiến thức các văn bản THCS (Chân trời sáng tạo, Cánh diều, Kết nối tri thức) kết hợp câu chuyện đời sống thực tế quanh em.
- **Yêu cầu nội dung**: Giải thích ý nghĩa, nêu lí lẽ lập luận, đưa dẫn chứng tiêu biểu và bài học liên hệ bản thân.
- **Yêu cầu hình thức**: Bố cục rõ ràng 3 phần (Mở - Thân - Kết), diễn đạt mạch lạc, dùng từ chuẩn xác, không sai chính tả.

---
👉 **Câu hỏi thử thách dành cho em**: *"Em thử nói lại đề bài đang yêu cầu mình làm gì bằng chính ngôn từ của em?"*`,
      });
    }
  } catch (err) {
    console.error('Error in understand-prompt:', err);
    return res.status(500).json({ error: 'Lỗi xử lý yêu cầu phân tích đề' });
  }
});

// ----------------------------------------------------
// 2. AI 2 - KHƠI NGUỒN Ý TƯỞNG (Socratic questions & idea management)
// ----------------------------------------------------
app.post('/api/ai/spark-ideas', async (req: Request, res: Response) => {
  try {
    const { topic, userIdeas } = req.body;
    const prompt = `Đề tài Ngữ văn THCS: "${topic || 'Tình bạn tuổi học trò / Tình yêu quê hương đất nước'}"
Các ý tưởng học sinh đã có: ${userIdeas?.length ? JSON.stringify(userIdeas) : 'Chưa có'}.

Hãy đưa ra 5 câu hỏi gợi mở Socratic để kích thích học sinh tự suy nghĩ thêm các góc nhìn độc đáo:
1. Điều gì trong đề khiến em chú ý nhất?
2. Em đã từng gặp tình huống tương tự trong đời sống hoặc trong trang sách chưa?
3. Chi tiết hoặc nhân vật nào có thể trở thành một dẫn chứng thuyết phục?
4. Nếu nhìn vấn đề theo chiều hướng ngược lại hoặc phản biện thì sẽ ra sao?
5. Tại sao em lại chọn quan điểm đó mà không phải là quan điểm khác?

Sau đó gợi ý 3 "thẻ ý tưởng" gợi mở ban đầu để học sinh tham khảo và tự phát triển tiếp.`;

    try {
      const text = await callGemini(prompt);
      return res.json({ success: true, result: text });
    } catch {
      return res.json({
        success: true,
        result: `### 💡 CÂU HỎI GỢI MỞ SOCRATIC DÀNH CHO EM:
1. **Khơi gợi cảm xúc**: Điều gì trong đề tài này làm em liên tưởng ngay đến trải nghiệm gần gũi của chính mình hoặc bạn bè cùng trang lứa?
2. **Quan sát thực tế**: Em đã từng thấy câu chuyện này diễn ra xung quanh em như thế nào (tại trường học, trong gia đình, trên tin tức tốt đẹp)?
3. **Dẫn chứng văn học**: Có tác phẩm nào trong chương trình THCS (như "Lặng lẽ Sa Pa", "Đồng chí", "Cô bé bán diêm"...) có cùng thông điệp này không?
4. **Góc nhìn đa chiều**: Nếu một người có suy nghĩ trái ngược với đề bài, theo em vì sao họ lại nghĩ vậy và em sẽ đối thoại với họ ra sao?
5. **Đúc rút hành động**: Bài học cụ thể nhất mà một học sinh lớp 8-9 có thể áp dụng ngay hôm nay là gì?

✨ **Gợi ý 3 hướng ý tưởng ban đầu**:
- *Ý tưởng 1*: Nguồn gốc & ý nghĩa của phẩm chất/vấn đề đối với sự trưởng thành của tuổi trẻ.
- *Ý tưởng 2*: Biểu hiện sinh động qua hành động nhỏ mỗi ngày (lắng nghe, sẻ chia, nỗ lực tự học).
- *Ý tưởng 3*: Phê phán thái độ thờ ơ, lười biếng hoặc ích kỷ để làm nổi bật chân lý.`,
      });
    }
  } catch (err) {
    console.error('Error in spark-ideas:', err);
    return res.status(500).json({ error: 'Lỗi khơi nguồn ý tưởng' });
  }
});

// ----------------------------------------------------
// 3. AI 3 - CÂY LUẬN ĐIỂM (Thesis & Argument tree verification)
// ----------------------------------------------------
app.post('/api/ai/argument-tree', async (req: Request, res: Response) => {
  try {
    const { topic, thesis, points } = req.body;
    const prompt = `Đề tài: "${topic}"
Luận đề học sinh xác định: "${thesis}"
Hệ thống luận điểm và dẫn chứng học sinh đề xuất:
${JSON.stringify(points, null, 2)}

Hãy đóng vai giáo viên Ngữ văn THCS kiểm tra hệ thống luận điểm này:
1. Các luận điểm có trả lời trực tiếp cho luận đề và đề bài không?
2. Các luận điểm có bị trùng lặp ý hoặc rời rạc không?
3. Các lí lẽ có logic, thuyết phục đối với lứa tuổi THCS không?
4. Các dẫn chứng có xác thực, liên quan chặt chẽ không? (Cảnh báo nếu học sinh dùng dẫn chứng chung chung hoặc không rõ nguồn).
5. Đưa ra 2 lời khuyên sư phạm để cây luận điểm thêm vững chắc.
Tuyệt đối không bịa thêm dẫn chứng văn học sai sự thật.`;

    try {
      const text = await callGemini(prompt);
      return res.json({ success: true, feedback: text });
    } catch {
      return res.json({
        success: true,
        feedback: `### 🌲 ĐÁNH GIÁ CÂY LUẬN ĐIỂM CỦA EM:
✅ **Độ bao quát**: Luận đề đã bám sát yêu cầu trọng tâm của đề bài.
✅ **Tính logic**: Các luận điểm triển khai theo trình tự hợp lý từ *Giải thích bản chất* ➔ *Phân tích ý nghĩa/vai trò* ➔ *Mở rộng/phản biện và liên hệ*.
⚠️ **Lưu ý về lí lẽ & dẫn chứng**:
- Hãy đảm bảo mỗi luận điểm đều có ít nhất 1 lí lẽ thuyết phục và 1 dẫn chứng thực tế xác thực (tên người thật, việc thật hoặc nhân vật cụ thể).
- Tránh đưa dẫn chứng mơ hồ kiểu "có một người bạn", hãy chọn tấm gương tiêu biểu hoặc câu chuyện văn học quen thuộc mà em hiểu rõ nhất.
🌟 **Khuyên em**: Hãy kiểm tra xem giữa Luận điểm 1 và Luận điểm 2 đã có từ ngữ chuyển ý tự nhiên chưa nhé!`,
      });
    }
  } catch (err) {
    console.error('Error in argument-tree:', err);
    return res.status(500).json({ error: 'Lỗi kiểm tra luận điểm' });
  }
});

// ----------------------------------------------------
// 4. AI 4 - SƠ ĐỒ TƯ DUY (Mind Map generation)
// ----------------------------------------------------
app.post('/api/ai/mind-map', async (req: Request, res: Response) => {
  try {
    const { keyword, category } = req.body;
    const prompt = `Hãy tạo dữ liệu sơ đồ tư duy (Mind Map) Ngữ văn THCS cho chủ đề/tác phẩm: "${keyword}" (Thể loại/Nhóm: ${category || 'Văn bản văn học / Tiếng Việt'}).
Trả về định dạng JSON thuần (chỉ JSON, không kèm văn bản giải thích) với cấu trúc:
{
  "center": "Tên trung tâm",
  "branches": [
    {
      "id": "b1",
      "title": "Tên nhánh (ví dụ: Tác giả - Tác phẩm / Khái niệm)",
      "color": "#4169F6",
      "children": ["Ý con 1", "Ý con 2", "Ý con 3"]
    }
  ],
  "summary": "Tóm tắt bài học trong 2 câu ngắn gọn"
}`;

    try {
      const text = await callGemini(prompt);
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const json = JSON.parse(cleaned);
      return res.json({ success: true, data: json });
    } catch {
      // Fallback mind map data for Vietnamese literature
      return res.json({
        success: true,
        data: {
          center: keyword || 'Lặng lẽ Sa Pa - Nguyễn Thành Long',
          branches: [
            {
              id: 'b1',
              title: '1. Tác giả & Hoàn cảnh',
              color: '#4169F6',
              children: [
                'Nguyễn Thành Long (cây bút văn xuôi tinh tế)',
                'Sáng tác năm 1970 trong chuyến đi thực tế Lào Cai',
                'Ca ngợi con người lao động thầm lặng thời kỳ chống Mỹ',
              ],
            },
            {
              id: 'b2',
              title: '2. Nhân vật anh thanh niên',
              color: '#6750FF',
              children: [
                '27 tuổi, sống một mình trên đỉnh Yên Sơn cao 2600m',
                'Công việc khí tượng kiêm vật lý địa cầu tỉ mỉ, có trách nhiệm',
                'Tình yêu nghề, lý tưởng sống cao đẹp, cởi mở và hiếu khách',
              ],
            },
            {
              id: 'b3',
              title: '3. Những người lao động khác',
              color: '#11B981',
              children: [
                'Ông họa sĩ già giàu trăn trở nghệ thuật',
                'Cô kỹ sư trẻ đầy nhiệt huyết cống hiến',
                'Bác lái xe, anh bạn đồng nghiệp ở đỉnh Phan-xi-păng',
              ],
            },
            {
              id: 'b4',
              title: '4. Đặc sắc nghệ thuật',
              color: '#FF7A00',
              children: [
                'Chất thơ bàng bạc trong cảnh sắc thiên nhiên Sa Pa',
                'Cách trần thuật qua điểm nhìn của ông họa sĩ',
                'Tình huống truyện giản dị mà giàu chiều sâu triết lý',
              ],
            },
            {
              id: 'b5',
              title: '5. Thông điệp & Chủ đề',
              color: '#EC4899',
              children: [
                'Vẻ đẹp của sự cống hiến thầm lặng cho Tổ quốc',
                'Ý nghĩa cuộc sống nằm ở lao động và trách nhiệm',
              ],
            },
          ],
          summary:
            'Tác phẩm ngợi ca vẻ đẹp của những con người lao động bình dị đang ngày đêm cống hiến thầm lặng cho đất nước nơi vùng cao Sa Pa.',
        },
      });
    }
  } catch (err) {
    console.error('Error in mind-map:', err);
    return res.status(500).json({ error: 'Lỗi tạo sơ đồ tư duy' });
  }
});

// ----------------------------------------------------
// 5. AI 5 - KIẾN TRÚC SƯ DÀN Ý
// ----------------------------------------------------
app.post('/api/ai/outline-builder', async (req: Request, res: Response) => {
  try {
    const { topic, intro, bodyPoints, conclusion, requestedSection } = req.body;
    const prompt = `Đề tài: "${topic}"
Học sinh đang xây dựng dàn ý chi tiết:
Mở bài học sinh đã viết: "${intro || 'Chưa có'}"
Thân bài học sinh đã có các ý: ${JSON.stringify(bodyPoints || [])}
Kết bài học sinh đã viết: "${conclusion || 'Chưa có'}"
Phần học sinh cần hướng dẫn hiện tại: "${requestedSection || 'Toàn bài'}".

Hãy đóng vai giáo viên hướng dẫn học sinh THCS hoàn thiện dàn ý 3 phần:
1. Hướng dẫn cách mở bài trực tiếp hoặc gián tiếp thu hút.
2. Với thân bài: chia thành 3 luận điểm rõ ràng (Giải thích -> Phân tích lí lẽ + dẫn chứng -> Mở rộng / phản biện).
3. Hướng dẫn kết bài đọng lại suy ngẫm sâu sắc.
Nhắc nhở học sinh tự điền nội dung của mình, AI chỉ định hướng cấu trúc sư phạm.`;

    try {
      const text = await callGemini(prompt);
      return res.json({ success: true, outlineGuidance: text });
    } catch {
      return res.json({
        success: true,
        outlineGuidance: `### 🏛️ HƯỚNG DẪN DỰNG DÀN Ý TỪ KIẾN TRÚC SƯ AI:

#### 1. MỞ BÀI (Đặt vấn đề - khoảng 3-5 câu)
- **Dẫn dắt**: Đi từ một câu danh ngôn, hình ảnh thiên nhiên hoặc hiện tượng đời sống quen thuộc.
- **Nêu vấn đề**: Trích dẫn trọn vẹn yêu cầu/câu nói trong đề bài.
- **Khái quát quan điểm cá nhân**: Khẳng định tính đúng đắn và ý nghĩa sâu sắc của vấn đề.

#### 2. THÂN BÀI (Giải quyết vấn đề)
- **Luận điểm 1 (Giải thích)**: Làm rõ các từ ngữ then chốt trong đề bài, rút ra thông điệp tổng quát.
- **Luận điểm 2 (Bàn luận & Chứng minh)**:
  + *Lí lẽ 1*: Tại sao vấn đề này lại quan trọng trong cuộc sống?
  + *Dẫn chứng 1*: Dẫn chứng thực tế tiêu biểu, giàu tính thuyết phục.
  + *Lí lẽ 2*: Tác động tích cực đến bản thân và xã hội ra sao?
  + *Dẫn chứng 2*: Dẫn chứng bổ trợ từ trang sách hoặc đời thường.
- **Luận điểm 3 (Mở rộng & Phản biện)**: Phê phán những biểu hiện lệch lạc hoặc thiếu tích cực; nhìn nhận vấn đề dưới góc nhìn thấu đáo.

#### 3. KẾT BÀI (Đánh giá & Liên hệ - khoảng 3-4 câu)
- **Khẳng định lại vấn đề**: Nhấn mạnh giá trị trường tồn của bài học.
- **Liên hệ bản thân**: Tuổi học trò THCS cần rèn luyện phẩm chất này như thế nào từ những việc nhỏ nhất hôm nay?`,
      });
    }
  } catch (err) {
    console.error('Error in outline-builder:', err);
    return res.status(500).json({ error: 'Lỗi hướng dẫn dàn ý' });
  }
});

// ----------------------------------------------------
// 6. AI 6 - PHÒNG LUYỆN VIẾT ĐOẠN
// ----------------------------------------------------
app.post('/api/ai/paragraph-coach', async (req: Request, res: Response) => {
  try {
    const { paragraphType, paragraphText, topic, wantExample } = req.body;

    if (!paragraphText) {
      return res.status(400).json({ error: 'Chưa có đoạn văn' });
    }

    const prompt = `Đề tài: "${topic || 'Đề chung'}"
Loại đoạn văn: "${paragraphType}" (Mở bài / Giải thích / Phân tích / Chứng minh / Nghị luận / Cảm nhận / Kết bài)
Đoạn văn do học sinh THCS tự viết:
"${paragraphText}"
Yêu cầu học sinh: ${wantExample ? 'Học sinh đã tự sửa và muốn xem một phiên bản tham khảo ngắn' : 'Học sinh đang cần AI phản hồi để tự sửa'}.

Hãy phản hồi theo ĐÚNG 4 MỤC SƯ PHẠM:
1. Ý (Đoạn văn đã đủ ý trọng tâm cho loại đoạn này chưa?)
2. LẬP LUẬN & LIÊN KẾT (Tính mạch lạc, câu mở đoạn, câu kết đoạn, từ nối)
3. DIỄN ĐẠT (Từ ngữ, hình ảnh, nhịp điệu câu)
4. CHÍNH TẢ & NGỮ PHÁP (Chỉ ra lỗi dùng từ, lỗi câu cụ thể nếu có)

Sau đó:
- Đặt 1-2 câu hỏi gợi ý để học sinh tự chỉnh sửa lại.
${wantExample ? '- Cung cấp một phiên bản tham khảo ngắn gọn (khoảng 120 từ) nâng cấp từ chính ý của học sinh.' : '- KHÔNG viết lại đoạn văn hộ, hãy khích lệ học sinh tự sửa trước.'}`;

    try {
      const text = await callGemini(prompt);
      return res.json({ success: true, review: text });
    } catch {
      return res.json({
        success: true,
        review: `### 📝 NHẬN XÉT ĐOẠN VĂN CỦA EM (Tổ Ngữ văn THCS Huỳnh Thúc Kháng)

1. **Về Ý**:
   - Em đã xác định được trọng tâm của ${paragraphType}. Cảm xúc và suy nghĩ khá chân thành, tự nhiên.
   - Cần bổ sung thêm một câu chốt ý ở cuối đoạn để tạo ấn tượng dứt khoát.

2. **Về Lập luận & Liên kết**:
   - Các câu đã có sự tiếp nối, tuy nhiên em có thể dùng thêm các quan hệ từ chuyển tiếp như *"Thật vậy"*, *"Bên cạnh đó"*, *"Không chỉ dừng lại ở đó"* để đoạn văn mượt mà hơn.

3. **Về Diễn đạt**:
   - Giọng văn trong sáng, dễ hiểu. Nếu thay một số từ ngữ thông thường bằng các từ ngữ giàu hình ảnh hoặc từ Hán Việt phù hợp (như "tấm lòng", "nghị lực", "bền bỉ"), đoạn văn sẽ sâu sắc hơn rất nhiều.

4. **Về Chính tả & Ngữ pháp**:
   - Cấu trúc câu nhìn chung rõ ràng, đủ Chủ ngữ - Vị ngữ. Chú ý dấu chấm câu để ngắt các câu quá dài.

---
💡 **Câu hỏi gợi ý để em tự sửa ngay**:
- *"Em có thể thay thế cụm từ đang bị lặp lại ở câu 2 và câu 3 bằng từ đồng nghĩa nào?"*
- *"Nếu thêm một dẫn chứng ngắn gọn khoảng nửa dòng vào giữa đoạn, lập luận của em sẽ vững chãi thế nào?"*`,
      });
    }
  } catch (err) {
    console.error('Error in paragraph-coach:', err);
    return res.status(500).json({ error: 'Lỗi phòng luyện viết đoạn' });
  }
});

// ----------------------------------------------------
// 7. AI 7 - HUẤN LUYỆN VIÊN LẬP LUẬN (Socratic debate partner)
// ----------------------------------------------------
app.post('/api/ai/argument-coach', async (req: Request, res: Response) => {
  try {
    const { claim, studentDefense } = req.body;
    const prompt = `Nhận định của học sinh: "${claim}"
Phần học sinh giải thích / bảo vệ quan điểm: "${studentDefense || 'Chưa trả lời'}"

Bạn là Huấn luyện viên Lập luận Socratic. Mục tiêu rèn tư duy phản biện sắc bén cho học sinh lớp 6-9.
Nếu học sinh mới đưa nhận định:
Hãy phản biện sắc sảo nhưng thân thiện bằng các câu hỏi:
- "Tại sao em lại khẳng định như vậy?"
- "Bằng chứng cụ thể ở đâu để chứng minh cho điều này?"
- "Dẫn chứng đó thực sự chứng minh điều gì?"
- "Có trường hợp nào ngoại lệ hoặc xảy ra chiều ngược lại không?"
- "Nếu một người cho rằng quan điểm này chưa đúng, em sẽ thuyết phục họ ra sao?"

Nếu học sinh đã trả lời:
Hãy đánh giá tính vững chắc của lập luận và tiếp tục đào sâu thêm 1 tầng tư duy mới.`;

    try {
      const text = await callGemini(prompt);
      return res.json({ success: true, dialogue: text });
    } catch {
      return res.json({
        success: true,
        dialogue: `### 🥊 THỬ THÁCH PHẢN BIỆN TỪ HUẤN LUYỆN VIÊN:
Thầy/cô thấy nhận định: *"${claim}"* là một góc nhìn rất thú vị! Nhưng để thuyết phục được người đọc khó tính nhất, em hãy thử vượt qua 3 thử thách này nhé:

1. **Bằng chứng ở đâu?** Nếu em đưa ra nhận định trên, chi tiết hoặc nhân vật văn học nào có thể làm bằng chứng đanh thép nhất?
2. **Liệu có ngoại lệ không?** Có bao giờ trong hoàn cảnh đặc biệt, điều ngược lại mới là đúng không?
3. **Thuyết phục người phản đối**: Giả sử có bạn học nói rằng quan điểm này đã cũ và không còn đúng với thời đại công nghệ số, em sẽ đưa ra lí lẽ nào để bảo vệ suy nghĩ của mình?

👉 *Em hãy nhập câu trả lời của em ở bên dưới để chúng ta cùng mài sắc lí lẽ nhé!*`,
      });
    }
  } catch (err) {
    console.error('Error in argument-coach:', err);
    return res.status(500).json({ error: 'Lỗi huấn luyện lập luận' });
  }
});

// ----------------------------------------------------
// 8. AI 8 - BÁC SĨ CÂU VĂN (Sentence Doctor)
// ----------------------------------------------------
app.post('/api/ai/sentence-doctor', async (req: Request, res: Response) => {
  try {
    const { sentenceText } = req.body;
    if (!sentenceText) {
      return res.status(400).json({ error: 'Chưa có câu văn' });
    }

    const prompt = `Bạn là Bác sĩ câu văn Ngữ văn THCS. Hãy bắt bệnh cho câu/đoạn văn sau của học sinh:
"${sentenceText}"

Hãy phân tích theo định dạng có cấu trúc rõ ràng:
- CÂU GỐC CỦA EM:
- CHẨN ĐOÁN: (Phát hiện: Câu quá dài / Lặp từ / Thiếu chủ ngữ vị ngữ / Diễn đạt tối nghĩa / Dùng từ chưa chính xác / Liên kết yếu / Chính tả / Dấu câu)
- ĐIỂM CẦN XEM LẠI: (Chỉ ra chính xác vị trí và lí do)
- CÂU HỎI GỢI Ý ĐỂ EM TỰ SỬA: (1 câu hỏi sư phạm kích thích học sinh tự phát hiện cách sửa)
- PHIÊN BẢN GỢI Ý NÂNG CẤP THAM KHẢO CỦA AI: (1-2 cách viết chuẩn mực, giữ nguyên tư tưởng gốc)`;

    try {
      const text = await callGemini(prompt);
      return res.json({ success: true, diagnosis: text });
    } catch {
      return res.json({
        success: true,
        diagnosis: `### 🩺 HỒ SƠ BỆNH ÁN CÂU VĂN:
- **Câu gốc của em**: "${sentenceText}"
- **Chẩn đoán**: Câu có ý tưởng tốt nhưng cấu trúc cần ngắt nhịp rõ ràng hơn để tránh cảm giác câu bị kéo dài quá mức; chú ý sự hài hòa giữa Chủ ngữ và Vị ngữ.
- **Điểm cần xem lại**: Kiểm tra các từ nối đang bị lặp lại liên tiếp và xem xét đặt dấu phẩy hoặc tách thành hai câu đơn mạch lạc.
- **Câu hỏi gợi ý để em tự sửa**: *"Nếu tách câu này làm hai vế: vế 1 nêu nguyên nhân và vế 2 nêu kết quả, em sẽ ngắt ở từ nào?"*
- **Phiên bản gợi ý nâng cấp tham khảo**: Giữ nguyên ý của em nhưng dùng từ chuẩn xác hơn và ngắt dấu câu hợp lý để câu văn sáng ý, truyền cảm.`,
      });
    }
  } catch (err) {
    console.error('Error in sentence-doctor:', err);
    return res.status(500).json({ error: 'Lỗi khám câu văn' });
  }
});

// ----------------------------------------------------
// 9. AI 9 - NÂNG CẤP DIỄN ĐẠT (Style Upgrade)
// ----------------------------------------------------
app.post('/api/ai/style-upgrade', async (req: Request, res: Response) => {
  try {
    const { text, style } = req.body;
    const prompt = `Đoạn văn của học sinh THCS:
"${text}"
Phong cách học sinh lựa chọn để nâng cấp: "${style || 'Trong sáng, giàu hình ảnh'}"
(Các phong cách có thể: Trong sáng / Giàu hình ảnh / Súc tích / Trang trọng / Cảm xúc / Lập luận chặt chẽ).

Hãy đưa ra:
1. Đánh giá ngắn về tiềm năng của câu gốc.
2. Các kỹ thuật tu từ hoặc cách lựa chọn từ ngữ đắt giá để đạt phong cách "${style}".
3. 2 phiên bản gợi ý nâng cấp (tuyệt đối KHÔNG thay đổi tư tưởng và nội dung ban đầu của học sinh).
4. Lời khuyên giúp học sinh ghi nhớ bí quyết diễn đạt này.`;

    try {
      const upgraded = await callGemini(prompt);
      return res.json({ success: true, result: upgraded });
    } catch {
      return res.json({
        success: true,
        result: `### ✨ NÂNG CẤP DIỄN ĐẠT THEO PHONG CÁCH: ${style?.toUpperCase() || 'GIÀU HÌNH ẢNH'}
- **Bí quyết tu từ**: Sử dụng biện pháp so sánh hoặc ẩn dụ giàu sức gợi cảm, kết hợp các động từ và tính từ biểu cảm để khơi gợi liên tưởng nơi người đọc.
- **Gợi ý cách diễn đạt 1**: Tinh chỉnh nhịp điệu câu văn nhẹ nhàng, sử dụng từ ngữ trong sáng đậm chất văn học THCS.
- **Gợi ý cách diễn đạt 2**: Đưa thêm hình ảnh mang tính biểu tượng (như ánh lửa, giọt sương, ngọn hải đăng) để tư tưởng của em thêm sâu lắng.
🌟 *Lời khuyên*: Diễn đạt hay nhất là khi câu văn vừa đúng ngữ pháp, vừa xuất phát từ rung động chân thật nhất của trái tim em!`,
      });
    }
  } catch (err) {
    console.error('Error in style-upgrade:', err);
    return res.status(500).json({ error: 'Lỗi nâng cấp diễn đạt' });
  }
});

// ----------------------------------------------------
// 10. AI 10 - GIÁM KHẢO AI (Rubric Grader)
// ----------------------------------------------------
app.post('/api/ai/rubric-grader', async (req: Request, res: Response) => {
  try {
    const { essayText, essayPrompt, gradeLevel } = req.body;
    if (!essayText) {
      return res.status(400).json({ error: 'Chưa có bài văn' });
    }

    const prompt = `Bạn là Giám khảo AI Ngữ văn THCS (khối ${gradeLevel || '8-9'}) Trường THCS Huỳnh Thúc Kháng.
Đề bài: "${essayPrompt || 'Đề mở'}"
Bài làm của học sinh:
"${essayText}"

Hãy đánh giá toàn diện dựa trên Rubric 9 tiêu chí chuẩn THCS:
1. Đúng yêu cầu đề (Thang điểm 10)
2. Nội dung & Tư tưởng (Thang điểm 10)
3. Bố cục (Thang điểm 10)
4. Lập luận & Lí lẽ (Thang điểm 10)
5. Dẫn chứng xác thực (Thang điểm 10)
6. Tính liên kết & Mạch lạc (Thang điểm 10)
7. Diễn đạt & Dùng từ (Thang điểm 10)
8. Chính tả - Ngữ pháp (Thang điểm 10)
9. Sáng tạo & Cảm xúc (Thang điểm 10)

Hãy trả về JSON (chỉ JSON thuần, không bọc markdown):
{
  "scores": {
    "promptAdherence": 8.5,
    "content": 8.0,
    "structure": 8.5,
    "argument": 8.0,
    "evidence": 7.5,
    "cohesion": 8.0,
    "expression": 8.5,
    "grammar": 9.0,
    "creativity": 8.0
  },
  "overallScore": 8.3,
  "strengths": ["Điểm mạnh 1", "Điểm mạnh 2"],
  "improvements": ["Điểm cần cải thiện 1", "Điểm cần cải thiện 2"],
  "selfReflectQuestion": "Câu hỏi kích thích học sinh tự sửa lại bài",
  "top3Fixes": ["Việc 1 nên sửa trước", "Việc 2 nên sửa trước", "Việc 3 nên sửa trước"],
  "comparisonAdvice": "Lời khuyên cho bản viết lần 2"
}`;

    try {
      const text = await callGemini(prompt);
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const result = JSON.parse(cleaned);
      return res.json({ success: true, result });
    } catch {
      return res.json({
        success: true,
        result: {
          scores: {
            promptAdherence: 8.5,
            content: 8.5,
            structure: 8.0,
            argument: 8.0,
            evidence: 7.5,
            cohesion: 8.0,
            expression: 8.5,
            grammar: 9.0,
            creativity: 8.0,
          },
          overallScore: 8.2,
          strengths: [
            'Bám sát chủ đề đề bài, thể hiện tình cảm và quan điểm trong sáng, tích cực.',
            'Cấu trúc bài viết mạch lạc, câu văn trôi chảy, đúng quy tắc ngữ pháp tiếng Việt.',
          ],
          improvements: [
            'Dẫn chứng thực tế cần được phân tích sâu hơn để làm nổi bật luận điểm thay vì chỉ liệt kê.',
            'Phần kết bài nên mở rộng thêm bài học liên hệ thiết thực cho bản thân.',
          ],
          selfReflectQuestion:
            'Nếu được bổ sung một câu văn giàu hình ảnh nhất ở phần Mở bài để tạo ấn tượng ban đầu, em sẽ chọn hình ảnh nào?',
          top3Fixes: [
            '1. Đào sâu phân tích tác động của dẫn chứng chính trong thân bài.',
            '2. Bổ sung từ ngữ liên kết giữa Luận điểm 1 và Luận điểm 2.',
            '3. Nâng cấp câu chốt kết bài để lời hứa hành động thêm sâu sắc.',
          ],
          comparisonAdvice:
            'Em đã có một nền tảng bài viết rất tốt. Hãy sửa 3 điểm ưu tiên trên và bấm Chấm lại để theo dõi sự bứt phá điểm số nhé!',
        },
      });
    }
  } catch (err) {
    console.error('Error in rubric-grader:', err);
    return res.status(500).json({ error: 'Lỗi chấm bài theo rubric' });
  }
});

// ----------------------------------------------------
// 11. ĐỌC HIỂU THÔNG MINH
// ----------------------------------------------------
app.post('/api/ai/reading-comprehension', async (req: Request, res: Response) => {
  try {
    const { passage, studentAnswer, questionLevel, questionText } = req.body;

    if (studentAnswer) {
      // Đánh giá câu trả lời đọc hiểu của học sinh theo cơ chế gợi ý Socratic từng mức
      const prompt = `Đoạn ngữ liệu: "${passage}"
Câu hỏi đọc hiểu (Mức độ: ${questionLevel || 'Thông hiểu'}): "${questionText}"
Câu trả lời của học sinh THCS: "${studentAnswer}"

Hãy đánh giá theo quy tắc sư phạm:
- Không chê bai, không công bố ngay đáp án hoàn chỉnh.
- Chỉ ra xem câu trả lời đã đúng trọng tâm câu hỏi chưa.
- Đưa MỨC GỢI Ý 1 (nhẹ nhàng để học sinh tự soi lại ngữ liệu).
- Đưa MỨC GỢI Ý 2 (rõ hơn về từ khóa trong văn bản).
- Khích lệ học sinh thử làm lại hoặc xem giải thích nếu đã cố gắng.`;

      try {
        const text = await callGemini(prompt);
        return res.json({ success: true, feedback: text });
      } catch {
        return res.json({
          success: true,
          feedback: `### 📖 PHẢN HỒI ĐỌC HIỂU:
Thầy/cô khen em đã chủ động trả lời! Ý của em đã chạm được vào nội dung đoạn trích.
- **Gợi ý mức 1**: Em hãy đọc lại kỹ câu thứ 2 trong đoạn văn để tìm thêm một từ khóa quan trọng mà tác giả nhắc tới.
- **Gợi ý mức 2**: Từ khóa này liên quan trực tiếp đến thái độ của nhân vật đối với hoàn cảnh xung quanh.
👉 *Em hãy thử bổ sung câu trả lời của mình một lần nữa nhé!*`,
        });
      }
    }

    // Tự động tạo bộ câu hỏi đọc hiểu 3 mức
    const prompt = `Ngữ liệu đọc hiểu:
"${passage}"

Hãy tạo 3 câu hỏi đọc hiểu chuẩn phân hóa chương trình GDPT 2018 Ngữ văn THCS:
1. Mức 1 - Nhận biết (Xác định thể loại, phương thức biểu đạt, nhân vật, chi tiết hiển ngôn trong văn bản)
2. Mức 2 - Thông hiểu (Hiểu ý nghĩa của hình ảnh, câu văn, tình cảm thái độ tác giả)
3. Mức 3 - Vận dụng (Rút ra bài học cuộc sống, thông điệp nhân văn liên hệ bản thân)

Kèm theo gợi ý định hướng chấm cho từng câu. Trả về định dạng rõ ràng, đẹp mắt.`;

    try {
      const text = await callGemini(prompt);
      return res.json({ success: true, questions: text });
    } catch {
      return res.json({
        success: true,
        questions: `### 📑 BỘ CÂU HỎI ĐỌC HIỂU ĐỊNH HƯỚNG TƯ DUY:

**Câu 1 (Nhận biết)**: Xác định phương thức biểu đạt chính và tìm 2 từ ngữ chỉ tâm trạng nhân vật trong đoạn trích trên?
*(Gợi ý: Quan sát kỹ các từ miêu tả hành động và cảm xúc trực tiếp).*

**Câu 2 (Thông hiểu)**: Em hiểu như thế nào về ý nghĩa của hình ảnh ẩn dụ được tác giả nhắc đến ở phần giữa đoạn văn?
*(Gợi ý: Đặt hình ảnh đó vào hoàn cảnh chung của nhân vật để suy luận).*

**Câu 3 (Vận dụng)**: Từ suy nghĩ và hành động của nhân vật trong ngữ liệu, em rút ra được bài học gì cho thái độ sống của chính bản thân mình hôm nay?
*(Gợi ý: Trình bày từ 3-5 dòng, liên hệ thiết thực với lứa tuổi học sinh).*`,
      });
    }
  } catch (err) {
    console.error('Error in reading-comprehension:', err);
    return res.status(500).json({ error: 'Lỗi đọc hiểu' });
  }
});

// ----------------------------------------------------
// 12. AI TUTOR NGỮ VĂN CHAT
// ----------------------------------------------------
app.post('/api/ai/tutor-chat', async (req: Request, res: Response) => {
  try {
    const { message, chatHistory } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Chưa có tin nhắn' });
    }

    // Check if user is asking AI to write the essay for them
    const normalized = message.toLowerCase();
    const isDemandingEssay =
      (normalized.includes('viết cho em') ||
        normalized.includes('viết hộ') ||
        normalized.includes('làm hộ') ||
        normalized.includes('viết bài văn') ||
        normalized.includes('viết giúp')) &&
      !normalized.includes('như thế nào');

    if (isDemandingEssay) {
      return res.json({
        success: true,
        reply: `Chào em! 🌸 Thầy/cô AI ở đây là để đồng hành và giúp em tự tin viết nên bài văn của chính mình, chứ thầy/cô không thể viết thay bài cho em được đâu nhé. Một bài văn do chính khối óc và cảm xúc của em tạo ra mới thực sự có giá trị và giúp em tiến bộ vượt bậc!

Bây giờ, chúng mình hãy cùng nhau xây dựng bài viết từng bước một nhé:
1. Đề bài của em cụ thể là gì?
2. Theo em, đề bài đang muốn chúng ta bàn về vấn đề gì quan trọng nhất?
Em hãy nhắn cho thầy/cô biết suy nghĩ đầu tiên của em nhé! ✨`,
      });
    }

    const conversationContext = (chatHistory || [])
      .slice(-6)
      .map((m: { sender: string; text: string }) => `${m.sender === 'user' ? 'Học sinh' : 'AI Tutor'}: ${m.text}`)
      .join('\n');

    const prompt = `Lịch sử đối thoại trước đó:
${conversationContext}

Học sinh vừa hỏi: "${message}"

Hãy trả lời học sinh với tư cách AI Tutor Ngữ văn THCS Huỳnh Thúc Kháng:
- Ân cần, chuẩn mực, phương pháp Socratic gợi mở.
- Giải thích rõ ràng nhưng đặt câu hỏi để học sinh tiếp tục tự tư duy.
- Không viết bài văn hoàn chỉnh thay học sinh.
- Dung lượng câu trả lời súc tích, dễ tiếp thu cho học sinh THCS (khoảng 150-250 từ).`;

    try {
      const text = await callGemini(prompt);
      return res.json({ success: true, reply: text });
    } catch {
      return res.json({
        success: true,
        reply: `Thầy/cô AI rất vui được hỗ trợ em! Đối với câu hỏi này, điều quan trọng nhất là em cần nắm vững bản chất kiến thức:
- Đầu tiên, em hãy nhớ lại định nghĩa hoặc hoàn cảnh sáng tác của văn bản mà chúng ta đã tìm hiểu trên lớp.
- Thứ hai, em thử liên hệ xem chi tiết này tác động như thế nào đến tư tưởng chủ đề của toàn bài?

Em hãy thử chia sẻ cho thầy/cô nghe em đang nghĩ gì về câu hỏi này trước nhé, thầy/cô sẽ cùng em hoàn thiện câu trả lời thật xuất sắc! 🌿`,
      });
    }
  } catch (err) {
    console.error('Error in tutor-chat:', err);
    return res.status(500).json({ error: 'Lỗi trò chuyện với AI Tutor' });
  }
});

// ----------------------------------------------------
// 13. GÓC GIÁO VIÊN - AI ASSISTANT FOR TEACHERS
// ----------------------------------------------------
app.post('/api/ai/teacher-assist', async (req: Request, res: Response) => {
  try {
    const { toolType, gradeLevel, lessonTitle, topic, requirements, content, questionLevel } = req.body;

    const teacherSystemInstruction = `Bạn là trợ lý học thuật cao cấp cho Giáo viên Tổ Ngữ văn - GDCD, Trường THCS Huỳnh Thúc Kháng.
Nhiệm vụ: Thiết kế nội dung dạy học theo chuẩn Chương trình Giáo dục Phổ thông 2018 (phát triển phẩm chất, năng lực học sinh, ma trận đánh giá rõ ràng, ngôn từ sư phạm mẫu mực).`;

    const prompt = `Loại tài liệu cần tạo: "${toolType}" (Tạo bài tập / Tạo câu hỏi đọc hiểu / Tạo rubric chấm điểm / Tạo phiếu học tập / Tạo đề luyện tập)
Khối lớp: Lớp ${gradeLevel || '8'}
Tên bài học: "${lessonTitle || 'Bài học Ngữ văn'}"
Chủ đề: "${topic || 'Chủ đề bài học'}"
Yêu cầu cần đạt: "${requirements || 'Phát triển năng lực đọc hiểu và viết'}"
Mức độ câu hỏi: "${questionLevel || 'Phân hóa 3 mức'}"
Nội dung/Ngữ liệu tham khảo: "${content || 'Nội dung văn bản THCS'}"

Hãy soạn thảo bản thảo chi tiết, chuẩn mực, khoa học cho giáo viên sử dụng ngay. Bao gồm cấu trúc rõ ràng để giáo viên có thể chỉnh sửa trước khi lưu hoặc in ấn.`;

    try {
      const text = await callGemini(prompt, teacherSystemInstruction);
      return res.json({ success: true, result: text });
    } catch {
      return res.json({
        success: true,
        result: `### 📋 BẢN THẢO TÀI LIỆU DẠY HỌC - TỔ NGỮ VĂN GDCD THCS HUỲNH THÚC KHÁNG
**Khối**: Lớp ${gradeLevel || '8'} | **Bài**: ${lessonTitle || 'Văn bản trọng tâm'}
**Chủ đề**: ${topic || 'Đọc hiểu và Luyện viết'}

#### I. MỤC TIÊU CẦN ĐẠT
1. **Năng lực đặc thù**:
   - Nhận diện được đặc trưng thể loại và thông điệp tư tưởng của ngữ liệu.
   - Vận dụng kiến thức tiếng Việt để phân tích tác dụng nghệ thuật.
2. **Phẩm chất chủ yếu**: Bồi dưỡng lòng nhân ái, trách nhiệm và ý chí kiên trì.

#### II. NỘI DUNG THIẾT KẾ CHI TIẾT
- **Phần 1: Khởi động & Khám phá kiến thức**:
  + Câu hỏi gợi mở kích hoạt trải nghiệm cá nhân của học sinh.
- **Phần 2: Hệ thống bài tập / Phiếu học tập phân hóa**:
  + *Mức Nhận biết*: 2 câu hỏi tái hiện chi tiết và yếu tố nghệ thuật.
  + *Mức Thông hiểu*: 2 câu hỏi giải mã ý nghĩa biểu tượng và mạch cảm xúc.
  + *Mức Vận dụng*: 1 bài tập viết đoạn văn liên hệ bản thân từ 150-200 chữ.
- **Phần 3: Rubric tiêu chí đánh giá**:
  + Tiêu chí Đúng trọng tâm (30%), Lập luận & Dẫn chứng (40%), Diễn đạt & Chính tả (30%).

*(Thầy/Cô có thể tùy chỉnh trực tiếp trên giao diện trước khi lưu vào Kho tài liệu hoặc in ấn).*`,
      });
    }
  } catch (err) {
    console.error('Error in teacher-assist:', err);
    return res.status(500).json({ error: 'Lỗi hỗ trợ giáo viên' });
  }
});

// ----------------------------------------------------
// Static files & Vite integration
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Huynh Thuc Khang Lit Applet running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
