import { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import ForecastRow from './components/ForecastRow';
import WeatherDetail from './components/WeatherDetail';

// Mock Hong Kong weather data (simulating real-time updates)
const generateWeatherData = () => {
  const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Thunderstorm', 'Humid'];
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  const baseTemp = 24 + Math.floor(Math.random() * 10);

  return {
    current: {
      temp: baseTemp,
      condition,
      humidity: 70 + Math.floor(Math.random() * 25),
      windSpeed: 10 + Math.floor(Math.random() * 20),
      uvIndex: 3 + Math.floor(Math.random() * 8),
      visibility: 8 + Math.floor(Math.random() * 12),
      feelsLike: baseTemp + Math.floor(Math.random() * 4) - 2,
      pressure: 1010 + Math.floor(Math.random() * 20),
    },
    lastUpdated: new Date().toLocaleTimeString('en-HK', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }),
    forecast: [
      { day: 'Today', high: baseTemp + 2, low: baseTemp - 4, condition: 'Partly Cloudy' },
      { day: 'Tomorrow', high: baseTemp + 3, low: baseTemp - 3, condition: 'Sunny' },
      { day: 'Wed', high: baseTemp + 1, low: baseTemp - 5, condition: 'Light Rain' },
      { day: 'Thu', high: baseTemp, low: baseTemp - 4, condition: 'Cloudy' },
      { day: 'Fri', high: baseTemp + 4, low: baseTemp - 2, condition: 'Sunny' },
    ],
  };
};

const getWeatherIcon = (condition: string): string => {
  const icons: Record<string, string> = {
    'Sunny': '☀',
    'Partly Cloudy': '⛅',
    'Cloudy': '☁',
    'Light Rain': '🌧',
    'Thunderstorm': '⛈',
    'Humid': '💧',
  };
  return icons[condition] || '☀';
};

const getWeatherGradient = (condition: string): string => {
  const gradients: Record<string, string> = {
    'Sunny': 'from-amber-500/20 via-orange-400/10 to-rose-500/20',
    'Partly Cloudy': 'from-sky-400/20 via-slate-400/10 to-indigo-500/20',
    'Cloudy': 'from-slate-500/30 via-gray-400/20 to-zinc-500/30',
    'Light Rain': 'from-blue-600/30 via-cyan-400/20 to-teal-500/20',
    'Thunderstorm': 'from-violet-600/30 via-purple-500/20 to-indigo-600/30',
    'Humid': 'from-teal-500/20 via-emerald-400/10 to-cyan-500/20',
  };
  return gradients[condition] || gradients['Sunny'];
};

function App() {
  const [weather, setWeather] = useState(generateWeatherData());
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true);
      setTimeout(() => {
        setWeather(generateWeatherData());
        setIsUpdating(false);
      }, 500);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const refreshWeather = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setWeather(generateWeatherData());
      setIsUpdating(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Atmospheric background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getWeatherGradient(weather.current.condition)} transition-all duration-1000`} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="px-4 md:px-8 lg:px-16 pt-8 md:pt-12 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs md:text-sm tracking-[0.3em] text-white/40 uppercase mb-2 font-light">Real-time Weather</p>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight">
                <span className="text-white/90">Hong Kong</span>
                <span className="text-white/30 ml-2 md:ml-4 font-extralight">香港</span>
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className={`w-2 h-2 rounded-full ${isUpdating ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
              <span className="text-xs md:text-sm text-white/40 font-mono">
                Last updated: {weather.lastUpdated}
              </span>
              <button
                onClick={refreshWeather}
                className="text-white/40 hover:text-white/80 transition-colors text-sm border border-white/10 px-3 py-1.5 rounded hover:border-white/30"
              >
                Refresh
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 px-4 md:px-8 lg:px-16 pb-8">
          {/* Current weather hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8 lg:mb-12">
            {/* Main temperature card */}
            <div className="lg:col-span-5">
              <WeatherCard
                icon={getWeatherIcon(weather.current.condition)}
                temp={weather.current.temp}
                condition={weather.current.condition}
                feelsLike={weather.current.feelsLike}
                isUpdating={isUpdating}
              />
            </div>

            {/* Weather details grid */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 content-start">
              <WeatherDetail
                label="Humidity"
                value={weather.current.humidity}
                unit="%"
                icon="💧"
              />
              <WeatherDetail
                label="Wind Speed"
                value={weather.current.windSpeed}
                unit=" km/h"
                icon="💨"
              />
              <WeatherDetail
                label="UV Index"
                value={weather.current.uvIndex}
                unit=""
                icon="☀"
                warning={weather.current.uvIndex > 7}
              />
              <WeatherDetail
                label="Visibility"
                value={weather.current.visibility}
                unit=" km"
                icon="👁"
              />
              <WeatherDetail
                label="Pressure"
                value={weather.current.pressure}
                unit=" hPa"
                icon="📊"
              />
              <WeatherDetail
                label="Feels Like"
                value={weather.current.feelsLike}
                unit="°"
                icon="🌡"
              />
            </div>
          </div>

          {/* 5-day forecast */}
          <section>
            <h2 className="text-xs md:text-sm tracking-[0.2em] text-white/40 uppercase mb-4 md:mb-6 font-light">5-Day Forecast</h2>
            <div className="bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-2xl overflow-hidden">
              {weather.forecast.map((day, index) => (
                <ForecastRow
                  key={day.day}
                  day={day.day}
                  high={day.high}
                  low={day.low}
                  condition={day.condition}
                  icon={getWeatherIcon(day.condition)}
                  isLast={index === weather.forecast.length - 1}
                />
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="px-4 md:px-8 lg:px-16 py-6 mt-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-[10px] md:text-xs text-white/25">
            <p className="font-light">Weather data simulated for demonstration</p>
            <p className="font-light">
              Requested by <span className="text-white/40">@b144y</span> · Built by <span className="text-white/40">@clonkbot</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
