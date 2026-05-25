"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-3xl mb-3">Something went wrong</h1>
      <p className="text-sm text-[var(--siliq-accent)] mb-6">We&apos;re sorry — an unexpected error occurred.</p>
      <button onClick={reset} className="px-8 py-3 bg-[var(--siliq-black)] text-white text-xs tracking-[0.2em] uppercase hover:bg-[var(--siliq-charcoal)] transition-colors">
        Try Again
      </button>
    </div>
  );
}
