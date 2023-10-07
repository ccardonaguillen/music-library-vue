<template>
  <v-app-bar class="bg-surface-variant">
    <v-row justify="center">
      <v-col
        cols="12"
        sm="11"
        md="10"
        lg="8"
        xl="7"
        class="d-flex justify-space-between align-center pl-6"
      >
        <div class="d-flex justify-center align-center">
          <v-btn
            icon="mdi-menu"
            :size="$vuetify.display.mdAndUp ? 'x-large' : 'default'"
            @click="$emit('drawerToggled')"
          />
          <h1 v-t="'header.title'" v-if="$vuetify.display.mdAndUp"></h1>
        </div>

        <div class="d-flex align-center" style="gap: 20px" v-if="$vuetify.display.mdAndUp">
          <router-link :to="{ name: 'home' }">{{ $t('header.home') }}</router-link>
          <router-link :to="{ name: 'topRS1' }">Top 500 RS1</router-link>
          <router-link :to="{ name: 'topRS3' }">Top 500 RS3</router-link>
        </div>
        <v-btn
          prepend-icon="mdi-plus"
          :text="$t('controls.newAlbum')"
          v-else-if="$route.name === 'home'"
          @click="openModal"
        />
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
import { mapActions } from 'pinia'
import { useModalStore } from '@/stores/modal'

export default {
  name: 'PageHeader',
  emits: ['drawerToggled'],
  methods: {
    ...mapActions(useModalStore, ['openModal'])
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
a:visited {
  color: white;
}

:deep(a.router-link-active) {
  font-weight: 600;
  color: #2196f3 !important;
}
</style>
