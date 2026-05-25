"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send } from "lucide-react";
import {
  MorphingPopover,
  MorphingPopoverTrigger,
  MorphingPopoverContent,
} from "@/components/ui/morphing-popover";
import { useStore } from "@/lib/store";

interface QuickMessageProps {
  triggerLabel?: string;
  placeholder?: string;
  successMessage?: string;
  context?: string; // e.g. "About: Solis Signet Ring"
  className?: string;
}

/**
 * QuickMessage - small morphing popover for fast inquiries.
 * Used on Contact page (general quick note) and Product page (ask about a piece).
 */
export function QuickMessage({
  triggerLabel = "Quick Message",
  placeholder = "Type your question or message...",
  successMessage = "Message sent! We'll respond within 24 hours.",
  context,
  className = "",
}: QuickMessageProps) {
  const uniqueId = useId();
  const [note, setNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useStore();

  const closeMenu = () => {
    setNote("");
    setIsOpen(false);
  };

  const submit = async () => {
    if (!note.trim()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    showToast(successMessage);
    setSubmitting(false);
    closeMenu();
  };

  return (
    <MorphingPopover
      transition={{ type: "spring", bounce: 0.05, duration: 0.35 }}
      open={isOpen}
      onOpenChange={setIsOpen}
      className={className}
    >
      <MorphingPopoverTrigger className="flex items-center gap-2 px-5 py-2.5 border border-[var(--siliq-black)] text-[11px] tracking-[0.15em] uppercase text-[var(--siliq-black)] bg-white hover:bg-[var(--siliq-black)] hover:text-white transition-colors">
        <motion.span layoutId={`popover-label-${uniqueId}`}>{triggerLabel}</motion.span>
      </MorphingPopoverTrigger>

      <MorphingPopoverContent className="rounded-none border border-[var(--siliq-black)] bg-white p-0 shadow-xl">
        <div className="w-[340px] sm:w-[380px]">
          <form
            className="flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            {/* Header label */}
            <div className="px-4 pt-3 pb-2 border-b border-[var(--siliq-line)]">
              <motion.span
                layoutId={`popover-label-${uniqueId}`}
                className="text-[11px] tracking-[0.15em] uppercase text-[var(--siliq-graphite)]"
              >
                {triggerLabel}
              </motion.span>
              {context && (
                <p className="text-[10px] text-[var(--siliq-accent)] mt-1 truncate">{context}</p>
              )}
            </div>

            {/* Message field */}
            <textarea
              className="h-[140px] w-full resize-none bg-transparent px-4 py-3 text-sm outline-none placeholder:text-[var(--siliq-accent)]"
              autoFocus
              placeholder={placeholder}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            {/* Email field */}
            <div className="px-4 pb-3">
              <input
                type="email"
                placeholder="Your email"
                required
                className="w-full px-3 py-2 border border-[var(--siliq-line)] bg-transparent text-sm focus:border-[var(--siliq-black)] outline-none"
              />
            </div>

            <div className="flex justify-between items-center px-2 py-2 border-t border-[var(--siliq-line)]">
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] tracking-wider uppercase text-[var(--siliq-accent)] hover:text-[var(--siliq-black)] transition-colors"
                onClick={closeMenu}
                aria-label="Close"
              >
                <ArrowLeft size={12} />
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !note.trim()}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-[var(--siliq-black)] text-white text-[11px] tracking-wider uppercase disabled:opacity-40 hover:bg-[var(--siliq-charcoal)] transition-colors"
              >
                {submitting ? "Sending..." : <>Send <Send size={12} /></>}
              </button>
            </div>
          </form>
        </div>
      </MorphingPopoverContent>
    </MorphingPopover>
  );
}
