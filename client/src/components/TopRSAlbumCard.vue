<template>
  <v-card class="d-flex align-center px-2 py-2" variant="outlined">
    <v-chip color="white" size="small" variant="elevated" class="topPos font-weight-bold">{{
      album.topRS1
    }}</v-chip>
    <v-img :src="album.jacket" width="200" max-width="200" class="mr-4 rounded" />
    <div class="d-flex flex-column align-start">
      <div class="album-info-container">
        <p class="font-weight-bold text-body-1">{{ $t('fields.title') }}</p>
        <p class="text-body-1">{{ album.title }}</p>

        <p class="font-weight-bold text-body-1">{{ $t('fields.artist') }}</p>
        <p class="text-body-1">{{ album.artist }}</p>

        <p class="font-weight-bold text-body-1">{{ $t('fields.released.long') }}</p>
        <p class="text-body-1">{{ album.released }}</p>

        <p class="font-weight-bold text-body-1">{{ $t('fields.label') }}</p>
        <p class="text-body-1">{{ album.label }}</p>

        <p class="font-weight-bold text-body-1">{{ $t('fields.country') }}</p>
        <p class="text-body-1">{{ album.country }}</p>

        <p class="font-weight-bold text-body-1">{{ $t('fields.edition.long') }}</p>
        <p class="text-body-1">{{ album.edition }}</p>

        <p class="font-weight-bold text-body-1">{{ $t('fields.catalogNum.long') }}</p>
        <p class="text-body-1">{{ album.catalog_num }}</p>
      </div>
      <v-chip
        class="align-self-center mt-2"
        prepend-icon="mdi-check"
        color="success"
        v-if="album.owned"
      >
        En la colección
      </v-chip>
      <v-hover v-slot="{ isHovering, props }" v-else>
        <v-chip
          v-bind="props"
          class="align-self-center mt-2"
          :prepend-icon="isHovering ? 'mdi-check' : 'mdi-close'"
          :variant="isHovering ? 'tonal' : 'outlined'"
        >
          {{ isHovering ? 'Marcar como adquirido' : 'No adquirido' }}
        </v-chip>
      </v-hover>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'TopRSAlbumCard',
  props: {
    album: Object
  }
}
</script>

<style scoped>
.album-info-container {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 12px;
}

.album-info-container > p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.topPos {
  z-index: 10;
  position: absolute;
  top: 18px;
  left: 16px;
}
</style>
