module.exports = {
  title: 'VuePress Gallery',
  description: 'A VuePress theme gallery, made with VuePress.',
  serviceWorker: true,
  plugins: [
    [ 
      '@vuepress/google-analytics',
      {
        'ga': 'UA-133690351-1'
      }
    ],
    '@vuepress/plugin-pwa'
  ],
  head: [
    ['meta', { name: 'google-site-verification', content: 'nvnApLC80g7AZLICqtOpuMvdcU-CjQ7gJsku-gpkZAc'}]
  ]
}