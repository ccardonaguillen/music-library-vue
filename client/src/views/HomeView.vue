<template>
  <main>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="7">
          <album-filter />
          <album-table />
        </v-col>
      </v-row>
    </v-container>
  </main>
  <album-modal />
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
