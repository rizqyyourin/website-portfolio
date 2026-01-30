<template>
  <div>
    <Hero />
    <TechStack />
    <Projects />
    <Skills />
    <Contact />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#app'
import Hero from '~/components/sections/hero/Hero.vue'
import TechStack from '~/components/sections/tech-stack/TechStack.vue'
import Projects from '~/components/sections/projects/Projects.vue'
import Skills from '~/components/sections/skills/Skills.vue'
import Contact from '~/components/sections/contact/Contact.vue'
import { projects } from '~/data/content'

// Structured data for projects using dynamic data
const projectsSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Ahmad Rizqy Yourin - Featured Projects',
  description: 'Portfolio of Laravel projects by Ahmad Rizqy Yourin',
  mainEntity: projects.map(project => ({
    '@type': 'SoftwareApplication',
    name: project.title,
    url: project.link,
    description: project.description,
    applicationCategory: 'WebApplication', // Generalized
    operatingSystem: 'Web'
  }))
}

// Breadcrumb schema
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://yourin.my.id'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Tech Stack',
      item: 'https://yourin.my.id#tech-stack'
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Projects',
      item: 'https://yourin.my.id#projects'
    }
  ]
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(projectsSchema),
      key: 'schema-projects'
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(breadcrumbSchema),
      key: 'schema-breadcrumb'
    }
  ]
})
</script>
