import React from 'react';
import { Home, PenTool, BookOpen, Gamepad2, Bot, GraduationCap } from 'lucide-react';
import { NavItem } from '../types';

interface BottomNavProps {
  currentTab: NavItem;
  setCurrentTab: (tab: NavItem) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, setCurrentTab }) => {
  const items = [
    { id: 'home', label: 'Trang chủ', icon: Home },
    { id: 'curriculum', label: 'Bài học', icon: GraduationCap },
    { id: 'ai-workspace', label: 'Viết AI', icon: PenTool, activeColor: 'text-[#4169F6]' },
    { id: 'reading', label: 'Đọc hiểu', icon: BookOpen },
    { id: 'games', label: 'Vui học', icon: Gamepad2 },
    { id: 'tutor', label: 'AI Tutor', icon: Bot },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id as NavItem)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive
                  ? 'text-[#4169F6] font-bold scale-105'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
