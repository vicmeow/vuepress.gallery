<template>
  <div class="wrapper">
    <transition-group mode="out-in" name="page">
      <the-header :key="'header'"/>
      <component
        class="content" 
        :is="layout" 
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
    mounted() {
      window.ga('set', 'anonymizeIp', true)
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