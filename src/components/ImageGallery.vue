<template>
  <div class="gallery">
    <div v-if="images.length === 0" class="gallery-placeholder">
      No screenshots available
    </div>
    <template v-else>
      <div class="gallery-main">
        <img :src="images[activeIndex].src" :alt="images[activeIndex].alt" />
      </div>
      <div class="gallery-thumbnails">
        <button
          v-for="(img, idx) in images"
          :key="img.src"
          class="gallery-thumb"
          :class="{ active: idx === activeIndex }"
          @click="activeIndex = idx"
        >
          <img :src="img.src" :alt="img.alt" />
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  images: { type: Array, required: true }
})

const activeIndex = ref(0)
</script>

<style scoped>
.gallery {
  width: 100%;
}

.gallery-placeholder {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #161b22;
  border: 1px solid #21262d;
  border-radius: 8px;
  color: #484f58;
  font-size: 0.9rem;
}

.gallery-main {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #21262d;
  background: #0d1117;
}

.gallery-main img {
  width: 100%;
  display: block;
  object-fit: contain;
  max-height: 400px;
}

.gallery-thumbnails {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.gallery-thumb {
  width: 60px;
  height: 40px;
  padding: 0;
  border: 2px solid #21262d;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  background: #0d1117;
  transition: border-color 0.15s;
}

.gallery-thumb.active {
  border-color: #58a6ff;
}

.gallery-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
