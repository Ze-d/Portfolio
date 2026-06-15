<template>
  <div class="app">
    <NavBar />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
</script>

<style>
/* 全局样式已迁移至 src/assets/styles/main.css */
/* 此处仅保留 App 级布局样式 */
</style>

<style scoped>
.app {
  min-height: 100vh;
  background: var(--bg-deep);
}

.main-content {
  padding-top: 52px;
}

/* ---- Route Transition ---- */
.page-enter-active {
  transition: opacity var(--duration-slow) var(--ease-out-expo),
              transform var(--duration-slow) var(--ease-out-expo);
}

.page-leave-active {
  transition: opacity 150ms var(--ease-out-expo);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
}
</style>
