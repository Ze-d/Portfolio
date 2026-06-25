<template>
  <section class="hero">
    <div class="hero-avatar-wrapper">
      <img class="hero-avatar" src="../assets/images/avatar.png" alt="Avatar" />
    </div>
    <h1 class="hero-name">JinYuan Zhang</h1>
    <p class="hero-tagline">AI Native Engineer & Developer</p>
    <div class="hero-links">
      <a href="https://github.com/Ze-d" target="_blank" rel="noopener" class="hero-link">GitHub</a>
      <a href="https://ze-d.github.io/" target="_blank" rel="noopener" class="hero-link">Blog</a> 
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

.hero-avatar-wrapper {
  display: inline-block;
  margin-bottom: 24px;
}

.hero-avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  object-fit: cover;
  background: var(--bg-raised);
  border: 1px solid var(--border-default);
  box-shadow: 0 0 40px var(--accent-muted);
  display: block;
  animation: avatar-enter var(--duration-entrance) var(--ease-out-expo) both;
}

@keyframes avatar-enter {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.hero-name {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px;
  letter-spacing: -0.03em;
  animation: fade-up var(--duration-entrance) var(--ease-out-expo) 100ms both;
}

.hero-tagline {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  margin: 0 0 28px;
  letter-spacing: -0.01em;
  animation: fade-up var(--duration-entrance) var(--ease-out-expo) 200ms both;
}

.hero-links {
  display: flex;
  gap: 10px;
  justify-content: center;
  animation: fade-up var(--duration-entrance) var(--ease-out-expo) 300ms both;
}

.hero-link {
  display: inline-block;
  padding: 7px 18px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-default);
  border-radius: 6px;
  text-decoration: none;
  letter-spacing: -0.01em;
  transition: border-color var(--duration-fast) var(--ease-out-expo),
              color var(--duration-fast) var(--ease-out-expo),
              background var(--duration-fast) var(--ease-out-expo);
}

.hero-link:hover {
  color: var(--text-primary);
  border-color: var(--border-strong);
  text-decoration: none;
}

.hero-link--primary {
  color: var(--accent);
  background: var(--accent-muted);
  border-color: var(--accent-border);
}

.hero-link--primary:hover {
  color: var(--accent);
  border-color: var(--accent-strong);
  background: var(--accent-subtle);
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .hero {
    padding: 48px 24px 36px;
  }

  .hero-avatar {
    width: 72px;
    height: 72px;
  }

  .hero-name {
    font-size: 1.625rem;
  }
}
</style>
