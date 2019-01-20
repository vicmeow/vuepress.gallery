<template>
  <div class="list">
    <ul class="unique-tags">
      <li @click="updateFilter('all')" :class="{'is-active': filter === 'all'}">All</li>
      <li class="tag-item" v-for="tag in uniqueTags" @click="updateFilter(tag)" :class="{'is-active': filter === tag}">{{ tag }}</li>
    </ul>
    <ul class="item-list">
      <li class="list-item" v-for="site in filteredSites" :key="site.likes">
        <figure class="figure">
          <div class="gradient-overlay"></div>
          <img class="site-img" :src="'screenshots/' + site.img" :alt="site.title + ' screenshot'">
          <!-- TODO: Include name, tags? Must have link to website OR repo -->
          <figcaption class="caption">
            <a class="site-link" :href="site.url">
              <h2 class="site-title">{{ site.title }}</h2>
            </a>
            <ul class="tag-list">
              <li class="tag-item" v-for="tag in site.tags" @click="updateFilter(tag)">{{ tag }}</li>
            </ul>
          </figcaption>
        </figure>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'ListLayout',
    data: () => ({
      filter: 'all',
      sites: [{
          title: 'Made with VuePress',
          img: '/vuepress-gallery.png',
          tags: ['portfolio'],
          url: 'https://vuepress.gallery',
          likes: 1
        },
        {
          title: 'bencodezen.io',
          img: '/ben.png',
          tags: ['blog'],
          url: 'https://bencodezen.io',
          likes: 2
        },
        {
          title: 'vuepress-portfolio',
          img: '/acme.jpg',
          tags: ['portfolio'],
          url: 'https://vuepress-portfolio.netlify.com/',
          likes: 3
        },
        {
          title: 'Vuesax',
          img: '/vuesax.png',
          tags: ['tools'],
          url: 'https://lusaxweb.github.io/vuesax/',
          likes: 4
        }]
    }),
    computed: {
      filteredSites() {
        return this.filter === 'all' ? this.sites : this.sites.filter(site => site.tags.some(tag => tag === this.filter))
      },
      uniqueTags() {
        const tags = []
        this.sites.map(site => site.tags.map(tag => tags.push(tag)))
        return [...new Set(tags)]
      }
    },
    methods: {
      updateFilter(tag){
        this.filter = tag
      }
    }
  }
</script>

<style lang="sass" scoped>

.item-list
  min-height: 100vh
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr))
  gap: 1.5em
  margin: 0 auto
  justify-content: center
  padding: 2em 2em
  list-style-type: none
  margin: 0
  @media screen and (min-width: 1448px)
    gap: 2em
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr))

.list-item
  display: inline-block
  position: relative
  height: 430px
  box-shadow: 0px 2px 15px rgba(0,0,0,.1)
  border-radius: .5em
  background: white
  overflow: hidden
  padding: 1em .5em
  //justify-content: space-around
  transition: transform .3s ease-in-out
  @media screen and (min-width: 1448px)
    height: 600px
  &:hover
    transform: scale(1.01)

.figure
  height: 100%
  display: grid
  grid-template-rows: 1fr max-content
  margin: 0

.caption
  grid-column: 1
  grid-row: 2
  padding: .5em 1em
  background: #fff

// .site-link::after
//   content: ''
//   position: absolute
//   top: 0
//   right: 0
//   left: 0
//   bottom: 0
//   z-index: 99

.site-img
  height: 100%
  width: 100%
  grid-column: 1
  grid-row: 1/-1
  object-fit: cover
  object-position: 50% 0

.site-title
  font-size: 1.1em
  text-align: center
  width: 100%

.gradient-overlay
  grid-column: 1
  grid-row: 1/2
  z-index: 98
  background: linear-gradient(rgba(255,255,255,0) 80%, #FFFFFF 100%) no-repeat 50% 50% / 100% 100%

.tag-list
  width: 100%
  text-align: center
  list-style-type: none

  .tag-item
    font-size: .9em
    display: inline-block
    margin-right: .5em
    opacity: .6
    &:hover
      text-underline
      cursor: pointer

.unique-tags
  list-style-type: none
  max-width: 500px
  display: flex
  margin: 1em auto
  justify-content: center

  li
    margin: 0 .5em
    text-transform: capitalize
    opacity: .7


.is-active
  text-decoration: underline
</style>
