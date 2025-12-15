# Weather App - Built with Vue 3, Vite & Tailwind CSS

A beautiful weather application featuring real-time weather data for any location worldwide. Built with modern web technologies and designed to be beginner-friendly.

## Features

- 🌍 **Global Weather Data**: Search for weather information in any city
- 🎨 **AccuWeather-Inspired Design**: Modern, clean UI with Tailwind CSS
- ⏰ **Hourly Forecast**: See weather predictions for the next 24 hours
- 📅 **7-Day Forecast**: Plan ahead with daily weather forecasts
- 🚀 **Fast & Responsive**: Built with Vite for instant hot module replacement
- ♻️ **Component-Based**: Reusable, maintainable Vue 3 components
- 📁 **Composable Logic**: Separated concerns with Vue 3 composables

## Tech Stack

- **Vue 3** - Modern JavaScript framework
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS v4** - Utility-first CSS framework
- **Open-Meteo API** - Free, open-source weather API (no key required)

## Project Structure

```
src/
├── components/           # Reusable Vue components
│   ├── SearchBar.vue     # City search input
│   ├── WeatherCard.vue   # Current weather display
│   ├── HourlyForecast.vue# 24-hour forecast
│   ├── DailyForecast.vue # 7-day forecast
│   └── WeatherIcon.vue   # Dynamic weather icons
├── composables/          # Reusable logic
│   └── useWeather.js     # Weather API integration
├── assets/
│   └── main.css          # Global styles
├── App.vue               # Root component
└── main.js               # Entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ (check with `node --version`)
- npm or yarn

### Installation

1. Navigate to the project directory:

```bash
cd liberia-weatherApp
```

2. Install dependencies:

```bash
npm install
```

3. Verify `.env` file has API URLs (already configured):

```
VITE_OPENMETEO_API_URL=https://api.open-meteo.com/v1
VITE_GEOCODING_API_URL=https://geocoding-api.open-meteo.com/v1
```

### Running the App

Start the development server:

```bash
npm run dev
```

The app will open at `http://localhost:5173/`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## How It Works

### Composables

**`useWeather.js`** - Handles all weather data:

- Geocoding: Converts city names to coordinates
- Weather Fetching: Gets current, hourly, and daily forecasts
- State Management: Manages loading, error, and data states
- Error Handling: User-friendly error messages

### Components

- **SearchBar**: Input for city search
- **WeatherCard**: Displays current temperature, conditions, humidity, wind speed
- **HourlyForecast**: Scrollable 24-hour forecast with icons
- **DailyForecast**: 7-day forecast grid with max/min temps
- **WeatherIcon**: Dynamic SVG icons based on weather codes

## API Integration

The app uses the free **Open-Meteo API** (no authentication required):

- Geocoding API: `https://geocoding-api.open-meteo.com/v1/search`
- Weather Forecast API: `https://api.open-meteo.com/v1/forecast`

No API keys needed! Data is fetched directly from Open-Meteo's public endpoints.

## Customization

### Change Default City

Edit `src/App.vue` and modify:

```javascript
weather.loadDefault(); // currently loads Berlin
```

### Modify Colors

Edit `src/App.vue` header styles or update Tailwind config in `tailwind.config.cjs`.

### Add More Weather Details

Update `src/composables/useWeather.js` to fetch additional parameters from Open-Meteo API.

## Troubleshooting

### App not starting

- Ensure Node.js is installed: `node --version`
- Clear `node_modules` and reinstall: `rm -r node_modules && npm install`

### No weather data appears

- Check browser console for errors (F12 → Console)
- Verify internet connection (API is external)
- Check `.env` file has correct API URLs

### Styling not applied

- Clear Tailwind cache: `rm -rf node_modules/.vite`
- Restart dev server: Stop and run `npm run dev` again

## Learning Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Guide](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Open-Meteo API Docs](https://open-meteo.com/en/docs)

## License

MIT - Feel free to use this project for learning or as a starting point!

## Next Steps (For Learning)

1. **Add geolocation**: Use browser's Geolocation API to auto-detect user location
2. **Add favorites**: Store favorite cities in localStorage
3. **Dark mode**: Add dark theme toggle
4. **Alerts**: Show severe weather warnings
5. **Charts**: Visualize temperature trends with a charting library

Happy weather checking! 🌤️
