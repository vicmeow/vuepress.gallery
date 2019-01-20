<template>
  <div class="wrapper">
    <!-- TODO: Make header component -->
    <h1 class="page-title">{{ $page.frontmatter.title }}</h1>
    <p class="page-description">A curated list of custom <a href="https://vuepress.vuejs.org" rel="noopener">VuePress</a> themes.</p>
    <component :is="layout"></component>
    <!-- TODO: Make footer component -->
  </div>
</template>
<script>
  import ListLayout from './layouts/ListLayout'
  import SingleLayout from './layouts/SingleLayout'
  export default {
    components: {
      ListLayout,
      SingleLayout
      },
    computed: {
      layout() {
        return this.$page.frontmatter.layout || 'ListLayout'
      }
    },
  }
</script>

<style lang="sass">
@import './styles/theme.sass'
</style>