<template>
  <span class="tech-tag">{{ text }}</span>
</template>

<script setup>
defineProps({
  text: { type: String, required: true }
})
</script>

<style scoped>
.tech-tag {
  display: inline-block;
  padding: 2px 10px;
  font-size: 0.75rem;
  color: #58a6ff;
  background: rgba(31, 111, 235, 0.15);
  border-radius: 9999px;
  white-space: nowrap;
}
</style>
