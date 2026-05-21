<template>
  <div class="image-gallery">
    <p v-if="images.length === 0" class="gallery-empty">No images available</p>
    <div v-for="(image, index) in images" :key="index" class="gallery-item">
      <img :src="image" :alt="'Image ' + index" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  images: {
    type: Array,
    default: () => ([])
  }
})
</script>
