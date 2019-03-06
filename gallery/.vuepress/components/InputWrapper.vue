<template>
    <div class="input-wrapper" :class="`input-${type}-wrapper`">
        <label
            class="label" 
            :id="`${label}-label`" 
            :for="`${label}-input`">{{ label }}</label>
        <p v-if="description" class="input-description">{{ description }}</p>
        <textarea 
            v-if="type === 'textarea'"
            name="theme-description" 
            :id="`${label}-input`"  
            :aria-labelledby="`${label}-label`"
            minlength="50"
            @input="$emit('input', $event.target.value)"/>
        <fieldset class="checkboxes" v-if="type === 'checkbox'">
            <span  class="checkbox-wrapper" v-for="tag in tags">
                <input 
                    type="checkbox" 
                    name="" 
                    id=""
                    :value="tag"
                    @input="$emit('input', $event.target)">
                <label class="checkbox-label" for="">{{ tag }}</label>
            </span>
        </fieldset>
        <div>
            <!-- <font-awesome-icon 
                v-if="icon"
                :icon="[icon.type, icon.name]"/> -->
            <input 
                v-if="type === 'text' || type === 'url'"
                :id="`${label}-input`" 
                :type="type"
                :value="value"
                :required="isRequired"
                :aria-labelledby="`${label}-label`"
                @input="$emit('input', $event.target.value)">
        </div>
        <div class="dropbox" v-if="type === 'file'">
            <p class="dropbox-description">Drag and drop your screenshots here, or click to select files.</p>
            <input 
                class="dropbox-input"
                :id="`${label}-input`" 
                :type="type" 
                :aria-labelledby="`${label}-label`"
                multiple
                required
                accept="image/*"
                @change="$emit('change', $event.target)">    
        </div> 
    </div>
</template>

<script>
export default {
    name: 'InputWrapper',
    data() {
        return {
            input: ''
        }
    },
    props: {
        icon: {
            type: Object,
            required: false
        },
        tags: {
            type: Array,
            required: false,
            default: () => {}
        },
        value: {
            type: String,
            required: false
        },
        isRequired: {
            type: Boolean,
            required: false
        },
        type: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        }
    }
}
</script>

<style lang="sass" scoped>

    .input-wrapper .checkboxes
        display: flex

    .checkbox-wrapper
        display: flex
        margin-right: 2em

        input, label
            min-width: 0
            display: inline-block

    .checkbox-label
        text-transform: capitalize

    .input-wrapper
        max-width: 500px
        &:focus-within label
            font-weight: bold
        &.sub-input
            margin-bottom: 0

    .input-checkbox-wrapper:focus-within label
        font-weight: normal

    .input-textarea-wrapper, .input-file-wrapper
        flex-basis: 100%

    .sub-input label
        font-size: .8em
        font-weight: bold

    .sub-input input
        font-size: .8em
        padding: .3em

    textarea
        max-height: 120px

    input, textarea
        font-size: 1em
        min-width: 100%
        max-width: 100%
        padding: .2em 0
        color: #333
        font-family: 'Lato'
        border-radius: 3px
        border: 1px solid #c1c6c1
        padding: .5em
        margin: .2em 0
        transition: all .1s linear
        &:focus
            border-left: 5px solid #42b883

    .input-wrapper
        margin-bottom: .5em
        *
            display: block

    .input-description
        margin: 0
        font-size: .8em
        color: #808080

    .dropbox
        position: relative
        padding: 1em
        min-width: 100%
        max-width: 100%
        border: 3px dashed #c1c6c1
        min-height: 150px
        color: #808080
        margin: .2em 0
        &:focus-within
            border-color: #42b883
            color: #333

        .dropbox-description
            font-size: .9em
            height: 100%
            width: 100%
            position: absolute
            top: 0
            bottom: 0
            right: 0
            left: 0
            display: flex
            justify-content: center
            align-items: center
            margin-bottom: 0
            padding: 1em
            text-align: center

    .dropbox-input
        position: absolute
        border: 0
        outline: 0
        height: 100%
        width: 100%
        top: 0
        left: 0
        bottom: 0
        right: 0
        opacity: 0

</style>

