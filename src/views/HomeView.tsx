import React from 'react';
import {
  FileText,
  Flame,
  Award,
  CheckCircle2,
  BookOpen,
  GitFork,
  Gamepad2,
  Sparkles,
  PenTool,
  FolderArchive,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  Compass,
} from 'lucide-react';
import { NavItem, UserProfile } from '../types';

interface HomeViewProps {
  user: UserProfile;
  onNavigate: (tab: NavItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ user, onNavigate }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Tổng bài tập */}
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Tổng bài tập
            </span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-[#4169F6] flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {user.totalExercises}
            </span>
            <span className="text-xs text-slate-400 ml-1.5 font-medium">bài</span>
          </div>
          <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium mt-1">
            Chương trình GDPT 2018
          </p>
        </div>

        {/* Card 2: Chuỗi ngày học */}
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Chuỗi ngày học
            </span>
            <div className="w-10 h-10 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-[#FF7A00] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5 fill-current" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {user.streakDays}
            </span>
            <span className="text-xs text-slate-400 ml-1.5 font-medium">ngày liên tục</span>
          </div>
          <p className="text-[11px] text-[#FF7A00] font-medium mt-1">
            Rèn luyện đều đặn 🔥
          </p>
        </div>

        {/* Card 3: Điểm trung bình */}
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Điểm trung bình
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {user.avgScore}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ 10.0</span>
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Tăng +0.4 tuần này
          </p>
        </div>

        {/* Card 4: Bài đã hoàn thành */}
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Bài đã hoàn thành
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-[#11B981] flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {user.completedExercises}
            </span>
            <span className="text-xs text-slate-400 ml-1.5 font-medium">/ {user.totalExercises} bài</span>
          </div>
          <p className="text-[11px] text-[#11B981] font-medium mt-1">
            Đạt 78.5% tiến độ
          </p>
        </div>
      </div>

      {/* BANNER ĐẶC BIỆT: HỆ SINH THÁI AI ĐỊNH HƯỚNG TƯ DUY VIẾT VĂN */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#4169F6] via-[#5550F8] to-[#6750FF] text-white p-7 sm:p-10 shadow-xl shadow-indigo-500/20">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-indigo-300/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-white mb-4 border border-white/20">
            <BrainCircuit className="w-4 h-4 text-amber-300" />
            <span>TỔ NGỮ VĂN - GDCD TRƯỜNG THCS HUỲNH THÚC KHÁNG</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-3">
            HỆ SINH THÁI AI <br />
            ĐỊNH HƯỚNG TƯ DUY VIẾT VĂN
          </h2>

          <p className="text-sm sm:text-base text-blue-100 font-medium mb-6 leading-relaxed">
            “AI không viết thay em – AI giúp em biết cách suy nghĩ để tự viết hay hơn.”
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('ai-workspace')}
              className="px-6 py-3 rounded-2xl bg-white text-[#4169F6] font-bold text-sm hover:bg-blue-50 active:scale-95 transition-all shadow-lg shadow-black/10 flex items-center gap-2"
            >
              <span>BẮT ĐẦU LUYỆN VIẾT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('ai-ecosystem')}
              className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-semibold text-sm backdrop-blur-md transition-all border border-white/20 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Khám phá 10 Công cụ AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* LỘ TRÌNH HỌC TẬP - 6 CARD LỚN */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              LỘ TRÌNH HỌC TẬP
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Hệ thống hóa năng lực Ngữ văn THCS từ cơ bản đến nâng cao
            </p>
          </div>
          <button
            onClick={() => onNavigate('curriculum')}
            className="text-xs sm:text-sm font-bold text-[#4169F6] dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Xem tất cả bài học</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: ÔN TẬP THEO CHỦ ĐỀ */}
          <div
            onClick={() => onNavigate('curriculum')}
            className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 shadow-xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-13 h-13 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-[#4169F6] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#4169F6] transition-colors">
                ÔN TẬP THEO CHỦ ĐỀ
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Nội dung Ngữ văn toàn diện lớp 6, 7, 8, 9: Đọc hiểu, Viết, Tiếng Việt, Văn học và Nói & Nghe.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-semibold text-[#4169F6]">
              <span>4 Khối lớp • 16 chủ điểm</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: SƠ ĐỒ TƯ DUY */}
          <div
            onClick={() => onNavigate('mindmap')}
            className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700 shadow-xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-13 h-13 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-[#6750FF] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GitFork className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#6750FF] transition-colors">
                SƠ ĐỒ TƯ DUY
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                AI giúp học sinh hệ thống hóa kiến thức tác phẩm, nhân vật và bài học thành Mind Map trực quan sinh động.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-semibold text-[#6750FF]">
              <span>Tạo Mind Map tự động</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: TIẾNG VIỆT VUI */}
          <div
            onClick={() => onNavigate('games')}
            className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-700 shadow-xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-13 h-13 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-[#FF7A00] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#FF7A00] transition-colors">
                TIẾNG VIỆT VUI
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Trò chơi và thử thách từ vựng, ngữ pháp, biện pháp tu từ, thành phần câu, nghĩa của từ và liên kết câu.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-semibold text-[#FF7A00]">
              <span>Thi đấu tính điểm & Huy hiệu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: ĐỌC HIỂU THÔNG MINH */}
          <div
            onClick={() => onNavigate('reading')}
            className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 shadow-xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-13 h-13 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-[#11B981] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#11B981] transition-colors">
                ĐỌC HIỂU THÔNG MINH
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                AI tạo câu hỏi đọc hiểu 3 mức (Nhận biết - Thông hiểu - Vận dụng) và dẫn dắt học sinh suy luận từng bước.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-semibold text-[#11B981]">
              <span>Phản hồi gợi mở Socratic</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: LUYỆN VIẾT */}
          <div
            onClick={() => onNavigate('ai-workspace')}
            className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-13 h-13 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <PenTool className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                LUYỆN VIẾT
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Phòng viết chuyên biệt: luyện viết đoạn và bài văn hoàn chỉnh theo chương trình Ngữ văn THCS chuẩn mực.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-semibold text-indigo-600">
              <span>Đếm từ • Lưu nháp • AI Coach</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: KHO HỌC LIỆU */}
          <div
            onClick={() => onNavigate('curriculum')}
            className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-700 shadow-xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-13 h-13 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FolderArchive className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-rose-500 transition-colors">
                KHO HỌC LIỆU
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Tác phẩm văn học, cẩm nang kiến thức tiếng Việt, phiếu học tập, rubric chấm điểm và tài liệu từ giáo viên.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-semibold text-rose-500">
              <span>Biên soạn bởi Tổ Ngữ văn</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* BANNER CUỐI TRANG CHỦ: GỢI Ý TỪ AI TUTOR */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800/80 dark:to-indigo-950/30 border border-blue-200/70 dark:border-indigo-900/50 rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#4169F6] text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#4169F6] dark:text-blue-400">
                GỢI Ý TỪ AI TUTOR
              </span>
              <span className="w-2 h-2 rounded-full bg-[#11B981] animate-pulse" />
            </div>
            <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1">
              “Dựa trên kết quả học tập, em nên luyện thêm phần xác định luận điểm.”
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Thầy cô nhận thấy các luận điểm của em đã rõ ràng nhưng cần thêm sự liên kết chặt chẽ với dẫn chứng thực tế.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('curriculum')}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors shadow-xs"
          >
            ÔN TẬP NGAY
          </button>
          <button
            onClick={() => onNavigate('ai-ecosystem')}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4169F6] to-[#6750FF] text-white text-xs font-bold hover:opacity-95 transition-all shadow-md shadow-blue-500/20"
          >
            LUYỆN VỚI AI
          </button>
        </div>
      </div>
    </div>
  );
};
