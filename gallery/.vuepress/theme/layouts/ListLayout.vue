<template>
  <div class="list-layout">
    hello world
    <!-- <ul class="unique-tags">
      <li @click="updateFilter('all')" :class="{'is-active': filter === 'all'}">All</li>
      <li class="tag-item" v-for="tag in uniqueTags" @click="updateFilter(tag)" :class="{'is-active': filter === tag}">{{ tag }}</li>
    </ul>
    <ul class="item-list">
      <li class="list-item" v-for="site in filteredSites" :key="site.likes">
        <figure class="figure">
          <div class="gradient-overlay"></div>
          <img class="site-img" :src="'screenshots/' + site.img" :alt="site.title + ' screenshot'">
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
    </ul> -->
    <site-list :sites="sites"/>
  </div>
</template>

<script>
  import SiteList from '../components/SiteList'
  export default {
    name: 'ListLayout',
    components: {
      SiteList
    },
    data: () => ({
      filter: 'all'
    }),
    computed: {
      sites(){
      return this.$site.pages
          .filter(x => x.path.startsWith('/sites/') && !x.frontmatter.template)
          .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
      },
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


</style>
