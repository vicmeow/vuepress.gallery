<template>
  <div class="wrapper">
    <!-- TODO: Make header component -->
    <the-header/>
    <component class="content" :is="layout"></component>
    <!-- <footer>I'm the footer</footer> -->
    <!-- TODO: Make footer component -->
  </div>
</template>
<script>
  import TheHeader from './components/TheHeader'
  import ListLayout from './layouts/ListLayout'
  import SingleLayout from './layouts/SingleLayout'
  export default {
    components: {
      TheHeader,
      ListLayout,
      SingleLayout
      },
    computed: {
      layout() {
        return `${this.$page.frontmatter.layout}-layout`
      },
      sites(){

      }
    },
  }
</script>

<style lang="sass">
@import './styles/theme.sass'
</style>