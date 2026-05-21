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
  background: #161b22;
  border: 1px solid #21262d;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  transition: border-color 0.2s;
}

.card:hover {
  border-color: #30363d;
}

.card-image {
  position: relative;
  width: 100%;
  height: 180px;
  background: #0d1117;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #161b22 0%, #1a2332 100%);
}

.featured-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 2px 10px;
  font-size: 0.7rem;
  font-weight: 600;
  color: #0d1117;
  background: #58a6ff;
  border-radius: 9999px;
}

.card-body {
  padding: 16px;
}

.card-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: #c9d1d9;
  margin: 0 0 6px;
}

.card-summary {
  font-size: 0.85rem;
  color: #8b949e;
  margin: 0 0 12px;
  line-height: 1.5;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
</style>
