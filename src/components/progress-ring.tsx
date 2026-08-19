interface ProgressRingProps {
  value: number;
  max: number;
  label: string;
}

export function ProgressRing({ value, max, label }: ProgressRingProps) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / max, 1);
  const offset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 100 100" className="h-28 w-28">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#2a2a2a"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#ffffff"
          strokeWidth="8"
          strokeLinecap="square"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
        />
        <text
          x="50"
          y="54"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="18"
          fontWeight="700"
        >
          {value}
        </text>
      </svg>
      <p className="font-display text-xs tracking-[0.16em] text-muted uppercase">{label}</p>
    </div>
  );
}
