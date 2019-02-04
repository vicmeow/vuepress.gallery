<template>
  <div class="header-wrapper" :class="{'header-sticky': $page.frontmatter.layout === 'single'}">
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

<style lang="sass" scoped>

.header-wrapper
  width: 100%
  z-index: 10000
  background: linear-gradient(#fff 80%, rgba(255,255,255,0) 100%)
  padding-top: .5em

.header-sticky
  position: sticky
  top: 0
  padding-bottom: 1em
  min-height: 7em

header
  display: flex
  flex-direction: column
  max-width: 1400px
  margin: 0 auto
  width: 100%
  text-align: center

.nav-home
  align-self: center
  transition: transform .2s linear
  &:focus, &:hover
    border: 0
    transform: scale(1.05)

.icon
  height: .9em
  width: .9em
  transition: transform .2s linear
  transform: rotate(0deg)

.back-icon .icon
  transform: rotate(90deg)

</style>
