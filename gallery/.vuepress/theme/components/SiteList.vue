<template>
  <ul class="site-list">
      <li class="list-item" v-for="site in sites" :key="site.index">
        <figure class="figure">
          <img class="site-img" :src="site.frontmatter.site_screenshots[0]" :alt="site.frontmatter.title + ' screenshot'">
          <figcaption class="caption">
            <h2 class="site-title">
              <a class="site-link" :href="site.path">
                {{ site.frontmatter.title }}</a>
            </h2>
            <ul class="tag-list">
              <li class="tag-item accent" v-for="tag in site.frontmatter.site_tags" @click="updateFilter(tag)">{{ tag }}</li>
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
  margin: 0 auto
  justify-content: center
  padding: 0 1em
  list-style-type: none
  margin: 0
  display: flex
  flex-wrap: wrap
  gap: 1em
  align-content: flex-start

.list-item
  display: inline-block
  position: relative
  max-height: 400px
  max-width: 400px
  box-shadow: 0px 2px 10px rgba(0,0,0,.1)
  border-radius: .5em
  background: white
  overflow: hidden
  margin: .5em
  transition: transform .3s ease-in-out
  &:last-child
    margin-bottom: 1em
  &:hover, &:focus-within
    transform: scale(1.01)

.list-item:focus-within .caption, .list-item:hover .caption
  opacity: 1

.site-title
  font-size: 1.3em

.figure
  position: relative
  height: 100%
  margin: 0

.caption
  display: flex
  position: absolute
  bottom: 0
  right: 0
  left: 0
  width: 100%
  height: 100%
  opacity: 0
  background: rgba(255,255,255,.9)
  flex-direction: column
  align-items: center
  justify-content: center
  transition: all .3s linear

.site-img
  height: 100%
  width: 100%
  object-fit: cover
  object-position: 0 0

.site-title
  text-align: center
  width: 100%

.tag-list
  width: 100%
  text-align: center
  list-style-type: none

  .tag-item
    display: inline-block
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


