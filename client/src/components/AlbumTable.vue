<template>
  <v-data-table-virtual
    v-model:sort-by="sortBy"
    v-model:expanded="expandedRow"
    hover
    :headers="dynamicHeaders"
    :items="albums"
    :loading="isFetching"
    :loading-text="$t('table.loading')"
    class="table-striped"
    @update:sortBy="() => fetchLibrary()"
    @click:row="handleExpandRow"
  >
    <template v-slot:no-data>
      <div class="d-flex flex-column align-center mt-4 mb-8" v-if="!isUserSignedIn">
        {{ $t('table.notLogged') }}
        <v-btn
          color="primary"
          :text="$t('controls.googleSignIn')"
          prepend-icon="mdi-google"
          class="mt-4"
          @click="signIn"
        />
      </div>
      <div class="d-flex flex-column align-center mt-4 mb-8" v-else-if="!albumCount">
        {{ $t('table.noAlbums') }}
        <div class="d-flex mt-4" style="gap: 12px">
          <v-btn
            color="primary"
            :text="$t('controls.uploadLibrary')"
            prepend-icon="mdi-album"
            @click="$refs.importLibrary.click()"
          />
          <input
            type="file"
            ref="importLibrary"
            style="display: none"
            @change="onLibraryUploaded"
          />

          <v-btn
            color="primary"
            :text="$t('controls.newAlbum')"
            prepend-icon="mdi-plus"
            @click="openModal"
          />
        </div>
      </div>
      <div class="mt-4 mb-8" v-else>No albums found that match the current filters</div>
    </template>

    <template v-slot:[`item.title`]="{ item, index }">
      <span v-observe-visibility="(isVisible) => albumVisibilityChanged(isVisible, index)">{{
        item.title
      }}</span>
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
              :title="$t('optionsModal.edit')"
              @click="onAlbumEdited(item)"
            />
            <v-list-item
              prepend-icon="mdi-file-document-remove-outline"
              :title="$t('optionsModal.delete')"
              @click="removeAlbum(item.id)"
            />
          </v-list>
        </v-card>
      </v-menu>
    </template>
    <template v-slot:[`item.owned`]="{ item }">
      <v-icon
        :icon="item.owned ? 'mdi-check' : 'mdi-close'"
        class="table-icon"
        @click="editAlbum(item.id, { owned: !item.owned })"
      />
    </template>
    <template v-slot:[`item.favorite`]="{ item }">
      <v-icon
        :icon="item.favorite ? 'mdi-star' : 'mdi-star-outline'"
        class="table-icon"
        @click="editAlbum(item.id, { favorite: !item.favorite })"
      />
    </template>
    <template v-slot:expanded-row="{ item: album, columns }">
      <tr>
        <td :colspan="columns.length">
          <expanded-row :album="album" class="mb-2" />
        </td>
      </tr>
    </template>
  </v-data-table-virtual>
</template>

<script>
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useLibraryStore } from '@/stores/library'
import { useModalStore } from '@/stores/modal'
import { useUserStore } from '@/stores/user'
import ExpandedRow from '@/components/ExpandedRow.vue'

export default {
  name: 'AlbumTable',
  components: { ExpandedRow },
  emits: ['albumEdited'],
  data() {
    return {
      expandedRow: [],
      headers: [
        {
          title: this.$t('fields.title'),
          align: 'start',
          sortable: true,
          key: 'title',
          width: '45%'
        },
        {
          title: this.$t('fields.artist'),
          align: 'start',
          sortable: true,
          key: 'artist',
          width: '25%'
        },
        {
          title: this.$t('fields.released.short'),
          align: 'start',
          sortable: true,
          key: 'released',
          width: '10%'
        }
      ]
    }
  },
  computed: {
    ...mapState(useUserStore, ['isUserSignedIn']),
    ...mapState(useLibraryStore, ['albums', 'albumCount', 'shownAlbumCount', 'isFetching']),
    ...mapWritableState(useLibraryStore, ['sortBy']),
    ...mapWritableState(useModalStore, ['album']),

    dynamicHeaders() {
      const albumOptionColumn = {
        title: '',
        align: 'start',
        sortable: false,
        key: 'options',
        width: '0px'
      }

      const desktopColumns = [
        {
          title: this.$t('fields.owned'),
          align: 'center',
          sortable: false,
          key: 'owned',
          width: '10%'
        },
        {
          title: this.$t('fields.favorite'),
          align: 'center',
          sortable: false,
          key: 'favorite',
          width: '10%'
        }
      ]

      if (this.$vuetify.display.mdAndUp)
        return [albumOptionColumn, ...this.headers, ...desktopColumns]
      else return this.headers
    }
  },
  methods: {
    ...mapActions(useUserStore, ['signIn']),
    ...mapActions(useLibraryStore, ['fetchLibrary', 'removeAlbum', 'editAlbum', 'uploadLibrary']),
    ...mapActions(useModalStore, ['openModal']),

    onAlbumEdited(album) {
      this.album = { ...album }
      this.openModal()
    },

    onLibraryUploaded(e) {
      const fileInput = e.target

      let reader = new FileReader()
      reader.onload = this.uploadLibrary
      reader.readAsText(fileInput.files[0], 'utf-8')
    },

    handleExpandRow(event, { item }) {
      this.expandedRow = this.expandedRow.includes(item.id) ? [] : [item.id]
    },

    albumVisibilityChanged(isVisible, index) {
      if (index === this.shownAlbumCount - 1 && isVisible) this.fetchLibrary(true)
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
