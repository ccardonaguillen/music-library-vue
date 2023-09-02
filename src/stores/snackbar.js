/*jshint esversion: 11 */

import { defineStore } from 'pinia'

export const userSnackbarStore = defineStore('snackbar', {
  state: () => ({
    show: false,
    message: '',
    color: 'success',
    timeout: 4000
  }),

  actions: {
    displayMessage(msg, msgColor, duration) {
      this.show = true
      this.message = msg
      this.color = msgColor
      this.timeout = duration
    },

    displaySuccessMessage(msg, duration = this.timeout) {
      this.displayMessage(msg, 'success', duration)
    },

    displayErrorMessage(msg, duration = this.timeout) {
      this.displayMessage(msg, 'error', duration)
    },

    displayInfoMessage(msg, duration = this.timeout) {
      this.displayMessage(msg, null, duration)
    }
  }
})
