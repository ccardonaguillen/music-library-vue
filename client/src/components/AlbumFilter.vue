<template>
  <p>
    {{ $tc('controls.entries', albumCount, { displayed: shownAlbumCount, total: albumCount }) }}
  </p>
  <h3>{{ $t('controls.filters') }}</h3>
  <div class="d-flex align-end" style="gap: 32px">
    <div style="flex: 3">
      <p class="pl-3">{{ $t('fields.artist') }}</p>
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
      <p class="pl-3">{{ $t('fields.owned') }}</p>
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
      <p class="pl-3">{{ $t('fields.favorite') }}</p>
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
      {{ $t('controls.newAlbum') }}
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
        { label: this.$t('common.all'), value: null },
        { label: this.$t('common.yes'), value: true },
        { label: this.$t('common.no'), value: false }
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
