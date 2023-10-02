<template>
  <album-filter />
  <album-table />
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
