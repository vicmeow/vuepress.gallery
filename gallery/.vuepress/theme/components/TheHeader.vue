<template>
  <div class="header-wrapper">
    <header class="header">
      <router-link class="nav-home" to="/">
        <span class="home-icon">
          <img
            :class="{ 'back-icon': $page.frontmatter.layout === 'single' }"
            class="icon" 
            src="/favicon.ico"/>
        </span>
      </router-link>
      <template v-if="$page.frontmatter.layout === 'list'">
        <h1 class="page-title"> {{ $siteTitle }}</h1>
        <p class="page-description">{{ $description }}</p>
      </template>
      <template v-else>
        <h1 class="site-heading">
          <a :href="$page.frontmatter.site_url">{{ $page.frontmatter.title }}</a>
        </h1>
        <p class="site-by accent">by <a 
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
  //padding: 1em 0
  @media screen and (max-width: 768px)
    padding: 0 1em

header
  display: flex
  flex-direction: column
  min-height: 150px
  max-width: 1400px
  margin: 0 auto
  width: 100%
  padding: 1em 1em
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

.home-icon
  transform: rotate(0deg)
  transition: transform .2s linear

.nav-home:hover
  transform: rotate(90deg)

</style>
