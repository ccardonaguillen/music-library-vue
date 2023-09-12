<template>
  <v-data-table-server
    v-model:page="page"
    v-model:items-per-page="pageSize"
    v-model:sort-by="sortBy"
    hover
    :headers="headers"
    :items="albums"
    :items-length="albumCount"
    :loading="isFetching"
    class="table-striped"
    @update:options="fetchLibrary"
  >
    <template v-slot:no-data>
      <span>
        There are currently no albums in your music library. Upload a collection from your computer
        or use the "New Album" button.
      </span>
    </template>
    <template v-slot:[`item.options`]="{ item }">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn variant="flat" density="compact" icon="mdi-dots-vertical" v-bind="props" />
        </template>
        <v-card>
          <v-list density="comfortable">
            <v-list-item
              prepend-icon="mdi-file-document-edit-outline"
              title="Edit Album"
              @click="onAlbumEdited(item.index)"
            />
            <v-list-item
              prepend-icon="mdi-file-document-remove-outline"
              title="Delete Album"
              @click="removeAlbum(item.value)"
            />
          </v-list>
        </v-card>
      </v-menu>
    </template>
    <template v-slot:[`item.owned`]="{ item }">
      <v-icon
        :icon="item.columns.owned ? 'mdi-check' : 'mdi-close'"
        class="table-icon"
        @click="editAlbum(item.value, { owned: !item.columns.owned })"
      />
    </template>
    <template v-slot:[`item.favorite`]="{ item }">
      <v-icon
        :icon="item.columns.favorite ? 'mdi-star' : 'mdi-star-outline'"
        class="table-icon"
        @click="editAlbum(item.value, { favorite: !item.columns.favorite })"
      />
    </template>
  </v-data-table-server>
</template>

<script>
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useLibraryStore } from '@/stores/library'
import { useModalStore } from '@/stores/modal'

export default {
  name: 'AlbumTable',
  emits: ['albumEdited'],
  data() {
    return {
      headers: [
        { title: '', align: 'start', sortable: false, key: 'options', width: '0px' },
        { title: 'Title', align: 'start', sortable: true, key: 'title' },
        { title: 'Artist', align: 'start', sortable: true, key: 'artist' },
        { title: 'Released', align: 'start', sortable: true, key: 'released' },
        { title: 'Owned', align: 'center', sortable: false, key: 'owned' },
        { title: 'Favourite', align: 'center', sortable: false, key: 'favorite' }
      ]
    }
  },
  computed: {
    ...mapState(useLibraryStore, ['albums', 'albumCount', 'isFetching']),
    ...mapWritableState(useLibraryStore, ['page', 'pageSize', 'sortBy']),
    ...mapWritableState(useModalStore, ['album'])
  },
  methods: {
    ...mapActions(useLibraryStore, ['fetchLibrary', 'removeAlbum', 'editAlbum']),
    ...mapActions(useModalStore, ['openModal']),

    onAlbumEdited(index) {
      this.album = { ...this.albums[index] }
      this.openModal()
    }
  }
}
</script>

<style scoped>
i.table-icon:hover {
  transform: scale(1.3);
  transition: all 0.1s ease-in;
}
</style>
