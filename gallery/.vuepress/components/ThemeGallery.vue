<template>
  <div class="list-layout">
    <div class="filter-wrapper">
      <div class="accent" id="filter-heading">Filter:</div>
      <ul class="header-tag-list tag-list" aria-labelledby="filter-heading">
        <li
          class="tag-item accent"
          @click="updateFilter('all')" 
          :class="{'is-active': filter === 'all'}"
          tabindex="0">All</li>
        <li 
          class="tag-item accent" 
          v-for="tag in uniqueTags"
          :key="tag.index" 
          @click="updateFilter(tag)" 
          :class="{'is-active': filter === tag}"
          tabindex="0">{{ tag }}</li>
      </ul>
    </div>
    <ul class="site-list">
      <li 
        class="list-item" 
        v-for="site in filteredSites" 
        :key="site.index">
        <figure class="figure">
          <img 
            class="site-img" 
            :src="site.frontmatter.site_screenshots[0]" 
            :alt="site.frontmatter.title + ' screenshot'">
          <figcaption class="caption">
            <h2 class="site-title">
              <a class="site-link" :href="site.path">
                {{ site.frontmatter.title }}</a>
            </h2>
            <ul class="site-tag-list tag-list">
              <li
                tabindex="0"
                class="tag-item accent" 
                v-for="tag in site.frontmatter.site_tags" 
                :key="tag.index"
                @click="$emit('update-filter', tag)"
                @keydown.enter="$emit('update-filter', tag)">{{ tag }}</li>
            </ul>
          </figcaption>
        </figure>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'ThemeGallery',
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
    uniqueTags() {
        const sites = this.$site.pages
            .filter(x => x.path.startsWith('/gallery/') && !x.frontmatter.template)
        const tags = []
        sites.map(site => site.frontmatter.site_tags.map(tag => tags.push(tag)))
        return [...new Set(tags)]
      },
    filteredSites() {
    return this.filter === 'all' 
      ? this.sites
      : this.sites.filter(site => site.frontmatter.site_tags.some(tag => tag === this.filter))
    },
    sites(){
      return this.$site.pages
          .filter(x => x.path.startsWith('/gallery/') && !x.frontmatter.template)
          .sort((a, b) => new Date(b.frontmatter.date_added) - new Date(a.frontmatter.date_added))
    }
  }
  }
</script>

<style lang="sass">

.filter-wrapper
  position: sticky
  top: 0
  z-index: 2000
  background: #fff
  display: flex
  align-items: baseline
  margin-top: 0
  padding: .2em 0
  text-align: left

.is-active
  border-bottom: 1px solid #333

.site-list
  margin: 0 auto
  list-style-type: none
  margin: 0
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(430px, 1fr))
  gap: 1em
  padding: 0
  margin-top: 1em
  @media screen and (max-width: 420px)
    grid-template-columns: 1fr

.list-item
  display: inline-block
  position: relative
  max-height: 400px 
  box-shadow: 0px 2px 10px rgba(0,0,0,.1)
  border-radius: .5em
  background: white
  overflow: hidden
  transition: transform .3s ease-in-out
  &:last-child
    margin-bottom: 1em
  &:hover, &:focus-within
    ///transform: scale(1.01)

.site-title
  font-family: 'Lora'
  font-weight: normal
  font-size: 1.3em

.figure
  position: relative
  height: 100%
  margin: 0

.list-item:focus-within .caption, .list-item:hover .caption
  opacity: 1

.caption
  position: absolute
  bottom: 0
  left: 0
  right: 0
  display: grid
  align-content: center
  height: 100%
  opacity: 0
  background: rgba(255,255,255,.9)
  margin: auto 0
  transition: all .3s linear
  @media screen and (max-width: 768px)
    position: sticky
    bottom: 0
    opacity: 1
    height: auto
    padding: .5em
    background: rgba(255,255,255,.9)
    align-content: flex-end

.site-img
  object-fit: cover
  object-position: 50% 0

.site-title
  text-align: center
  width: 100%

.site-tag-list
  text-align: center

.tag-list
  width: 100%
  list-style-type: none
  padding: 0
  margin: 0

  .tag-item
    display: inline-block
    margin: 0 1vw
    &:hover
      cursor: pointer

</style>