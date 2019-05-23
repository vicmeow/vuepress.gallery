<template>
  <div class="wrapper">
    <the-header :key="'header'"/>
    <Content v-if="!layout" :class="{'submit-page': $page.path === '/submit/'}"/>
    <component v-else :is="layout"/>
  </div>
</template>
<script>
import TheHeader from './components/TheHeader'
import Gallery from './layouts/Gallery'
import GalleryItem from './layouts/GalleryItem'
export default {
  components: {
    TheHeader,
    Gallery,
    GalleryItem
  },
  data() {
    return {
      filter: 'all',
      auth: false
    }
  },
  methods: {
    updateFilter(tag) {
      this.filter = tag
    }
  },
  computed: {
    layout() {
      const { path } = this.$page
      if (path === '/submit/' || path === '/about/') return false
      return path === '/'
        ? 'gallery'
        : 'gallery-item'
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