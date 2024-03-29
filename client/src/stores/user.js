/*jshint esversion: 11 */

// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirebaseConfig } from '@/firebase.js'
import { useLibraryStore } from '@/stores/library'

const firebaseAppConfig = getFirebaseConfig()
initializeApp(firebaseAppConfig)

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null,
    username: null,
    profilePicture: null,
    email: null
  }),

  getters: {
    isUserSignedIn() {
      return !!this.id
    }
  },

  actions: {
    async signIn() {
      let provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: 'select_account'
      })

      await signInWithPopup(getAuth(), provider)
    },

    logOutUser() {
      // Sign out of Firebase.
      signOut(getAuth())
    },

    initFirebaseAuth() {
      // Listen to auth state changes.
      const library = useLibraryStore()
      onAuthStateChanged(getAuth(), (user) => {
        this.id = user?.uid
        this.username = user?.displayName
        this.profilePicture = user?.photoURL
        this.email = user?.email

        if (user) {
          library.fetchLibrary()
          library.fetchAlbumCount()
          library.fetchArtistList()
        } else library.clearLibrary()
      })
    }
  }
})
