/*jshint esversion: 11 */

import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    show: false,
    album: {}
  }),

  actions: {
    openModal() {
      this.show = true
    },
    closeModal() {
      this.show = false
      this.album = {}
    }
  }
})
