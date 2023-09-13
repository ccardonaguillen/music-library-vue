<template>
  <p v-if="albumCount">{{ `Showing ${shownAlbumCount} out of ${albumCount} albums` }}</p>
  <p v-else>No albums in the library. Add one by clicking the button</p>
  <h3>Filters</h3>
  <div class="d-flex align-end">
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
      />
    </div>
    <v-divider vertical class="mx-4" />
    <div style="flex: 2">
      <p>Release year</p>
      <v-range-slider
        v-model="filters.released"
        strict
        min="1930"
        max="2050"
        step="1"
        hide-details
        :thumb-label="true"
        style="height: 44px"
        @update:model-value="refreshTable"
      />

      <!--      <div class="d-flex" style="gap: 8px">-->
      <!--        <v-select hide-details density="compact" variant="outlined" rounded />-->
      <!--        <v-select hide-details density="compact" variant="outlined" rounded />-->
      <!--      </div>-->
    </div>
    <v-divider vertical class="mx-4" />

    <v-btn variant="outlined" rounded text="Owned" />
    <v-divider vertical class="mx-4" />

    <v-btn variant="outlined" rounded text="Favorite" />
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
      selectedOption: null,
      filterOptions: [
        { name: 'title', label: 'Title', placeholder: 'submarine' },
        { name: 'artist', label: 'Artist', placeholder: '"zeppelin", "beatles, rolling"' },
        {
          name: 'released',
          label: 'Release date',
          placeholder: '"1990", "1-2000", ">1900", "<1980"'
        },
        { name: 'owned', label: 'Owned', placeholder: '"true", "no", "not owned"' }
      ],
      libraryTimeOut: null
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
  mounted() {
    this.selectedOption = this.filterOptions[0]
  }
}
</script>

<style scoped></style>