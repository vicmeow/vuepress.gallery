<template>
  <div class="page-wrapper single-layout">
    <figure class="img-wrapper">
      <img 
        class="single-img"
        :src="`/${ activeSrc }`"
        :alt="$page.frontmatter.title">
      <figcaption class="hidden">A screenshot of {{ $page.frontmatter.title }}</figcaption>
    </figure>
    <div class="single-content">
        <!-- THEME TITLE -->
        <h1 class="theme-title">{{ $page.frontmatter.title }}</h1>
        <!-- THEME CREATOR -->
        <p 
          class="theme-creator accent">by <a 
          class="accent"
          :href="$page.frontmatter.creator_url"
          v-text="$page.frontmatter.creator"/></p>
        <!-- THEME DESCRIPTION -->
        <p>{{ $page.frontmatter.site_description }}</p>
        <!-- LIVE LINK -->
        <p class="accent">
          View <a
            :href="$page.frontmatter.site_url">live</a>
            <template v-if="$page.frontmatter.site_repo">
              or on <a :href="$page.frontmatter.site_repo">GitHub</a>
            </template>
        </p>
      <h2 class="content-heading" id="screenshots-heading">Screenshots</h2>
      <ul
        class="screenshot-list" 
        aria-labelledby="screenshots-heading">
        <li
          tabindex="0" 
          class="screenshot-item" 
          v-for="screenshot in $page.frontmatter.site_screenshots"
          @click="updateSrc(screenshot)"
          @keydown.enter="updateSrc(screenshot)">
          <img class="single-img" :src="`/${screenshot}`">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SingleLayout',
    data() {
      return {
        activeSrc: ''
      }
    },
    mounted(){
      this.activeSrc = this.$page.frontmatter.site_screenshots[0]
    },
    methods: {
      updateSrc(src) {
        this.activeSrc = src
      }
    }
  }
</script>

<style lang="sass">

  .single-layout
    display: grid
    flex-shrink: 0
    flex-grow: 1
    margin: 0 auto
    grid-template-columns: 1.5fr 1fr
    grid-template-areas: 'img more'
    justify-content: center
    height: 100%
    @media screen and (max-width: 768px)
      grid-template-columns: 1fr
      grid-template-areas: 'more' 'img'
      max-width: 100%
      align-content: flex-start

  .single-content
    grid-area: more
    display: flex
    flex-direction: column
    align-items: flex-start
    position: sticky
    top: 3em
    flex-shrink: 0
    flex-grow: 1
    padding: 0 1em 1em
    padding-top: .5em
    height: calc(100vh - 5em)
    @media screen and (max-width: 768px)
      height: auto
      position: relative
      top: 0
      padding: 0
      overflow-x: auto

  .theme-title:first-letter
    text-transform: capitalize

  .theme-creator
    margin-bottom: 1em
  
  .theme-live
    display: inline-block

  .content-heading
    margin: 0
    font-size: 1.2em

  .img-wrapper
    grid-area: img
    align-self: flex-start
    position: relative
    margin: 0 1em 0 1em
    box-shadow: 0px 2px 10px rgba(0,0,0,.1)
    border-radius: 5px
    @media screen and (max-width: 768px)
      margin: 0
      padding-bottom: 2em

  .single-img
    object-fit: scale-down
    object-position: 50% 0
    border-radius: 5px
    @media screen and (max-width: 768px)
      object-fit: cover

  .screenshot-list
    display: grid
    grid-template-columns: repeat(2, 1fr)
    gap: 1em
    list-style-type: none
    width: 100%
    padding: 0
    max-height: 70%
    @media screen and (max-width: 768px)
      display: flex
      flex-wrap: nowrap
      height: 170px
      padding: 1em 0
      overflow: -moz-scrollbars-none
      overflow-x: auto
      -webkit-overflow-scrolling: touch

  ::-webkit-scrollbar
    display: none

  .screenshot-item
    max-height: 200px
    overflow: hidden
    box-shadow: 0px 2px 10px rgba(0,0,0,.1)
    transition: transform .3s ease-in-out
    flex: 0 0 auto
    border-radius: 5px
    &:hover
      cursor: pointer
      transform: scale(1.01)
    img
      object-fit: cover
      width: 100%
    @media screen and (max-width: 768px)
      max-width: 150px
      margin: 0 .5em

  .hidden
    visibility: hidden

</style>