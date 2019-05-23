<template>
  <div class="nav-wrapper">
    <div class="logo">
      <div class="home-link">
        <span class="home-title">{{ $siteTitle }}</span>
        <span lass="home-icon">
          <img class="icon" src="/favicon.ico">
        </span>
      </div>
    </div>
    <nav>
      <router-link
        class="nav-link accent"
        v-for="nav in $site.themeConfig.nav"
        :key="nav.link"
        :to="{ path: nav.link }"
      >{{ nav.text }}</router-link>
    </nav>
  </div>
</template>

<style lang="sass" scoped>

.nav-wrapper
  position: sticky
  top: 0
  z-index: 1
  display: flex
  justify-content: space-between
  margin-bottom: .5em
  align-items: center
  background: #fff
  flex-wrap: wrap
  padding: .3em 0
  @media screen and (max-width: 768px)
    position: relative

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

.router-link-exact-active:not(.home-link)
  border-bottom: 1px solid #333
</style>
