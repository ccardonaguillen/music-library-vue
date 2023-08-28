<template>
  <v-data-table :headers="headers" :items="mockData" class="table-striped">
    <template v-slot:no-data>
      <span>
        There are currently no albums in your music library. Upload a collection from your computer
        or use the "New Album" button.
      </span>
    </template>
    <template v-slot:[`item.options`]="{}">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn elevation="0" density="compact" icon="mdi-dots-vertical" v-bind="props" />
        </template>
        <v-card>
          <v-list density="comfortable">
            <v-list-item prepend-icon="mdi-file-document-edit-outline" title="Edit Album" />
            <v-list-item prepend-icon="mdi-file-document-remove-outline" title="Edit Album" />
          </v-list>
        </v-card>
      </v-menu>
    </template>
    <template v-slot:[`item.owned`]="{ item }">
      <v-icon :icon="item.columns.owned ? 'mdi-check' : 'mdi-close'" />
    </template>
    <template v-slot:[`item.favorite`]="{ item }">
      <v-icon :icon="item.columns.favorite ? 'mdi-star' : 'mdi-star-outline'" />
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'AlbumTable',
  data() {
    return {
      headers: [
        { title: '', align: 'start', sortable: false, key: 'options', width: '0px' },
        { title: 'Title', align: 'start', sortable: true, key: 'title' },
        { title: 'Artist', align: 'start', sortable: true, key: 'artist' },
        { title: 'Released', align: 'center', sortable: true, key: 'released' },
        { title: 'Owned', align: 'center', sortable: false, key: 'owned' },
        { title: 'Favourite', align: 'center', sortable: false, key: 'favorite' }
      ],

      mockData: [
        { title: 'Test1', artist: 'Test1', released: 1988, owned: true, favorite: false },
        { title: 'Test2', artist: 'Test2', released: 2013, owned: false, favorite: true },
        { title: 'Test3', artist: 'Test3', released: 1932, owned: false, favorite: false },
        { title: 'Test4', artist: 'Test4', released: 1978, owned: true, favorite: true },
        { title: 'Tes5', artist: 'Test5', released: 2000, owned: true, favorite: false }
      ]
    }
  }
}
</script>

<style scoped></style>
