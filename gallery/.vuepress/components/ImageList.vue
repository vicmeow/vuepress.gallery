<template>
  <ul class="img-list" aria-labelledby="images-heading">
    <li class="img-item" v-for="(image, index) in images">
      <div class="img-item-wrapper">
        <img class="img img-zoom" :alt="image.alt" :src="`${image.src}`">
      </div>
      <input-wrapper
        class="sub-input"
        :type="'text'"
        :label="'Caption'"
        v-model="image.alt"
        :isRequired="true"
      >
        <button
          slot="btn-remove"
          class="btn btn-remove"
          @click.prevent="$emit('remove-image', index)"
        >Remove</button>
      </input-wrapper>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ImageList',
  props: {
    images: {
      type: Array,
      required: true,
      default: () => { }
    }
  }
}
</script>

<style lang="sass">
  .img-list
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))
    grid-auto-flow: dense
    gap: 1em
    list-style-type: none
    width: 100%
    padding: 0
    overflow: auto
    margin: 0

  .img-item-wrapper
    max-height: 170px
    overflow: hidden
    border-radius: 5px
    box-shadow: 0px 2px 10px rgba(0,0,0,.1)
    transition: all .2s linear
    &:hover
      overflow: auto

  .img
    display: block
    height: auto
    object-fit: scale-down
    object-position: 50% 0
    @media screen and (max-width: 768px)
      object-fit: cover

  ::-webkit-scrollbar
      display: none
  
  .input-wrapper.sub-input > div
    display: flex
    justify-content: space-between
    margin-top: .2em

  .btn-remove
    background: #fff
    color: #EB4646
    font-size: .7em
    padding: 0
    margin: 0

</style>


