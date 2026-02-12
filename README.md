# Weather App

A modern, responsive weather application built with Next.js that provides real-time weather information and forecasts.

**Live Demo:** [https://simple-weather-app-sigma-nine.vercel.app/](https://simple-weather-app-sigma-nine.vercel.app/)

## Features

- **Auto Location Detection** - Automatically detects your location to show local weather
- **City Search** - Search weather for any city worldwide with debounced input
- **Current Weather** - Displays temperature, weather conditions, and city name
- **5-Day Forecast** - Shows weather predictions for the upcoming days
- **Dynamic Backgrounds** - Background changes based on weather conditions (clear, cloudy, rainy)
- **Dark/Light Theme** - Toggle between dark and light modes
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Smooth Animations** - Beautiful animations powered by Framer Motion

## Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS 4](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [OpenWeatherMap API](https://openweathermap.org/api) - Weather data

## Setup Guide

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun package manager
- OpenWeatherMap API key (free tier available)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mal49/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```bash
   NEXT_PUBLIC_WEATHER_API=your_openweathermap_api_key
   ```

   To get an API key:
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Navigate to "API Keys" in your account
   - Generate a new API key (free tier works fine)

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open the app**

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## Deployment

The easiest way to deploy this app is using [Vercel](https://vercel.com):

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Add your `NEXT_PUBLIC_WEATHER_API` environment variable in Vercel's project settings
4. Deploy

## License

MIT License - feel free to use this project for learning or personal projects.
