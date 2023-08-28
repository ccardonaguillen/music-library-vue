<template>
  <p>No albums in the library. Add one by clicking the button</p>
  <div class="d-flex align-center" style="gap: 16px">
    <div class="d-flex align-end" style="gap: 16px">
      <label class="mb-1">Filter by</label>
      <v-select
        v-model="selectedOption"
        :items="filterOptions"
        item-title="label"
        return-object
        hide-details
        density="compact"
        variant="underlined"
        :menu-icon="null"
      />
    </div>
    <v-text-field
      hide-details
      :placeholder="`e.g. ${selectedOption?.placeholder}`"
      variant="outlined"
      density="compact"
    />
    <v-btn variant="outlined">Apply filter</v-btn>
    <v-spacer />
    <v-btn
      size="large"
      prepend-icon="mdi-plus"
      color="primary"
      @click="$emit('newAlbumBtnClicked')"
    >
      New Album
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'AlbumFilter',
  emits: ['newAlbumBtnClicked'],
  data() {
    return {
      selectedOption: null,
      filterOptions: [
        { name: 'title', label: 'Title', placeholder: 'submarine' },
        { name: 'artist', label: 'Artist', placeholder: '"zeppelin", "beatles, rolling"' },
        {
          name: 'released',
          label: 'Release date',
          placeholder: '"1990", "1-2000", ">1900", "<1980"'
        },
        { name: 'owned', label: 'Owned', placeholder: '"true", "no", "not owned"' }
      ]
    }
  },
  mounted() {
    this.selectedOption = this.filterOptions[0]
  }
}
</script>

<style scoped></style>
