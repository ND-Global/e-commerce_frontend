import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useShop } from '../context/shopcontext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div 
      id="toast-container"
      className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          id={`toast-${toast.id}`}
          className="pointer-events-auto flex items-start p-4 bg-[#1A1A1A] text-[#FAF9F6] border border-[#2D2D2D] rounded-xl shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex-shrink-0 mr-3 mt-0.5">
            {toast.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-[#9ED8A6]" />
            )}
            {toast.type === 'error' && (
              <AlertCircle className="w-5 h-5 text-[#E5837B]" />
            )}
            {toast.type === 'info' && (
              <Info className="w-5 h-5 text-[#9BC7EA]" />
            )}
          </div>

          <div className="flex-1 mr-2">
            <h4 className="text-sm font-semibold tracking-wide text-white">{toast.title}</h4>
            {toast.message && (
              <p className="text-xs text-[#B5B2AB] mt-0.5 leading-relaxed">{toast.message}</p>
            )}
          </div>

          <button
            id={`toast-close-${toast.id}`}
            onClick={() => removeToast(toast.id)}
            aria-label="Close notification"
            className="text-[#888] hover:text-white transition-colors p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
