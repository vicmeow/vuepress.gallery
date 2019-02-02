<template>
  <div class="header-wrapper">
    <header class="header">
        <template v-if="$page.frontmatter.layout === 'list'">
          <h1 class="page-title" >{{ $siteTitle }}</h1>
          <p class="page-description">{{ $description }}</p>
        </template>
        <template v-else>
          <router-link class="nav-home" to="/">{{ $siteTitle }}</router-link>
          <h1 class="site-heading">
            <a :href="$page.frontmatter.site_url">{{ $page.frontmatter.title }}</a>
          </h1>
          <p>by <a 
            :href="$page.frontmatter.creator_url"
            v-text="$page.frontmatter.creator"/></p>
        </template>
    </header>
  </div>
</template>

<style lang="sass">

.header-wrapper
  width: 100%
  position: sticky
  top: 0
  background: linear-gradient(#fff 90%, rgba(255,255,255,0) 100%)
  z-index: 1000
  @media screen and (max-width: 768px)
    width: calc(100% + 2em)

header
  display: flex
  justify-content: center
  flex-direction: column
  height: 180px
  max-width: 1400px
  margin: 0 auto
  width: 100%
  padding: 0 1em
  text-align: center

.nav-home
  &:hover
    text-decaration: none
  
</style>
