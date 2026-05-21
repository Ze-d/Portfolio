<template>
  <section class="hero">
    <div class="hero-avatar"></div>
    <h1 class="hero-name">Your Name</h1>
    <p class="hero-tagline">Java Developer & AI Engineer</p>
    <div class="hero-links">
      <a href="https://github.com/yourusername" target="_blank" rel="noopener" class="hero-link">GitHub</a>
      <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener" class="hero-link">LinkedIn</a>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.hero {
  text-align: center;
  padding: 80px 24px 48px;
}

.hero-avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: #21262d;
  margin: 0 auto 20px;
}

.hero-name {
  font-size: 2rem;
  font-weight: 700;
  color: #c9d1d9;
  margin: 0 0 8px;
}

.hero-tagline {
  font-size: 1.05rem;
  color: #8b949e;
  margin: 0 0 24px;
}

.hero-links {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.hero-link {
  display: inline-block;
  padding: 8px 20px;
  font-size: 0.9rem;
  color: #c9d1d9;
  background: #21262d;
  border-radius: 6px;
  text-decoration: none;
  border: 1px solid #30363d;
  transition: border-color 0.15s, color 0.15s;
}

.hero-link:hover {
  border-color: #58a6ff;
  color: #58a6ff;
}
</style>
