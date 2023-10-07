<template>
  <v-card elevation="2" variant="elevated" class="d-flex flex-column justify-space-between">
    <v-chip size="default" variant="tonal" color="primary" class="topPos font-weight-bold">
      {{ album[`topRS${topRSNumber}`] }}
    </v-chip>

    <div class="d-flex flex-column align-start">
      <v-card-title class="pb-0" style="width: calc(100% - 45px)"> {{ album.title }}</v-card-title>
      <v-card-subtitle> {{ album.artist }}</v-card-subtitle>

      <div class="my-4 align-self-center">
        <v-img :src="album.jacket" width="200" class="rounded" v-if="album.jacket" />
        <v-card
          flat
          color="blue-grey-lighten-5"
          width="200"
          height="200"
          class="d-flex align-center justify-center rounded"
          v-else
        >
          <v-icon icon="mdi-cancel" size="40"></v-icon>
        </v-card>
      </div>

      <v-card-text class="album-info-container py-0">
        <p class="section-title">{{ $t('fields.released.short') }}</p>
        <p>{{ album.released }}</p>

        <p class="section-title">{{ $t('fields.label') }}</p>
        <p>{{ album.label || '-' }}</p>

        <p class="section-title">{{ $t('fields.country') }}</p>
        <p>{{ album.country || '-' }}</p>

        <p class="section-title">{{ $t('fields.edition.short') }}</p>
        <p>{{ album.edition || '-' }}</p>

        <p class="section-title">{{ $t('fields.catalogNum.short') }}</p>
        <p>{{ album.catalog_num || '-' }}</p>
      </v-card-text>

      <v-chip
        class="align-self-center my-4"
        prepend-icon="mdi-check"
        color="success"
        :text="$t('controls.inLibrary')"
        v-if="album.owned"
      />
      <v-hover v-slot="{ isHovering, props }" v-else>
        <v-chip
          v-bind="props"
          class="align-self-center my-4"
          :prepend-icon="isHovering ? 'mdi-check' : 'mdi-close'"
          :text="$t(`controls.${isHovering ? 'markAsOwned' : 'notOwned'}`)"
          :variant="isHovering ? 'tonal' : 'outlined'"
        />
      </v-hover>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'TopRSAlbumCard',
  props: {
    album: Object,
    topRSNumber: Number
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

.section-title {
  font-weight: 600;
  justify-self: start;
}

.topPos {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 8px;
  right: 8px;
  min-width: 45px;
}
</style>
