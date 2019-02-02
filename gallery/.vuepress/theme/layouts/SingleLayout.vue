<template>
  <div class="single-layout">
    <figure class="img-wrapper">
      <img :src="`/${activeSrc}`" :alt="$page.frontmatter.title">
      <figcaption class="hidden">A screenshot of {{$page.frontmatter.title}}</figcaption>
    </figure>
    <div class="single-content">
      <ul class="screenshot-list">
        <li
          tabindex="0" 
          class="screenshot-item" 
          v-for="screenshot in $page.frontmatter.site_screenshots" 
          @click="updateSrc(screenshot)"
          @keydown.enter="updateSrc(screenshot)">
          <img :src="`/${screenshot}`">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  // TODO:
  //  1. Screenshot
  //  2. Name of site
  //  4. Link to site
  //  5. Tags
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
    top: calc(180px)
    flex-shrink: 0
    flex-grow: 1
    padding: 0 1em 1em
    height: calc(100vh - 180px - 1em)
    text-align: center
    overflow-y: auto
    padding-top: .5em
    @media screen and (max-width: 768px)
      height: auto
      position: relative
      top: 0
      padding: 0
      overflow-x: auto
      margin-right: 1em

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

  .screenshot-list
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(200px,1fr))
    list-style-type: none
    gap: 1em
    width: 100%
    padding: 0
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