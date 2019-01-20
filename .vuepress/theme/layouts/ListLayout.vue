<template>
  <ul class="list-layout">
    <li class="list-item" v-for="site in $page.frontmatter.sites" :key="site.index">
    <figure class="figure">
      <img class="site-img" :src="site.img" :alt="site.title + ' screenshot'">
      <figcaption class="caption">
        <a :href="site.url">
          <h2 class="site-title">{{ site.title }}</h2>
        </a>
      </figcaption>
    </figure>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'ListLayout',
    computed: {
      imgPath(){
        return window.location.origin
      }
    },
    methods: {
      goToSite(link){
          window.open(link,'_blank');
        }
    }
  }
</script>

<style lang="sass" scoped>

.list-layout
  min-height: 100vh
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(430px, 1fr))
  gap: 1em
  margin: 0 auto
  justify-content: center
  padding: 1em 2em
  list-style-type: none
  margin: 0

.list-item
  max-height: 400px
  box-shadow: 0px 2px 10px rgba(0,0,0,.1)
  padding: 1em
  border-radius: 1em

.figure
  height: 100%
  display: grid
  grid-template-rows: 1fr max-content
  margin: 0

.site-img
  height: 100%
  width: 100%
  object-fit: cover

.site-title
  font-size: 1em
  margin-top: .5em



</style>