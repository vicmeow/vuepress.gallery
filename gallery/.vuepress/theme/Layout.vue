<template>
  <div class="wrapper">
    <the-header :key="'header'"/>
    <Content
      :class="{'default-layout': $route.fullPath !== '/'}" 
      :key="'$route.fullPath'"/>
    <component
      v-if="!$page.frontmatter.home"
      :is="'single-layout'"
      @update-filter="updateFilter"
      :key="$route.fullPath"/>
    <component
      v-else
      :is="'default-layout'"
      :key="$route.fullPath"/>
  </div>
</template>
<script>
  import TheHeader from './components/TheHeader'
  export default {
    components: {
      TheHeader
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