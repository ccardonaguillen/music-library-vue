/*jshint esversion: 11 */

// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  getCountFromServer
} from 'firebase/firestore'
import { useUserStore } from '@/stores/user'

export const useLibraryStore = defineStore('library', {
  state: () => ({
    albums: []
  }),

  getters: {
    libraryRef: () => {
      const user = useUserStore()
      return collection(getFirestore(), user.id)
    }
  },

  actions: {
    async fetchLibrary() {
      const q = await getDocs(this.libraryRef)
      q.forEach((doc) => {
        this.albums.push({ id: doc.id, ...doc.data() })
      })
    },

    clearLibrary() {
      this.albums = []
    },

    async filterLibrary() {},

    async addAlbum(albumInfo) {
      const q = await this.findAlbum(albumInfo)
      const snapshot = await getCountFromServer(q)
      if (snapshot.data().count)
        console.log('duplicated') //TODO : Add 'duplicated' message to snackbar
      else {
        await addDoc(this.libraryRef, albumInfo)
        // TODO: Add 'album added' message to snackbar
      }
    },

    async removeAlbum(id) {
      await deleteDoc(this.libraryRef.doc(id))
      // TODO: Add 'album deleted' message to snackbar
    },

    async editAlbum(id, albumInfo) {
      const albumRef = this.libraryRef.doc(id)
      await updateDoc(albumRef, albumInfo)
      // TODO: Add 'album edited' message to snackbar
    },

    async findAlbum({ title, artist, released }) {
      return query(
        this.libraryRef,
        where('title', '==', title),
        where('artist', '==', artist),
        where('released', '==', released)
      )
    }
  }
})
