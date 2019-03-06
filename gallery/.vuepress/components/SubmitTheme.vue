<template>
    <div class="submit-theme">
        <div class="btn-wrapper" v-if="!user.auth">
            <button
            class="btn btn-signin btn-github"
            @click="signup('github')">
             <font-awesome-icon class="btn-icon" :icon="['fab','github']" />
        Sign in with GitHub</button>
        <button
            class="btn btn-signin btn-twitter"
            @click="signup('twitter')">
             <font-awesome-icon class="btn-icon" :icon="['fab','twitter']" />
        Sign in with Twitter</button>
        </div>
        <SubmitForm v-if="user.auth" :user="user"/>
    </div>
</template>
<script>

import SubmitForm from '../components/SubmitForm'
import firebase from 'firebase'
import 'firebase/auth'

export default {
    name: 'SubmitTheme',
    components: {
        SubmitForm
    },
    data() {
        return {
            auth: {},
            user: {}
        }
    },
    methods: {
        signup(method){
            // Logic here
            const provider = method === 'github' 
                                ? new firebase.auth.GithubAuthProvider() 
                                : new firebase.auth.TwitterAuthProvider()
            firebase.auth().signInWithPopup(provider)
                .then(result => { 
                    const user = result.additionalUserInfo
                    const name = user.username
                    const provider = user.providerId.substring(0, user.providerId.indexOf("."))
                    const url = `https://${user.providerId}/${name}`
                    this.user = { auth: true, name, url, provider }
                    })
                .catch(error => { console.log(error)})
        }
    }
}
</script>

<style lang="sass">

    .btn-wrapper
        display: flex
        justify-content: center

    
    .btn-github
        background: #333
        color: #fff

    .btn-twitter
        background: #00aced
        color: #fff

    .btn-icon
        margin-right: .5em
</style>

