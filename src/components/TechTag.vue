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
  padding: 2px 9px;
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--accent);
  background: var(--accent-muted);
  border-radius: 9999px;
  white-space: nowrap;
  letter-spacing: -0.01em;
  transition: background var(--duration-fast) var(--ease-out-expo);
}

.tech-tag:hover {
  background: var(--accent-subtle);
}
</style>
