<template>
  <div class="list-layout">
    <!-- <ul class="unique-tags">
      <li @click="updateFilter('all')" :class="{'is-active': filter === 'all'}">All</li>
      <li class="tag-item" v-for="tag in uniqueTags" @click="updateFilter(tag)" :class="{'is-active': filter === tag}">{{ tag }}</li>
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
            .sort((a, b) => new Date(b.frontmatter.date_added) - new Date(a.frontmatter.date))
      },
      filteredSites() {
        return this.filter === 'all' ? this.sites : this.sites.filter(site => site.tags.some(tag => tag === this.filter))
      },
      uniqueTags() {
        const tags = []
        this.sites.map(site => site.frontmatter.site_tags.map(tag => tags.push(tag)))
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