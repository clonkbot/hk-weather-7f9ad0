interface ForecastRowProps {
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  isLast: boolean;
}

export default function ForecastRow({ day, high, low, condition, icon, isLast }: ForecastRowProps) {
  const tempRange = high - low;
  const barWidth = Math.min(100, tempRange * 5 + 40);

  return (
    <div className={`flex items-center px-4 md:px-6 py-4 md:py-5 hover:bg-white/[0.02] transition-colors ${!isLast ? 'border-b border-white/[0.05]' : ''}`}>
      {/* Day */}
      <div className="w-20 md:w-28 shrink-0">
        <span className="text-sm md:text-base font-light text-white/70">{day}</span>
      </div>

      {/* Icon */}
      <div className="w-10 md:w-12 shrink-0 text-xl md:text-2xl text-center">
        {icon}
      </div>

      {/* Condition - hidden on very small screens */}
      <div className="hidden sm:block flex-1 px-4">
        <span className="text-xs md:text-sm text-white/40 font-light">{condition}</span>
      </div>

      {/* Temperature bar */}
      <div className="flex-1 sm:flex-none sm:w-32 md:w-40 px-2 md:px-4">
        <div className="relative h-1 bg-white/[0.05] rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-gradient-to-r from-cyan-400/60 via-white/40 to-orange-400/60 rounded-full"
            style={{ width: `${barWidth}%` }}
          />
        </div>
      </div>

      {/* Temps */}
      <div className="flex items-center gap-2 md:gap-3 w-20 md:w-24 shrink-0 justify-end">
        <span className="text-xs md:text-sm text-white/30 font-light font-mono">{low}°</span>
        <span className="text-sm md:text-base text-white/80 font-light font-mono">{high}°</span>
      </div>
    </div>
  );
}
