import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastContextType {
  showToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, description?: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = 'toast_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
    const newToast: ToastMessage = { id, type, title, description };
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Render Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-xl border backdrop-blur-md transition-all animate-in slide-in-from-bottom-5 duration-300 flex items-start gap-3 ${
              t.type === 'success'
                ? 'bg-[#1B5E3A] text-white border-[#D4AF37]/40'
                : t.type === 'error'
                ? 'bg-rose-900 text-white border-rose-700'
                : 'bg-[#2D3748] text-white border-stone-700'
            }`}
          >
            {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />}
            {t.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-300 shrink-0 mt-0.5" />}
            {t.type === 'info' && <Info className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />}

            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-xs">{t.title}</h4>
              {t.description && <p className="text-[11px] text-stone-200 mt-0.5 leading-snug">{t.description}</p>}
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="text-stone-300 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    // Fallback if used outside provider
    return {
      showToast: (title: string, description?: string) => {
        console.log(`[Toast] ${title} - ${description}`);
      }
    };
  }
  return context;
};
