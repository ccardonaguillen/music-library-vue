<template>
  <p class="mb-2 font-weight-bold text-primary">
    {{ $tc('controls.entries', albumCount, { displayed: shownAlbumCount, total: albumCount }) }}
  </p>
  <h3 class="mb-2">{{ $t('controls.filters') }}</h3>
  <div class="d-flex justify-space-between align-end mb-8">
    <div class="filter-container mr-4">
      <div style="grid-area: artist">
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

      <div style="grid-area: owned">
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

      <div style="grid-area: favorite">
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
    </div>

    <!--    <v-spacer v-if="$vuetify.display.mdAndUp" />-->
    <v-btn
      size="large"
      prepend-icon="mdi-plus"
      :text="$t('controls.newAlbum')"
      color="primary"
      @click="openModal"
      v-if="$vuetify.display.mdAndUp"
    />
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

<style scoped>
.filter-container {
  display: grid;
  grid-template-areas: 'artist owned favorite';
  grid-template-rows: auto;
  grid-template-columns: 3fr 1fr 1fr;
  gap: 32px;
}

@media screen and (max-width: 600px) {
  .filter-container {
    width: 100%;
    grid-template-areas:
      'artist artist'
      'owned favorite';
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
}
</style>
