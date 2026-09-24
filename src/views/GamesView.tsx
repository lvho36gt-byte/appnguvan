import React, { useState } from 'react';
import {
  Gamepad2,
  Trophy,
  Flame,
  Award,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { gameQuestions } from '../data/mockData';
import { ToastMessage } from '../components/Toast';

interface GamesViewProps {
  onAddToast: (toast: Omit<ToastMessage, 'id'>) => void;
}

export const GamesView: React.FC<GamesViewProps> = ({ onAddToast }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(120);
  const [correctStreak, setCorrectStreak] = useState(3);

  const categories = [
    { id: 'all', label: 'Tất cả thử thách' },
    { id: 'tu-tu', label: 'Biện pháp tu từ' },
    { id: 'thanh-ngu', label: 'Thành ngữ - Tục ngữ' },
    { id: 'ngu-phap', label: 'Giải cứu câu văn' },
    { id: 'lien-ket', label: 'Liên kết câu' },
  ];

  const filteredQuestions =
    activeCategory === 'all'
      ? gameQuestions
      : gameQuestions.filter((q) => q.category === activeCategory);

  const question = filteredQuestions[currentIdx % filteredQuestions.length];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === question.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + question.points);
      setCorrectStreak((prev) => prev + 1);
      onAddToast({
        type: 'badge',
        title: `Chính xác! +${question.points} điểm`,
        message: 'Em đang có chuỗi trả lời đúng rất tuyệt vời! 🔥',
      });
    } else {
      setCorrectStreak(0);
      onAddToast({
        type: 'info',
        title: 'Chưa đúng rồi!',
        message: 'Đừng lo lắng, hãy đọc phần giải thích nhé!',
      });
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentIdx((prev) => (prev + 1) % filteredQuestions.length);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-[#FF7A00] text-xs font-bold mb-2">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>HỌC MÀ CHƠI - CHƠI MÀ HỌC</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Đấu Trường Tiếng Việt Vui
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Rèn luyện kiến thức từ vựng, ngữ pháp, biện pháp tu từ và liên kết câu chuẩn THCS.
          </p>
        </div>

        {/* Score & Streak Counters */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-50 dark:bg-amber-950/40 px-4 py-2.5 rounded-2xl border border-amber-200 dark:border-amber-800 flex items-center gap-2.5">
            <Trophy className="w-5 h-5 text-amber-500" />
            <div>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold block uppercase">
                Điểm tích lũy
              </span>
              <span className="text-base sm:text-lg font-extrabold text-amber-900 dark:text-amber-200">
                {score} XP
              </span>
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-950/40 px-4 py-2.5 rounded-2xl border border-orange-200 dark:border-orange-800 flex items-center gap-2.5">
            <Flame className="w-5 h-5 text-[#FF7A00] fill-current" />
            <div>
              <span className="text-[10px] text-orange-600 dark:text-orange-400 font-bold block uppercase">
                Chuỗi đúng
              </span>
              <span className="text-base sm:text-lg font-extrabold text-orange-900 dark:text-orange-200">
                {correctStreak} 🔥
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setCurrentIdx(0);
              setSelectedOption(null);
              setIsAnswered(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === cat.id
                ? 'bg-[#FF7A00] text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Game Arena Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (8 cols): Question Card */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A00]">
              Câu hỏi {(currentIdx % filteredQuestions.length) + 1} / {filteredQuestions.length}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold">
              +{question.points} XP
            </span>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
              {question.question}
            </h3>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-3">
            {question.options.map((opt, i) => {
              const isSelected = selectedOption === i;
              const isCorrectAnswer = i === question.correctAnswer;

              let buttonStyle =
                'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-amber-300 hover:bg-amber-50/50';

              if (isAnswered) {
                if (isCorrectAnswer) {
                  buttonStyle =
                    'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200';
                } else if (isSelected && !isCorrectAnswer) {
                  buttonStyle =
                    'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200';
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelectOption(i)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${buttonStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300 shadow-xs">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswered && (
                    <div>
                      {isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                      {isSelected && !isCorrectAnswer && <XCircle className="w-5 h-5 text-rose-500" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation & Next */}
          {isAnswered && (
            <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300 uppercase">
                <Sparkles className="w-4 h-4" />
                <span>GIẢI THÍCH CHI TIẾT TỪ TỔ NGỮ VĂN</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {question.explanation}
              </p>

              <button
                onClick={handleNextQuestion}
                className="mt-2 px-5 py-2.5 rounded-xl bg-[#FF7A00] text-white font-bold text-xs hover:bg-orange-600 transition-all flex items-center gap-2"
              >
                <span>Câu tiếp theo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Right (4 cols): Leaderboard & Badges preview */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF7A00]">
              <Trophy className="w-4 h-4" />
              <span>BẢNG VÀNG THCS HUỲNH THÚC KHÁNG</span>
            </div>

            <div className="space-y-2.5">
              {[
                { rank: 1, name: 'Trần Bảo Anh', class: '9/1', points: '1450 XP', avatar: '🥇' },
                { rank: 2, name: 'Nguyễn Minh Khang (Em)', class: '8/2', points: `${score} XP`, avatar: '🥈' },
                { rank: 3, name: 'Lê Hoàng Nam', class: '8/3', points: '890 XP', avatar: '🥉' },
                { rank: 4, name: 'Phạm Quỳnh Chi', class: '7/2', points: '820 XP', avatar: '🌟' },
                { rank: 5, name: 'Đỗ Gia Huy', class: '6/1', points: '760 XP', avatar: '✨' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl flex items-center justify-between text-xs ${
                    item.rank === 2
                      ? 'bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 font-bold'
                      : 'bg-slate-50 dark:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{item.avatar}</span>
                    <div>
                      <p className="text-slate-900 dark:text-white font-bold">{item.name}</p>
                      <p className="text-[10px] text-slate-400">Lớp {item.class}</p>
                    </div>
                  </div>
                  <span className="font-bold text-[#FF7A00]">{item.points}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
