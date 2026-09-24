/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavItem, UserProfile } from './types';
import { initialUserProfile } from './data/mockData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { FloatingTutor } from './components/FloatingTutor';
import { ToastContainer, ToastMessage } from './components/Toast';

import { HomeView } from './views/HomeView';
import { CurriculumView } from './views/CurriculumView';
import { WritingWorkspaceView } from './views/WritingWorkspaceView';
import { AiEcosystemView } from './views/AiEcosystemView';
import { ReadingView } from './views/ReadingView';
import { MindMapView } from './views/MindMapView';
import { GamesView } from './views/GamesView';
import { ProfileView } from './views/ProfileView';
import { TeacherView } from './views/TeacherView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavItem>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserProfile>(initialUserProfile);
  const [darkMode, setDarkMode] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync dark mode class with root document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleStartPracticeWithTopic = (topicTitle: string) => {
    localStorage.setItem(
      'htk_essay_draft',
      `Bài viết rèn luyện theo chủ điểm: ${topicTitle}\n\n1. Mở bài:\n\n2. Thân bài (Luận điểm 1, 2, 3):\n\n3. Kết bài:\n`
    );
    setCurrentTab('ai-workspace');
    addToast({
      type: 'info',
      title: 'Đã nạp chủ điểm vào phòng viết!',
      message: topicTitle,
    });
  };

  return (
    <div className="min-h-screen bg-[#F6F8FD] dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Global Header */}
      <Header
        user={user}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onOpenProfile={() => setCurrentTab('profile')}
      />

      {/* Main Layout Container */}
      <div className="max-w-7xl mx-auto flex">
        {/* Desktop / Collapsible Sidebar */}
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          mobileOpen={mobileMenuOpen}
          setMobileOpen={setMobileMenuOpen}
          user={user}
        />

        {/* Dynamic Main View Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pb-24 md:pb-12">
          {currentTab === 'home' && (
            <HomeView user={user} onNavigate={(tab) => setCurrentTab(tab)} />
          )}

          {currentTab === 'curriculum' && (
            <CurriculumView onStartPracticeWithTopic={handleStartPracticeWithTopic} />
          )}

          {currentTab === 'ai-workspace' && (
            <WritingWorkspaceView
              onAddToast={addToast}
              onNavigateToEcosystem={() => setCurrentTab('ai-ecosystem')}
            />
          )}

          {currentTab === 'ai-ecosystem' && (
            <AiEcosystemView
              onAddToast={addToast}
              onNavigateToWorkspace={() => setCurrentTab('ai-workspace')}
            />
          )}

          {currentTab === 'reading' && <ReadingView onAddToast={addToast} />}

          {currentTab === 'mindmap' && <MindMapView onAddToast={addToast} />}

          {currentTab === 'games' && <GamesView onAddToast={addToast} />}

          {currentTab === 'tutor' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-gradient-to-r from-[#4169F6] to-[#6750FF] text-white rounded-3xl p-8 shadow-xl">
                <h2 className="text-2xl font-extrabold">Không Gian Tương Tác Cùng AI Tutor</h2>
                <p className="text-sm text-blue-100 mt-2">
                  Thầy/cô AI luôn ở góc dưới màn hình và sẵn sàng trả lời, gợi mở mọi thắc mắc học tập của em!
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => setCurrentTab('ai-ecosystem')}
                    className="px-5 py-2.5 rounded-xl bg-white text-[#4169F6] text-xs font-bold hover:bg-blue-50 transition-colors"
                  >
                    Khám phá 10 Công cụ AI Luyện Viết
                  </button>
                </div>
              </div>
              <WritingWorkspaceView
                onAddToast={addToast}
                onNavigateToEcosystem={() => setCurrentTab('ai-ecosystem')}
              />
            </div>
          )}

          {currentTab === 'profile' && (
            <ProfileView user={user} setUser={setUser} onAddToast={addToast} />
          )}

          {currentTab === 'teacher' && <TeacherView onAddToast={addToast} />}
        </main>
      </div>

      {/* Floating Socratic AI Tutor (Bottom Right) */}
      <FloatingTutor />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Toast Notification Layer */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
