<!-- <template>
  <div class="flex gap-4 max-w-2xl mx-auto mb-10">
    <input
      :value="searchQuery"
      @input="$emit('update:searchQuery', $event.target.value)"
      @keyup.enter="$emit('search')"
      type="text"
      placeholder="Search city (e.g. Monrovia, Tokyo, Lagos)"
      class="flex-1 px-6 py-4 text-lg rounded-2xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 shadow-lg"
    />
    <button
      @click="$emit('search')"
      class="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl transition transform hover:scale-105"
    >
      Search
    </button>
  </div>
</template>

<script setup>
defineProps(['searchQuery'])
defineEmits(['update:searchQuery', 'search'])
</script> -->