interface WeatherCardProps {
  icon: string;
  temp: number;
  condition: string;
  feelsLike: number;
  isUpdating: boolean;
}

export default function WeatherCard({ icon, temp, condition, feelsLike, isUpdating }: WeatherCardProps) {
  return (
    <div className={`relative bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-3xl p-6 md:p-8 lg:p-10 transition-all duration-500 ${isUpdating ? 'opacity-60 scale-[0.99]' : 'opacity-100 scale-100'}`}>
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {/* Weather icon */}
        <div className="text-6xl md:text-7xl lg:text-8xl mb-4 md:mb-6 drop-shadow-2xl">
          {icon}
        </div>

        {/* Temperature */}
        <div className="flex items-start mb-2 md:mb-4">
          <span className="text-7xl md:text-8xl lg:text-9xl font-extralight tracking-tighter text-white/95">
            {temp}
          </span>
          <span className="text-2xl md:text-3xl lg:text-4xl font-extralight text-white/40 mt-2 md:mt-4">°C</span>
        </div>

        {/* Condition */}
        <p className="text-lg md:text-xl lg:text-2xl font-light text-white/70 mb-2 md:mb-3">{condition}</p>

        {/* Feels like */}
        <p className="text-xs md:text-sm text-white/30 font-light">
          Feels like <span className="text-white/50">{feelsLike}°</span>
        </p>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-16 md:w-24 h-16 md:h-24 opacity-30">
        <div className="absolute top-4 md:top-6 right-4 md:right-6 w-px h-8 md:h-12 bg-gradient-to-b from-white/30 to-transparent" />
        <div className="absolute top-4 md:top-6 right-4 md:right-6 w-8 md:w-12 h-px bg-gradient-to-l from-white/30 to-transparent" />
      </div>
    </div>
  );
}
