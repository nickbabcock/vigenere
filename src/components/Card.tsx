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
      className={`max-w-14 h-full flex flex-col gap-2 bg-surface-2 p-5 rounded-xl border-0 drop-shadow-1 hover:drop-shadow-3 focus-visible:drop-shadow-3 transition-shadow transition-opacity ${
        !selected
          ? "opacity-50 hover:opacity-70 focus-visible:opacity-70 select-none cursor-pointer descendents:pointer-events-none"
          : "select-text"
      }`}
      onClick={onClick}
      aria-label={ariaLabel}
      tabIndex={selected ? -1 : undefined}
    >
      <h3 className="m-0">{title}</h3>
      {children}
    </button>
  );
};
