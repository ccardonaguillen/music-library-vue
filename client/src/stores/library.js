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
    artists: [],
    page: 1,
    pageSize: 10,
    sortBy: [],
    filters: { artist: [], owned: null, favorite: null },
    albumCount: 0,
    isFetching: false
  }),

  getters: {
    libraryRef: () => {
      return collection(getFirestore(), useUserStore().id)
    },

    shownAlbumCount() {
      return this.albums.length
    }
  },

  actions: {
    async fetchAlbumCount() {
      if (!useUserStore().id) return

      const countSnapshot = await getCountFromServer(this.libraryRef)
      this.albumCount = countSnapshot.data().count
    },

    async fetchArtistList() {
      if (!useUserStore().id) return

      this.artists = []

      const querySnapshot = await getDocs(this.libraryRef)
      querySnapshot.forEach((doc) => {
        const artist = doc.data().artist
        this.artists.push(artist)
      })

      this.artists = this.artists.sort((a, b) => a.localeCompare(b))
    },

    async fetchLibrary() {
      if (!useUserStore().id) return

      this.clearLibrary()

      this.isFetching = true

      const sortBy = this.sortBy.length ? this.sortBy : [{ key: 'title', order: 'asc' }]
      const sortOptions = sortBy.map((option) => orderBy(option.key, option.order))

      let filterOptions = []

      if (this.filters.artist.length) {
        filterOptions.push(where('artist', 'in', this.filters.artist))
      }

      if (this.filters.owned !== null) {
        filterOptions.push(where('owned', '==', this.filters.owned))
      }

      if (this.filters.favorite !== null) {
        filterOptions.push(where('favorite', '==', this.filters.favorite))
      }

      const q = query(
        this.libraryRef,
        ...filterOptions,
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
        this.albumCount++
        await this.fetchLibrary()
        useSnackbarStore().displaySuccessMessage('Album added successfully')
      }
    },

    async removeAlbum(albumId) {
      const albumRef = doc(getFirestore(), useUserStore().id, albumId)
      await deleteDoc(albumRef)
      await this.fetchLibrary()
      this.albumCount--
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
