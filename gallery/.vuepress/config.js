require('dotenv').config()
const webpack = require('webpack')

module.exports = {
  title: 'VuePress Gallery',
  description: 'A VuePress theme gallery, made with VuePress.',
  themeConfig: {
    nav: [
      { text: 'Gallery', link: '/' },
      // { text: 'Resources', link: '/resources/' },
      // { text: 'Components', link: '/library/' },
      { text: 'About', link: '/about/' },
      { text: 'Submit', link: '/submit/' },
      // { text: 'Submissions', link: 'https://github.com/vicbergquist/vuepress.gallery' }
    ],
  },
  markdown: {
    anchor: {
      permalink: false,
    },
  },
  plugins: {
    '@vuepress/google-analytics': {
      ga: 'UA-133690351-1',
    },
    '@vuepress/plugin-clean-urls': {
      normalSuffix: '',
    },
  },
  head: [
    [
      'meta',
      {
        name: 'google-site-verification',
        content: 'nvnApLC80g7AZLICqtOpuMvdcU-CjQ7gJsku-gpkZAc',
      },
    ],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: 'VuePress Gallery 💚' }],
    [
      'meta',
      {
        name: 'twitter:image',
        content: 'https://vuepress.gallery/twitter-card.png',
      },
    ],
    ['meta', { name: 'twitter:creator', content: '@vicbergquist' }],
    ['meta', { name: 'twitter:site', content: '@vicbergquist' }],
    [
      'meta',
      {
        name: 'twitter:description',
        content: 'A VuePress theme gallery, made with VuePress.',
      },
    ],
  ],
  configureWebpack: config => {
    return { plugins: [new webpack.EnvironmentPlugin({ ...process.env })] }
  },
}
