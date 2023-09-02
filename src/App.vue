<template>
  <page-header />
  <router-view></router-view>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import { mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  name: 'App',
  components: { PageHeader },
  methods: {
    ...mapActions(useUserStore, ['initFirebaseAuth'])
  },
  created() {
    this.initFirebaseAuth()
  }
}
</script>

<style scoped></style>
