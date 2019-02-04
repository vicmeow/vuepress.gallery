<template>
  <div class="list-layout">
    <ul class="header-tag-list tag-list">
          <li
            class="tag-item accent"
            @click="updateFilter('all')" 
            :class="{'is-active': filter === 'all'}"
            tabindex="0">All</li>
          <li 
            class="tag-item accent" 
            v-for="tag in uniqueTags" 
            @click="updateFilter(tag)" 
            :class="{'is-active': filter === tag}"
            tabindex="0">{{ tag }}</li>
        </ul>
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
            <ul class="tag-list">
              <li
                tabindex="0"
                class="tag-item accent" 
                v-for="tag in site.frontmatter.site_tags" 
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
    name: 'ListLayout',
    props: {
      filter: {
        type: String
      }
    },
    methods: {
    updateFilter(tag){
      this.$emit('update-filter', tag)
    }
  },
  computed: {
    uniqueTags() {
        const sites = this.$site.pages
            .filter(x => x.path.startsWith('/sites/') && !x.frontmatter.template)
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
          .filter(x => x.path.startsWith('/sites/') && !x.frontmatter.template)
          .sort((a, b) => new Date(b.frontmatter.date_added) - new Date(a.frontmatter.date_added))
    }
  }
  }
</script>

<style lang="sass">

.header-tag-list
  position: sticky
  top: 0
  z-index: 2000
  background: linear-gradient(#fff 70%, rgba(255,255,255,0) 100%)
  margin-top: 0
  min-height: 2.2em

.is-active
  border-bottom: 1px solid #333

.site-list
  margin: 0 auto
  justify-content: center
  list-style-type: none
  margin: 0
  display: flex
  flex-wrap: wrap
  align-content: flex-start

.list-item
  display: inline-block
  position: relative
  max-height: 400px
  min-height: 400px
  max-width: 400px
  box-shadow: 0px 2px 10px rgba(0,0,0,.1)
  border-radius: .5em
  background: white
  overflow: hidden
  margin: .5em
  transition: transform .3s ease-in-out
  &:last-child
    margin-bottom: 1em
  &:hover, &:focus-within
    ///transform: scale(1.01)

.site-title
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
  height: 400px
  opacity: 0
  background: rgba(255,255,255,.9)
  margin: auto 0
  transition: all .3s linear

.site-img
  object-fit: cover
  object-position: 50% 0

.site-title
  text-align: center
  width: 100%

.tag-list
  width: 100%
  text-align: center
  list-style-type: none
  margin-top: .2em

  .tag-item
    display: inline-block
    margin: 0 1vw
    &:hover
      cursor: pointer

</style>