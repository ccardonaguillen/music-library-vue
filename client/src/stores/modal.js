/*jshint esversion: 11 */

import { defineStore } from 'pinia'

const blankAlbum = {
  title: '',
  artist: '',
  released: '',
  genre: '',
  owned: false,
  favorite: false,
  topRS1: null,
  topRS3: null,
  wikipedia: '',
  discogs: '',
  jacket: '',
  record_format: [],
  album_format: null,
  catalog_num: '',
  label: '',
  country: '',
  edition: null,
  matrix: '',
  condition: null,
  nDisks: null,
  notes: ''
}

export const useModalStore = defineStore('modal', {
  state: () => ({
    show: false,
    discogsId: null,
    album: {...blankAlbum}
  }),

  actions: {
    openModal() {
      this.show = true
    },
    closeModal() {
      this.show = false
      this.album = {...blankAlbum}
      this.discogsId = null
    }
  }
})
