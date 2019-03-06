<template>
    <ul
        class="img-list" 
        aria-labelledby="images-heading">
        <li
          tabindex="0" 
          class="img-item" 
          v-for="(image, index) in images">
            <div class="item-wrapper">
                <img class="img" :alt="image.alt" :src="`${image.src}`">
            </div>
            <input-wrapper 
                class="sub-input"
                :type="'text'" 
                :label="'Screenshot caption'" 
                v-model="image.alt"/>
            <button class="btn btn-remove" @click.prevent="$emit('remove-image', index)">
                Remove
            </button>
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
            default: () => {}
        }
    }
}
</script>

<style lang="sass">
    .img-list
        display: grid
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr))
        justify-content: center
        gap: 1em
        list-style-type: none
        width: 100%
        padding: 0

    .submit-img-list
        height: auto

    .item-wrapper
        max-height: 170px
        overflow: hidden
    
    .show-complete
        max-height: 100%
        overflow: visible

    .img
        display: block
        height: auto
        object-fit: cover
        object-position: 50% 0
        border-radius: 5px
        box-shadow: 0px 2px 10px rgba(0,0,0,.1)
        @media screen and (max-width: 768px)
            object-fit: cover

    ::-webkit-scrollbar
        display: none

    .btn-remove
        background: #fff
        color: #EB4646
        font-size: .7em
        padding: 0
        margin: 0
</style>


