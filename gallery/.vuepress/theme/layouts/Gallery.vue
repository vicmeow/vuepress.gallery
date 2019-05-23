<template>
  <div class="gallery">
    <div class="filter-wrapper">
      <!-- TODO: toggle filter -->
      <div class="accent" id="filter-heading">Filter:</div>
      <ul class="header-tag-list tag-list" aria-labelledby="filter-heading">
        <li
          class="tag-item accent"
          @click="updateFilter('all')"
          :class="{'is-active': filter === 'all'}"
          tabindex="0"
        >All</li>
        <li
          class="tag-item accent"
          v-for="tag in uniqueTags"
          :key="tag.index"
          @click="updateFilter(tag)"
          :class="{'is-active': filter === tag}"
          tabindex="0"
        >{{ tag }}</li>
      </ul>
    </div>
    <ul class="theme-list">
      <li class="list-item" v-for="theme in filteredThemes" :key="theme.index">
        <div class="figure">
          <img
            class="theme-img"
            :src="theme.frontmatter.screenshots[0].src"
            :alt="theme.frontmatter.screenshots[0].alt"
          >
          <div class="theme-caption">
            <a class="theme-title theme-link" :href="theme.path">{{ theme.title }}</a>
            <ul class="theme-tag-list tag-list">
              <li
                tabindex="0"
                class="tag-item accent"
                v-for="tag in theme.frontmatter.tags"
                :key="tag.index"
                @click="$emit('update-filter', tag)"
                @keydown.enter="$emit('update-filter', tag)"
              >{{ tag }}</li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  data() {
    return {
      filter: 'all'
    }
  },
  methods: {
    updateFilter(tag) {
      this.filter = tag
    }
  },
  computed: {
    uniqueTags() {
      const themes = this.$site.pages
        .filter(x => x.path.startsWith('/gallery/'))
      const tags = []
      themes.map(theme => theme.frontmatter.tags.map(tag => tags.push(tag)))
      return [...new Set(tags)]
    },
    filteredThemes() {
      return this.filter === 'all'
        ? this.themes
        : this.themes.filter(theme => theme.frontmatter.tags.some(tag => tag === this.filter))
    },
    themes() {
      return this.$site.pages
        .filter(x => x.path.startsWith('/gallery/'))
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
  padding: .3em 0
  text-align: left

.is-active
  border-bottom: 1px solid #333

.theme-list
  margin: 0 auto
  list-style-type: none
  margin: 0
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr))
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

.list-item:focus-within .theme-caption, .list-item:hover .theme-caption
  opacity: 1

.theme-caption
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
    padding-bottom: 1em
    background: rgba(255,255,255,.9)
    align-content: flex-end

.theme-img
  object-fit: cover
  object-position: 50% 0

.theme-title
  text-align: center

.theme-tag-list
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