"use client";
import { useStore } from "@/lib/store";
import { Check, X, Info } from "lucide-react";

export function ToastContainer() {
  const { toasts, removeToast } = useStore();

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto bg-white border border-[var(--siliq-line)] shadow-lg px-4 py-3 flex items-center gap-3 min-w-[280px] max-w-md animate-slide-in">
          {t.type === "success" && <Check className="w-4 h-4 text-green-600 shrink-0" />}
          {t.type === "info" && <Info className="w-4 h-4 text-blue-600 shrink-0" />}
          {t.type === "error" && <X className="w-4 h-4 text-red-600 shrink-0" />}
          <span className="text-sm flex-1">{t.message}</span>
          <button onClick={() => removeToast(t.id)} className="text-[var(--siliq-accent)] hover:text-[var(--siliq-black)]">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
