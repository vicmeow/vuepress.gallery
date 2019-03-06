import firebase from 'firebase'
import 'firebase/auth'
import dotenv from 'dotenv'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faTrashAlt, faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


var config = {
    apiKey: process.env.API_KEY,
    authDomain: "vuepressgallery.firebaseapp.com",
    databaseURL: "https://vuepressgallery.firebaseio.com",
    projectId: "vuepressgallery",
    storageBucket: "vuepressgallery.appspot.com",
    messagingSenderId: "125790916337"
  }

firebase.initializeApp(config)

export default ({
    Vue, // the version of Vue being used in the VuePress app
    options, // the options for the root Vue instance
    router, // the router instance for the app
    siteData // site metadata
  }) => {
    Vue.prototype.$auth = false
    library.add(faTwitter, faGithub, faTrashAlt, faLink)
    Vue.component('font-awesome-icon', FontAwesomeIcon)
  }
  