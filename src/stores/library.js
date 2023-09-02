/*jshint esversion: 11 */

import { markRaw } from 'vue'
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
import { useSnackbarStore } from '@/stores/snackbar'

export const useLibraryStore = defineStore('library', {
  state: () => ({
    albums: []
  }),

  getters: {
    libraryRef: () => {
      return collection(getFirestore(), useUserStore().id)
    }
  },

  actions: {
    async fetchLibrary() {
      this.clearLibrary()
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
      if (snapshot.data().count) {
        useSnackbarStore().displayErrorMessage('This album already exists in the library')
      } else {
        await addDoc(this.libraryRef, albumInfo)
        await this.fetchLibrary()
        useSnackbarStore().displaySuccessMessage('Album added successfully')
      }
    },

    async removeAlbum(id) {
      await deleteDoc(this.libraryRef.doc(id))
      await this.fetchLibrary()
      useSnackbarStore().displaySuccessMessage('Album removed successfully')
    },

    async editAlbum(id, albumInfo) {
      const albumRef = this.libraryRef.doc(id)
      await updateDoc(albumRef, albumInfo)
      await this.fetchLibrary()
      useSnackbarStore().displaySuccessMessage('Album edited successfully')
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
