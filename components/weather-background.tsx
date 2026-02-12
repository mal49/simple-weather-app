"use client"

import { Span } from "next/dist/trace";

export function WeatherBackground({ condition}: { condition: string }) {
    if (condition.includes("rain")) return <Rain />;
    if (condition.includes("cloud")) return <Clouds />;
    if (condition.includes("clear")) return <Clear />;
    return null;

    function Rain() {
        return(
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 80 }).map((_, i) => (
                    <span
                        key={i}
                        className="absolute top-[-20%] h-6 w-px bg-blue-300/60 animate-rain"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random()}s`,
                            animationDuration: `${0.8 + Math.random()}s`,
                        }}
                    />
                ))}
            </div>
        )
    }

    function Clouds() {
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Far clouds (slow, big, faint) */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`far-${i}`}
                className="cloud cloud-far"
                style={{
                  top: `${10 + i * 15}%`,
                  animationDelay: `${i * 10}s`,
                }}
              />
            ))}
      
            {/* Near clouds (faster, sharper) */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`near-${i}`}
                className="cloud cloud-near"
                style={{
                  top: `${40 + i * 15}%`,
                  animationDelay: `${i * 6}s`,
                }}
              />
            ))}
          </div>
        );
      }
      

    function Clear() {
        return(
            <div className="absolute inset-0 pointer-events-none opacity-50 sm:opacity-100">
                {Array.from({ length: 30 }).map((_, i) => (
                    <span
                        key={i}
                        className="absolute h-1 w-1 rounded-full bg-white/60 animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    />
                ))}
            </div>
        );
    }
}