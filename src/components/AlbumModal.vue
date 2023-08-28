<template>
  <v-dialog max-width="620" v-model="showModal">
    <v-card class="d-flex flex-column px-9 py-8">
      <v-btn
        elevation="0"
        density="comfortable"
        icon="mdi-close"
        class="close-btn"
        @click="closeModal"
      />
      <h2>New Album</h2>
      <p>Input the album info manually or load it from Discogs</p>
      <v-text-field
        label="Discogs ID"
        append-icon="mdi-cloud-search"
        variant="outlined"
        density="compact"
      />

      <v-form>
        <fieldset class="px-5 py-4">
          <legend class="px-1">General Info</legend>

          <div>
            <label>Title</label>
            <v-text-field variant="outlined" density="compact" placeholder="e.g. Revolver" />
          </div>
          <div>
            <label>Artist</label>
            <v-text-field variant="outlined" density="compact" placeholder="e.g. The Beatles" />
          </div>
          <div>
            <label>Release Year</label>
            <v-text-field variant="outlined" density="compact" placeholder="e.g. 1969" />
          </div>
          <div>
            <label>Genre</label>
            <v-select variant="outlined" density="compact" placeholder="Choose a genre" />
          </div>
          <v-container>
            <v-row no-gutters justify="space-around">
              <div>
                <label>Do you own a copy?</label>
                <v-radio-group inline hide-details class="mt-1">
                  <v-radio density="comfortable" label="Yes" class="mr-2" />
                  <v-radio density="comfortable" label="No" />
                </v-radio-group>
              </div>
              <div>
                <label>Mark as favourite?</label>
                <v-radio-group inline hide-details class="mt-1">
                  <v-radio density="comfortable" label="Yes" class="mr-2" />
                  <v-radio density="comfortable" label="No" />
                </v-radio-group>
              </div>
            </v-row>
          </v-container>
          <div>
            <label>Wikipedia Page</label>
            <v-text-field
              variant="outlined"
              density="compact"
              placeholder="es.wikipedia.org/wiki/..."
            />
          </div>
          <div>
            <label>Discogs Link</label>
            <v-text-field
              variant="outlined"
              density="compact"
              placeholder="www.discogs.com/release/..."
            />
          </div>
          <div>
            <label>Album Jacket</label>
            <v-text-field variant="outlined" density="compact" placeholder="" />
          </div>
        </fieldset>
        <fieldset class="px-5 py-4 mt-4">
          <legend class="px-1">Record Info</legend>

          <div>
            <label>Records Format(s)</label>
            <v-container>
              <v-row no-gutters>
                <v-col cols="6">
                  <v-checkbox density="compact" label="Vinyl" hide-details />
                </v-col>
                <v-col cols="6">
                  <v-checkbox density="compact" label="CD" hide-details />
                </v-col>
                <v-col cols="6">
                  <v-checkbox density="compact" label="Cassette" hide-details />
                </v-col>
                <v-col cols="6">
                  <v-checkbox density="compact" label="Other" hide-details />
                </v-col>
              </v-row>
            </v-container>
          </div>
          <div>
            <label>Album Format</label>
            <v-radio-group inline hide-details>
              <v-container class="px-3">
                <v-row no-gutters justify="start">
                  <v-col cols="5">
                    <v-radio label="EP (Extended Play)" />
                  </v-col>
                  <v-col cols="4">
                    <v-radio label="LP (Long Play)" />
                  </v-col>
                  <v-col cols="3">
                    <v-radio label="Single" />
                  </v-col>
                </v-row>
              </v-container>
            </v-radio-group>
          </div>
          <div>
            <label>Catalog Number</label>
            <v-text-field variant="outlined" density="compact" placeholder="e.g. 1C 072-04 097" />
          </div>
          <div>
            <label>Label</label>
            <v-text-field variant="outlined" density="compact" placeholder="e.g. Apple Records" />
          </div>
          <div>
            <label>Country</label>
            <v-text-field variant="outlined" density="compact" placeholder="e.g. Germany" />
          </div>
          <div>
            <label>Edition Year</label>
            <v-text-field variant="outlined" density="compact" placeholder="e.g. 1977" />
          </div>
          <div>
            <label>Matrix</label>
            <v-text-field
              variant="outlined"
              density="compact"
              placeholder="e.g. 04097-A-2 SHZE 186 A - X2"
            />
          </div>
          <v-container class="px-0">
            <v-row>
              <v-col>
                <label>Condition</label>
                <v-text-field variant="outlined" density="compact" placeholder="1-10" />
              </v-col>
              <v-col>
                <label>Disks</label>
                <v-text-field variant="outlined" density="compact" placeholder=">1" />
              </v-col>
            </v-row>
          </v-container>
          <div>
            <label>Notes</label>
            <v-text-field
              variant="outlined"
              density="compact"
              placeholder="Here goes any other info related to the record"
            />
          </div>
        </fieldset>
      </v-form>
      <div class="d-flex justify-space-evenly mt-8">
        <v-btn width="180" variant="outlined">Reset</v-btn>
        <v-btn width="180" color="primary">Submit</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AlbumModal',
  props: {
    modelValue: Boolean
  },
  data() {
    return {}
  },
  computed: {
    showModal: {
      get() {
        return this.modelValue
      },
      set(newVal) {
        this.$emit('update:modelValue', newVal)
      }
    }
  },
  methods: {
    closeModal() {
      this.showModal = false
    }
  }
}
</script>

<style scoped>
.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
