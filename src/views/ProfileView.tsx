import React, { useState } from 'react';
import {
  User,
  Award,
  Flame,
  BookOpen,
  Calendar,
  School,
  CheckCircle2,
  Clock,
  TrendingUp,
  FileText,
  Sparkles,
} from 'lucide-react';
import { badgesData } from '../data/mockData';
import { UserProfile } from '../types';
import { ToastMessage } from '../components/Toast';

interface ProfileViewProps {
  user: UserProfile;
  setUser: (user: UserProfile) => void;
  onAddToast: (toast: Omit<ToastMessage, 'id'>) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, setUser, onAddToast }) => {
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(user.name);
  const [classInput, setClassInput] = useState(user.className);

  const handleSaveProfile = () => {
    setUser({
      ...user,
      name: nameInput,
      className: classInput,
    });
    setEditing(false);
    onAddToast({ type: 'success', title: 'Đã cập nhật thông tin học sinh!' });
  };

  const unlockedCount = badgesData.filter((b) => b.unlocked).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Student Banner Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-[#4169F6]/20 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#11B981] border-3 border-white dark:border-slate-800 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
              ✓
            </span>
          </div>

          <div>
            {!editing ? (
              <>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                    {user.name}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-[#4169F6] text-xs font-bold border border-blue-200 dark:border-blue-900">
                    Lớp {user.className}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                  <School className="w-4 h-4 text-[#4169F6]" />
                  <span>Trường THCS Huỳnh Thúc Kháng • Niên khóa 2025–2026</span>
                </p>
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1 text-[#FF7A00] font-bold">
                    <Flame className="w-4 h-4 fill-current" /> Chuỗi {user.streakDays} ngày
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                    <TrendingUp className="w-4 h-4" /> ĐTB: {user.avgScore}
                  </span>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="rounded-xl px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-bold"
                  placeholder="Họ và tên..."
                />
                <input
                  type="text"
                  value={classInput}
                  onChange={(e) => setClassInput(e.target.value)}
                  className="rounded-xl px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-bold block"
                  placeholder="Lớp..."
                />
              </div>
            )}
          </div>
        </div>

        <div>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 transition-colors"
            >
              Chỉnh sửa thông tin
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 rounded-xl bg-[#4169F6] text-white text-xs font-bold hover:bg-blue-600 transition-colors"
              >
                Lưu lại
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs"
              >
                Hủy
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Badges Section */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>BỘ SƯU TẬP HUY HIỆU NGỮ VĂN</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Đã mở khóa {unlockedCount} / {badgesData.length} danh hiệu cao quý
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-xs font-bold">
            Cấp độ: Chăm ngoan
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badgesData.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                b.unlocked
                  ? 'bg-gradient-to-br from-amber-50/50 to-orange-50/30 dark:from-amber-950/20 dark:to-orange-950/10 border-amber-200/80 dark:border-amber-900/40'
                  : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-xs ${
                  b.unlocked ? 'bg-white dark:bg-slate-800 ring-2 ring-amber-300' : 'bg-slate-200 dark:bg-slate-700'
                }`}
              >
                {b.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {b.title}
                  </h4>
                  {b.unlocked ? (
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      Đã đạt
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400">Chưa mở</span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {b.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Writing History */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#4169F6]" />
          <span>LỊCH SỬ BÀI VIẾT GẦN ĐÂY</span>
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-700">
          {[
            {
              title: 'Suy nghĩ về ý kiến: "Thất bại là người thầy nghiêm khắc nhưng bổ ích"',
              date: 'Hôm nay',
              words: 420,
              score: 8.8,
              status: 'Đã chấm Rubric',
            },
            {
              title: 'Phân tích nhân vật Anh thanh niên trong truyện ngắn "Lặng lẽ Sa Pa"',
              date: '3 ngày trước',
              words: 680,
              score: 9.0,
              status: 'Đã hoàn thiện',
            },
            {
              title: 'Đoạn văn ghi lại cảm xúc về bài thơ "Đồng chí" của Chính Hữu',
              date: '1 tuần trước',
              words: 310,
              score: 8.5,
              status: 'Đã hoàn thiện',
            },
          ].map((item, idx) => (
            <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h4>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {item.date}
                  </span>
                  <span>•</span>
                  <span>{item.words} từ</span>
                  <span>•</span>
                  <span className="text-[#11B981] font-semibold">{item.status}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#4169F6] font-bold text-xs">
                  {item.score} / 10
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
