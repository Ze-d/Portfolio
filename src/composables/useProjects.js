import projectsData from '@/data/projects.json'

export function useProjects() {
  const projects = projectsData.projects

  function getAllProjects() {
    return projects
  }

  function getFeaturedProjects() {
    return projects.filter(p => p.featured)
  }

  function getProjectById(id) {
    return projects.find(p => p.id === id)
  }

  return { getAllProjects, getFeaturedProjects, getProjectById }
}
