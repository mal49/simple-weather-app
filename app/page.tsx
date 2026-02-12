"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { WeatherBackground } from "@/components/weather-background";
import { motion } from "framer-motion";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [autoLoading, setAutoLoading] = useState(true);

  async function getWeather(query: string) {
    if (!query) return;

    try {
      setLoading(true);
      setError("");

      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API;

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`
      );

      if (!res.ok) throw new Error("City not found");

      const data = await res.json();
      setWeather(data);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=${apiKey}`
      );

      const forecastData = await forecastRes.json();
      const daily = forecastData.list.filter((_: any, i: number) => i % 8 === 0);
      setForecast(daily);
    } catch (err: any) {
      setError(err.message);
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  }

  async function getWeatherByCoords(lat: number, lon: number) {
    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API;

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );

      const data = await res.json();
      setWeather(data);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );

      const forecastData = await forecastRes.json();
      const daily = forecastData.list.filter((_: any, i: number) => i % 8 === 0);
      setForecast(daily);
    } catch {
      setError("Failed to get location weather");
    } finally {
      setAutoLoading(false);
    }
  }

  function getBg(condition: string) {
    if (condition.includes("rain")) return "from-slate-700 to-slate-900";
    if (condition.includes("cloud")) return "from-gray-300 to-gray-500";
    if (condition.includes("clear")) return "from-sky-400 to-blue-600";
    return "from-sky-100 to-blue-200";
  }

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!navigator.geolocation) {
      setAutoLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        getWeatherByCoords(
          pos.coords.latitude,
          pos.coords.longitude
        ),
      () => setAutoLoading(false)
    );
  }, []);

  return (
    <main
      className={`relative min-h-screen flex items-center justify-center px-3 sm:px-0 bg-gradient-to-br
        ${
          weather
            ? getBg(weather.weather[0].main.toLowerCase())
            : "from-sky-100 to-blue-200"
        }
        dark:from-slate-900 dark:to-slate-800 overflow-hidden`}
    >
      <div className="animate-fade-in w-full flex justify-center">
        {weather && (
          <WeatherBackground
            condition={weather.weather[0].main.toLowerCase()}
          />
        )}

        <Card className="w-full max-w-[420px] bg-white/70 dark:bg-black/40 shadow-xl backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Weather App</CardTitle>
              <ThemeToggle />
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {autoLoading && (
              <p className="text-sm text-muted-foreground text-center">
                📍 Detecting your location...
              </p>
            )}

            <Input
              className="h-12 text-base"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && getWeather(city)
              }
            />

            <Button
              className="h-12 w-full"
              disabled={loading}
              onClick={() => getWeather(city)}
            >
              {loading ? "Loading..." : "Check Weather"}
            </Button>

            {error && (
              <p className="text-sm text-red-500 text-center">
                {error}
              </p>
            )}

            {weather && (
              <div className="text-center space-y-1">
                <h2 className="font-semibold text-lg">
                  {weather.name}
                </h2>
                <p className="text-2xl font-bold">
                  {Math.round(weather.main.temp)}°C
                </p>
                <p className="capitalize text-muted-foreground">
                  {weather.weather[0].description}
                </p>
              </div>
            )}

            {forecast.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 pt-4">
                {forecast.map((day, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg bg-muted p-3 text-center text-xs space-y-1"
                  >
                    <p className="font-medium">
                      {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </p>
                    <img
                      src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                      className="mx-auto h-8 w-8"
                    />
                    <p>{Math.round(day.main.temp)}°C</p>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <a
          href="https://github.com/mal49"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 z-50 rounded-full bg-white/70 dark:bg-black/40 backdrop-blur-xl shadow-lg p-3 hover:scale-105 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.11 3.29 9.45 7.86 10.98.58.11.79-.25.79-.56v-2.17c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.72-1.55-2.56-.29-5.26-1.29-5.26-5.74 0-1.27.45-2.31 1.2-3.12-.12-.29-.52-1.47.12-3.06 0 0 .98-.31 3.2 1.19a11.1 11.1 0 0 1 5.83 0c2.22-1.5 3.2-1.19 3.2-1.19.64 1.59.24 2.77.12 3.06.75.81 1.2 1.85 1.2 3.12 0 4.46-2.71 5.44-5.29 5.72.41.36.77 1.07.77 2.16v3.2c0 .31.21.68.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5z" />
          </svg>
        </a>
      </div>
    </main>
  );
}
