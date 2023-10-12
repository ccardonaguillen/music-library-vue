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
        <h3 class="text-decoration-underline mb-2">General info</h3>
        <div class="extra-info-container">
          <template v-for="(item, idx) in generalInfoItems" :key="idx">
            <template v-if="item.link">
              <a :href="item.href" class="font-weight-bold" v-if="item.href">{{ item.label }}</a>
              <span />
            </template>
            <template v-else>
              <p class="font-weight-bold">{{ $t(`fields.${item.label}`) }}</p>
              <p>{{ item.text }}</p>
            </template>
          </template>
        </div>
      </div>

      <v-divider :vertical="$vuetify.display.smAndUp" />

      <div>
        <h3 class="text-decoration-underline mb-2">Record info</h3>
        <div class="extra-info-container">
          <template v-for="(item, idx) in recordInfoItems" :key="idx">
            <p class="font-weight-bold">{{ $t(`fields.${item.label}`) }}</p>
            <p>{{ item.text || '-' }}</p>
          </template>
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
    generalInfoItems() {
      return [
        { label: 'released.long', text: this.album.released || '-' },
        {
          label: 'owned',
          text: `${this.$t(this.album.owned ? 'common.yes' : 'common.no')} ${
            this.album.location ? ` (${this.album.location})` : ''
          }`
        },
        {
          label: 'favorite',
          text: this.$t(`common.${this.album.favorite ? 'yes' : 'no'}`)
        },
        { label: 'genre', text: this.genres },
        { label: 'topRS1', text: this.album.topRS1 || '-' },
        { label: 'topRS3', text: this.album.topRS3 || '-' },
        { label: 'Wikipedia', href: this.album.wikipedia, link: true },
        { label: 'Discogs', href: this.album.discogs, link: true }
      ]
    },

    recordInfoItems() {
      return [
        { label: 'recordFormat', text: this.albumFormats },
        { label: 'albumFormat', text: this.album.album_format },
        { label: 'catalogNum.short', text: this.album.catalog_num },
        { label: 'label', text: this.album.label },
        { label: 'country', text: this.album.country },
        { label: 'edition.long', text: this.album.edition },
        { label: 'matrix', text: this.album.matrix },
        { label: 'condition', text: this.album.condition },
        { label: 'notes', text: this.album.notes }
      ]
    },

    albumFormats() {
      return this.album.record_format
        ? this.album.record_format
            .map((format) => this.$t(`fields.recordFormatOptions.${format}`))
            .join(', ')
        : '-'
    },
    genres() {
      return this.album.genre
        ? this.album.genre.map((genre) => this.$t(`fields.genreOptions.${genre}`)).join(', ')
        : '-'
    }
  }
}
</script>

<style scoped>
.expanded-row-container :deep(.v-card-text) {
  display: grid;
  grid-template-columns: clamp(250px, 300px, 20vw) min-content 3fr min-content 4fr;
  column-gap: 16px;
}

.extra-info-container {
  display: grid;
  grid-template-columns: minmax(auto, 160px) 1fr;
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
