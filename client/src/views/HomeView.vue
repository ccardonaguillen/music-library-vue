<template>
  <v-col cols="12" sm="11" md="10" lg="8" xl="7">
    <album-filter />
    <album-table />
    <album-modal />
  </v-col>
</template>

<script>
import AlbumFilter from '@/components/AlbumFilter.vue'
import AlbumModal from '@/components/AlbumModal.vue'
import AlbumTable from '@/components/AlbumTable.vue'

export default {
  name: 'HomeView',
  components: { AlbumModal, AlbumFilter, AlbumTable },
  data() {
    return {}
  },
  methods: {}
}
</script>
