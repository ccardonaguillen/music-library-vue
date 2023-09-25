<template>
  <page-header />
  <router-view :key="$route.path"> </router-view>
  <v-snackbar :model-value="show" :timeout="timeout" :color="color">
    <pre class="text-subtitle-2">{{ message }}</pre>
  </v-snackbar>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useSnackbarStore } from '@/stores/snackbar'

export default {
  name: 'App',
  components: { PageHeader },
  computed: {
    ...mapState(useSnackbarStore, ['show', 'message', 'color', 'timeout'])
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
