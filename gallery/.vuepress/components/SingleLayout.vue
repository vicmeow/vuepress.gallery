<template>
  <div class="page-wrapper single-layout">
    <figure class="img-wrapper">
      <img class="single-img" :src="`/${ activeSrc }`" :alt="$page.frontmatter.title">
      <figcaption class="hidden">A screenshot of {{ $page.frontmatter.title }}</figcaption>
    </figure>
    <div class="single-content">
      <div class="theme-details">
        <!-- THEME TITLE & CREATOR -->
        <h2 class="theme-title">{{ $page.frontmatter.title }}</h2>
        <p class="theme-creator accent">by <a 
            :href="$page.frontmatter.creator_url"
            v-text="$page.frontmatter.creator"/></p>
        
        <!-- THEME LINK -->
        <p> {{ $page.frontmatter.site_description }}</p>
        <a class="theme-live accent" :href="$page.frontmatter.site_url">View live</a>
        <!-- REPO LINK -->
        <!-- TODO: Add repo link -->
        <!-- THEME FEATURES -->
        <!-- TODO: Add list of theme features -->
      </div>
      <h3 id="screenshots-heading">Screenshots</h3>
      <ul class="screenshot-list" aria-labelledby="screenshots-heading">
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
    padding-bottom: 2em
    @media screen and (max-width: 768px)
      grid-template-columns: 1fr
      grid-template-areas: 'more' 'img'
      max-width: 100%
      align-content: flex-start

  .single-content
    grid-area: more
    display: flex
    flex-direction: column
    align-self: flex-start
    position: sticky
    top: 7em
    flex-shrink: 0
    flex-grow: 1
    padding: 0 1em 1em
    height: calc(100vh - 8em)
    overflow-y: auto
    padding-top: .5em
    @media screen and (max-width: 768px)
      height: auto
      position: relative
      top: 0
      padding: 0
      overflow-x: auto

  .theme-details
    @media screen and (max-width: 768px)
      padding: 0 1em

  .theme-creator
    margin-bottom: 1em
  
  .theme-live
    display: inline-block
    margin-top: 1em

  .img-wrapper
    grid-area: img
    align-self: flex-start
    position: relative
    margin: 0 1em 1em 1em
    padding: .5em
    box-shadow: 0px 2px 10px rgba(0,0,0,.1)
    border-radius: 5px
    @media screen and (max-width: 768px)
      margin: 0 1em
      padding-bottom: 2em

  .single-img
    object-fit: scale-down
    object-position: 50% 0
    @media screen and (max-width: 768px)
      object-fit: cover

  .screenshot-list
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(200px,1fr))
    list-style-type: none
    gap: 1em
    width: 100%
    padding: 0
    //margin-top: 1em
    &::-webkit-scrollbar
      display: none
    @media screen and (max-width: 768px)
      display: flex
      flex-wrap: nowrap
      height: 170px
      padding: 1em
      overflow: -moz-scrollbars-none
      overflow-x: auto
      -webkit-overflow-scrolling: touch

    .screenshot-item
      max-height: 250px
      overflow: hidden
      box-shadow: 0px 2px 10px rgba(0,0,0,.1)
      transition: transform .3s ease-in-out
      flex: 0 0 auto
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