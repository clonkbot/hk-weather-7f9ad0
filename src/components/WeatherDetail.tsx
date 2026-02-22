interface WeatherDetailProps {
  label: string;
  value: number;
  unit: string;
  icon: string;
  warning?: boolean;
}

export default function WeatherDetail({ label, value, unit, icon, warning = false }: WeatherDetailProps) {
  return (
    <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl p-4 md:p-5 hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300 group">
      <div className="flex items-start justify-between mb-2 md:mb-3">
        <span className="text-lg md:text-xl opacity-70 group-hover:opacity-100 transition-opacity">{icon}</span>
        {warning && (
          <span className="text-[9px] md:text-[10px] px-1.5 py-0.5 bg-amber-500/20 text-amber-400 rounded uppercase tracking-wider font-medium">
            High
          </span>
        )}
      </div>
      <p className="text-xl md:text-2xl font-light text-white/90 mb-1">
        {value}
        <span className="text-white/40 text-sm md:text-base">{unit}</span>
      </p>
      <p className="text-[10px] md:text-xs text-white/30 uppercase tracking-wider font-light">{label}</p>
    </div>
  );
}
