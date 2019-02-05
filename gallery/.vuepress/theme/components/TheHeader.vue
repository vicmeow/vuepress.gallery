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
        <h1 class="page-title"> {{ $siteTitle }}</h1>
        <p class="page-description">{{ $description }}</p>
    </header>
  </div>
</template>

<style lang="sass" scoped>

.header-wrapper
  width: 100%
  z-index: 10000
  background: linear-gradient(#fff 80%, rgba(255,255,255,0) 100%)
  padding: 0 .5em
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
  &:hover
    transform: scale(1.05)
  &:focus
    border-bottom: 1px solid #36c425
    transform: scale(1.1)

.icon
  height: .9em
  width: .9em
  transition: transform .2s linear
  transform: rotate(0deg)

.back-icon .icon
  transform: rotate(90deg)

</style>
