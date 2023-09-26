<template>
  <header>
    <v-container fluid class="bg-surface-variant">
      <v-row justify="center">
        <v-col cols="7">
          <v-row justify="space-between" class="py-5">
            <div class="d-flex align-center">
              <v-icon icon="mdi-album" size="45" class="mr-2" />
              <h1 v-t="'header.title'"></h1>
            </div>

            <div class="d-flex align-center">
              <div class="d-flex align-center mr-6" style="gap: 20px">
                <router-link :to="{ name: 'home' }">Home</router-link>
                <router-link :to="{ name: 'topRS1' }">Top 500 RS1</router-link>
                <router-link :to="{ name: 'topRS3' }">Top 500 RS3</router-link>
              </div>
              <user-menu />
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
import UserMenu from '@/components/UserMenu.vue'

export default {
  name: 'PageHeader',
  components: { UserMenu },
  computed: {
    ...mapState(useUserStore, ['id', 'username', 'profilePicture', 'isUserSignedIn'])
  },
  methods: {
    ...mapActions(useUserStore, ['signIn', 'signOutUser'])
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

>>> a.router-link-active {
  font-weight: 600;
  color: #2196f3 !important;
}
</style>
