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
  color: var(--accent);
  text-decoration: none;
  font-size: var(--text-sm);
  font-weight: 500;
  margin-bottom: 24px;
  transition: opacity var(--duration-fast) var(--ease-out-expo);
}

.back-link:hover {
  opacity: 0.8;
  text-decoration: none;
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
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 12px;
  letter-spacing: -0.02em;
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
}

.detail-description {
  color: var(--text-secondary);
  font-size: var(--text-base);
  line-height: 1.7;
}

.detail-description :deep(h2) {
  font-size: var(--text-lg);
  font-weight: 600;
  margin: 24px 0 10px;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.detail-description :deep(h3) {
  font-size: var(--text-base);
  font-weight: 600;
  margin: 18px 0 8px;
  color: var(--text-primary);
}

.detail-description :deep(ul) {
  padding-left: 20px;
}

.detail-description :deep(li) {
  margin-bottom: 4px;
  color: var(--text-secondary);
}

.detail-description :deep(li::marker) {
  color: var(--text-tertiary);
}

.detail-description :deep(strong) {
  color: var(--text-primary);
  font-weight: 600;
}

.detail-description :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  padding: 2px 6px;
  background: var(--bg-raised);
  border-radius: 3px;
  color: var(--accent);
}

.detail-links {
  display: flex;
  gap: 10px;
  margin-top: 28px;
}

.detail-link {
  display: inline-block;
  padding: 8px 18px;
  font-size: var(--text-sm);
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

.detail-link:first-child {
  color: var(--accent);
  background: var(--accent-muted);
  border-color: rgba(212, 167, 116, 0.12);
}

.detail-link:first-child:hover {
  border-color: var(--accent-strong);
  background: var(--accent-subtle);
}

.detail-link:hover {
  color: var(--text-primary);
  border-color: var(--border-strong);
  text-decoration: none;
}

.not-found {
  text-align: center;
  padding: 60px 24px;
}

.not-found h2 {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.not-found a {
  color: var(--accent);
  text-decoration: none;
}

@media (max-width: 768px) {
  .detail-layout {
    flex-direction: column;
  }
}
</style>
