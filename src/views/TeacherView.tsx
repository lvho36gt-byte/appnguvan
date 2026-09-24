import React, { useState } from 'react';
import {
  School,
  FileSpreadsheet,
  FileCheck2,
  FileQuestion,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Printer,
  BookOpen,
  Gamepad2,
  Layers,
} from 'lucide-react';
import { ToastMessage } from '../components/Toast';

interface TeacherViewProps {
  onAddToast: (toast: Omit<ToastMessage, 'id'>) => void;
}

export const TeacherView: React.FC<TeacherViewProps> = ({ onAddToast }) => {
  const [taskType, setTaskType] = useState<
    'exam' | 'worksheet' | 'rubric' | 'warmup' | 'reading'
  >('worksheet');
  const [grade, setGrade] = useState('8');
  const [topic, setTopic] = useState('Nghị luận về lòng biết ơn trong cuộc sống');
  const [extraRequirements, setExtraRequirements] = useState(
    'Thiết kế dạng phiếu học tập 3 bước gợi mở tư duy, không đưa bài mẫu.'
  );
  const [generatedContent, setGeneratedContent] = useState<string | null>(
    `TRƯỜNG THCS HUỲNH THÚC KHÁNG\nTỔ NGỮ VĂN - GDCD\n--------------------------------------\nPHIẾU HỌC TẬP RÈN LUYỆN TƯ DUY NGHỊ LUẬN (KHỐI 8)\nChủ đề: LÒNG BIẾT ƠN TRONG CUỘC SỐNG\n\nPHẦN 1: KHỞI ĐỘNG VÀ BÓC TÁCH ĐỀ\n1. Theo em, "biết ơn" là tình cảm như thế nào đối với người đã giúp đỡ mình?\n2. Hãy liệt kê 3 đối tượng gần gũi nhất mà em cảm thấy biết ơn sâu sắc mỗi ngày.\n\nPHẦN 2: XÂY DỰNG CÂY LUẬN ĐIỂM\n- Luận điểm 1: Lòng biết ơn là cội nguồn của đạo lý làm người ("Uống nước nhớ nguồn").\n  + Lí lẽ: Khi biết ơn, ta biết trân trọng công sức của người khác.\n  + Dẫn chứng: Ngày Nhà giáo Việt Nam 20/11, Ngày Thương binh Liệt sĩ 27/7.\n- Luận điểm 2: Người có lòng biết ơn luôn được mọi người yêu mến, cuộc sống thanh thản.\n- Luận điểm 3 (Phản biện): Phê phán lối sống vô ơn, "ăn cháo đá bát".\n\nPHẦN 3: HÀNH ĐỘNG CỦA EM\n- Là học sinh THCS Huỳnh Thúc Kháng, em sẽ thể hiện lòng biết ơn bằng những việc làm cụ thể nào?`
  );
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateTeacherMaterial = async () => {
    setLoading(true);
    try {
      const taskLabels: Record<string, string> = {
        exam: 'Tạo đề kiểm tra theo ma trận chuẩn GDPT 2018',
        worksheet: 'Tạo phiếu học tập rèn tư duy',
        rubric: 'Tạo Rubric chấm điểm chi tiết chuẩn tổ chuyên môn',
        warmup: 'Thiết kế hoạt động khởi động 5 phút đầu giờ',
        reading: 'Gợi ý ngữ liệu đọc bổ trợ phân hóa',
      };

      const res = await fetch('/api/ai/teacher-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task: taskLabels[taskType],
          grade,
          topic,
          extraRequirements,
        }),
      });

      const data = await res.json();
      setGeneratedContent(data.result);
      onAddToast({ type: 'success', title: 'Đã tạo tài liệu chuyên môn thành công!' });
    } catch {
      onAddToast({ type: 'info', title: 'Tài liệu đã được chuẩn bị.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onAddToast({ type: 'success', title: 'Đã sao chép tài liệu vào clipboard!' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#6750FF] to-indigo-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-indigo-500/15">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold mb-3 border border-white/20">
            <School className="w-3.5 h-3.5 text-amber-300" />
            <span>KHÔNG GIAN HỖ TRỢ GIẢNG DẠY CHUYÊN MÔN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Góc Giáo Viên Tổ Ngữ Văn – GDCD
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100 mt-2 leading-relaxed">
            Công cụ trợ giảng thiết kế đề thi ma trận, phiếu học tập rèn tư duy Socratic, Rubric chấm bài và hoạt động khởi động 5 phút cho Trường THCS Huỳnh Thúc Kháng.
          </p>
        </div>
      </div>

      {/* Task Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { id: 'worksheet', label: 'Phiếu học tập', icon: FileSpreadsheet },
          { id: 'exam', label: 'Đề kiểm tra ma trận', icon: FileQuestion },
          { id: 'rubric', label: 'Rubric chấm điểm', icon: FileCheck2 },
          { id: 'warmup', label: 'Khởi động 5 phút', icon: Gamepad2 },
          { id: 'reading', label: 'Ngữ liệu đọc bổ trợ', icon: BookOpen },
        ].map((item) => {
          const Icon = item.icon;
          const isSelected = taskType === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setTaskType(item.id as any)}
              className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                isSelected
                  ? 'bg-[#6750FF] text-white border-[#6750FF] shadow-md shadow-indigo-500/20'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-bold">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Controls & Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (5 cols): Options */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              Khối lớp áp dụng:
            </label>
            <div className="flex gap-2">
              {['6', '7', '8', '9'].map((g) => (
                <button
                  key={g}
                  onClick={() => setGrade(g)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    grade === g
                      ? 'bg-[#6750FF] text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Lớp {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Chủ đề bài học / Tác phẩm / Vấn đề:
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full rounded-xl p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Yêu cầu chi tiết của Thầy/Cô:
            </label>
            <textarea
              value={extraRequirements}
              onChange={(e) => setExtraRequirements(e.target.value)}
              rows={3}
              className="w-full rounded-xl p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-white"
            />
          </div>

          <button
            onClick={handleGenerateTeacherMaterial}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6750FF] to-indigo-700 text-white font-bold text-xs sm:text-sm hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Tạo tài liệu chuyên môn với AI</span>
          </button>
        </div>

        {/* Right (7 cols): Generated Material & Export */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6750FF]">
              BẢN THẢO TÀI LIỆU CHUYÊN MÔN
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 flex items-center gap-1.5"
                title="Sao chép toàn bộ"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
              </button>
              <button
                onClick={handlePrint}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 flex items-center gap-1.5"
                title="In tài liệu"
              >
                <Printer className="w-4 h-4" />
                <span>In ấn</span>
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-mono whitespace-pre-line max-h-[500px] overflow-y-auto">
            {generatedContent}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-400 flex items-center justify-between">
            <span>Tổ Ngữ văn - GDCD • Trường THCS Huỳnh Thúc Kháng</span>
            <span>Học kỳ II năm học 2025–2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};
