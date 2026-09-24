import React, { useState } from 'react';
import { BookOpen, Bell, Sun, Moon, Sparkles, CheckCircle, Menu, X, Award } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (val: boolean) => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  darkMode,
  setDarkMode,
  mobileMenuOpen,
  setMobileMenuOpen,
  onOpenProfile,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Cô Mai Lan (Tổ trưởng Ngữ văn)',
      desc: 'Đã gửi phiếu học tập rèn luận điểm tuần này cho Khối 8.',
      time: '15 phút trước',
      read: false,
    },
    {
      id: 2,
      title: 'Hệ thống AI Tutor',
      desc: 'Chúc mừng em đã giữ vững chuỗi 5 ngày học liên tục! 🔥',
      time: '2 giờ trước',
      read: false,
    },
    {
      id: 3,
      title: 'Huy hiệu mới đã mở',
      desc: 'Em đã mở khóa huy hiệu "Nhà lập luận"!',
      time: 'Hôm qua',
      read: true,
    },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Mở menu điều hướng"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#4169F6] to-[#6750FF] flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <BookOpen className="w-6 h-6" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-[#4169F6] to-[#6750FF] bg-clip-text text-transparent">
                NGỮ VĂN THCS
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-[#4169F6] dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Lớp 6–9
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Tổ Ngữ văn - GDCD • Trường THCS Huỳnh Thúc Kháng
            </p>
          </div>
        </div>

        {/* Right: Actions & User info */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Dark / Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={darkMode ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
              title="Thông báo"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#FF7A00] text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">Thông báo mới</span>
                    <span className="text-xs text-slate-500">({unreadCount} chưa đọc)</span>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs text-[#4169F6] dark:text-blue-400 font-semibold hover:underline"
                    >
                      Đọc tất cả
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/60">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
                        !item.read ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5">
                          {item.id === 1 ? (
                            <BookOpen className="w-4 h-4 text-[#4169F6]" />
                          ) : item.id === 2 ? (
                            <Sparkles className="w-4 h-4 text-[#FF7A00]" />
                          ) : (
                            <Award className="w-4 h-4 text-[#11B981]" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</p>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                            {item.desc}
                          </p>
                          <span className="text-[10px] text-slate-400 mt-1 block">{item.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User profile avatar and badge */}
          <div
            onClick={onOpenProfile}
            className="flex items-center gap-2.5 pl-2 border-l border-slate-200 dark:border-slate-800 cursor-pointer group"
          >
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-9 h-9 rounded-xl object-cover ring-2 ring-[#4169F6]/20 group-hover:ring-[#4169F6] transition-all"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#11B981] border-2 border-white dark:border-slate-900 rounded-full" />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#4169F6] transition-colors leading-tight">
                {user.name}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {user.className} • THCS Huỳnh Thúc Kháng
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
