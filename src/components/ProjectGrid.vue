<template>
  <section class="projects">
    <div v-if="featuredProjects.length > 0" class="section">
      <h2 class="section-title">Featured</h2>
      <div class="grid">
        <ProjectCard
          v-for="project in featuredProjects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
    <div class="section">
      <h2 class="section-title">All Projects</h2>
      <div class="grid">
        <ProjectCard
          v-for="project in allProjects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useProjects } from '@/composables/useProjects.js'
import ProjectCard from './ProjectCard.vue'

const { getAllProjects, getFeaturedProjects } = useProjects()
const allProjects = getAllProjects().filter(p => !p.featured)
const featuredProjects = getFeaturedProjects()
</script>

<style scoped>
.projects {
  padding: 0 24px 64px;
  max-width: 1100px;
  margin: 0 auto;
}

.section {
  margin-bottom: 48px;
}

.section-title {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-subtle);
  letter-spacing: -0.02em;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 32px;
  height: 2px;
  background: var(--accent);
  border-radius: 1px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
