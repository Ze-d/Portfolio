<template>
  <div class="detail-page">
    <div v-if="project">
      <router-link to="/" class="back-link">&larr; Back to projects</router-link>
      <div class="detail-layout">
        <div class="detail-gallery">
          <ImageGallery :images="project.images" />
        </div>
        <div class="detail-info">
          <h1 class="detail-name">{{ project.name }}</h1>
          <div class="detail-tags">
            <TechTag v-for="tech in project.techStack" :key="tech" :text="tech" />
          </div>
          <div class="detail-description" v-html="renderedDescription"></div>
          <div v-if="project.links.github || project.links.demo" class="detail-links">
            <a v-if="project.links.github" :href="project.links.github" target="_blank" rel="noopener" class="detail-link">GitHub</a>
            <a v-if="project.links.demo" :href="project.links.demo" target="_blank" rel="noopener" class="detail-link">Live Demo</a>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="not-found">
      <h2>Project not found</h2>
      <router-link to="/">&larr; Back to projects</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { useProjects } from '@/composables/useProjects.js'
import TechTag from '@/components/TechTag.vue'
import ImageGallery from '@/components/ImageGallery.vue'

const route = useRoute()
const { getProjectById } = useProjects()
const project = computed(() => getProjectById(route.params.id))
const renderedDescription = computed(() => {
  if (!project.value) return ''
  return marked(project.value.description)
})
</script>

<style scoped>
.detail-page {
  padding: 80px 24px 64px;
  max-width: 1100px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  color: #58a6ff;
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 24px;
}

.back-link:hover {
  text-decoration: underline;
}

.detail-layout {
  display: flex;
  gap: 40px;
}

.detail-gallery {
  flex: 1;
  min-width: 0;
}

.detail-info {
  flex: 1;
  min-width: 0;
}

.detail-name {
  font-size: 1.75rem;
  font-weight: 700;
  color: #c9d1d9;
  margin: 0 0 12px;
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
}

.detail-description {
  color: #c9d1d9;
  font-size: 0.95rem;
  line-height: 1.7;
}

.detail-description :deep(h2) {
  font-size: 1.1rem;
  margin: 20px 0 8px;
  color: #c9d1d9;
}

.detail-description :deep(ul) {
  padding-left: 20px;
}

.detail-description :deep(li) {
  margin-bottom: 4px;
  color: #8b949e;
}

.detail-description :deep(strong) {
  color: #c9d1d9;
}

.detail-links {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.detail-link {
  display: inline-block;
  padding: 8px 20px;
  font-size: 0.9rem;
  color: #c9d1d9;
  background: #21262d;
  border: 1px solid #30363d;
  border-radius: 6px;
  text-decoration: none;
  transition: border-color 0.15s, color 0.15s;
}

.detail-link:hover {
  border-color: #58a6ff;
  color: #58a6ff;
}

.not-found {
  text-align: center;
  padding: 60px 24px;
}

.not-found h2 {
  font-size: 1.5rem;
  color: #c9d1d9;
  margin-bottom: 16px;
}

.not-found a {
  color: #58a6ff;
  text-decoration: none;
}

@media (max-width: 768px) {
  .detail-layout {
    flex-direction: column;
  }
}
</style>
