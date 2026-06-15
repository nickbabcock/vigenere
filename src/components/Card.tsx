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
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={selected}
      tabIndex={selected ? -1 : undefined}
      className={`flex flex-1 flex-col gap-3 rounded-lg border bg-surface p-5 text-left transition-colors ${
        selected
          ? "border-accent ring-1 ring-accent select-text"
          : "descendents:pointer-events-none cursor-pointer border-line select-none hover:border-soft"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-ink">{title}</h3>
        <span
          className={`text-xs font-medium ${selected ? "text-accent" : "text-soft"}`}
        >
          {selected ? "Active" : "Select"}
        </span>
      </div>
      {children}
    </button>
  );
};
