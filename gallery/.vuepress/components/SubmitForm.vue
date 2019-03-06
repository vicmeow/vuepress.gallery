<template>
  <div class="submit-form">

    <p v-if="error">Something went wrong! Please try again.</p>
    <p v-if="isUploading">Uploading theme images...</p>
    <p v-if="isSubmitting && !isUploading">Submitting theme...</p>
    <p class v-if="isSuccess">Theme submitted!</p>

    <form action @submit.prevent="submitTheme" v-if="showForm">
      <fieldset>
        <legend>Creator information</legend>
        <input-wrapper 
          :type="'text'" 
          :label="'Name'"
          :value="theme.creator_name"
          v-model="theme.creator_name"
          :description="'Name of theme creator'"
          :isRequired="true"
          :icon="{type: 'fab', name: user.provider}">
          </input-wrapper>
        <!-- <input-wrapper 
          :type="'url'" 
          :label="'Link'" 
          :preValue="theme.creator_url"
          v-model="theme.creator_url"
          :description="'Your website or link to profile on Twitter, GitHub etc.'"
          :icon="{type: 'fas', name: 'link'}"/> -->
      </fieldset>
      <fieldset>
        <legend>Theme information</legend>
        <!-- <input-wrapper 
          :type="'text'" 
          :label="'Title'" 
          v-model="theme.title"
          :isRequired="true"
          :description="'The title of your theme.'"/>
        <input-wrapper 
          :type="'url'" 
          :label="'Live link'" 
          v-model="theme.url"
          :description="'Where to view your theme.'"/>
        <input-wrapper 
          :type="'url'" 
          :label="'Repository'" 
          v-model="theme.repo"
          :description="'Link to the repository of your theme.'"/>
        <input-wrapper 
          :type="'textarea'" 
          :label="'Description'" 
          v-model="theme.description"
          :description="'Please describe your theme in 1-2 sentences.'"
          :isRequired="true"/> -->
        <!-- <input-wrapper 
          :type="'checkbox'" 
          :label="'Tags'" 
          @input="selectTags"
          :tags="options"
          :isRequired="true"
          :description="'Which tag(s) best describes your theme?'"/> -->
        <!-- <input-wrapper 
          :type="'file'" 
          :label="'Screenshots'" 
          @change="previewImages" 
          ref="file"
          :isRequired="true"
          :description="'Please upload screenshots of your theme.'"/>
        <p id="images-heading" class="label" v-if="screenshotPreviews.length">Added screenshots</p>
        <image-list 
          class="submit-img-list" 
          :images="screenshotPreviews" 
          @remove-image="removeImage"/> -->
      </fieldset>
      <!-- RESET FORM -->
      <input class="btn btn-reset" type="reset" value="Clear form">
      <!-- SUBMIT THEME -->
      <input class="btn btn-submit" type="submit" value="Submit theme!">
    </form>
  </div>
</template>

<script>
// 1. Select images
// 2. Display previews
// 3. Submit form
//      => upload images to cloudninary (promise?)
//      => res: fulfilled, save URL
//              => continue to form submission
//      => rej: display error

import InputWrapper from "../components/InputWrapper";
import ImageList from "../components/ImageList";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import axios from "axios";

export default {
  name: "SubmitForm",
  components: {
    InputWrapper,
    ImageList
  },
  props: {
    user: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      theme: {
        creator_name: this.user.name,
        creator_url: this.user.url,
        screenshots: [],
        tags: []
      },
      screenshotPreviews: [],
      isUploading: false,
      isSubmitting: false,
      isSuccess: false,
      error: false,
      options: ['portfolio', 'blog', 'docs']
    };
  },
  computed: {
    showForm(){
      return (this.isUploading || this.isSubmitting || this.isSuccess) ? false : true
    }
  },
  methods: {
    selectTags(tag) {
      tag.checked ? this.theme.tags.push(tag.value)
                  : this.theme.tags.splice(this.theme.tags.indexOf(tag.value), 1)
    },
    removeImage(index) {
      this.screenshotPreviews.splice(index, 1)
    },
    previewImages(e) {
      // File(s) selected
      const images = e.files;
      // Loop through files selected to:
      for (let image of images) {
        // 1. Get file name in kebab case
        const name = image.name.replace(/[\s_]+/g, "-").toLowerCase();
        // 2. Get temporary alt image text
        const alt = image.name.substring(0, image.name.indexOf("."));
        // Create a preview of the selected file(s)
        var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i
        if(!allowedExtensions.exec(image.name)) {
          image.value = ''
        } else {
          const src = URL.createObjectURL(image);
          // Add previews to the images array to display them in the component
          this.screenshotPreviews.push({ name, src, alt, image });
        } 
        
      }
    },
    uploadImages() {
        // Set upload status to trye
        this.isUploading = true
        // Loop through selected files to upload them
        const images = this.screenshotPreviews.map(async image => {

            // The whole file from the input that cloudinary needs
            const file = image.image;

            // Where images will be uploaded
            const cloudName = process.env.CLOUD_NAME

            // Default alt info for each image
            const alt = image.alt;

            // Form data for cloudinary
            let formdata = new FormData();
            formdata.append("upload_preset", process.env.UPLOAD_PRESET);
            formdata.append("file", file);

            // URL and config for axios request
            const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
            const config = {
                headers: {
                    "Content-Type": undefined,
                    "X-Requested-With": "XMLHttpRequest"
                }
            }
            // Wait for axios upload to finish
            await axios.post(url, formdata, config)
                    .then(response => {
                        // Add image URLs and alt info to theme info for publishing
                        this.theme.screenshots.push({src: response.data.secure_url, alt})
                        this.isUploading = false
                        this.isSubmitting = true
                    })
                    .catch(error => {
                        console.log(error, 'upload failed')
                        this.isUploading = false
                        this.error = true
                        return Promise.reject()
                    })
        })
        return Promise.all(images)
    },
    submitTheme() {
      this.isSubmitting = true
      this.uploadImages()
        .then(() => {
            console.log('Step 1 done. Ready to publish')
            // Reference to firestore
            const db = firebase.firestore()
            // Generate date for when theme was added
            this.theme.date_added = Date.now()
            const theme = { ...this.theme }
            // Publish theme to our collection
            db.collection("tests")
                .add(theme)
                .then(docRef => {
                    // If successful, set the loading and sucess state
                    this.isSubmitting = false
                    this.isSuccess = true
                    console.log('Step 2. Theme submission complete!');
                })
                .catch(error => {
                    this.isSubmitting = false;
                    this.error = true;
                    console.error("Error adding document: ", error);
                });
        })
        .catch(error => {
            this.isSubmitting = false
            this.error = true
            console.log(error, "Error in in upload")
        })
    }
  }
};
</script>

<style lang="sass">
  .submit-form form
    margin: 0 auto
    padding-bottom: 2em

  fieldset
    display: grid
    grid-template-columns: repeat(auto-fill, 1fr)
    flex-wrap: wrap
    border: 0
    margin-bottom: 1em

    legend
      font-size: 1.2em
      font-weight: bold
      margin-bottom: .5em
  
  #images-heading
    max-width: 550px
    margin: 0 auto

  .btn-submit
    background: #42b883

  .btn-reset
    opacity: .8
    margin-right: 1em

  .btn-submit,
  .btn-reset
    display: inline-block

</style>

