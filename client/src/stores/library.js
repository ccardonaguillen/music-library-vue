/*jshint esversion: 11 */

import { defineStore } from 'pinia'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  orderBy,
  startAt,
  endAt,
  limit,
  getCountFromServer
} from 'firebase/firestore'
import { useUserStore } from '@/stores/user'
import { useSnackbarStore } from '@/stores/snackbar'

export const useLibraryStore = defineStore('library', {
  state: () => ({
    albums: [],
    page: 1,
    pageSize: 10,
    sortBy: [{ key: 'artist', order: 'asc' }],
    albumCount: 0,
    isFetching: false
  }),

  getters: {
    libraryRef: () => {
      return collection(getFirestore(), useUserStore().id)
    }
  },

  actions: {
    async fetchLibrary() {
      this.clearLibrary()

      this.isFetching = true

      const countSnapshot = await getCountFromServer(this.libraryRef)
      this.albumCount = countSnapshot.data().count

      const sortBy = this.sortBy.length ? this.sortBy : [{ key: 'title', order: 'asc' }]
      const sortOptions = sortBy.map((option) => orderBy(option.key, option.order))
      const q = query(
        this.libraryRef,
        ...sortOptions,
        sortBy[0].order === 'desc'
          ? endAt((this.page - 1) * this.pageSize)
          : startAt((this.page - 1) * this.pageSize),
        limit(this.pageSize)
      )

      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        // console.log(doc.data())
        this.albums.push({ id: doc.id, ...doc.data() })
      })

      this.isFetching = false
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

    async removeAlbum(albumId) {
      const albumRef = doc(getFirestore(), useUserStore().id, albumId)
      await deleteDoc(albumRef)
      await this.fetchLibrary()
      useSnackbarStore().displaySuccessMessage('Album removed successfully')
    },

    async editAlbum(albumId, albumInfo) {
      const albumRef = doc(getFirestore(), useUserStore().id, albumId)
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
