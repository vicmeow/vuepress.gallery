<template>
  <div class="wrapper">
    <transition-group mode="out-in" name="page">
      <the-header :key="'header'" :filter="filter" @update-filter="updateFilter"/>
      <component
        class="content" 
        :is="layout"
        :filter="filter"
        @update-filter="updateFilter"
        :key="$route.fullPath"/>
      <!-- <footer>I'm the footer</footer> -->
    </transition-group>
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
        return `${this.$page.frontmatter.layout}-layout`
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