<template>
  <ul class="list-layout">
    <li class="list-item" v-for="site in sites" :key="site.index">
      <div class="gradient-overlay"></div>
    <figure class="figure">
      <img class="site-img" :src="site.img" :alt="site.title + ' screenshot'">
      <!-- TODO: Include name, tags? Must have link to website OR repo -->
      <!-- <figcaption class="caption">
        <a :href="site.url">
          <h2 class="site-title">{{ site.title }}</h2>
        </a>
      </figcaption> -->
    </figure>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'ListLayout',
    data: () => ({
      sites: [{
        'title': 'bencodezen.io',
        'img': '/ben.png',
        'tags': ['blog'],
        'url': 'https://bencodezen.io',
        'likes': 12
        },
        {
        'title': 'vuepress-portfolio',
        'img': 'acme.jpg',
        'tags': ['portfolio', 'blog'],
        'url': 'https://vuepress-portfolio.netlify.com/',
        'likes': 10
        },
        {
        'title': 'Vuesax',
        'img': 'vuesax.png',
        'tags': ['other'],
        'url': 'https://lusaxweb.github.io/vuesax/',
        'path': '/example',
        'layout': 'SingleLayout'
        },
        {
        'title': 'bencodezen.io',
        'img': '/ben.png',
        'tags': ['blog'],
        'url': 'https://bencodezen.io',
        'likes': 12
        },
        {
        'title': 'vuepress-portfolio',
        'img': 'acme.jpg',
        'tags': ['portfolio', 'blog'],
        'url': 'https://vuepress-portfolio.netlify.com/',
        'likes': 10
        },
        {
        'title': 'Vuesax',
        'img': 'vuesax.png',
        'tags': ['other'],
        'url': 'https://lusaxweb.github.io/vuesax/',
        'path': '/example',
        'layout': 'SingleLayout'
        }]
    })
  }
</script>

<style lang="sass" scoped>

.list-layout
  min-height: 100vh
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr))
  gap: 1em
  margin: 0 auto
  justify-content: center
  padding: 2em 2em
  list-style-type: none
  margin: 0

.list-item
  position: relative
  height: 430px
  box-shadow: 0px 2px 15px rgba(0,0,0,.1)
  border-radius: .5em
  background: white
  overflow: hidden
  padding: 1em .5em
  transition: all .5s ease-in-out
  &:hover
    transform: scale(1.02)

.figure
  height: 100%
  //display: grid
  //grid-template-rows: 1fr max-content
  margin: 0

.caption
  padding: .5em 1em
  display: flex
  justify-content: space-between

.site-img
  height: 100%
  width: 100%
  object-fit: cover
  object-position: 0 0

.site-title
  font-size: 1em

.likes
  opacity: .5

.gradient-overlay
  position: absolute
  top: 0
  right: 0
  bottom: 0
  left: 0
  background: linear-gradient(rgba(255,255,255,0) 80%, #FFFFFF 100%) no-repeat 50% 50% / 100% 100%

</style>