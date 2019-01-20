<template>
  <div class="wrapper">
    <h1 class="page-title">{{ $page.frontmatter.title }}</h1>
    <p class="page-description">{{ $page.frontmatter.description }}</p>
    <component :is="layout"></component>
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