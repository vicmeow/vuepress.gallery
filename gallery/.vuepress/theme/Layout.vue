<template>
  <div class="wrapper">
    <the-header :key="'header'"/>
    <Content 
      :class="{'default-layout': $route.fullPath !== '/'}" 
      :key="'$route.fullPath'"/>
    <component
      v-if="$page.frontmatter.layout"
      class="content" 
      :is="layout"
      @update-filter="updateFilter"
      :key="$route.fullPath"/>
  </div>
</template>
<script>
  import TheHeader from './components/TheHeader'
  // import DefaultLayout from './layouts/DefaultLayout'
  // import ListLayout from './layouts/ListLayout'
  // import SingleLayout from './layouts/SingleLayout'
  export default {
    components: {
      TheHeader,
      // DefaultLayout,
      // ListLayout,
      // SingleLayout
      },
    data() {
      return {
        filter: 'all'
      }
    },
    methods: {
      updateFilter(tag){
        this.filter = tag
      }
    },
    mounted() {
      /* window.ga('set', 'anonymizeIp', true) */
    },
    computed: {
      layout() {
        return this.$page.frontmatter.layout
          ? `${this.$page.frontmatter.layout}-layout`
          : 'default-layout'
      }
    }
  }
</script>

<style lang="sass">
@import './styles/theme.sass'
</style>
<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>