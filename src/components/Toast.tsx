import React from 'react';
import { CheckCircle2, Award, Sparkles, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'badge' | 'info';
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onRemove }) => {
  if (!toasts.length) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-900/10 text-slate-800 dark:text-white animate-in slide-in-from-right-4 transition-all"
        >
          <div className="mt-0.5">
            {t.type === 'badge' ? (
              <Award className="w-5 h-5 text-amber-500" />
            ) : t.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-[#11B981]" />
            ) : (
              <Sparkles className="w-5 h-5 text-[#4169F6]" />
            )}
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold">{t.title}</h4>
            {t.message && <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t.message}</p>}
          </div>
          <button
            onClick={() => onRemove(t.id)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
