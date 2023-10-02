<template>
  <v-app>
    <mobile-user-menu v-model="showDrawer" />
    <v-layout full-height>
      <v-container fluid>
        <v-row justify="center">
          <page-header @drawerToggled="toggleDrawer" />

          <v-col cols="12" sm="11" md="10" lg="8" xl="7">
            <v-main>
              <router-view :key="$route.path"> </router-view>
            </v-main>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>
    <v-snackbar :model-value="show" :timeout="timeout" :color="color">
      <pre class="text-subtitle-2">{{ message }}</pre>
    </v-snackbar>
  </v-app>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import MobileUserMenu from '@/components/MobileUserMenu.vue'

import { mapActions, mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useSnackbarStore } from '@/stores/snackbar'

export default {
  name: 'App',
  data() {
    return {
      showDrawer: false
    }
  },
  components: { MobileUserMenu, PageHeader },
  computed: {
    ...mapState(useSnackbarStore, ['show', 'message', 'color', 'timeout'])
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
