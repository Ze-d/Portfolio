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
  margin-bottom: 40px;
}

.section-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: #c9d1d9;
  margin: 0 0 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #21262d;
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
