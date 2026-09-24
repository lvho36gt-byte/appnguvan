import React, { useState } from 'react';
import {
  Sparkles,
  HelpCircle,
  Lightbulb,
  GitPullRequest,
  GitFork,
  LayoutTemplate,
  FileEdit,
  ShieldCheck,
  Stethoscope,
  Wand2,
  Award,
  ArrowRight,
  Plus,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Send,
  Sliders,
  Flame,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ToastMessage } from '../components/Toast';

interface AiEcosystemViewProps {
  onAddToast: (toast: Omit<ToastMessage, 'id'>) => void;
  onNavigateToWorkspace?: () => void;
}

export const AiEcosystemView: React.FC<AiEcosystemViewProps> = ({
  onAddToast,
  onNavigateToWorkspace,
}) => {
  const [activeTool, setActiveTool] = useState<number>(1);

  // Tools Metadata
  const tools = [
    { id: 1, name: 'AI 1 – Hiểu đề', shortName: 'Hiểu đề', icon: HelpCircle, color: '#4169F6' },
    { id: 2, name: 'AI 2 – Khơi nguồn ý tưởng', shortName: 'Ý tưởng', icon: Lightbulb, color: '#FF7A00' },
    { id: 3, name: 'AI 3 – Cây luận điểm', shortName: 'Cây luận điểm', icon: GitPullRequest, color: '#11B981' },
    { id: 4, name: 'AI 4 – Sơ đồ tư duy', shortName: 'Sơ đồ tư duy', icon: GitFork, color: '#6750FF' },
    { id: 5, name: 'AI 5 – Kiến trúc sư dàn ý', shortName: 'Dàn ý', icon: LayoutTemplate, color: '#0284C7' },
    { id: 6, name: 'AI 6 – Luyện viết đoạn', shortName: 'Viết đoạn', icon: FileEdit, color: '#EC4899' },
    { id: 7, name: 'AI 7 – Huấn luyện lập luận', shortName: 'Lập luận', icon: ShieldCheck, color: '#EAB308' },
    { id: 8, name: 'AI 8 – Bác sĩ câu văn', shortName: 'Khám câu', icon: Stethoscope, color: '#06B6D4' },
    { id: 9, name: 'AI 9 – Nâng cấp diễn đạt', shortName: 'Diễn đạt', icon: Wand2, color: '#8B5CF6' },
    { id: 10, name: 'AI 10 – Giám khảo AI', shortName: 'Chấm Rubric', icon: Award, color: '#F43F5E' },
  ];

  // Tool 1 State: Hiểu đề
  const [promptInput, setPromptInput] = useState(
    'Suy nghĩ của em về ý kiến: "Thất bại là người thầy nghiêm khắc nhưng vô cùng bổ ích của mỗi người trẻ tuổi."'
  );
  const [promptAnalysis, setPromptAnalysis] = useState<string | null>(null);
  const [studentParaphrase, setStudentParaphrase] = useState('');
  const [paraphraseFeedback, setParaphraseFeedback] = useState<string | null>(null);
  const [loading1, setLoading1] = useState(false);

  // Tool 2 State: Khơi nguồn ý tưởng
  const [ideaTopic, setIdeaTopic] = useState('Ý chí vượt khó vươn lên trong học tập và cuộc sống');
  const [socraticQuestions, setSocraticQuestions] = useState<string | null>(null);
  const [ideaCards, setIdeaCards] = useState<string[]>([
    'Thất bại giúp ta nhận ra điểm yếu về kiến thức và kỹ năng.',
    'Tấm gương Thomas Edison với hàng nghìn lần thử nghiệm trước khi sáng chế bóng đèn.',
    'Bài học về sự kiên cường và biết đứng lên sau mỗi lần vấp ngã.',
  ]);
  const [newIdeaText, setNewIdeaText] = useState('');
  const [loading2, setLoading2] = useState(false);

  // Tool 3 State: Cây luận điểm
  const [treeThesis, setTreeThesis] = useState('Thất bại mang lại bài học vô giá giúp ta trưởng thành');
  const [treePoints, setTreePoints] = useState([
    {
      id: 1,
      title: 'Luận điểm 1: Thất bại giúp con người nhận thức rõ giới hạn và bài học thực tế',
      reason: 'Khi thành công ta dễ chủ quan, nhưng thất bại buộc ta phải nhìn thẳng vào khuyết điểm để cải thiện.',
      evidence: 'Nhà bác học Thomas Edison không coi thất bại là vô ích mà là bước loại bỏ cách làm sai.',
    },
    {
      id: 2,
      title: 'Luận điểm 2: Thất bại rèn giũa bản lĩnh và sự kiên trì vượt khó',
      reason: 'Chỉ qua thử thách thì ý chí mới được tôi luyện vững vàng.',
      evidence: 'Thầy giáo Nguyễn Ngọc Ký vượt qua hoàn cảnh liệt cả hai tay để viết bằng chân.',
    },
    {
      id: 3,
      title: 'Luận điểm 3: Phản biện - Thất bại chỉ có giá trị khi ta biết học hỏi từ nó',
      reason: 'Nếu thất bại mà nản lòng, buông xuôi thì thất bại sẽ biến thành bi kịch.',
      evidence: 'Hiện tượng một số bạn trẻ dễ bỏ cuộc khi gặp bài tập khó.',
    },
  ]);
  const [treeFeedback, setTreeFeedback] = useState<string | null>(null);
  const [loading3, setLoading3] = useState(false);

  // Tool 4 State: Sơ đồ tư duy
  const [mindMapData, setMindMapData] = useState<any>(null);
  const [collapsedBranches, setCollapsedBranches] = useState<Record<string, boolean>>({});
  const [loading4, setLoading4] = useState(false);

  // Tool 5 State: Kiến trúc sư dàn ý
  const [outlineIntro, setOutlineIntro] = useState('');
  const [outlineBody, setOutlineBody] = useState('');
  const [outlineConclusion, setOutlineConclusion] = useState('');
  const [outlineGuidance, setOutlineGuidance] = useState<string | null>(null);
  const [loading5, setLoading5] = useState(false);

  // Tool 6 State: Phòng luyện viết đoạn
  const [paragraphType, setParagraphType] = useState('Đoạn mở bài');
  const [paragraphInput, setParagraphInput] = useState(
    'Trong cuộc sống, không ai là không từng nếm trải cảm giác thất bại. Thất bại có thể làm chúng ta buồn, nhưng chính nó lại là người thầy nghiêm khắc dạy cho ta những bài học quý giá nhất trên bước đường trưởng thành.'
  );
  const [paragraphReview, setParagraphReview] = useState<string | null>(null);
  const [loading6, setLoading6] = useState(false);

  // Tool 7 State: Huấn luyện viên lập luận
  const [claimInput, setClaimInput] = useState('Mạng xã hội đang làm học sinh xa cách nhau hơn.');
  const [studentDefense, setStudentDefense] = useState('');
  const [debateDialogue, setDebateDialogue] = useState<string | null>(null);
  const [loading7, setLoading7] = useState(false);

  // Tool 8 State: Bác sĩ câu văn
  const [sentenceInput, setSentenceInput] = useState(
    'Bài văn này của tác giả viết rất là hay và rất là sâu sắc làm cho người đọc chúng ta khi mà đọc vào thì cảm thấy rất xúc động vô cùng về tình mẫu tử.'
  );
  const [diagnosisResult, setDiagnosisResult] = useState<string | null>(null);
  const [studentFixedSentence, setStudentFixedSentence] = useState('');
  const [loading8, setLoading8] = useState(false);

  // Tool 9 State: Nâng cấp diễn đạt
  const [styleText, setStyleText] = useState(
    'Mẹ luôn yêu thương em và chăm sóc cho em từ bé đến lớn không quản ngại khó khăn vất vả.'
  );
  const [selectedStyle, setSelectedStyle] = useState('Giàu hình ảnh');
  const [styleResult, setStyleResult] = useState<string | null>(null);
  const [loading9, setLoading9] = useState(false);

  // Tool 10 State: Giám khảo AI
  const [rubricEssay, setRubricEssay] = useState(
    `Trong hành trình trưởng thành của mỗi con người, không có con đường nào chỉ rải đầy hoa hồng. Có những lúc ta vấp ngã, có những lúc ta cảm thấy chán nản trước thất bại. Thế nhưng, tục ngữ có câu: "Thất bại là mẹ thành công". Thật vậy, thất bại không phải là điểm dừng, mà chính là người thầy nghiêm khắc nhất rèn giũa cho chúng ta ý chí kiên cường và lòng dũng cảm.

Trước hết, thất bại giúp ta nhận diện được những lỗ hổng của bản thân. Khi đạt được thành công quá sớm, con người rất dễ rơi vào tâm lý tự mãn, kiêu căng. Chỉ khi thất bại, ta mới chịu bình tâm nhìn lại xem mình đã sai ở đâu, phương pháp nào chưa hợp lý. Nhà phát minh vĩ đại Thomas Edison từng trải qua hàng nghìn lần thử nghiệm không thành công trước khi thắp sáng nhân loại bằng bóng đèn điện. Với ông, mỗi lần chưa đạt không phải là thất bại, mà là học thêm được một cách không khả thi.

Không những thế, thất bại còn tôi luyện cho tuổi trẻ nghị lực phi thường. Người không bao giờ vấp ngã là người không bao giờ dám hành động. Sau mỗi lần thất bại, nếu ta biết đứng dậy, phủi sạch bụi đất và bước tiếp, thì bản lĩnh của ta sẽ được nâng lên một tầm cao mới. Thầy giáo Nguyễn Ngọc Ký dù bị liệt cả hai tay từ thuở nhỏ nhưng bằng ý chí sắt đá đã tập viết bằng chân và trở thành tấm gương sáng ngời cho biết bao thế hệ học sinh Việt Nam.

Tuy nhiên, thất bại chỉ thực sự có ý nghĩa khi chúng ta biết rút ra bài học. Ngược lại, nếu thất bại mà chỉ biết buông xuôi, than thân trách phận thì ta sẽ mãi mãi chìm trong thất bại.

Tóm lại, thất bại là một phần tất yếu của cuộc đời. Là học sinh THCS, em tự nhắc nhở mình không được nản chí trước những điểm số chưa như ý, mà phải luôn nỗ lực, học hỏi từ sai lầm để ngày càng tiến bộ hơn.`
  );
  const [rubricResult, setRubricResult] = useState<any>(null);
  const [loading10, setLoading10] = useState(false);

  // Handlers for Tools
  const handleAnalyzePrompt = async () => {
    if (!promptInput.trim()) return;
    setLoading1(true);
    try {
      const res = await fetch('/api/ai/understand-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ essayPrompt: promptInput }),
      });
      const data = await res.json();
      setPromptAnalysis(data.analysis);
      onAddToast({ type: 'success', title: 'Đã phân tích đề bài!', message: 'Hãy trả lời câu hỏi thử thách bên dưới.' });
    } catch {
      onAddToast({ type: 'info', title: 'Thông báo', message: 'Đã tải kết quả phân tích định hướng.' });
    } finally {
      setLoading1(false);
    }
  };

  const handleSendParaphrase = async () => {
    if (!studentParaphrase.trim()) return;
    setLoading1(true);
    try {
      const res = await fetch('/api/ai/understand-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ essayPrompt: promptInput, studentParaphrase }),
      });
      const data = await res.json();
      setParaphraseFeedback(data.result);
      onAddToast({ type: 'success', title: 'AI đã phản hồi độ hiểu đề của em!' });
    } catch {
      // fallback
    } finally {
      setLoading1(false);
    }
  };

  const handleSparkIdeas = async () => {
    setLoading2(true);
    try {
      const res = await fetch('/api/ai/spark-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: ideaTopic, userIdeas: ideaCards }),
      });
      const data = await res.json();
      setSocraticQuestions(data.result);
    } finally {
      setLoading2(false);
    }
  };

  const handleAddIdeaCard = () => {
    if (!newIdeaText.trim()) return;
    setIdeaCards([...ideaCards, newIdeaText.trim()]);
    setNewIdeaText('');
    onAddToast({ type: 'success', title: 'Đã thêm thẻ ý tưởng!' });
  };

  const handleCheckArgumentTree = async () => {
    setLoading3(true);
    try {
      const res = await fetch('/api/ai/argument-tree', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: promptInput,
          thesis: treeThesis,
          points: treePoints,
        }),
      });
      const data = await res.json();
      setTreeFeedback(data.feedback);
      onAddToast({ type: 'success', title: 'Đã kiểm tra cây luận điểm!' });
    } finally {
      setLoading3(false);
    }
  };

  const handleGenerateMindMap = async () => {
    setLoading4(true);
    try {
      const res = await fetch('/api/ai/mind-map', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: promptInput, category: 'Nghị luận xã hội' }),
      });
      const data = await res.json();
      setMindMapData(data.data);
      onAddToast({ type: 'success', title: 'Sơ đồ tư duy đã hoàn thành!' });
    } finally {
      setLoading4(false);
    }
  };

  const handleReviewParagraph = async (wantExample = false) => {
    setLoading6(true);
    try {
      const res = await fetch('/api/ai/paragraph-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paragraphType,
          paragraphText: paragraphInput,
          topic: promptInput,
          wantExample,
        }),
      });
      const data = await res.json();
      setParagraphReview(data.review);
      onAddToast({ type: 'success', title: 'AI Coach đã phản hồi 4 tiêu chí!' });
    } finally {
      setLoading6(false);
    }
  };

  const handleDebate = async () => {
    setLoading7(true);
    try {
      const res = await fetch('/api/ai/argument-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claim: claimInput, studentDefense }),
      });
      const data = await res.json();
      setDebateDialogue(data.dialogue);
    } finally {
      setLoading7(false);
    }
  };

  const handleDiagnoseSentence = async () => {
    setLoading8(true);
    try {
      const res = await fetch('/api/ai/sentence-doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentenceText: sentenceInput }),
      });
      const data = await res.json();
      setDiagnosisResult(data.diagnosis);
      onAddToast({ type: 'success', title: 'Bác sĩ câu văn đã chẩn đoán xong!' });
    } finally {
      setLoading8(false);
    }
  };

  const handleUpgradeStyle = async () => {
    setLoading9(true);
    try {
      const res = await fetch('/api/ai/style-upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: styleText, style: selectedStyle }),
      });
      const data = await res.json();
      setStyleResult(data.result);
      onAddToast({ type: 'success', title: 'Đã hoàn tất gợi ý nâng cấp diễn đạt!' });
    } finally {
      setLoading9(false);
    }
  };

  const handleGradeRubric = async () => {
    setLoading10(true);
    try {
      const res = await fetch('/api/ai/rubric-grader', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          essayText: rubricEssay,
          essayPrompt: promptInput,
          gradeLevel: '8',
        }),
      });
      const data = await res.json();
      setRubricResult(data.result);
      onAddToast({
        type: 'badge',
        title: `Điểm Rubric: ${data.result.overallScore} / 10`,
        message: 'Xuất sắc! Em đã nhận được nhận xét chi tiết 9 tiêu chí.',
      });
    } finally {
      setLoading10(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      {/* Top Special Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#4169F6] via-[#5A52FF] to-[#6750FF] text-white p-6 sm:p-8 shadow-xl shadow-indigo-500/15">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold mb-3 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>10 CÔNG CỤ TƯ DUY SOCRATIC CHUYÊN SÂU</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              HỆ SINH THÁI AI ĐỊNH HƯỚNG TƯ DUY VIẾT VĂN
            </h2>
            <p className="text-sm text-blue-100 mt-2 font-medium leading-relaxed">
              “AI không viết thay em – AI giúp em biết cách suy nghĩ để tự viết hay hơn.”
            </p>
          </div>

          {onNavigateToWorkspace && (
            <button
              onClick={onNavigateToWorkspace}
              className="px-5 py-3 rounded-2xl bg-white text-[#4169F6] font-bold text-xs sm:text-sm hover:bg-blue-50 active:scale-95 transition-all shadow-md self-start md:self-auto flex items-center gap-2"
            >
              <span>Vào Phòng Viết Toàn Diện</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 10 Tools Step Navigator */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-3 border border-slate-200 dark:border-slate-700 shadow-xs overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          {tools.map((t) => {
            const Icon = t.icon;
            const isSelected = activeTool === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTool(t.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-[#4169F6] text-white shadow-md shadow-blue-500/25 scale-102'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span>{t.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TOOL 1: HIỂU ĐỀ */}
      {activeTool === 1 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4169F6]">Bước 1 trong quy trình</span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              AI 1 – HIỂU ĐỀ VĂN
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              AI giúp em bóc tách kiểu bài, xác định từ khóa cốt lõi và yêu cầu về hình thức – nội dung mà không làm bài hộ.
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Nhập hoặc dán đề văn của em:
            </label>
            <textarea
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              rows={3}
              className="w-full rounded-2xl p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-hidden focus:border-[#4169F6]"
              placeholder="Nhập đề văn cần phân tích..."
            />
            <button
              onClick={handleAnalyzePrompt}
              disabled={loading1}
              className="px-5 py-2.5 rounded-xl bg-[#4169F6] text-white font-bold text-xs hover:bg-blue-600 transition-all flex items-center gap-2 shadow-xs disabled:opacity-50"
            >
              {loading1 ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Phân tích yêu cầu đề bài</span>
            </button>
          </div>

          {promptAnalysis && (
            <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 space-y-4">
              <div className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line">
                {promptAnalysis}
              </div>

              {/* Socratic Interactive Checkpoint */}
              <div className="pt-4 border-t border-blue-200/60 dark:border-blue-900/60 space-y-2.5">
                <label className="text-xs font-bold text-[#4169F6] dark:text-blue-400 block">
                  🎯 Câu hỏi thử thách: Em thử nói lại đề bài đang yêu cầu mình làm gì bằng lời của em?
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={studentParaphrase}
                    onChange={(e) => setStudentParaphrase(e.target.value)}
                    placeholder="Em hiểu đề này muốn em..."
                    className="flex-1 rounded-xl p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-white focus:outline-hidden focus:border-[#4169F6]"
                  />
                  <button
                    onClick={handleSendParaphrase}
                    disabled={!studentParaphrase.trim() || loading1}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#4169F6] to-[#6750FF] text-white text-xs font-bold flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Gửi suy nghĩ</span>
                  </button>
                </div>

                {paraphraseFeedback && (
                  <div className="mt-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {paraphraseFeedback}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TOOL 2: KHƠI NGUỒN Ý TƯỞNG */}
      {activeTool === 2 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A00]">Bước 2 trong quy trình</span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              AI 2 – KHƠI NGUỒN Ý TƯỞNG (SOCRATIC)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              AI không đưa sẵn toàn bộ ý, mà đặt ra các câu hỏi mở kích thích óc liên tưởng và quản lý thẻ ý tưởng.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={ideaTopic}
              onChange={(e) => setIdeaTopic(e.target.value)}
              className="flex-1 rounded-2xl px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-white"
              placeholder="Đề tài cần khơi gợi ý tưởng..."
            />
            <button
              onClick={handleSparkIdeas}
              disabled={loading2}
              className="px-5 py-3 rounded-2xl bg-[#FF7A00] text-white font-bold text-xs hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-xs shrink-0"
            >
              {loading2 ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lightbulb className="w-4 h-4" />}
              <span>Nhận câu hỏi gợi mở</span>
            </button>
          </div>

          {socraticQuestions && (
            <div className="p-5 rounded-2xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-900/40 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line">
              {socraticQuestions}
            </div>
          )}

          {/* Idea Cards Manager */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Thẻ ý tưởng của em ({ideaCards.length})
              </h4>
              <span className="text-[11px] text-slate-400">Em có thể thêm, sắp xếp hoặc loại bỏ ý</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ideaCards.map((idea, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 relative group flex flex-col justify-between"
                >
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                    {idea}
                  </p>
                  <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Ý tưởng #{idx + 1}</span>
                    <button
                      onClick={() => setIdeaCards(ideaCards.filter((_, i) => i !== idx))}
                      className="text-slate-400 hover:text-red-500 transition-colors p-1"
                      title="Xóa ý này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={newIdeaText}
                onChange={(e) => setNewIdeaText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddIdeaCard()}
                placeholder="Nhập ý tưởng mới của em vào đây..."
                className="flex-1 rounded-xl px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-white focus:outline-hidden focus:border-[#FF7A00]"
              />
              <button
                onClick={handleAddIdeaCard}
                className="px-4 py-2.5 rounded-xl bg-slate-800 dark:bg-slate-700 text-white text-xs font-bold hover:bg-black transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm ý</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 3: CÂY LUẬN ĐIỂM */}
      {activeTool === 3 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#11B981]">Bước 3 trong quy trình</span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                AI 3 – CÂY LUẬN ĐIỂM TRỰC QUAN
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Cấu trúc: Luận đề ➔ Luận điểm ➔ Lí lẽ ➔ Dẫn chứng xác thực. AI kiểm tra tính logic và xác minh dẫn chứng.
              </p>
            </div>
            <button
              onClick={handleCheckArgumentTree}
              disabled={loading3}
              className="px-5 py-2.5 rounded-xl bg-[#11B981] text-white font-bold text-xs hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-xs shrink-0 self-start sm:self-auto"
            >
              {loading3 ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              <span>AI Thẩm định luận điểm</span>
            </button>
          </div>

          {/* Luận Đề */}
          <div className="bg-emerald-50/60 dark:bg-emerald-950/20 p-4 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/40">
            <label className="text-[11px] font-bold uppercase text-emerald-800 dark:text-emerald-300">
              LUẬN ĐỀ (Trọng tâm tư tưởng của cả bài):
            </label>
            <input
              type="text"
              value={treeThesis}
              onChange={(e) => setTreeThesis(e.target.value)}
              className="w-full mt-1.5 bg-white dark:bg-slate-900 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-900 dark:text-white border border-emerald-300 dark:border-emerald-800 focus:outline-hidden"
            />
          </div>

          {/* 3 Luận điểm Branches */}
          <div className="space-y-4">
            {treePoints.map((pt, i) => (
              <div
                key={pt.id}
                className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#11B981] text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <input
                    type="text"
                    value={pt.title}
                    onChange={(e) => {
                      const updated = [...treePoints];
                      updated[i].title = e.target.value;
                      setTreePoints(updated);
                    }}
                    className="flex-1 bg-transparent font-bold text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden border-b border-transparent focus:border-[#11B981]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-8">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 block mb-1">
                      ↓ LÍ LẼ (Vì sao lại như vậy?):
                    </span>
                    <textarea
                      value={pt.reason}
                      onChange={(e) => {
                        const updated = [...treePoints];
                        updated[i].reason = e.target.value;
                        setTreePoints(updated);
                      }}
                      rows={2}
                      className="w-full text-xs text-slate-700 dark:text-slate-300 bg-transparent resize-none focus:outline-hidden"
                    />
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400 block mb-1">
                      ↓ DẪN CHỨNG (Người thật, việc thật hoặc văn học):
                    </span>
                    <textarea
                      value={pt.evidence}
                      onChange={(e) => {
                        const updated = [...treePoints];
                        updated[i].evidence = e.target.value;
                        setTreePoints(updated);
                      }}
                      rows={2}
                      className="w-full text-xs text-slate-700 dark:text-slate-300 bg-transparent resize-none focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {treeFeedback && (
            <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line">
              {treeFeedback}
            </div>
          )}
        </div>
      )}

      {/* TOOL 4: SƠ ĐỒ TƯ DUY */}
      {activeTool === 4 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#6750FF]">Bước 4 trong quy trình</span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                AI 4 – SƠ ĐỒ TƯ DUY (MIND MAP)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Tổ chức tư duy trực quan từ vấn đề trung tâm tới các nhánh Mở bài, Luận điểm 1, 2, 3, Phản biện và Kết bài.
              </p>
            </div>
            <button
              onClick={handleGenerateMindMap}
              disabled={loading4}
              className="px-5 py-2.5 rounded-xl bg-[#6750FF] text-white font-bold text-xs hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 shadow-xs shrink-0"
            >
              {loading4 ? <RefreshCw className="w-4 h-4 animate-spin" /> : <GitFork className="w-4 h-4" />}
              <span>Sinh Mind Map tương tác</span>
            </button>
          </div>

          {/* Interactive Visual Node Diagram */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 space-y-6">
            {/* Center Node */}
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-gradient-to-r from-[#4169F6] to-[#6750FF] text-white text-center shadow-lg">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-100">VẤN ĐỀ TRUNG TÂM</span>
              <h4 className="font-extrabold text-sm sm:text-base mt-1">
                {mindMapData?.center || promptInput}
              </h4>
            </div>

            {/* Branches */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(mindMapData?.branches || [
                {
                  id: 'b1',
                  title: 'Nhánh 1: Mở bài (Dẫn dắt & Đặt vấn đề)',
                  color: '#4169F6',
                  children: ['Dẫn câu danh ngôn hoặc hiện tượng', 'Trích dẫn tư tưởng đề bài', 'Khẳng định ý nghĩa'],
                },
                {
                  id: 'b2',
                  title: 'Nhánh 2: Luận điểm 1 (Bản chất thất bại)',
                  color: '#11B981',
                  children: ['Giải thích thất bại là gì', 'Vì sao nó là người thầy', 'Nhận ra giới hạn bản thân'],
                },
                {
                  id: 'b3',
                  title: 'Nhánh 3: Luận điểm 2 (Tôi luyện ý chí)',
                  color: '#FF7A00',
                  children: ['Không lùi bước trước thử thách', 'Dẫn chứng Thomas Edison', 'Dẫn chứng Nguyễn Ngọc Ký'],
                },
                {
                  id: 'b4',
                  title: 'Nhánh 4: Phản biện & Mở rộng',
                  color: '#EC4899',
                  children: ['Phê phán người sợ thất bại', 'Tránh tâm lý buông xuôi', 'Học hỏi tích cực từ sai lầm'],
                },
                {
                  id: 'b5',
                  title: 'Nhánh 5: Kết bài & Liên hệ',
                  color: '#8B5CF6',
                  children: ['Khẳng định giá trị bài học', 'Liên hệ học sinh THCS', 'Lời hứa hành động nỗ lực'],
                },
              ]).map((branch: any) => {
                const isCollapsed = collapsedBranches[branch.id];
                return (
                  <div
                    key={branch.id}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: branch.color }} />
                        <h5 className="text-xs font-bold text-slate-800 dark:text-white">{branch.title}</h5>
                      </div>
                      <button
                        onClick={() =>
                          setCollapsedBranches({
                            ...collapsedBranches,
                            [branch.id]: !isCollapsed,
                          })
                        }
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                      >
                        {isCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {!isCollapsed && (
                      <ul className="space-y-1.5 pl-4 border-l-2 border-slate-100 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                        {branch.children.map((child: string, ci: number) => (
                          <li key={ci} className="relative before:content-['•'] before:absolute before:-left-2.5 before:text-blue-500">
                            {child}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TOOL 5: KIẾN TRÚC SƯ DÀN Ý */}
      {activeTool === 5 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">Bước 5 trong quy trình</span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              AI 5 – KIẾN TRÚC SƯ DÀN Ý
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Học sinh tự nhập ý trước vào từng phần, AI đóng vai trò cố vấn định hướng bố cục chuẩn mực.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                1. Mở bài (Dẫn dắt & nêu vấn đề):
              </label>
              <textarea
                value={outlineIntro}
                onChange={(e) => setOutlineIntro(e.target.value)}
                rows={2}
                placeholder="Nhập ý mở bài của em..."
                className="w-full rounded-xl p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                2. Thân bài (3 luận điểm, lí lẽ, dẫn chứng & phản biện):
              </label>
              <textarea
                value={outlineBody}
                onChange={(e) => setOutlineBody(e.target.value)}
                rows={4}
                placeholder="Nhập các ý thân bài của em..."
                className="w-full rounded-xl p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                3. Kết bài (Đánh giá lại & liên hệ bản thân):
              </label>
              <textarea
                value={outlineConclusion}
                onChange={(e) => setOutlineConclusion(e.target.value)}
                rows={2}
                placeholder="Nhập ý kết bài của em..."
                className="w-full rounded-xl p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-white"
              />
            </div>

            <button
              onClick={async () => {
                setLoading5(true);
                try {
                  const res = await fetch('/api/ai/outline-builder', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      topic: promptInput,
                      intro: outlineIntro,
                      bodyPoints: outlineBody,
                      conclusion: outlineConclusion,
                    }),
                  });
                  const data = await res.json();
                  setOutlineGuidance(data.outlineGuidance);
                } finally {
                  setLoading5(false);
                }
              }}
              disabled={loading5}
              className="px-5 py-2.5 rounded-xl bg-[#0284C7] text-white font-bold text-xs hover:bg-sky-600 transition-all flex items-center gap-2"
            >
              {loading5 ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>AI Cố vấn kiến trúc dàn ý</span>
            </button>

            {outlineGuidance && (
              <div className="p-5 rounded-2xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-800 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line">
                {outlineGuidance}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOOL 6: PHÒNG LUYỆN VIẾT ĐOẠN */}
      {activeTool === 6 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EC4899]">Bước 6 trong quy trình</span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              AI 6 – PHÒNG LUYỆN VIẾT ĐOẠN
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Luyện riêng từng đoạn văn (Mở bài, Giải thích, Phân tích, Chứng minh, Nghị luận, Cảm nhận, Kết bài). AI phản hồi theo 4 mục: Ý - Lập luận - Diễn đạt - Chính tả.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                Chọn loại đoạn văn em đang luyện tập:
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Đoạn mở bài',
                  'Đoạn giải thích',
                  'Đoạn phân tích',
                  'Đoạn chứng minh',
                  'Đoạn nghị luận',
                  'Đoạn cảm nhận',
                  'Đoạn kết bài',
                ].map((type) => (
                  <button
                    key={type}
                    onClick={() => setParagraphType(type)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      paragraphType === type
                        ? 'bg-[#EC4899] text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Đoạn văn của em:
              </label>
              <textarea
                value={paragraphInput}
                onChange={(e) => setParagraphInput(e.target.value)}
                rows={5}
                className="w-full rounded-2xl p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-white leading-relaxed focus:outline-hidden focus:border-[#EC4899]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleReviewParagraph(false)}
                disabled={loading6}
                className="px-5 py-2.5 rounded-xl bg-[#EC4899] text-white font-bold text-xs hover:bg-pink-600 transition-all flex items-center gap-2 shadow-xs"
              >
                {loading6 ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>Nhận xét 4 mục (Ý - Lập luận - Diễn đạt - Chính tả)</span>
              </button>

              <button
                onClick={() => handleReviewParagraph(true)}
                disabled={loading6}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 transition-all"
              >
                Xem đoạn tham khảo ngắn
              </button>
            </div>

            {paragraphReview && (
              <div className="p-5 rounded-2xl bg-pink-50/50 dark:bg-pink-950/20 border border-pink-200/60 dark:border-pink-900/40 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line">
                {paragraphReview}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOOL 7: HUẤN LUYỆN VIÊN LẬP LUẬN */}
      {activeTool === 7 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EAB308]">Bước 7 trong quy trình</span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              AI 7 – HUẤN LUYỆN VIÊN LẬP LUẬN (PHẢN BIỆN)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Học sinh đưa ra một quan điểm, AI đóng vai người phản biện sắc sảo ("Tại sao?", "Bằng chứng ở đâu?", "Nếu người khác phản đối thì sao?") để rèn tư duy logic.
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Nhập nhận định / quan điểm của em:
            </label>
            <input
              type="text"
              value={claimInput}
              onChange={(e) => setClaimInput(e.target.value)}
              className="w-full rounded-2xl px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-white font-medium"
            />
            <button
              onClick={handleDebate}
              disabled={loading7}
              className="px-5 py-2.5 rounded-xl bg-[#EAB308] text-slate-900 font-bold text-xs hover:bg-yellow-500 transition-all flex items-center gap-2"
            >
              {loading7 ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              <span>Khởi động thử thách phản biện</span>
            </button>
          </div>

          {debateDialogue && (
            <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-4">
              <div className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line">
                {debateDialogue}
              </div>

              <div className="pt-3 border-t border-amber-200/60 dark:border-amber-900/60 space-y-2">
                <label className="text-xs font-bold text-slate-800 dark:text-white block">
                  Câu trả lời phản biện và bảo vệ quan điểm của em:
                </label>
                <textarea
                  value={studentDefense}
                  onChange={(e) => setStudentDefense(e.target.value)}
                  rows={3}
                  placeholder="Em chứng minh điều này bằng cách..."
                  className="w-full rounded-xl p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-white"
                />
                <button
                  onClick={handleDebate}
                  disabled={!studentDefense.trim() || loading7}
                  className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 disabled:opacity-50"
                >
                  Gửi phản hồi cho Huấn luyện viên
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TOOL 8: BÁC SĨ CÂU VĂN */}
      {activeTool === 8 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#06B6D4]">Bước 8 trong quy trình</span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              AI 8 – BÁC SĨ CÂU VĂN
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Chẩn đoán các tật của câu: câu quá dài, lặp từ, thiếu CN-VN, tối nghĩa, dùng từ sai, lỗi chính tả, ngắt câu.
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Nhập câu văn cần khám:
            </label>
            <textarea
              value={sentenceInput}
              onChange={(e) => setSentenceInput(e.target.value)}
              rows={3}
              className="w-full rounded-2xl p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-white leading-relaxed"
            />
            <button
              onClick={handleDiagnoseSentence}
              disabled={loading8}
              className="px-5 py-2.5 rounded-xl bg-[#06B6D4] text-white font-bold text-xs hover:bg-cyan-600 transition-all flex items-center gap-2 shadow-xs"
            >
              {loading8 ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Stethoscope className="w-4 h-4" />}
              <span>Chẩn đoán câu văn</span>
            </button>
          </div>

          {diagnosisResult && (
            <div className="p-5 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-200/60 dark:border-cyan-900/40 space-y-4">
              <div className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line">
                {diagnosisResult}
              </div>

              <div className="pt-3 border-t border-cyan-200/60 dark:border-cyan-900/60 space-y-2">
                <label className="text-xs font-bold text-slate-800 dark:text-white block">
                  Em tự sửa lại câu văn theo gợi ý của Bác sĩ:
                </label>
                <textarea
                  value={studentFixedSentence}
                  onChange={(e) => setStudentFixedSentence(e.target.value)}
                  rows={2}
                  placeholder="Phiên bản câu văn do em tự sửa lại..."
                  className="w-full rounded-xl p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-white"
                />
                <button
                  onClick={() => {
                    setSentenceInput(studentFixedSentence);
                    onAddToast({ type: 'success', title: 'Hoan hô em đã tự sửa câu văn!' });
                  }}
                  className="px-4 py-2 rounded-xl bg-[#06B6D4] text-white text-xs font-bold hover:bg-cyan-600 transition-colors"
                >
                  Xác nhận câu văn mới
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TOOL 9: NÂNG CẤP DIỄN ĐẠT */}
      {activeTool === 9 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6]">Bước 9 trong quy trình</span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              AI 9 – NÂNG CẤP DIỄN ĐẠT
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Lựa chọn phong cách và kỹ thuật tu từ để câu văn thêm sinh động, biểu cảm mà vẫn giữ trọn vẹn tư tưởng của em.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                Chọn phong cách mong muốn:
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Trong sáng',
                  'Giàu hình ảnh',
                  'Súc tích',
                  'Trang trọng',
                  'Cảm xúc',
                  'Lập luận chặt chẽ',
                ].map((style) => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedStyle === style
                        ? 'bg-[#8B5CF6] text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Câu hoặc đoạn văn cần nâng cấp:
              </label>
              <textarea
                value={styleText}
                onChange={(e) => setStyleText(e.target.value)}
                rows={3}
                className="w-full rounded-2xl p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-white leading-relaxed"
              />
            </div>

            <button
              onClick={handleUpgradeStyle}
              disabled={loading9}
              className="px-5 py-2.5 rounded-xl bg-[#8B5CF6] text-white font-bold text-xs hover:bg-purple-600 transition-all flex items-center gap-2 shadow-xs"
            >
              {loading9 ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              <span>Đề xuất cách diễn đạt mới</span>
            </button>

            {styleResult && (
              <div className="p-5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/40 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line">
                {styleResult}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOOL 10: GIÁM KHẢO AI (RUBRIC 9 TIÊU CHÍ) */}
      {activeTool === 10 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F43F5E]">Bước 10 trong quy trình</span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              AI 10 – GIÁM KHẢO AI (RUBRIC 9 TIÊU CHÍ CHUẨN THCS)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Đánh giá toàn diện bài viết: Đúng đề, Nội dung, Bố cục, Lập luận, Dẫn chứng, Liên kết, Diễn đạt, Chính tả và Sáng tạo. Kèm 3 việc nên sửa trước và so sánh lần viết 1 - 2.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Dán toàn bộ bài văn của em vào đây:
              </label>
              <span className="text-xs text-slate-400">
                {rubricEssay.trim().split(/\s+/).filter(Boolean).length} từ
              </span>
            </div>
            <textarea
              value={rubricEssay}
              onChange={(e) => setRubricEssay(e.target.value)}
              rows={8}
              className="w-full rounded-2xl p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-white leading-relaxed font-sans focus:outline-hidden focus:border-[#F43F5E]"
            />
            <button
              onClick={handleGradeRubric}
              disabled={loading10}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#F43F5E] to-rose-600 text-white font-bold text-xs sm:text-sm hover:opacity-95 transition-all flex items-center gap-2 shadow-lg shadow-rose-500/20"
            >
              {loading10 ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Award className="w-4 h-4" />}
              <span>Chấm điểm theo Rubric & Phân tích chi tiết</span>
            </button>
          </div>

          {rubricResult && (
            <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-700 animate-in fade-in">
              {/* Overall Score Badge */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 border border-rose-200 dark:border-rose-900/40">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#F43F5E] text-white font-black text-2xl flex items-center justify-center shadow-md shadow-rose-500/30">
                    {rubricResult.overallScore}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                      KẾT QUẢ ĐÁNH GIÁ TỔNG QUAN
                    </h4>
                    <p className="text-xs text-rose-700 dark:text-rose-300 font-medium mt-0.5">
                      Đạt mức Khá Giỏi theo chuẩn đánh giá THCS Huỳnh Thúc Kháng
                    </p>
                  </div>
                </div>
                <div className="text-right text-xs text-slate-500 dark:text-slate-400">
                  <span>9/9 Tiêu chí đã được thẩm định</span>
                </div>
              </div>

              {/* 9 Criteria Progress Bars */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: '1. Đúng yêu cầu đề', key: 'promptAdherence' },
                  { name: '2. Nội dung & Tư tưởng', key: 'content' },
                  { name: '3. Bố cục 3 phần', key: 'structure' },
                  { name: '4. Lập luận chặt chẽ', key: 'argument' },
                  { name: '5. Dẫn chứng xác thực', key: 'evidence' },
                  { name: '6. Tính liên kết', key: 'cohesion' },
                  { name: '7. Diễn đạt & Dùng từ', key: 'expression' },
                  { name: '8. Chính tả - Ngữ pháp', key: 'grammar' },
                  { name: '9. Sáng tạo & Cảm xúc', key: 'creativity' },
                ].map((crit) => {
                  const score = rubricResult.scores?.[crit.key] || 8.0;
                  return (
                    <div
                      key={crit.key}
                      className="bg-slate-50 dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700"
                    >
                      <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span>{crit.name}</span>
                        <span className="text-rose-600 dark:text-rose-400">{score}/10</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-rose-500 to-pink-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${(score / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
                  <h5 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Điểm mạnh nổi bật
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {rubricResult.strengths?.map((s: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                  <h5 className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    Điểm cần cải thiện
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {rubricResult.improvements?.map((im: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{im}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 3 Priority Fixes */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white dark:bg-slate-950 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Flame className="w-4 h-4" />
                  <span>3 Việc nên sửa trước để bứt phá điểm số:</span>
                </div>
                <div className="space-y-2">
                  {rubricResult.top3Fixes?.map((fix: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                      <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs shrink-0">
                        {idx + 1}
                      </span>
                      <span>{fix}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
