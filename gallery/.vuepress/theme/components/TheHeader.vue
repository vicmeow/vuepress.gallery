<template>
  <div class="header-wrapper">
    <header class="header">
      <router-link class="nav-home" to="/">
        <span 
          class="home-icon" 
          :class="{ 'back-icon': $page.frontmatter.layout === 'single' }">
        <img
          class="icon" 
          src="/favicon.ico"/>
        </span>
      </router-link>
      <template v-if="$page.frontmatter.layout === 'list'">
        <h1 class="page-title"> {{ $siteTitle }}</h1>
        <p class="page-description">{{ $description }}</p>
        <ul class="tag-list">
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
      </template>
      <template v-else>
        <h1 class="page-title">
          <a :href="$page.frontmatter.site_url">{{ $page.frontmatter.title }}</a>
        </h1>
        <p class="site-by accent">by <a 
          :href="$page.frontmatter.creator_url"
          v-text="$page.frontmatter.creator"/></p>
      </template>
    </header>
  </div>
</template>

<script>
export default {
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
      }
  }
}
</script>


<style lang="sass" scoped>

.header-wrapper
  width: 100%
  position: sticky
  top: 0
  background: linear-gradient(#fff 90%, rgba(255,255,255,0) 100%)
  z-index: 1000
  @media screen and (max-width: 768px)
    padding: 0 1em
  @media screen and (max-width: 320px)
    position: relative

header
  display: flex
  flex-direction: column
  min-height: 150px
  max-width: 1400px
  margin: 0 auto
  width: 100%
  padding: 1em
  text-align: center
  @media screen and (max-width: 420px)
    min-height: 130px

.nav-home
  align-self: center
  transition: transform .2s linear
  &:focus, &:hover
    border: 0
    transform: scale(1.05)

.icon
  height: 1.2em
  width: 1.2em
  transition: transform .2s linear
  transform: rotate(0deg)

.back-icon .icon
  height: .9em
  width: .9em
  transform: rotate(90deg)

.tag-list
  margin-top: 1em

.is-active
  border-bottom: 1px solid #333

</style>
