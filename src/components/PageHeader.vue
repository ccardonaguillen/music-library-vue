<template>
  <header>
    <v-container fluid class="bg-surface-variant">
      <v-row justify="center">
        <v-col cols="7">
          <v-row justify="space-between" class="py-5">
            <div class="d-flex align-center">
              <v-icon icon="mdi-album" size="45" />
              <h1>Music Library</h1>
            </div>
            <div class="d-flex align-center" style="gap: 16px">
              <v-btn> English</v-btn>
              <v-btn> Español</v-btn>
            </div>
            <div class="d-flex align-center">
              <p>Sign in with Google</p>
              <v-icon icon="mdi-account-circle" size="45" />
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </header>
</template>

<script setup>
// import { useUserStore } from '@/stores/user'
//
// const user = useUserStore()
</script>

<style scoped></style>
