<template>
  <ul class="site-list">
      <li class="list-item" v-for="site in sites" :key="site.index">
        <figure class="figure">
          <div class="gradient-overlay"></div>
          <img class="site-img" :src="'screenshots/' + site.frontmatter.src" :alt="site.frontmatter.title + ' screenshot'">
          <figcaption class="caption">
            <a class="site-link" :href="site.frontmatter.url">
              <h2 class="site-title">{{ site.frontmatter.title }}</h2>
            </a>
            <ul class="tag-list">
              <li class="tag-item" v-for="tag in site.frontmatter.tags" @click="updateFilter(tag)">{{ tag }}</li>
            </ul>
          </figcaption>
        </figure>
      </li>
    </ul>
</template>

<script>
export default {
  props: {
    sites: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="sass">
.site-list
  min-height: 100vh
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr))
  gap: 1.5em
  margin: 0 auto
  justify-content: center
  padding: 2em 2em
  list-style-type: none
  margin: 0
  @media screen and (min-width: 1448px)
    gap: 2em
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr))

.list-item
  display: inline-block
  position: relative
  height: 430px
  box-shadow: 0px 2px 15px rgba(0,0,0,.1)
  border-radius: .5em
  background: white
  overflow: hidden
  padding: 1em .5em
  //justify-content: space-around
  transition: transform .3s ease-in-out
  @media screen and (min-width: 1448px)
    height: 600px
  &:hover
    transform: scale(1.01)

.figure
  height: 100%
  display: grid
  grid-template-rows: 1fr max-content
  margin: 0

.caption
  grid-column: 1
  grid-row: 2
  padding: .5em 1em
  background: #fff

// .site-link::after
//   content: ''
//   position: absolute
//   top: 0
//   right: 0
//   left: 0
//   bottom: 0
//   z-index: 99

.site-img
  height: 100%
  width: 100%
  grid-column: 1
  grid-row: 1/-1
  object-fit: cover
  object-position: 50% 0

.site-title
  font-size: 1.1em
  text-align: center
  width: 100%

.gradient-overlay
  grid-column: 1
  grid-row: 1/2
  z-index: 98
  background: linear-gradient(rgba(255,255,255,0) 80%, #FFFFFF 100%) no-repeat 50% 50% / 100% 100%

.tag-list
  width: 100%
  text-align: center
  list-style-type: none

  .tag-item
    font-size: .9em
    display: inline-block
    margin-right: .5em
    opacity: .6
    &:hover
      text-underline
      cursor: pointer

.unique-tags
  list-style-type: none
  max-width: 500px
  display: flex
  margin: 1em auto
  justify-content: center

  li
    margin: 0 .5em
    text-transform: capitalize
    opacity: .7


.is-active
  text-decoration: underline
</style>


