export function SectionHeader({ label, title, className = "" }: { label: string; title: string; className?: string }) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <p className="text-xs font-medium tracking-[0.4em] uppercase text-[var(--siliq-accent)] mb-3">{label}</p>
      <h2 className="font-display text-3xl md:text-4xl font-light">{title}</h2>
      <div className="w-14 h-px bg-[var(--siliq-black)] mx-auto mt-5" />
    </div>
  );
}
