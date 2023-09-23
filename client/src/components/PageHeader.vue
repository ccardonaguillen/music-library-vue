<template>
  <header>
    <v-container fluid class="bg-surface-variant">
      <v-row justify="center">
        <v-col cols="7">
          <v-row justify="space-between" class="py-5">
            <div class="d-flex align-center">
              <v-icon icon="mdi-album" size="45" />
              <h1 v-t="'header.title'"></h1>
            </div>
            <v-btn-toggle v-model="$i18n.locale" color="deep-purple-accent-3" style="gap: 16px">
              <v-btn value="en" text="English" />
              <v-btn value="es" text="Español" />
            </v-btn-toggle>
            <div class="d-flex align-center">
              <template v-if="isUserSignedIn">
                <v-btn variant="text" @click="signOutUser"> Sign out</v-btn>
                <v-avatar>
                  <v-img :src="profilePicture"></v-img>
                </v-avatar>
              </template>
              <template v-else>
                <v-btn variant="text" @click="signIn"> Sign in with Google</v-btn>
                <v-icon icon="mdi-account-circle" size="45" />
              </template>
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </header>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  name: 'PageHeader',
  computed: {
    ...mapState(useUserStore, ['id', 'username', 'profilePicture', 'isUserSignedIn'])
  },
  methods: {
    ...mapActions(useUserStore, ['signIn', 'signOutUser'])
  }
}
</script>

<style scoped></style>