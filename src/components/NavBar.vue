<template>
  <nav class="navbar" :class="{ scrolled }">
    <router-link to="/" class="navbar-brand">Portfolio</router-link>
    <div class="navbar-links">
      <a href="https://github.com/Ze-d" target="_blank" rel="noopener">GitHub</a>
      <a href="https://ze-d.github.io/" target="_blank" rel="noopener">Blog</a>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 0
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 52px;
  background: rgba(17, 24, 68, 0.96);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-subtle);
  transition: border-color var(--duration-normal) var(--ease-out-expo),
              box-shadow var(--duration-normal) var(--ease-out-expo);
}

.navbar.scrolled {
  border-bottom-color: var(--border-default);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);
}

.navbar-brand {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  letter-spacing: -0.01em;
}

.navbar-links {
  display: flex;
  gap: 20px;
}

.navbar-links a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.8125rem;
  font-weight: 500;
  transition: color var(--duration-fast) var(--ease-out-expo);
}

.navbar-links a:hover {
  color: var(--accent);
  text-decoration: none;
}
</style>
