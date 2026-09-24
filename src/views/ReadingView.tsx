import React, { useState } from 'react';
import {
  BookOpen,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  RefreshCw,
  Send,
  Sparkles,
  ArrowRight,
  Eye,
  Award,
} from 'lucide-react';
import { sampleReadingTexts } from '../data/mockData';
import { ReadingQuestion, ReadingText } from '../types';
import { ToastMessage } from '../components/Toast';

interface ReadingViewProps {
  onAddToast: (toast: Omit<ToastMessage, 'id'>) => void;
}

export const ReadingView: React.FC<ReadingViewProps> = ({ onAddToast }) => {
  const [selectedText, setSelectedText] = useState<ReadingText>(sampleReadingTexts[0]);
  const [customPassage, setCustomPassage] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);

  // Active question state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [hintLevel, setHintLevel] = useState<0 | 1 | 2>(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);

  // Completed questions tracker
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});

  const currentQ = selectedText.questions[currentQuestionIndex];

  const handleSubmitAnswer = async () => {
    if (!studentAnswer.trim() || loading) return;
    setLoading(true);

    try {
      const res = await fetch('/api/ai/reading-comprehension', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passage: selectedText.passage,
          studentAnswer: studentAnswer.trim(),
          questionLevel: currentQ.level,
          questionText: currentQ.question,
        }),
      });
      const data = await res.json();
      setAiFeedback(data.feedback);
      setHintLevel(1);
      onAddToast({ type: 'info', title: 'AI đã phản hồi câu trả lời của em!' });
    } catch {
      setAiFeedback(
        'Thầy/cô khen em đã nỗ lực trả lời! Hãy chú ý đọc lại câu thơ thứ hai trong đoạn trích để tìm chi tiết nghệ thuật ẩn dụ nhé!'
      );
      setHintLevel(1);
    } finally {
      setLoading(false);
    }
  };

  const handleFinishQuestion = () => {
    setCompletedQuestions({ ...completedQuestions, [currentQ.id]: true });
    setShowExplanation(true);
    onAddToast({ type: 'success', title: 'Đã hoàn thành câu hỏi!' });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedText.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setStudentAnswer('');
      setHintLevel(0);
      setShowExplanation(false);
      setAiFeedback(null);
    }
  };

  const progressPercent = Math.round(
    (Object.keys(completedQuestions).length / selectedText.questions.length) * 100
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[#11B981] text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>ĐỌC HIỂU ĐA TẦNG TƯ DUY</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Phòng Luyện Đọc Hiểu Thông Minh
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Hệ thống câu hỏi phân hóa 3 mức (Nhận biết - Thông hiểu - Vận dụng). AI không đưa ngay đáp án mà dẫn dắt bằng gợi ý Socratic.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 min-w-56 text-right">
          <div className="flex justify-between items-center text-xs font-bold mb-1.5">
            <span className="text-slate-500">Tiến trình bài đọc:</span>
            <span className="text-[#11B981]">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#11B981] to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Passage Selector */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1">
          Chọn ngữ liệu:
        </span>
        {sampleReadingTexts.map((text) => (
          <button
            key={text.id}
            onClick={() => {
              setSelectedText(text);
              setIsCustomMode(false);
              setCurrentQuestionIndex(0);
              setStudentAnswer('');
              setHintLevel(0);
              setShowExplanation(false);
              setAiFeedback(null);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedText.id === text.id && !isCustomMode
                ? 'bg-[#11B981] text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            {text.title} ({text.author})
          </button>
        ))}
      </div>

      {/* Main Reading Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): Reading Passage */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3 mb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {selectedText.title}
                </h3>
                <p className="text-xs text-slate-400 font-medium">Tác giả: {selectedText.author}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[#11B981] text-[11px] font-bold">
                Lớp {selectedText.grade}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-serif whitespace-pre-line max-h-96 overflow-y-auto">
              {selectedText.passage}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-400 flex items-center justify-between">
            <span>Ngữ liệu chuẩn GDPT 2018</span>
            <span>{selectedText.questions.length} câu hỏi phân hóa</span>
          </div>
        </div>

        {/* Right Column (7 cols): Socratic Question & Progressive Hints */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs space-y-5">
          {/* Question Level Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-xl text-xs font-bold ${
                  currentQ.level === 'Nhận biết'
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                    : currentQ.level === 'Thông hiểu'
                    ? 'bg-purple-50 text-[#6750FF] dark:bg-purple-950/40 dark:text-purple-400'
                    : 'bg-amber-50 text-[#FF7A00] dark:bg-orange-950/40 dark:text-orange-400'
                }`}
              >
                Mức {currentQuestionIndex + 1}: {currentQ.level}
              </span>
              <span className="text-xs text-slate-400">
                Câu {currentQuestionIndex + 1} / {selectedText.questions.length}
              </span>
            </div>

            {completedQuestions[currentQ.id] && (
              <span className="flex items-center gap-1 text-xs font-bold text-[#11B981]">
                <CheckCircle2 className="w-4 h-4" /> Đã hoàn thành
              </span>
            )}
          </div>

          {/* Question Content */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQ.question}
            </h4>
          </div>

          {/* Student Answer Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Câu trả lời và suy nghĩ của em:
            </label>
            <textarea
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
              rows={4}
              placeholder="Em trả lời câu hỏi này là..."
              className="w-full rounded-2xl p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-hidden focus:border-[#11B981]"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSubmitAnswer}
              disabled={!studentAnswer.trim() || loading}
              className="px-5 py-2.5 rounded-xl bg-[#11B981] text-white font-bold text-xs hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-xs disabled:opacity-50"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>Gửi câu trả lời để AI nhận xét</span>
            </button>

            {hintLevel > 0 && !showExplanation && (
              <button
                onClick={() => setHintLevel(2)}
                className="px-4 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-bold text-xs hover:bg-amber-100 transition-colors flex items-center gap-1.5 border border-amber-200 dark:border-amber-900"
              >
                <Lightbulb className="w-4 h-4" />
                <span>Xem thêm gợi ý mức 2</span>
              </button>
            )}

            {!showExplanation && (
              <button
                onClick={handleFinishQuestion}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 transition-colors"
              >
                Xem lời giải thích chi tiết
              </button>
            )}
          </div>

          {/* Progressive Socratic Hints */}
          {aiFeedback && (
            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line">
              {aiFeedback}
            </div>
          )}

          {hintLevel === 2 && (
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
              <span className="font-bold block mb-1">💡 Gợi ý mức 2 của AI:</span>
              {currentQ.hint2}
            </div>
          )}

          {/* Full Explanation on Student Request */}
          {showExplanation && (
            <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#4169F6]">
                <Sparkles className="w-4 h-4" />
                <span>GIẢI THÍCH ĐẦY ĐỦ TỪ TỔ NGỮ VĂN</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {currentQ.explanation}
              </p>
              <div className="pt-2 border-t border-blue-200 dark:border-blue-900 text-xs text-slate-600 dark:text-slate-300">
                <span className="font-bold text-slate-800 dark:text-white">Câu trả lời mẫu tham khảo: </span>
                {currentQ.sampleAnswer}
              </div>

              {currentQuestionIndex < selectedText.questions.length - 1 && (
                <button
                  onClick={handleNextQuestion}
                  className="mt-3 px-5 py-2.5 rounded-xl bg-[#4169F6] text-white font-bold text-xs hover:bg-blue-600 transition-all flex items-center gap-1.5"
                >
                  <span>Sang câu hỏi tiếp theo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
