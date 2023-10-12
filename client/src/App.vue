<template>
  <v-app>
    <user-menu v-model="showDrawer" />
    <v-layout full-height>
      <v-container fluid>
        <page-header @drawerToggled="toggleDrawer" />
        <v-main>
          <v-row no-gutters justify="center">
            <router-view :key="$route.path"> </router-view>
          </v-row>
        </v-main>
      </v-container>
    </v-layout>
    <v-snackbar :model-value="show" :timeout="timeout" :color="color">
      <pre class="text-subtitle-2">{{ message }}</pre>
    </v-snackbar>
  </v-app>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import UserMenu from '@/components/UserMenu.vue'

import { mapActions, mapState, mapWritableState } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useSnackbarStore } from '@/stores/snackbar'
import { useLibraryStore } from '@/stores/library'

export default {
  name: 'App',
  data() {
    return {
      showDrawer: false
    }
  },
  components: { UserMenu, PageHeader },
  computed: {
    ...mapState(useSnackbarStore, ['show', 'message', 'color', 'timeout']),
    ...mapWritableState(useLibraryStore, ['artists'])
  },
  methods: {
    ...mapActions(useUserStore, ['initFirebaseAuth']),

    toggleDrawer() {
      this.showDrawer = !this.showDrawer
    }
  },
  created() {
    this.initFirebaseAuth()
  }
}
</script>

<style scoped></style>
