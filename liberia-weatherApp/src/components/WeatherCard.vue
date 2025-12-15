<!-- <template>
  <div class="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-100">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ weather.location }}</h2>
    
    <div class="flex items-center justify-between">
      <div>
        <div class="text-6xl font-extralight text-blue-600">
          {{ Math.round(weather.temperature) }}°
        </div>
        <p class="text-xl text-gray-600 mt-2">{{ weather.description }}</p>
      </div>
      <div class="text-right text-gray-600 space-y-2">
        <p>Feels like {{ Math.round(weather.apparentTemperature) }}°C</p>
        <p>Wind: {{ weather.windSpeed }} m/s</p>
        <p>Humidity: {{ weather.relativeHumidity }}%</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ weather: Object })
</script> -->