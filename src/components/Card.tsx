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
      className={`max-w-xs h-full flex flex-col gap-2 bg-surface-2 p-5 rounded-xl bg-zinc-300 dark:bg-zinc-700 drop-shadow-md hover:drop-shadow-xl focus-visible:drop-shadow-xl transition-all ${
        !selected
          ? "opacity-50 hover:opacity-70 focus-visible:opacity-70 select-none cursor-pointer descendents:pointer-events-none"
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
