<template>
  <nav class="navbar">
    <router-link to="/" class="navbar-brand">Portfolio</router-link>
    <div class="navbar-links">
      <a href="https://github.com/yourusername" target="_blank" rel="noopener">GitHub</a>
    </div>
  </nav>
</template>

<script setup>
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
  height: 56px;
  background: rgba(13, 17, 23, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #21262d;
}

.navbar-brand {
  font-size: 1.1rem;
  font-weight: 700;
  color: #c9d1d9;
  text-decoration: none;
}

.navbar-links a {
  color: #8b949e;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.15s;
}

.navbar-links a:hover {
  color: #58a6ff;
}
</style>
