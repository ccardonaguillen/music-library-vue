<template>
  <v-dialog max-width="620" :model-value="showModal" @update:model-value="onShowModalChanged">
    <v-card class="d-flex flex-column px-9 py-8">
      <v-btn
        variant="flat"
        density="comfortable"
        icon="mdi-close"
        class="close-btn"
        @click="closeModal"
      />
      <h2>{{ isEditing ? 'Edit Album' : 'New Album' }}</h2>
      <p>Input the album info manually or load it from Discogs</p>
      <v-text-field
        v-model="discogsId"
        label="Discogs release ID"
        append-inner-icon="mdi-cloud-search"
        variant="outlined"
        density="compact"
        @click:append-inner="fetchAlbum"
      />

      <v-form>
        <fieldset class="px-5 py-4">
          <legend class="px-1">General Info</legend>

          <div>
            <label>Title</label>
            <v-text-field
              v-model="album.title"
              variant="outlined"
              density="compact"
              placeholder="e.g. Revolver"
            />
          </div>
          <div>
            <label>Artist</label>
            <v-text-field
              v-model="album.artist"
              variant="outlined"
              density="compact"
              placeholder="e.g. The Beatles"
            />
          </div>
          <div>
            <label>Release Year</label>
            <v-text-field
              v-model="album.released"
              variant="outlined"
              density="compact"
              placeholder="e.g. 1969"
            />
          </div>
          <div>
            <label>Genre</label>
            <v-select
              v-model="album.genre"
              variant="outlined"
              density="compact"
              placeholder="Choose a genre"
            />
          </div>

          <v-container>
            <v-row no-gutters justify="space-around">
              <div>
                <label>Do you own a copy?</label>
                <v-radio-group v-model="album.owned" inline hide-details class="mt-1">
                  <v-radio density="comfortable" label="Yes" class="mr-2" :value="true" />
                  <v-radio density="comfortable" label="No" :value="false" />
                </v-radio-group>
              </div>
              <div>
                <label>Mark as favorite?</label>
                <v-radio-group v-model="album.favorite" inline hide-details class="mt-1">
                  <v-radio density="comfortable" label="Yes" class="mr-2" :value="true" />
                  <v-radio density="comfortable" label="No" :value="false" />
                </v-radio-group>
              </div>
            </v-row>
          </v-container>
          <v-container class="px-0">
            <v-row>
              <v-col>
                <label>Top 500 (RS1)</label>
                <v-text-field
                  v-model="album.topRS1"
                  variant="outlined"
                  density="compact"
                  placeholder="1-500"
                />
              </v-col>
              <v-col>
                <label>Top 500 (RS3)</label>
                <v-text-field
                  v-model="album.topRS3"
                  variant="outlined"
                  density="compact"
                  placeholder="1-500"
                />
              </v-col>
            </v-row>
          </v-container>

          <div>
            <label>Wikipedia Page</label>
            <v-text-field
              v-model="album.wikipedia"
              variant="outlined"
              density="compact"
              placeholder="es.wikipedia.org/wiki/..."
            />
          </div>
          <div>
            <label>Discogs Link</label>
            <v-text-field
              v-model="album.discogs"
              variant="outlined"
              density="compact"
              placeholder="www.discogs.com/release/..."
            />
          </div>
          <div>
            <label>Album Jacket</label>
            <v-text-field
              v-model="album.jacket"
              variant="outlined"
              density="compact"
              placeholder=""
            />
          </div>
        </fieldset>
        <fieldset class="px-5 py-4 mt-4">
          <legend class="px-1">Record Info</legend>

          <div>
            <label>Records Format(s)</label>
            <v-container>
              <v-row no-gutters>
                <v-col cols="6">
                  <v-checkbox
                    v-model="album.record_format"
                    density="compact"
                    label="Vinyl"
                    value="vinyl"
                    hide-details
                  />
                </v-col>
                <v-col cols="6">
                  <v-checkbox
                    v-model="album.record_format"
                    density="compact"
                    label="CD"
                    value="cd"
                    hide-details
                  />
                </v-col>
                <v-col cols="6">
                  <v-checkbox
                    v-model="album.record_format"
                    density="compact"
                    label="Cassette"
                    value="cassette"
                    hide-details
                  />
                </v-col>
                <v-col cols="6">
                  <v-checkbox
                    v-model="album.record_format"
                    density="compact"
                    label="Other"
                    value="other"
                    hide-details
                  />
                </v-col>
              </v-row>
            </v-container>
          </div>
          <div>
            <label>Album Format</label>
            <v-radio-group v-model="album.album_format" inline hide-details>
              <v-container class="px-3">
                <v-row no-gutters justify="start">
                  <v-col cols="5">
                    <v-radio label="EP (Extended Play)" value="ep" />
                  </v-col>
                  <v-col cols="4">
                    <v-radio label="LP (Long Play)" value="lp" />
                  </v-col>
                  <v-col cols="3">
                    <v-radio label="Single" value="single" />
                  </v-col>
                </v-row>
              </v-container>
            </v-radio-group>
          </div>
          <div>
            <label>Catalog Number</label>
            <v-text-field
              v-model="album.catalog_num"
              variant="outlined"
              density="compact"
              placeholder="e.g. 1C 072-04 097"
            />
          </div>
          <div>
            <label>Label</label>
            <v-text-field
              v-model="album.label"
              variant="outlined"
              density="compact"
              placeholder="e.g. Apple Records"
            />
          </div>
          <div>
            <label>Country</label>
            <v-text-field
              v-model="album.country"
              variant="outlined"
              density="compact"
              placeholder="e.g. Germany"
            />
          </div>
          <div>
            <label>Edition Year</label>
            <v-text-field
              v-model="album.edition"
              variant="outlined"
              density="compact"
              placeholder="e.g. 1977"
            />
          </div>
          <div>
            <label>Matrix</label>
            <v-text-field
              v-model="album.matrix"
              variant="outlined"
              density="compact"
              placeholder="e.g. 04097-A-2 SHZE 186 A - X2"
            />
          </div>
          <v-container class="px-0">
            <v-row>
              <v-col>
                <label>Condition</label>
                <v-text-field
                  v-model="album.condition"
                  variant="outlined"
                  density="compact"
                  placeholder="1-10"
                />
              </v-col>
              <v-col>
                <label>Disks</label>
                <v-text-field
                  v-model="album.nDisks"
                  variant="outlined"
                  density="compact"
                  placeholder=">1"
                />
              </v-col>
            </v-row>
          </v-container>
          <div>
            <label>Notes</label>
            <v-text-field
              v-model="album.notes"
              variant="outlined"
              density="compact"
              placeholder="Here goes any other info related to the record"
            />
          </div>
        </fieldset>
      </v-form>
      <div class="d-flex justify-space-evenly mt-8">
        <v-btn width="180" variant="outlined">Reset</v-btn>
        <v-btn width="180" color="primary" @click="submitAlbum">Submit</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { fetchRelease } from '@/utils/discogs'
import { mapActions, mapState } from 'pinia'
import { useLibraryStore } from '@/stores/library'
import { useModalStore } from '@/stores/modal'

export default {
  name: 'AlbumModal',
  data() {
    return {
      discogsId: null
    }
  },
  computed: {
    ...mapState(useModalStore, {
      album: 'album',
      showModal: 'show'
    }),

    isEditing() {
      return !!this.album.id
    }
  },
  methods: {
    ...mapActions(useLibraryStore, ['addAlbum', 'editAlbum']),
    ...mapActions(useModalStore, ['closeModal']),

    onShowModalChanged(show) {
      if (!show) this.closeModal()
    },

    async fetchAlbum() {
      const album = await fetchRelease(this.discogsId)
      if (album) this.album = album
    },

    async submitAlbum() {
      if (this.isEditing) {
        const { id, ...albumInfo } = this.album
        await this.onAlbumEdited(id, albumInfo)
      } else await this.addAlbum(this.album)

      await this.closeModal()
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
