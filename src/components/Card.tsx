export interface CardProps {
  title: string;
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel: string;
}

export const Card = ({
  title,
  selected,
  children,
  onClick,
  ariaLabel,
}: CardProps) => {
  return (
    <button
      className={`bg-surface-2 flex h-full max-w-xs flex-col gap-2 rounded-xl bg-zinc-300 p-5 drop-shadow-md transition-all hover:drop-shadow-xl focus-visible:drop-shadow-xl dark:bg-zinc-700 ${
        !selected
          ? "descendents:pointer-events-none cursor-pointer select-none opacity-50 hover:opacity-70 focus-visible:opacity-70"
          : "select-text"
      }`}
      onClick={onClick}
      aria-label={ariaLabel}
      tabIndex={selected ? -1 : undefined}
    >
      <h3 className="text-lg">{title}</h3>
      {children}
    </button>
  );
};
