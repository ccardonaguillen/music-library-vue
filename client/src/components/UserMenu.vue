<template>
  <v-menu location="bottom">
    <template v-slot:activator="{ props }">
      <v-avatar v-bind="props" v-if="isUserSignedIn"> <v-img :src="profilePicture" /> </v-avatar>
      <v-icon v-bind="props" icon="mdi-account-circle" size="45" v-else />
    </template>
    <v-card class="py-3">
      <div class="d-flex align-center px-3" v-if="isUserSignedIn">
        <v-avatar class="mr-2">
          <v-img :src="profilePicture" />
        </v-avatar>
        <p>{{ username }}</p>
      </div>
      <v-divider class="my-4 mx-3" v-if="isUserSignedIn" />
      <div class="d-flex flex-column px-3">
        Language
        <v-btn-toggle v-model="$i18n.locale" color="deep-purple-accent-3" style="gap: 16px">
          <v-btn value="en"> <v-img width="25" :src="langFlags.en" /> </v-btn>
          <v-btn value="es"> <v-img width="25" :src="langFlags.es" /> </v-btn>
        </v-btn-toggle>
      </div>
      <v-divider class="my-4 mx-3" />
      <v-list-item density="compact" @click="signOutUser" v-if="isUserSignedIn">
        <v-icon icon="mdi-power" />
        Log out
      </v-list-item>
      <v-list-item density="compact" @click="signIn" v-else>
        <v-icon icon="mdi-google" />
        Sign in with Google
      </v-list-item>
    </v-card>
  </v-menu>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
import esFlag from '@/assets/flags/es.svg'
import gbFlag from '@/assets/flags/gb.svg'

export default {
  name: 'UserMenu',
  data() {
    return {
      langFlags: { es: esFlag, en: gbFlag }
    }
  },
  computed: {
    ...mapState(useUserStore, ['id', 'username', 'profilePicture', 'isUserSignedIn'])
  },
  methods: {
    ...mapActions(useUserStore, ['signIn', 'signOutUser'])
  }
}
</script>

<style scoped></style>
