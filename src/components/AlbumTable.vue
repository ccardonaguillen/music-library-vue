<template>
  <v-data-table hover :headers="headers" :items="albums" class="table-striped">
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
              @click="editAlbum(item.index)"
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
      <v-btn
        variant="flat"
        density="compact"
        :icon="item.columns.owned ? 'mdi-check' : 'mdi-close'"
      />
    </template>
    <template v-slot:[`item.favorite`]="{ item }">
      <v-btn
        variant="flat"
        density="compact"
        :icon="item.columns.favorite ? 'mdi-star' : 'mdi-star-outline'"
      />
    </template>
  </v-data-table>
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
        { title: 'Released', align: 'center', sortable: true, key: 'released' },
        { title: 'Owned', align: 'center', sortable: false, key: 'owned' },
        { title: 'Favourite', align: 'center', sortable: false, key: 'favorite' }
      ]
    }
  },
  computed: {
    ...mapState(useLibraryStore, ['albums']),
    ...mapWritableState(useModalStore, ['album'])
  },
  methods: {
    ...mapActions(useLibraryStore, ['fetchLibrary', 'removeAlbum']),
    ...mapActions(useModalStore, ['openModal']),

    editAlbum(index) {
      this.album = this.albums[index]
      this.openModal()
    }
  }
}
</script>

<style scoped></style>
