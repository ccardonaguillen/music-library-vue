<template>
  <v-card
    flat
    color="transparent"
    :title="album.title"
    :subtitle="album.artist"
    class="expanded-row-container"
  >
    <template v-slot:text>
      <v-img :src="album.jacket" class="rounded-sm mt-1 placeholder-img" v-if="album.jacket" />
      <v-card
        flat
        color="blue-grey-lighten-5"
        class="d-flex align-center justify-center placeholder-img"
        v-else
      >
        <v-icon icon="mdi-cancel" size="40"></v-icon>
      </v-card>

      <v-divider :vertical="$vuetify.display.smAndUp" />

      <div>
        <h3 class="text-decoration-underline mb-1">General info</h3>
        <div class="extra-info-container">
          <p class="font-weight-bold">{{ $t('fields.owned') }}</p>
          <p>{{ album.owned || '-' }}</p>

          <p class="font-weight-bold">{{ $t('fields.favorite') }}</p>
          <p>{{ album.favorite || '-' }}</p>

          <p class="font-weight-bold">{{ $t('fields.genre') }}</p>
          <p>{{ album.genre || '-' }}</p>

          <p class="font-weight-bold">Top 500 RS1</p>
          <p>{{ album.topRS1 || '-' }}</p>

          <p class="font-weight-bold">Top 500 RS3</p>
          <p>{{ album.topRS3 || '-' }}</p>

          <a :href="album.wikipedia" class="font-weight-bold">Wikipedia</a>
          <span></span>

          <a :href="album.discogs" class="font-weight-bold">Discogs</a>
        </div>
      </div>

      <v-divider :vertical="$vuetify.display.smAndUp" />

      <div>
        <h3 class="text-decoration-underline mb-1">Record info</h3>
        <div class="extra-info-container">
          <p class="font-weight-bold">Record Format(s)</p>
          <p>{{ albumFormats || '-' }}</p>

          <p class="font-weight-bold">Album Format</p>
          <p>{{ album.album_format || '-' }}</p>

          <p class="font-weight-bold">{{ $t('fields.catalogNum.long') }}</p>
          <p>{{ album.catalog_num || '-' }}</p>

          <p class="font-weight-bold">{{ $t('fields.label') }}</p>
          <p>{{ album.label || '-' }}</p>

          <p class="font-weight-bold">{{ $t('fields.country') }}</p>
          <p>{{ album.country || '-' }}</p>

          <p class="font-weight-bold">{{ $t('fields.edition.long') }}</p>
          <p>{{ album.edition || '-' }}</p>

          <p class="font-weight-bold">{{ $t('fields.matrix') }}</p>
          <p>{{ album.matrix || '-' }}</p>

          <p class="font-weight-bold">{{ $t('fields.condition') }}</p>
          <p>{{ album.condition || '-' }}</p>

          <p class="font-weight-bold">{{ $t('fields.notes') }}</p>
          <p>{{ album.notes || '-' }}</p>
        </div>
      </div>
    </template>
    <template v-slot:actions v-if="$vuetify.display.xs">
      <v-spacer />

      <v-btn
        variant="text"
        color="error"
        prepend-icon="mdi-file-document-remove-outline"
        text="Delete"
      />
      <v-btn
        color="info"
        variant="outlined"
        prepend-icon="mdi-file-document-edit-outline"
        text="Edit"
      />
    </template>
  </v-card>
</template>

<script>
export default {
  name: 'ExpandedRow',
  props: {
    album: Object
  },
  computed: {
    albumFormats() {
      return this.album.record_format
        ? this.album.record_format
            .map((format) => this.$t(`fields.recordFormat.${format}`))
            .join(', ')
        : '-'
    }
  }
}
</script>

<style scoped>
.expanded-row-container :deep(.v-card-text) {
  display: grid;
  grid-template-columns: clamp(250px, 300px, 20vw) min-content 1fr min-content 2fr;
  column-gap: 16px;
}

.extra-info-container {
  display: grid;
  grid-template-columns: minmax(auto, 150px) 1fr;
  column-gap: 12px;
}

a:visited {
  color: inherit;
}

.placeholder-img {
  justify-self: center;
  height: clamp(250px, 300px, 20vw);
  width: clamp(250px, 300px, 20vw);
}

@media screen and (max-width: 600px) {
  .expanded-row-container :deep(.v-card-text) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr min-content min-content;
    row-gap: 8px;
  }
}
</style>
