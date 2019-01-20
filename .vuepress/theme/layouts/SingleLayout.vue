<template>
  <div>
    <h1>{{ $page.frontmatter.title }}</h1>
    <p>{{ $page.frontmatter.description }}</p>
    <img :src="$page.frontmatter.img" :alt="$page.frontmatter.title">
  </div>
</template>

<script>
  export default {
    name: 'SingleLayout'
  }
</script>

<style scoped>

</style>