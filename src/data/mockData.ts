import {
  UserProfile,
  BadgeItem,
  ReadingText,
  GameQuestionItem,
  GradeCurriculum,
} from '../types';

export const initialUserProfile: UserProfile = {
  name: 'Nguyễn Minh Khang',
  className: '8/2',
  school: 'THCS Huỳnh Thúc Kháng',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  totalExercises: 28,
  completedExercises: 22,
  streakDays: 5,
  avgScore: 8.6,
  studyHours: 34.5,
  unlockedBadges: ['b1', 'b2', 'b4', 'b7'],
};

export const badgesData: BadgeItem[] = [
  {
    id: 'b1',
    title: 'Nhà thám hiểm từ ngữ',
    description: 'Nắm vững và vận dụng xuất sắc 50 từ Hán - Việt và từ láy tượng hình.',
    icon: '🧭',
    unlocked: true,
  },
  {
    id: 'b2',
    title: 'Bậc thầy so sánh',
    description: 'Vận dụng thuần thục các biện pháp tu từ so sánh, ẩn dụ, hoán dụ trong bài văn.',
    icon: '✨',
    unlocked: true,
  },
  {
    id: 'b3',
    title: 'Hiệp sĩ luận điểm',
    description: 'Xây dựng cây luận điểm mạch lạc, liên kết chặt chẽ và không trùng lặp.',
    icon: '🛡️',
    unlocked: true,
  },
  {
    id: 'b4',
    title: 'Bác sĩ câu văn',
    description: 'Tự phát hiện và chữa thành công 10 câu văn mắc lỗi ngữ pháp, chính tả.',
    icon: '🩺',
    unlocked: true,
  },
  {
    id: 'b5',
    title: 'Cây bút Huỳnh Thúc Kháng',
    description: 'Đạt điểm 9.0+ trong bài tập làm văn nghị luận toàn diện do giáo viên giao.',
    icon: '🖋️',
    unlocked: false,
  },
  {
    id: 'b6',
    title: 'Nhà tư duy sâu sắc',
    description: 'Đưa ra góc nhìn phản biện đa chiều đầy thuyết phục cho một vấn đề thời sự.',
    icon: '🧠',
    unlocked: false,
  },
];

export const badgesList = badgesData;

export const curriculumData: GradeCurriculum[] = [
  {
    grade: 6,
    units: [
      {
        id: 'g6-u1',
        order: 1,
        title: 'Tôi và các bạn (Truyện đồng thoại)',
        description: 'Khám phá thế giới loài vật ngộ nghĩnh qua hình tượng Dế Mèn và bài học nhân ái sâu sắc.',
        readingPassages: ['Bài học đường đời đầu tiên (Tô Hoài)', 'Nếu cậu muốn có một người bạn (Saint-Exupéry)'],
        writingSkill: 'Viết bài văn kể lại một trải nghiệm đáng nhớ của bản thân',
        vietnamesePractice: 'Từ đơn và từ phức (Từ ghép, từ láy)',
        speakingListening: 'Kể lại một trải nghiệm đáng nhớ của bản thân trước tập thể lớp',
      },
      {
        id: 'g6-u2',
        order: 2,
        title: 'Gõ cửa trái tim (Thơ lục bát)',
        description: 'Cảm nhận vẻ đẹp tình cảm gia đình, quê hương qua giai điệu thiết tha của thể thơ truyền thống.',
        readingPassages: ['Chuyện cổ nước mình (Lâm Thị Mỹ Dạ)', 'À ơi tay mẹ (Bình Nguyên)'],
        writingSkill: 'Tập làm một bài thơ lục bát và viết đoạn văn ghi lại cảm xúc',
        vietnamesePractice: 'Biện pháp tu từ: So sánh và Điệp từ',
        speakingListening: 'Trình bày cảm xúc về một bài thơ lục bát giàu nhạc điệu',
      },
      {
        id: 'g6-u3',
        order: 3,
        title: 'Yêu thương và chia sẻ (Truyện ngắn)',
        description: 'Nuôi dưỡng lòng trắc ẩn và sự đồng cảm đối với những mảnh đời bất hạnh trong cuộc sống.',
        readingPassages: ['Cô bé bán diêm (An-đéc-xen)', 'Gió lạnh đầu mùa (Thạch Lam)'],
        writingSkill: 'Viết đoạn văn tóm tắt văn bản và cảm nghĩ về nhân vật',
        vietnamesePractice: 'Cụm danh từ, cụm động từ, cụm tính từ',
        speakingListening: 'Thảo luận về bài học sẻ chia đối với những hoàn cảnh khó khăn',
      },
      {
        id: 'g6-u4',
        order: 4,
        title: 'Quê hương yêu dấu (Văn bản thông tin & Kí)',
        description: 'Tự hào về danh lam thắng cảnh, di tích lịch sử và truyền thống văn hóa dân tộc.',
        readingPassages: ['Cô Tô (Nguyễn Tuân)', 'Hang Én (Hà My)'],
        writingSkill: 'Viết bài văn thuyết minh thuật lại một sự kiện hoặc lễ hội truyền thống',
        vietnamesePractice: 'Mở rộng thành phần chính của câu bằng cụm từ',
        speakingListening: 'Thuyết minh giới thiệu một nét đẹp văn hóa địa phương',
      },
    ],
  },
  {
    grade: 7,
    units: [
      {
        id: 'g7-u1',
        order: 1,
        title: 'Tiếng nói của vạn vật (Thơ bốn chữ, năm chữ)',
        description: 'Khám phá sự giao cảm kỳ diệu giữa con người với thiên nhiên, cỏ cây và mùa màng.',
        readingPassages: ['Lời của cây (Trần Đăng Khoa)', 'Sang thu (Hữu Thỉnh)'],
        writingSkill: 'Viết đoạn văn ghi lại cảm nghĩ về một bài thơ bốn chữ hoặc năm chữ',
        vietnamesePractice: 'Hình ảnh, vần và nhịp trong thơ bốn chữ, năm chữ',
        speakingListening: 'Tóm tắt ý chính do người khác trình bày trong buổi sinh hoạt',
      },
      {
        id: 'g7-u2',
        order: 2,
        title: 'Bài học cuộc sống (Truyện ngụ ngôn)',
        description: 'Rèn luyện trí tuệ, sự khiêm tốn và cách nhìn nhận khách quan qua các câu chuyện ngụ ngôn.',
        readingPassages: ['Ếch ngồi đáy giếng', 'Thầy bói xem voi', 'Đeo nhạc cho mèo'],
        writingSkill: 'Viết bài văn kể lại một truyện ngụ ngôn có sáng tạo chi tiết',
        vietnamesePractice: 'Thành ngữ và tục ngữ dân gian: nguồn gốc và ý nghĩa',
        speakingListening: 'Kể lại một truyện ngụ ngôn kết hợp ngôn ngữ hình thể sinh động',
      },
      {
        id: 'g7-u3',
        order: 3,
        title: 'Những góc nhìn văn chương (Nghị luận văn học)',
        description: 'Học cách thưởng thức và phân tích cái hay, cái đẹp của tác phẩm thơ văn kinh điển.',
        readingPassages: ['Em bé thông minh (Thái Hoàng)', 'Hình ảnh hoa sen trong bài ca dao (Phạm Đức Cương)'],
        writingSkill: 'Viết bài văn nghị luận phân tích một đặc điểm nhân vật trong tác phẩm',
        vietnamesePractice: 'Thuật ngữ và cách sử dụng thuật ngữ chính xác trong văn bản',
        speakingListening: 'Trình bày ý kiến về một vấn đề đời sống được gợi ra từ văn học',
      },
      {
        id: 'g7-u4',
        order: 4,
        title: 'Màu sắc trăm miền (Tùy bút, tản văn)',
        description: 'Thưởng thức phong vị ẩm thực, nét sinh hoạt đời thường mộc mạc mà thấm đẫm phong vị quê hương.',
        readingPassages: ['Cốm Vòng (Vũ Bằng)', 'Mùa thu về Trùng Khánh nghe hạt dẻ hát (Y Phương)'],
        writingSkill: 'Viết bài văn biểu cảm về con người hoặc sự việc giàu cảm xúc',
        vietnamesePractice: 'Biện pháp tu từ: Nói quá và Nói giảm nói tránh',
        speakingListening: 'Giới thiệu về một món ăn hoặc nét văn hóa đặc sắc quê em',
      },
    ],
  },
  {
    grade: 8,
    units: [
      {
        id: 'g8-u1',
        order: 1,
        title: 'Gương mặt thân yêu (Truyện ngắn hiện thực)',
        description: 'Thấu hiểu tình mẫu tử thiêng liêng, số phận người nghèo khổ và nhân cách cao đẹp trước Cách mạng.',
        readingPassages: ['Trong lòng mẹ (Nguyên Hồng)', 'Lão Hạc (Nam Cao)'],
        writingSkill: 'Viết bài văn nghị luận về một tư tưởng đạo lý hoặc hiện tượng đời sống',
        vietnamesePractice: 'Từ tượng hình, từ tượng thanh và các biện pháp liên kết câu',
        speakingListening: 'Trình bày ý kiến về việc nuôi dưỡng lòng hiếu thảo và sự sẻ chia trong gia đình',
      },
      {
        id: 'g8-u2',
        order: 2,
        title: 'Lắng nghe lịch sử nước mình (Văn bản thông tin & Lịch sử)',
        description: 'Tự hào về những trang sử hào hùng chống giặc ngoại xâm và ý chí quật cường của tiền nhân.',
        readingPassages: ['Hịch tướng sĩ (Trần Quốc Tuấn)', 'Nước Đại Việt ta (Nguyễn Trãi)'],
        writingSkill: 'Viết bài văn thuyết minh giải thích một hiện tượng tự nhiên hoặc di tích lịch sử',
        vietnamesePractice: 'Câu ghép, các kiểu quan hệ ý nghĩa giữa các vế trong câu ghép',
        speakingListening: 'Thuyết minh một di tích lịch sử - văn hóa của thành phố Đà Nẵng',
      },
      {
        id: 'g8-u3',
        order: 3,
        title: 'Khát vọng tự do (Thơ lãng mạn & Cách mạng)',
        description: 'Cảm nhận khát khao tự do mãnh liệt và tinh thần lạc quan cách mạng nơi ngục tù tối tăm.',
        readingPassages: ['Nhớ rừng (Thế Lữ)', 'Khi con tu hú (Tố Hữu)'],
        writingSkill: 'Viết đoạn văn ghi lại cảm nghĩ về một bài thơ tự do hoặc bài thơ tám chữ',
        vietnamesePractice: 'Các thành phần biệt lập trong câu (Tình thái, cảm thán, gọi - đáp)',
        speakingListening: 'Trình bày bài nói thuyết phục người khác từ bỏ một thói quen xấu',
      },
      {
        id: 'g8-u4',
        order: 4,
        title: 'Tiếng cười trào phúng (Hài kịch & Thơ trào phúng)',
        description: 'Phê phán những thói hư tật xấu, thói giả tạo trong xã hội thông qua tiếng cười hóm hỉnh, sâu cay.',
        readingPassages: ['Ông Giuốc-đanh mặc lễ phục (Mô-li-e)', 'Lai Tân (Hồ Chí Minh)'],
        writingSkill: 'Viết bài văn nghị luận về một vấn đề xã hội cần chấn chỉnh ở lứa tuổi học trò',
        vietnamesePractice: 'Biện pháp tu từ: Chơi chữ và Đảo ngữ',
        speakingListening: 'Thảo luận về vai trò của tính trung thực và văn hóa ứng xử trên mạng xã hội',
      },
    ],
  },
  {
    grade: 9,
    units: [
      {
        id: 'g9-u1',
        order: 1,
        title: 'Khúc tráng ca người lính (Thơ hiện đại)',
        description: 'Tôn vinh vẻ đẹp bình dị, tình đồng chí keo sơn và tinh thần quả cảm của bộ đội cụ Hồ.',
        readingPassages: ['Đồng chí (Chính Hữu)', 'Bài thơ về tiểu đội xe không kính (Phạm Tiến Duật)'],
        writingSkill: 'Viết bài văn nghị luận về một tác phẩm thơ (đoạn thơ hoặc bài thơ)',
        vietnamesePractice: 'Khởi ngữ và các thành phần biệt lập nâng cao',
        speakingListening: 'Trình bày cảm nghĩ về hình ảnh thế hệ trẻ Việt Nam thời kỳ kháng chiến cứu nước',
      },
      {
        id: 'g9-u2',
        order: 2,
        title: 'Vẻ đẹp con người lao động mới (Truyện ngắn)',
        description: 'Khúc ca ngợi ca những con người âm thầm cống hiến tuổi xuân cho sự nghiệp kiến thiết nước nhà.',
        readingPassages: ['Lặng lẽ Sa Pa (Nguyễn Thành Long)', 'Làng (Kim Lân)'],
        writingSkill: 'Viết bài văn nghị luận phân tích một nhân vật trong tác phẩm truyện',
        vietnamesePractice: 'Phép phân tích và tổng hợp trong lập luận văn bản',
        speakingListening: 'Thảo luận về lý tưởng sống cống hiến và trách nhiệm của tuổi trẻ hôm nay',
      },
      {
        id: 'g9-u3',
        order: 3,
        title: 'Ánh sáng nhân văn (Văn học trung đại)',
        description: 'Chiêm nghiệm vẻ đẹp nhân cách, tài năng và tấm lòng trắc ẩn của các bậc tiền nhân muôn thuở.',
        readingPassages: ['Truyện Kiều (Nguyễn Du)', 'Chuyện người con gái Nam Xương (Nguyễn Dữ)'],
        writingSkill: 'Viết bài văn thuyết minh về một danh nhân văn hóa kết hợp bình luận',
        vietnamesePractice: 'Các phương châm hội thoại (Lượng, chất, quan hệ, cách thức, lịch sự)',
        speakingListening: 'Tranh luận về quan niệm hạnh phúc và phẩm giá con người trong thời đại số',
      },
      {
        id: 'g9-u4',
        order: 4,
        title: 'Chinh phục kỳ thi Tuyển sinh Lớp 10',
        description: 'Tổng ôn tập toàn diện 3 phần: Đọc hiểu ngữ liệu mới, Nghị luận xã hội và Nghị luận văn học.',
        readingPassages: ['Ngữ liệu đọc hiểu mở rộng ngoài SGK', 'Các đề thi tuyển sinh 10 chính thức các năm'],
        writingSkill: 'Rèn luyện kỹ năng viết bài văn nghị luận hoàn chỉnh trong thời gian 90–120 phút',
        vietnamesePractice: 'Hệ thống hóa toàn bộ kiến thức Tiếng Việt THCS (Lớp 6–9)',
        speakingListening: 'Kỹ năng tự tin phỏng vấn và thuyết trình chuyên đề',
      },
    ],
  },
];

export const sampleReadingTexts: ReadingText[] = [
  {
    id: 'rt-1',
    title: 'Hạt gạo làng ta',
    author: 'Trần Đăng Khoa',
    grade: '7',
    passage: `Hạt gạo làng ta
Có vị phù sa
Của sông Kinh Thầy
Có hương sen thơm
Trong hồ nước đầy
Có lời mẹ hát
Ngọt bùi đắng cay...

Hạt gạo làng ta
Có bão tháng bảy
Có mưa tháng ba
Giọt mồ hôi sa
Những trưa tháng sáu
Nước như ai nấu
Chết cả cá cờ
Cua ngoi lên bờ
Mẹ em xuống cấy...`,
    questions: [
      {
        id: 'q1',
        level: 'Nhận biết',
        question: 'Tìm những hình ảnh thiên nhiên khắc nghiệt được tác giả nhắc đến trong khổ thơ thứ hai?',
        hint1: 'Hãy chú ý đến các từ chỉ thời tiết và nhiệt độ mùa hè.',
        hint2: 'Đó là "bão tháng bảy", "mưa tháng ba", "trưa tháng sáu" và hình ảnh nước nóng như ai nấu.',
        explanation: 'Khổ thơ tái hiện thiên nhiên khắc nghiệt: bão tháng bảy, mưa tháng ba, trưa hè gay gắt nước nóng làm chết cá cờ.',
        sampleAnswer: 'Những hình ảnh thiên nhiên khắc nghiệt là: bão tháng bảy, mưa tháng ba, nước như ai nấu chết cả cá cờ, cua ngoi lên bờ.',
      },
      {
        id: 'q2',
        level: 'Thông hiểu',
        question: 'Biện pháp đối lập trong hai câu thơ "Cua ngoi lên bờ / Mẹ em xuống cấy" có tác dụng biểu cảm gì?',
        hint1: 'Hãy so sánh phản ứng tránh nóng của con cua với hành động lao động của người mẹ.',
        hint2: 'Biện pháp đối lập làm nổi bật sự gian lao, đức hy sinh quên mình của người mẹ vì hạt gạo nuôi con.',
        explanation: 'Phép đối lập giữa con cua phải ngoi lên tránh nóng với người mẹ phải lội xuống nước nóng bỏng cấy lúa khắc họa sinh động sự vất vả, đức hy sinh thầm lặng của người nông dân.',
        sampleAnswer: 'Biện pháp đối lập làm nổi bật nỗi gian truân vất vả tột cùng của người mẹ; qua đó thể hiện tấm lòng biết ơn sâu nặng của người con đối với công lao trời biển của mẹ.',
      },
      {
        id: 'q3',
        level: 'Vận dụng',
        question: 'Từ bài thơ, em suy nghĩ gì về thái độ cần có của học sinh chúng ta đối với thành quả lao động của cha mẹ?',
        hint1: 'Liên hệ với sự trân trọng bữa cơm hàng ngày và ý thức rèn luyện.',
        hint2: 'Cần biết ơn, tiết kiệm, không lãng phí thức ăn và nỗ lực học tập để đền đáp công ơn.',
        explanation: 'Học sinh cần nhận thức giá trị mồ hôi nước mắt của cha mẹ, từ đó biết trân quý từng hạt gạo, sống tiết kiệm và chăm chỉ.',
        sampleAnswer: 'Chúng ta cần luôn trân trọng từng hạt cơm, không lãng phí thực phẩm, luôn thấu hiểu nỗi vất vả của cha mẹ và cố gắng học tập thật tốt để đền đáp công lao nuôi dưỡng.',
      },
    ],
  },
  {
    id: 'rt-2',
    title: 'Ý chí vươn lên từ bùn lầy',
    author: 'Trích Tản văn Tuổi Trẻ',
    grade: '8',
    passage: `Cây tre Việt Nam từ khi còn là mầm măng nhỏ bé đã phải chịu đựng sức nén của đất đai khô cằn và bóng tối dưới lòng đất sâu. Thế nhưng, măng không gục ngã; nó tích lũy từng giọt sương đêm, gom góp chút mùn đất ít ỏi để rồi một ngày kia bất ngờ đội đất vươn lên thẳng tắp. 
Con người chúng ta cũng vậy, không ai chọn được nơi mình sinh ra, nhưng ai cũng có quyền lựa chọn cách mình đứng lên trước nghịch cảnh. Gian nan không phải để vùi dập mà chính là ngọn lửa thử thách tôi luyện nên bản lĩnh kiên cường của tuổi trẻ.`,
    questions: [
      {
        id: 'q1',
        level: 'Nhận biết',
        question: 'Xác định phương thức biểu đạt chính và tìm câu văn mang luận điểm của đoạn trích trên?',
        hint1: 'Đoạn văn vừa miêu tả hình ảnh cây tre vừa bàn luận về bài học con người.',
        hint2: 'Phương thức chính là Nghị luận. Câu luận điểm thường nằm ở phần kết hoặc chuyển tiếp giữa tre và người.',
        explanation: 'Phương thức chính: Nghị luận. Câu mang luận điểm: "không ai chọn được nơi mình sinh ra, nhưng ai cũng có quyền lựa chọn cách mình đứng lên trước nghịch cảnh".',
        sampleAnswer: 'Phương thức biểu đạt chính: Nghị luận. Câu văn mang luận điểm: "không ai chọn được nơi mình sinh ra, nhưng ai cũng có quyền lựa chọn cách mình đứng lên trước nghịch cảnh".',
      },
      {
        id: 'q2',
        level: 'Thông hiểu',
        question: 'Em hiểu như thế nào về hình ảnh "măng gom góp chút mùn đất ít ỏi để đội đất vươn lên"?',
        hint1: 'Măng ở đây tượng trưng cho điều gì của con người?',
        hint2: 'Tượng trưng cho sự chắt chiu tri thức, nghị lực âm thầm tích lũy để chờ thời cơ bứt phá.',
        explanation: 'Hình ảnh ẩn dụ cho tinh thần tự lực tự cường, kiên trì tích lũy nội lực dù trong hoàn cảnh ngặt nghèo nhất.',
        sampleAnswer: 'Hình ảnh tượng trưng cho ý chí kiên nhẫn, âm thầm rèn luyện phẩm chất và tri thức để vượt qua nghịch cảnh vươn tới ánh sáng thành công.',
      },
      {
        id: 'q3',
        level: 'Vận dụng',
        question: 'Khi gặp phải một bài toán khó hoặc điểm số chưa như ý, em sẽ vận dụng thông điệp của đoạn trích này như thế nào?',
        hint1: 'Thay vì nản lòng, em sẽ có hành động cụ thể gì?',
        hint2: 'Tự soi lại thiếu sót, tìm kiếm sự giúp đỡ của thầy cô, bạn bè và kiên trì rèn luyện.',
        explanation: 'Vận dụng thực tế: không buông xuôi trước thất bại ban đầu mà coi đó là cơ hội để tìm ra phương pháp học tập hiệu quả hơn.',
        sampleAnswer: 'Em sẽ không buồn nản hay than vãn mà bình tĩnh xem lại chỗ sai, hỏi lại thầy cô hoặc bạn bè và kiên trì luyện tập thêm nhiều bài tương tự để biến khó khăn thành bài học tiến bộ.',
      },
    ],
  },
];

export const gameQuestions: GameQuestionItem[] = [
  {
    id: 'g1',
    category: 'tu-tu',
    question: 'Câu thơ sau sử dụng biện pháp tu từ gì: "Bàn tay ta làm nên tất cả / Có sức người sỏi đá cũng thành cơm"?',
    options: ['Hoán dụ', 'So sánh', 'Nói quá', 'Ẩn dụ'],
    correctAnswer: 2,
    points: 20,
    explanation: 'Biện pháp "Nói quá" (phóng đại khả năng "sỏi đá cũng thành cơm") nhằm khẳng định sức mạnh phi thường của bàn tay lao động con người.',
  },
  {
    id: 'g2',
    category: 'tu-tu',
    question: 'Trong câu: "Người Cha mái tóc bạc / Đốt lửa cho anh nằm", hình ảnh "Người Cha" là biện pháp tu từ nào?',
    options: ['Nhân hóa', 'Ẩn dụ', 'Hoán dụ', 'Chơi chữ'],
    correctAnswer: 1,
    points: 20,
    explanation: 'Biện pháp "Ẩn dụ phẩm chất" lấy hình ảnh Người Cha để chỉ Bác Hồ kính yêu với tình thương bao la chăm lo cho các chiến sĩ.',
  },
  {
    id: 'g3',
    category: 'lien-ket',
    question: 'Trong câu: "Vì trời mưa to nên đường trơn trượt", cặp từ "Vì... nên..." biểu thị quan hệ ý nghĩa gì?',
    options: ['Điều kiện - kết quả', 'Nguyên nhân - kết quả', 'Tương phản', 'Tăng tiến'],
    correctAnswer: 1,
    points: 15,
    explanation: 'Cặp quan hệ từ "Vì... nên..." chỉ mối quan hệ Nguyên nhân - Kết quả quen thuộc trong ngữ pháp tiếng Việt.',
  },
  {
    id: 'g4',
    category: 'ngu-phap',
    question: 'Câu văn nào sau đây mắc lỗi "thiếu chủ ngữ" do dùng sai quan hệ từ?',
    options: [
      'Qua bài thơ Đồng chí của Chính Hữu cho ta thấy tình cảm cao đẹp của người lính.',
      'Bài thơ Đồng chí của Chính Hữu cho ta thấy tình cảm cao đẹp của người lính.',
      'Người lính trong bài thơ Đồng chí hiện lên thật giản dị.',
      'Chúng ta rất trân trọng tình bạn thiêng liêng của các anh.',
    ],
    correctAnswer: 0,
    points: 25,
    explanation: 'Câu A bị biến thành phần trạng ngữ bằng từ "Qua...", khiến câu không còn Chủ ngữ chính.',
  },
  {
    id: 'g5',
    category: 'thanh-ngu',
    question: 'Từ ngữ nào sau đây viết ĐÚNG chính tả tiếng Việt?',
    options: ['Sơ suất', 'Sơ xuất', 'Xơ xuất', 'Xơ suất'],
    correctAnswer: 0,
    points: 15,
    explanation: '"Sơ suất" (với âm "s" ở sơ và "s" ở suất) có nghĩa là không cẩn thận, để xảy ra thiếu sót nhỏ.',
  },
  {
    id: 'g6',
    category: 'lien-ket',
    question: 'Trong câu ghép: "Tuy nhà xa nhưng Nam luôn đi học đúng giờ", cặp từ nối thể hiện quan hệ gì?',
    options: ['Nhượng bộ - tương phản', 'Nguyên nhân - kết quả', 'Mục đích', 'Liệt kê'],
    correctAnswer: 0,
    points: 15,
    explanation: 'Cặp từ "Tuy... nhưng..." diễn tả mối quan hệ nhượng bộ, tương phản giữa hai vế câu.',
  },
];

export const gameQuestionsList = gameQuestions;
