<template>
  <div class="nav-wrapper">
    <div class="logo">
      <router-link class="home-link" to="/">
      <span class="home-title">{{ $siteTitle }}</span> <span 
          class="home-icon" 
          :class="{ 'back-icon': $page.frontmatter.layout === 'single' }">
        <img
          class="icon" 
          src="/favicon.ico"/>
        </span>
      </router-link>
    </div>
    <nav>
      <router-link 
        class="nav-link accent"
        v-for="nav in $site.themeConfig.nav" 
        :key="nav.link"
        :to="{ path: nav.link }">{{ nav.text }}</router-link>
    </nav>
  </div>
</template>

<style lang="sass" scoped>

.nav-wrapper
  position: sticky
  top: 0
  z-index: 1000
  display: flex
  justify-content: space-between
  padding: .3em 1em .3em
  margin-bottom: .5em
  align-items: center
  background: #fff
  flex-wrap: wrap

.home-title
  @media screen and (max-width: 420px)
    display: none

.logo
  font-size: 1.2em
  font-family: 'Lora'

.nav-link:not(:last-child)
  margin-right: 1.5rem

.icon
  height: .8em
  width: .8em
  transition: transform .2s linear
  transform: rotate(0deg)

.back-icon .icon
  transform: rotate(90deg)

.router-link-exact-active:not(.home-link)
  border-bottom: 1px solid #333
</style>
