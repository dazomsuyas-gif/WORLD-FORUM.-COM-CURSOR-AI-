type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Container({ children, className }: Props) {
  return (
    <div
      className={[
        "mx-auto w-full max-w-[var(--max-width)] px-5 sm:px-8",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

