export function BackgroundOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-55">
      <div className="absolute -top-40 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[var(--grad-cosmic)] blur-3xl" />
      <div className="absolute bottom-[-320px] left-[-220px] h-[560px] w-[560px] rounded-full bg-[var(--grad-gold)] blur-3xl opacity-70" />
      <div className="absolute bottom-[-300px] right-[-220px] h-[560px] w-[560px] rounded-full bg-[var(--grad-cosmic)] blur-3xl opacity-70" />
    </div>
  );
}

