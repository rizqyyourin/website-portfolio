<template>
  <div>
    <Hero />
    <TechStack />
    <Projects />
    <Experience />
    <ProjectFeatures />
    <Skills />
    <Contact />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#app'
import Hero from '~/components/sections/hero/Hero.vue'
import TechStack from '~/components/sections/tech-stack/TechStack.vue'
import Projects from '~/components/sections/projects/Projects.vue'
import ProjectFeatures from '~/components/sections/features/ProjectFeatures.vue'
import Experience from '~/components/sections/experience/Experience.vue'
import Skills from '~/components/sections/skills/Skills.vue'
import Contact from '~/components/sections/contact/Contact.vue'
import { projects } from '~/data/content'

const siteUrl = useRuntimeConfig().public.siteUrl

// ItemList of featured projects (replaces CollectionPage for single-page context)
const projectsListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Featured Projects by Ahmad Rizqy Yourin',
  description: 'A curated list of fullstack web application projects built by Ahmad Rizqy Yourin.',
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
  numberOfItems: projects.length,
  itemListElement: projects.map((project, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: project.link,
    name: project.title,
    description: project.description
  }))
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(projectsListSchema),
      key: 'schema-projects-list'
    }
  ]
})
</script>
