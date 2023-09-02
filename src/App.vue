<template>
  <page-header />
  <router-view></router-view>
  <v-snackbar v-model="show" :timeout="timeout" :color="color">
    <pre class="text-subtitle-2">{{ message }}</pre>
  </v-snackbar>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
import { userSnackbarStore } from '@/stores/snackbar'

export default {
  name: 'App',
  components: { PageHeader },
  computed: {
    ...mapState(userSnackbarStore, ['show', 'message', 'color', 'timeout'])
  },
  methods: {
    ...mapActions(useUserStore, ['initFirebaseAuth'])
  },
  created() {
    this.initFirebaseAuth()
  }
}
</script>

<style scoped></style>
