import React from 'react';
import {
  Home,
  GraduationCap,
  PenTool,
  Sparkles,
  BookOpen,
  GitFork,
  Gamepad2,
  Bot,
  User,
  School,
  Flame,
  ChevronRight,
} from 'lucide-react';
import { NavItem, UserProfile } from '../types';

interface SidebarProps {
  currentTab: NavItem;
  setCurrentTab: (tab: NavItem) => void;
  mobileOpen: boolean;
  setMobileOpen: (val: boolean) => void;
  user: UserProfile;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  mobileOpen,
  setMobileOpen,
  user,
}) => {
  const mainNavItems = [
    { id: 'home', label: 'Trang chủ', icon: Home },
    { id: 'curriculum', label: 'Lộ trình khối 6–9', icon: GraduationCap },
    { id: 'ai-workspace', label: 'Phòng Viết cùng AI', icon: PenTool, highlight: true },
    { id: 'ai-ecosystem', label: '10 AI Luyện viết', icon: Sparkles },
    { id: 'reading', label: 'Đọc hiểu thông minh', icon: BookOpen },
    { id: 'mindmap', label: 'Sơ đồ tư duy AI', icon: GitFork },
    { id: 'games', label: 'Tiếng Việt vui', icon: Gamepad2 },
    { id: 'tutor', label: 'AI Tutor Ngữ văn', icon: Bot },
    { id: 'profile', label: 'Hồ sơ & Huy hiệu', icon: User },
  ];

  const handleSelect = (id: NavItem) => {
    setCurrentTab(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed md:sticky top-18 left-0 h-[calc(100vh-4.5rem)] w-68 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 z-40 flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6 overflow-y-auto pr-1">
          {/* Streak pill */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-orange-200/60 dark:border-orange-900/40 rounded-2xl p-3.5 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF7A00] to-amber-500 text-white flex items-center justify-center shadow-xs">
                <Flame className="w-4 h-4 fill-current" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                  Chuỗi học: {user.streakDays} ngày
                </p>
                <p className="text-[11px] text-orange-600 dark:text-orange-400 font-medium">
                  Chăm chỉ mỗi ngày! 🔥
                </p>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="space-y-1.5">
            <p className="px-3 text-[11px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
              Học sinh THCS
            </p>
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id as NavItem)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all text-left ${
                    isActive
                      ? 'bg-[#4169F6] text-white shadow-md shadow-blue-500/25 font-semibold'
                      : item.highlight
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/40 text-[#4169F6] dark:text-indigo-300 hover:bg-indigo-100/70'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-[#4169F6] dark:text-indigo-300' : 'text-slate-500 dark:text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.highlight && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#4169F6] animate-ping" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Teacher Corner Navigation Section */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
            <p className="px-3 text-[11px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
              Dành cho Thầy Cô
            </p>
            <button
              onClick={() => handleSelect('teacher')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all text-left ${
                currentTab === 'teacher'
                  ? 'bg-gradient-to-r from-[#6750FF] to-indigo-700 text-white shadow-md font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/30 hover:text-[#6750FF]'
              }`}
            >
              <div className="flex items-center gap-3">
                <School className={`w-4 h-4 ${currentTab === 'teacher' ? 'text-white' : 'text-[#6750FF]'}`} />
                <span>Góc Giáo Viên</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>
          </div>
        </div>

        {/* School Footer info */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 text-center">
          <p className="font-semibold text-slate-600 dark:text-slate-400">THCS Huỳnh Thúc Kháng</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Tổ Ngữ văn – GDCD 2026</p>
        </div>
      </aside>
    </>
  );
};
