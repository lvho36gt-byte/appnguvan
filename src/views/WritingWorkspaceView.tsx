import React, { useState, useEffect } from 'react';
import {
  PenTool,
  Save,
  Maximize2,
  Minimize2,
  Sparkles,
  Bot,
  RefreshCw,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Layers,
  HelpCircle,
  Stethoscope,
  Wand2,
} from 'lucide-react';
import { ToastMessage } from '../components/Toast';

interface WritingWorkspaceViewProps {
  onAddToast: (toast: Omit<ToastMessage, 'id'>) => void;
  onNavigateToEcosystem: () => void;
}

export const WritingWorkspaceView: React.FC<WritingWorkspaceViewProps> = ({
  onAddToast,
  onNavigateToEcosystem,
}) => {
  const [currentStep, setCurrentStep] = useState(4); // 0: Hiểu đề, 1: Tìm ý, 2: Luận điểm, 3: Dàn ý, 4: Viết, 5: Tự sửa, 6: Hoàn thiện
  const [focusMode, setFocusMode] = useState(false);
  const [topic, setTopic] = useState(
    'Suy nghĩ của em về ý kiến: "Thất bại là người thầy nghiêm khắc nhưng vô cùng bổ ích của mỗi người trẻ tuổi."'
  );

  const [essayContent, setEssayContent] = useState(() => {
    return (
      localStorage.getItem('htk_essay_draft') ||
      `Trong cuộc đời mỗi con người, không ai sinh ra đã lập tức chạm tới đỉnh vinh quang. Con đường đi tới ước mơ luôn đầy rẫy chông gai, thử thách và cả những cú vấp ngã đau đớn. Bàn về điều này, có ý kiến sâu sắc khẳng định: "Thất bại là người thầy nghiêm khắc nhưng vô cùng bổ ích của mỗi người trẻ tuổi".

Thật vậy, trước hết, ta cần hiểu "thất bại" là gì? Thất bại là khi những dự định, mục tiêu của ta chưa đạt được kết quả như kỳ vọng. Nhiều người thường sợ hãi thất bại vì nó mang lại cảm giác buồn tủi, thất vọng. Nhưng vì sao nó lại là "người thầy nghiêm khắc"? Bởi vì thất bại không bao giờ khoan nhượng hay dỗ dành; nó buộc ta phải đối mặt trực diện với những lỗ hổng trong kiến thức, sự thiếu sót trong kỹ năng hoặc sự chủ quan của chính mình.

Người trẻ tuổi là lứa tuổi đang tràn đầy nhiệt huyết nhưng cũng dễ bồng bột, non nớt. Chính thất bại sẽ tôi luyện cho chúng ta bản lĩnh kiên cường, dạy ta bài học về sự nhẫn nại và đức khiêm tốn. Nhà phát minh lỗi lạc Thomas Edison đã từng kiên trì làm việc qua hàng ngàn thí nghiệm thất bại để phát minh ra bóng đèn điện chiếu sáng thế giới. Với ông, mỗi lần sai là một bài học đắt giá để tiến gần hơn đến chân lý.`
    );
  });

  const [aiCoachTab, setAiCoachTab] = useState<'tips' | 'coach' | 'check'>('coach');
  const [coachInput, setCoachInput] = useState('');
  const [coachReply, setCoachReply] = useState<string | null>(
    'Chào em! Thầy/cô AI Coach đang theo dõi bài viết của em. Thầy/cô thấy phần mở bài và giải thích của em rất sáng ý và trôi chảy. Em dự định phát triển dẫn chứng nào cho luận điểm thứ 2 tiếp theo?'
  );
  const [loadingCoach, setLoadingCoach] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState('Vừa xong');

  // Auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('htk_essay_draft', essayContent);
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1200);
    return () => clearTimeout(timer);
  }, [essayContent]);

  const wordsCount = essayContent.trim() ? essayContent.trim().split(/\s+/).length : 0;
  const paragraphCount = essayContent.trim()
    ? essayContent.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length
    : 0;

  const steps = [
    '1. Hiểu đề',
    '2. Tìm ý',
    '3. Luận điểm',
    '4. Dàn ý',
    '5. Viết bài',
    '6. Tự sửa',
    '7. Hoàn thiện',
  ];

  const handleAskCoach = async (promptQuery?: string) => {
    const q = promptQuery || coachInput;
    if (!q.trim() || loadingCoach) return;
    setLoadingCoach(true);

    try {
      const res = await fetch('/api/ai/paragraph-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paragraphType: 'Toàn bài / Đoạn văn hiện tại',
          paragraphText: essayContent.slice(-400),
          topic,
          wantExample: false,
        }),
      });
      const data = await res.json();
      setCoachReply(data.review);
      setCoachInput('');
    } catch {
      setCoachReply(
        'Thầy/cô khuyên em nên đọc lại câu kết của đoạn vừa viết. Liệu em đã nêu rõ được bài học hành động cho bản thân chưa?'
      );
    } finally {
      setLoadingCoach(false);
    }
  };

  return (
    <div
      className={`space-y-4 animate-in fade-in duration-300 ${
        focusMode ? 'fixed inset-0 z-50 bg-[#F6F8FD] dark:bg-slate-900 p-4 sm:p-8 overflow-y-auto' : ''
      }`}
    >
      {/* Top Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-[#4169F6] text-[11px] font-extrabold uppercase">
              STUDIO VIẾT VĂN
            </span>
            <span className="text-xs text-slate-400 font-medium">Lưu tự động lúc {lastSavedTime}</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
            Không gian rèn luyện tư duy viết văn
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              localStorage.setItem('htk_essay_draft', essayContent);
              onAddToast({ type: 'success', title: 'Đã lưu bài viết vào máy của em!' });
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center gap-1.5"
          >
            <Save className="w-4 h-4 text-[#11B981]" />
            <span>Lưu nháp</span>
          </button>

          <button
            onClick={() => setFocusMode(!focusMode)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center gap-1.5"
            title="Chế độ tập trung giúp ẩn các thanh công cụ"
          >
            {focusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span>{focusMode ? 'Thoát tập trung' : 'Chế độ tập trung'}</span>
          </button>
        </div>
      </div>

      {/* 7-Step Progress Journey Bar */}
      <div className="bg-white dark:bg-slate-800 p-3.5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-between min-w-[620px] gap-2">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;
            return (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                  isCurrent
                    ? 'bg-[#4169F6] text-white shadow-md shadow-blue-500/20 scale-102'
                    : isCompleted
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 text-[#11B981] border border-emerald-200 dark:border-emerald-800'
                    : 'bg-slate-100 dark:bg-slate-700/60 text-slate-400'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#11B981]" />
                ) : (
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      isCurrent ? 'bg-white text-[#4169F6]' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {idx + 1}
                  </span>
                )}
                <span className="truncate">{step}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 3-Column Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column (3 cols): Prompt & Criteria */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4169F6]">
              <BookOpen className="w-4 h-4" />
              <span>ĐỀ BÀI ĐANG VIẾT</span>
            </div>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={3}
              className="w-full text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 resize-none focus:outline-hidden"
            />
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#11B981]">
              <Layers className="w-4 h-4" />
              <span>TIÊU CHÍ BÀI NGHỊ LUẬN</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-[#11B981] font-bold">✓</span>
                <span>Bố cục 3 phần rõ ràng: Mở - Thân - Kết</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#11B981] font-bold">✓</span>
                <span>Ít nhất 2-3 luận điểm bám sát đề</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#11B981] font-bold">✓</span>
                <span>Dẫn chứng thực tế xác thực (Thomas Edison, thầy Nguyễn Ngọc Ký...)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#11B981] font-bold">✓</span>
                <span>Có phần phản biện / mở rộng vấn đề</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#11B981] font-bold">✓</span>
                <span>Liên hệ bản thân học sinh THCS</span>
              </li>
            </ul>

            <button
              onClick={onNavigateToEcosystem}
              className="w-full mt-2 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-[#4169F6] text-xs font-bold hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
            >
              <span>Xem 10 công cụ AI định hướng</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center Column (6 cols): Student Writing Canvas */}
        <div className="lg:col-span-6 space-y-2">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col h-[640px]">
            {/* Toolbar status */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-800 dark:text-white">{wordsCount} từ</span>
                <span>•</span>
                <span>{paragraphCount} đoạn văn</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#11B981] animate-ping" />
                <span className="text-[#11B981] font-medium text-[11px]">Sẵn sàng đồng hành</span>
              </div>
            </div>

            {/* Editor Textarea */}
            <textarea
              value={essayContent}
              onChange={(e) => setEssayContent(e.target.value)}
              placeholder="Hãy bắt đầu viết bằng chính cảm xúc và suy nghĩ chân thật nhất của em..."
              className="flex-1 w-full p-2 text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-100 bg-transparent border-0 resize-none focus:outline-hidden font-sans placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Right Column (3 cols): AI Coach Real-Time Companion */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#4169F6] to-[#6750FF] text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">AI Coach Ngữ văn</h4>
                  <span className="text-[10px] text-blue-500 font-medium">Đồng hành Socratic</span>
                </div>
              </div>

              <div className="flex bg-slate-100 dark:bg-slate-700 p-0.5 rounded-lg text-[11px]">
                <button
                  onClick={() => setAiCoachTab('coach')}
                  className={`px-2 py-1 rounded-md font-semibold ${
                    aiCoachTab === 'coach' ? 'bg-white dark:bg-slate-800 text-[#4169F6] shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Góp ý
                </button>
                <button
                  onClick={() => setAiCoachTab('tips')}
                  className={`px-2 py-1 rounded-md font-semibold ${
                    aiCoachTab === 'tips' ? 'bg-white dark:bg-slate-800 text-[#4169F6] shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Mẹo hay
                </button>
              </div>
            </div>

            {aiCoachTab === 'coach' && (
              <div className="space-y-3">
                {coachReply && (
                  <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-xs text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                    {coachReply}
                  </div>
                )}

                <div className="space-y-2">
                  <textarea
                    value={coachInput}
                    onChange={(e) => setCoachInput(e.target.value)}
                    rows={2}
                    placeholder="Hỏi AI Coach về đoạn đang viết..."
                    className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-hidden"
                  />
                  <button
                    onClick={() => handleAskCoach()}
                    disabled={loadingCoach}
                    className="w-full py-2.5 rounded-xl bg-[#4169F6] text-white text-xs font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50"
                  >
                    {loadingCoach ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                    <span>Nhờ AI Coach phản hồi</span>
                  </button>
                </div>
              </div>
            )}

            {aiCoachTab === 'tips' && (
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-[#4169F6] block mb-1">Cách dẫn dắt mượt mà:</span>
                  Dùng các cụm từ nối như *"Thật vậy"*, *"Xét về bản chất"*, *"Mặt khác"*, *"Tuy nhiên"*.
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-[#11B981] block mb-1">Dẫn chứng đắt giá:</span>
                  Không chỉ kể tên nhân vật, hãy phân tích hành động và bài học mà họ mang lại.
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-[#FF7A00] block mb-1">Tránh lặp từ:</span>
                  Thay thế các từ ngữ quen thuộc bằng các từ đồng nghĩa giàu hình ảnh.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
