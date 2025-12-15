<template>
  <div class="p-6 text-white">
    <router-link to="/" class="text-blue-300 underline block mb-4">← Back</router-link>

    <h1 class="text-3xl font-bold mb-3">{{ city }}</h1>

    <div v-if="weather" class="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg">
      <p class="text-xl">Temperature: {{ weather.temp }}°C</p>
      <p>Feels like: {{ weather.feelsLike }}°C</p>
      <p>Humidity: {{ weather.humidity }}%</p>
      <p>Wind: {{ weather.wind }} m/s</p>
    </div>

    <p v-else class="text-white/60 mt-6">Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const city = route.params.city;

const weather = ref(null);

onMounted(async () => {
  const saved = localStorage.getItem("lastWeather");
  if (saved) {
    weather.value = JSON.parse(saved);
  }
});
</script>
