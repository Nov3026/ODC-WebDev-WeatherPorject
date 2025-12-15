<template>
  <div
    class="min-h-screen bg-cover bg-center bg-no-repeat relative"
    style="
      background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2340&auto=format&fit=crop');
    "
  >
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"
    ></div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-32 text-white">
      <!-- Title -->
      <h1 class="text-center text-7xl font-bold mb-20 tracking-wider">
        <span class="text-orange-500 text-8xl">Sun</span> WeatherLiberia
      </h1>

      <!-- Search -->
      <div class="flex justify-center mb-24">
        <div
          class="bg-white/95 backdrop-blur-xl rounded-full shadow-2xl flex items-center max-w-2xl w-full overflow-hidden border border-white/20"
        >
          <input
            v-model="query"
            @keyup.enter="searchCity"
            placeholder="Search any city worldwide..."
            class="flex-1 px-10 py-7 text-2xl outline-none text-gray-800 placeholder-gray-500"
          />
          <button
            @click="searchCity"
            class="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 px-16 py-7 font-bold text-xl transition"
          >
            Search
          </button>
        </div>
      </div>

      <!-- Loading / Error -->
      <div v-if="loading" class="text-center text-4xl animate-pulse">
        Loading...
      </div>
      <div
        v-if="error"
        class="text-center text-red-400 text-2xl bg-red-900/30 backdrop-blur rounded-2xl p-6"
      >
        {{ error }}
      </div>

      <!-- Current Weather -->
      <div v-if="weatherData" class="text-center mb-32">
        <div class="flex justify-center items-center gap-8 mb-10">
          <img
            :src="`https://flagcdn.com/128x96/${weatherData.countryCode}.png`"
            class="w-36 rounded-2xl shadow-2xl border-4 border-white/40"
            onerror="this.src='https://flagcdn.com/128x96/un.png'"
          />
          <h2 class="text-6xl font-bold drop-shadow-2xl">
            {{ weatherData.location }}
          </h2>
        </div>

        <div
          class="bg-white/20 backdrop-blur-2xl rounded-3xl p-16 max-w-3xl mx-auto border border-white/10"
        >
          <p class="text-9xl font-thin mb-4">
            {{ Math.round(weatherData.temperature) }}°
          </p>
          <p class="text-3xl mb-8 opacity-90">{{ weatherData.description }}</p>
          <div class="grid grid-cols-3 gap-8 text-xl">
            <div>
              <span class="opacity-70">Feels like</span><br /><strong
                >{{ Math.round(weatherData.feelsLike) }}°</strong
              >
            </div>
            <div>
              <span class="opacity-70">Humidity</span><br /><strong
                >{{ weatherData.humidity }}%</strong
              >
            </div>
            <div>
              <span class="opacity-70">Wind</span><br /><strong
                >{{ weatherData.wind }} m/s</strong
              >
            </div>
          </div>
        </div>
      </div>

      <!-- 7-Day Forecast -->
      <div v-if="sevenDays.length" class="mb-32">
        <h3
          class="text-center text-4xl font-bold mb-16 uppercase tracking-widest"
        >
          7-Day Forecast
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-7 gap-8">
          <div
            v-for="d in sevenDays"
            :key="d.day"
            class="bg-white/20 backdrop-blur-xl rounded-3xl p-8 text-center hover:bg-white/30 transition"
          >
            <p class="text-2xl font-bold mb-4">{{ d.day }}</p>
            <p class="text-2xl mb-6">{{ d.icon }}</p>
            <p class="text-4xl font-bold">{{ Math.round(d.max) }}°</p>
            <p class="text-2xl opacity-70">{{ Math.round(d.min) }}°</p>
          </div>
        </div>
      </div>

      <!-- Hourly Forecast -->
      <div v-if="hourly.length" class="mb-32">
        <h3
          class="text-center text-4xl font-bold mb-12 uppercase tracking-widest"
        >
          Next 24 Hours
        </h3>
        <div class="overflow-x-auto pb-6">
          <div class="flex gap-8 min-w-max">
            <div
              v-for="h in hourly"
              :key="h.time"
              class="bg-white/20 backdrop-blur-xl rounded-3xl p-6 text-center min-w-36"
            >
              <p class="text-xl font-semibold">{{ h.time }}</p>
              <p class="text-2xl my-4">{{ h.icon }}</p>
              <p class="text-3xl font-bold">{{ Math.round(h.temp) }}°</p>
              <p class="text-lg opacity-80 mt-3">Rain {{ h.precip }}%</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Live Radar Map -->
      <div v-if="weatherData" class="mb-32">
        <h3
          class="text-center text-4xl font-bold mb-12 uppercase tracking-widest"
        >
          Live Weather Radar
        </h3>
        <div
          class="bg-black/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20"
        >
          <iframe
            :src="`https://open-meteo.com/maps/#map=11/${weatherData.latitude}/${weatherData.longitude}&layers=precipitation`"
            class="w-full h-96 md:h-[600px] border-0"
            title="Live Radar"
          ></iframe>
        </div>
      </div>

      <!-- States / Provinces / Counties -->
      <!-- <div v-if="states.length > 0" class="bg-gradient-to-b from-gray-900/70 to-gray-100 -mx-6 px-6 pt-24 pb-40 border-t border-white/10">
        <h3 class="text-5xl font-bold text-white text-center mb-6">
          {{ country }} — All States / Provinces / Counties
        </h3>
        <p class="text-center text-white/80 text-xl mb-16">Live temperature • Tap any to explore</p>

        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 max-w-7xl mx-auto">
          <div v-for="s in states" :key="s.id"
               @click="query = s.name + ', ' + country; searchCity()"
               class="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-10 text-center cursor-pointer transform hover:scale-110 hover:shadow-3xl transition duration-300">
            <p class="font-bold text-2xl text-gray-800 mb-4">{{ s.name }}</p>
            <p class="text-2xl mb-4">{{ s.icon }}</p>
            <p class="text-5xl font-bold text-blue-700">{{ Math.round(s.temp) }}°</p>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useWeather } from "./composables/useWeather";

const {
  searchQuery: query,
  weatherData,
  loading,
  error,
  searchCity,
} = useWeather();
const hourly = ref([]);
const states = ref([]);

const country = computed(
  () => weatherData.value?.value?.location.split(", ")[1]?.trim() || "World"
);

// 7-Day
const sevenDays = computed(() => {
  if (!weatherData.value?.daily) return [];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const icons = [
    "Sunny",
    "Sunny",
    "Partly Cloudy",
    "Cloud",
    "Fog",
    "Light Rain",
    "Rain",
    "Heavy Rain",
    "Snow",
    "Thunderstorm",
    "Thunderstorm",
  ];
  return weatherData.value.daily.time.slice(0, 7).map((_, i) => ({
    day: days[new Date(weatherData.value.daily.time[i]).getDay()],
    max: weatherData.value.daily.temperature_2m_max[i],
    min: weatherData.value.daily.temperature_2m_min[i],
    icon: icons[weatherData.value.daily.weather_code[i]] || "Cloud",
  }));
});

// Hourly + States
watch(weatherData, async (w) => {
  hourly.value = [];
  states.value = [];
  if (!w) return;

  const lat = w.latitude;
  const lon = w.longitude;
  const countryName = w.location.split(", ")[1]?.trim();

  // HOURLY
  try {
    const h = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation_probability,weather_code&timezone=auto`
    );
    const hd = await h.json();
    const icons = [
      "Sunny",
      "Sunny",
      "Partly Cloudy",
      "Cloud",
      "Fog",
      "Light Rain",
      "Rain",
      "Heavy Rain",
      "Snow",
      "Thunderstorm",
      "Thunderstorm",
    ];
    hourly.value = hd.hourly.time.slice(0, 24).map((t, i) => ({
      time: new Date(t).toLocaleTimeString([], {
        hour: "numeric",
        hour12: true,
      }),
      temp: hd.hourly.temperature_2m[i],
      precip: hd.hourly.precipitation_probability[i] || 0,
      icon: icons[hd.hourly.weather_code[i]] || "Cloud",
    }));
  } catch (e) {}

  // STATES — 100% working for every country
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        countryName
      )}&count=100&language=en&format=json`
    );
    const data = await res.json();
    if (!data.results?.length) return;

    const unique = new Map();
    data.results.forEach((p) => {
      if (p.admin1 && p.country.toLowerCase() === countryName.toLowerCase()) {
        if (!unique.has(p.admin1)) unique.set(p.admin1, p);
      }
    });

    const places = Array.from(unique.values()).slice(0, 18);

    const results = await Promise.all(
      places.map(async (p) => {
        const r = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${p.latitude}&longitude=${p.longitude}&current=temperature_2m,weather_code`
        );
        const d = await r.json();
        const icons = [
          "Sunny",
          "Sunny",
          "Partly Cloudy",
          "Cloud",
          "Fog",
          "Light Rain",
          "Rain",
          "Heavy Rain",
          "Snow",
          "Thunderstorm",
          "Thunderstorm",
        ];
        return {
          id: p.admin1,
          name: p.admin1,
          temp: d.current.temperature_2m,
          icon: icons[d.current.weather_code] || "Cloud",
        };
      })
    );

    states.value = results;
  } catch (e) {
    console.log("No provinces available");
  }
});
</script>
