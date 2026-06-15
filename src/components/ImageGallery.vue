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
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  color: var(--text-tertiary);
  font-size: var(--text-sm);
}

.gallery-main {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  background: var(--bg-deep);
}

.gallery-main img {
  width: 100%;
  display: block;
  object-fit: contain;
  max-height: 400px;
  transition: opacity var(--duration-normal) var(--ease-out-expo);
}

.gallery-thumbnails {
  display: flex;
  gap: 6px;
  margin-top: 10px;
}

.gallery-thumb {
  width: 56px;
  height: 36px;
  padding: 0;
  border: 1.5px solid var(--border-subtle);
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  background: var(--bg-deep);
  transition: border-color var(--duration-fast) var(--ease-out-expo);
}

.gallery-thumb.active {
  border-color: var(--accent);
}

.gallery-thumb:hover {
  border-color: var(--border-strong);
}

.gallery-thumb.active:hover {
  border-color: var(--accent);
}

.gallery-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
