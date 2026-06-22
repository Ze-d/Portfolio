<template>
  <router-link :to="`/project/${project.id}`" class="card">
    <div class="card-image">
      <img
        v-if="project.images && project.images.length > 0"
        :src="project.images[0].src"
        :alt="project.images[0].alt"
      />
      <div v-else class="card-image-placeholder"></div>
      <span v-if="project.featured" class="featured-badge">Featured</span>
    </div>
    <div class="card-body">
      <h3 class="card-title">{{ project.name }}</h3>
      <p class="card-summary">{{ project.summary }}</p>
      <div class="card-tags">
        <TechTag
          v-for="tech in project.techStack"
          :key="tech"
          :text="tech"
        />
      </div>
    </div>
  </router-link>
</template>

<script setup>
import TechTag from './TechTag.vue'

defineProps({
  project: { type: Object, required: true }
})
</script>

<style scoped>
.card {
  display: block;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  transition: border-color var(--duration-normal) var(--ease-out-expo),
              transform var(--duration-normal) var(--ease-out-expo),
              box-shadow var(--duration-normal) var(--ease-out-expo);
}

.card:hover {
  border-color: var(--border-default);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.card-image {
  position: relative;
  width: 100%;
  height: 180px;
  background: var(--bg-deep);
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-out-expo);
}

.card:hover .card-image img {
  transform: scale(1.03);
}

.card-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #111844 0%, #161e52 100%);
}

.featured-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 3px 10px;
  font-size: 0.625rem;
  font-weight: 600;
  color: var(--bg-deep);
  background: var(--accent);
  border-radius: 9999px;
  letter-spacing: 0.01em;
}

.card-body {
  padding: 18px;
}

.card-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 6px;
  letter-spacing: -0.01em;
}

.card-summary {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin: 0 0 14px;
  line-height: 1.55;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
</style>
