<template>
  <p v-if="albumCount">{{ `Showing ${shownAlbumCount} out of ${albumCount} albums` }}</p>
  <p v-else>No albums in the library. Add one by clicking the button</p>
  <h3>Filters</h3>
  <div class="d-flex align-end" style="gap: 32px">
    <div style="flex: 3">
      <p class="pl-3">Artist</p>
      <v-autocomplete
        :items="artists"
        v-model="filters.artist"
        multiple
        chips
        hide-details
        density="compact"
        variant="outlined"
        rounded
        placeholder="No artist selected"
      />
    </div>

    <div style="flex: 1">
      <p class="pl-3">Owned</p>
      <v-select
        v-model="filters.owned"
        :items="trueFalseOptions"
        item-value="value"
        item-title="label"
        hide-details
        density="compact"
        variant="outlined"
        rounded
      />
    </div>

    <div style="flex: 1">
      <p class="pl-3">Favorite</p>
      <v-select
        v-model="filters.favorite"
        :items="trueFalseOptions"
        item-value="value"
        item-title="label"
        hide-details
        density="compact"
        variant="outlined"
        rounded
      />
    </div>

    <v-spacer />
    <v-btn size="large" prepend-icon="mdi-plus" color="primary" @click="openModal">
      New Album
    </v-btn>
  </div>
</template>

<script>
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useModalStore } from '@/stores/modal'
import { useLibraryStore } from '@/stores/library'

export default {
  name: 'AlbumFilter',
  data() {
    return {
      libraryTimeOut: null,
      trueFalseOptions: [
        { label: 'All', value: null },
        { label: 'Yes', value: true },
        { label: 'No', value: false }
      ]
    }
  },
  computed: {
    ...mapState(useLibraryStore, ['artists', 'albumCount', 'shownAlbumCount']),
    ...mapWritableState(useLibraryStore, ['filters'])
  },

  methods: {
    ...mapActions(useModalStore, ['openModal']),

    ...mapActions(useLibraryStore, ['fetchLibrary']),

    refreshTable() {
      if (this.libraryTimeOut) clearTimeout(this.libraryTimeOut)
      this.libraryTimeOut = setTimeout(() => {
        this.fetchLibrary()
      }, 1000)
    }
  },
  mounted() {},

  watch: {
    filters: {
      handler() {
        console.log('refreshing')
        this.fetchLibrary()
      },
      deep: true
    }
  }
}
</script>

<style scoped></style>
