import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  PenTool,
  MessageSquare,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookmarkCheck,
} from 'lucide-react';
import { curriculumData } from '../data/mockData';
import { GradeCurriculum } from '../types';

interface CurriculumViewProps {
  onStartPracticeWithTopic: (topicTitle: string) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({ onStartPracticeWithTopic }) => {
  const [selectedGrade, setSelectedGrade] = useState<number>(8);
  const [activeUnitId, setActiveUnitId] = useState<string>('g8-u1');

  const currentGradeData: GradeCurriculum | undefined = curriculumData.find(
    (g) => g.grade === selectedGrade
  );
  const currentUnit = currentGradeData?.units.find((u) => u.id === activeUnitId) || currentGradeData?.units[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Grade Selector Tabs */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#4169F6] text-xs font-bold mb-2">
            <GraduationCap className="w-4 h-4" />
            <span>CHƯƠNG TRÌNH GDPT 2018</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Lộ Trình Học Tập Toàn Diện Khối 6 – 9
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Tổ Ngữ văn - GDCD Trường THCS Huỳnh Thúc Kháng biên soạn chuẩn mực
          </p>
        </div>

        {/* Grade tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-700 p-1.5 rounded-2xl">
          {[6, 7, 8, 9].map((g) => (
            <button
              key={g}
              onClick={() => {
                setSelectedGrade(g);
                const firstUnit = curriculumData.find((item) => item.grade === g)?.units[0];
                if (firstUnit) setActiveUnitId(firstUnit.id);
              }}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedGrade === g
                  ? 'bg-gradient-to-r from-[#4169F6] to-[#6750FF] text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Lớp {g}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (4 cols): Units Navigation */}
        <div className="lg:col-span-4 space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Các bài học Lớp {selectedGrade} ({currentGradeData?.units.length} chủ điểm)
          </p>

          <div className="space-y-2.5">
            {currentGradeData?.units.map((unit) => {
              const isSelected = unit.id === activeUnitId;
              return (
                <div
                  key={unit.id}
                  onClick={() => setActiveUnitId(unit.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/40 border-[#4169F6] dark:border-blue-700 shadow-xs'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[11px] font-bold uppercase ${
                        isSelected ? 'text-[#4169F6]' : 'text-slate-400'
                      }`}
                    >
                      Chủ điểm {unit.order}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#11B981]" />
                  </div>
                  <h3
                    className={`font-bold text-sm mt-1 leading-snug ${
                      isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {unit.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {unit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right (8 cols): Unit Detail & 4 Sections */}
        {currentUnit && (
          <div className="lg:col-span-8 space-y-5">
            {/* Unit Header Card */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-xs">
              <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-[#4169F6] text-xs font-bold">
                Lớp {selectedGrade} • Chủ điểm {currentUnit.order}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
                {currentUnit.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {currentUnit.description}
              </p>

              {/* Action Banner */}
              <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700/50 dark:to-indigo-950/30 border border-blue-200/60 dark:border-indigo-900/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4169F6] text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Luyện viết theo chủ điểm này với AI
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      AI Socratic đồng hành tìm ý, dựng luận điểm và chấm theo Rubric
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onStartPracticeWithTopic(currentUnit.title)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#4169F6] to-[#6750FF] text-white text-xs font-bold hover:opacity-95 transition-all shadow-md shadow-blue-500/20 flex items-center gap-1.5 shrink-0"
                >
                  <span>Vào luyện viết</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 4 Phân Môn Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 1. Đọc hiểu */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
                <div className="flex items-center gap-2.5 text-[#4169F6]">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    1. Đọc Hiểu Văn Bản
                  </h4>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {currentUnit.readingPassages.map((p, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <BookmarkCheck className="w-3.5 h-3.5 text-[#4169F6] shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2. Thực hành Viết */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
                <div className="flex items-center gap-2.5 text-indigo-600">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center">
                    <PenTool className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    2. Kỹ Năng Viết
                  </h4>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentUnit.writingSkill}
                </div>
              </div>

              {/* 3. Tiếng Việt */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
                <div className="flex items-center gap-2.5 text-[#FF7A00]">
                  <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950/50 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    3. Thực Hành Tiếng Việt
                  </h4>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentUnit.vietnamesePractice}
                </div>
              </div>

              {/* 4. Nói và Nghe */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
                <div className="flex items-center gap-2.5 text-[#11B981]">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    4. Nói và Nghe
                  </h4>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentUnit.speakingListening}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
