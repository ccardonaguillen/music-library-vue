<template>
  <v-dialog
    :fullscreen="$vuetify.display.xs"
    max-width="620"
    :model-value="show"
    @update:model-value="onShowModalChanged"
  >
    <v-card class="d-flex flex-column px-4 py-8 px-md-9 py-md-8">
      <v-btn
        variant="flat"
        density="comfortable"
        icon="mdi-close"
        class="close-btn"
        @click="closeModal"
      />
      <h2 class="mb-3">{{ $t(`albumModal.title.${isEditing ? 'edit' : 'new'}`) }}</h2>
      <p class="mb-1">{{ $t('albumModal.hero') }}</p>
      <v-text-field
        v-model="discogsId"
        :label="$t('albumModal.placeholders.discogs')"
        append-inner-icon="mdi-cloud-search"
        variant="outlined"
        density="compact"
        hide-details
        class="mb-2 mb-sm-8"
        @click:append-inner="fetchAlbum"
      />

      <v-form>
        <component :is="$vuetify.display.xs ? 'div' : 'fieldset'" class="pa-0 px-sm-5 py-sm-4">
          <h3 class="text-decoration-underline sticky-header" v-if="$vuetify.display.xs">
            {{ $t('albumModal.fieldsets.general') }}
          </h3>
          <legend class="px-1" v-else>
            {{ $t('albumModal.fieldsets.general') }}
          </legend>

          <div>
            <label>{{ this.$t('fields.title') }}</label>
            <v-text-field
              v-model="album.title"
              variant="outlined"
              density="compact"
              :placeholder="`${$t('common.exampleAbbr')}Revolver`"
            />
          </div>
          <div>
            <label>{{ this.$t('fields.artist') }}</label>
            <v-combobox
              v-model="album.artist"
              variant="outlined"
              density="compact"
              :items="artists"
              :placeholder="`${$t('common.exampleAbbr')}The Beatles`"
            />
          </div>
          <div>
            <label>{{ this.$t('fields.released.long') }}</label>
            <v-text-field
              v-model.number="album.released"
              variant="outlined"
              density="compact"
              type="number"
              :placeholder="`${$t('common.exampleAbbr')}1969`"
            />
          </div>
          <div>
            <label>{{ this.$t('fields.genre') }}</label>
            <v-select
              v-model="album.genre"
              variant="outlined"
              density="compact"
              multiple
              :items="genreSelectItems"
              :placeholder="$t('albumModal.placeholders.genre')"
            />
          </div>

          <v-container>
            <v-row no-gutters :justify="$vuetify.display.xs ? 'space-between' : 'space-around'">
              <div>
                <label>{{ $t('albumModal.labels.owned') }}</label>
                <v-radio-group
                  v-model="album.owned"
                  :value="false"
                  inline
                  hide-details
                  class="mt-1"
                >
                  <v-radio
                    density="comfortable"
                    :label="$t('common.yes')"
                    class="mr-2"
                    :value="true"
                  />
                  <v-radio density="comfortable" :label="$t('common.no')" :value="false" />
                </v-radio-group>
              </div>
              <div>
                <label>{{ $t('albumModal.labels.favorite') }}</label>
                <v-radio-group
                  v-model="album.favorite"
                  :value="false"
                  inline
                  hide-details
                  class="mt-1"
                >
                  <v-radio
                    density="comfortable"
                    :label="$t('common.yes')"
                    class="mr-2"
                    :value="true"
                  />
                  <v-radio density="comfortable" :label="$t('common.no')" :value="false" />
                </v-radio-group>
              </div>
            </v-row>
          </v-container>
          <v-container class="px-0">
            <v-row>
              <v-col>
                <label>Top 500 (RS1)</label>
                <v-text-field
                  v-model.number="album.topRS1"
                  variant="outlined"
                  density="compact"
                  placeholder="1-500"
                  type="number"
                />
              </v-col>
              <v-col>
                <label>Top 500 (RS3)</label>
                <v-text-field
                  v-model.number="album.topRS3"
                  variant="outlined"
                  density="compact"
                  placeholder="1-500"
                  type="number"
                />
              </v-col>
            </v-row>
          </v-container>

          <div>
            <label>{{ this.$t('fields.wikipedia') }}</label>
            <v-text-field
              v-model="album.wikipedia"
              variant="outlined"
              density="compact"
              placeholder="es.wikipedia.org/wiki/..."
            />
          </div>
          <div>
            <label>{{ this.$t('fields.discogs') }}</label>
            <v-text-field
              v-model="album.discogs"
              variant="outlined"
              density="compact"
              placeholder="www.discogs.com/release/..."
            />
          </div>
          <div>
            <label>{{ this.$t('fields.jacket') }}</label>
            <v-text-field
              v-model="album.jacket"
              variant="outlined"
              density="compact"
              placeholder=""
            />
          </div>
        </component>
        <component
          :is="$vuetify.display.xs ? 'div' : 'fieldset'"
          class="pa-0 px-sm-5 py-sm-4 mt-sm-4"
          v-if="album.owned"
        >
          <h3 class="text-decoration-underline sticky-header" v-if="$vuetify.display.xs">
            {{ $t('albumModal.fieldsets.record') }}
          </h3>
          <legend class="px-1" v-else>
            {{ $t('albumModal.fieldsets.record') }}
          </legend>

          <div>
            <label>{{ $t('fields.recordFormat') }}</label>
            <v-container class="pt-0">
              <v-row no-gutters>
                <v-col cols="6">
                  <v-checkbox
                    v-model="album.record_format"
                    density="compact"
                    :label="this.$t('fields.recordFormatOptions.vinyl')"
                    value="vinyl"
                    hide-details
                  />
                </v-col>
                <v-col cols="6">
                  <v-checkbox
                    v-model="album.record_format"
                    density="compact"
                    :label="this.$t('fields.recordFormatOptions.cd')"
                    value="cd"
                    hide-details
                  />
                </v-col>
                <v-col cols="6">
                  <v-checkbox
                    v-model="album.record_format"
                    density="compact"
                    :label="this.$t('fields.recordFormatOptions.cassette')"
                    value="cassette"
                    hide-details
                  />
                </v-col>
                <v-col cols="6">
                  <v-checkbox
                    v-model="album.record_format"
                    density="compact"
                    :label="this.$t('fields.recordFormatOptions.other')"
                    value="other"
                    hide-details
                  />
                </v-col>
              </v-row>
            </v-container>
          </div>
          <div>
            <label>{{ $t('fields.albumFormat') }}</label>
            <v-radio-group
              v-model="album.album_format"
              :inline="$vuetify.display.smAndUp"
              hide-details
              class="album-format-container px-3 pb-4"
            >
              <v-radio label="EP (Extended Play)" value="ep" />
              <v-radio label="LP (Long Play)" value="lp" />
              <v-radio label="Single" value="single" />
            </v-radio-group>
          </div>
          <div>
            <label>{{ this.$t('fields.catalogNum.long') }}</label>
            <v-text-field
              v-model="album.catalog_num"
              variant="outlined"
              density="compact"
              :placeholder="`${$t('common.exampleAbbr')}1C 072-04 097`"
            />
          </div>
          <div>
            <label>{{ this.$t('fields.label') }}</label>
            <v-text-field
              v-model="album.label"
              variant="outlined"
              density="compact"
              :placeholder="`${$t('common.exampleAbbr')}Apple Records`"
            />
          </div>
          <div>
            <label>{{ this.$t('fields.country') }}</label>
            <v-text-field
              v-model="album.country"
              variant="outlined"
              density="compact"
              :placeholder="`${$t('common.exampleAbbr')}Germany`"
            />
          </div>
          <div>
            <label>{{ this.$t('fields.edition.long') }}</label>
            <v-text-field
              v-model.number="album.edition"
              variant="outlined"
              density="compact"
              type="number"
              :placeholder="`${$t('common.exampleAbbr')}1977`"
            />
          </div>
          <div>
            <label>{{ this.$t('fields.matrix') }}</label>
            <v-text-field
              v-model="album.matrix"
              variant="outlined"
              density="compact"
              :placeholder="`${$t('common.exampleAbbr')}04097-A-2 SHZE 186 A - X2`"
            />
          </div>
          <v-container class="px-0">
            <v-row>
              <v-col>
                <label>{{ this.$t('fields.condition') }}</label>
                <v-text-field
                  v-model.number="album.condition"
                  variant="outlined"
                  density="compact"
                  placeholder="1-10"
                  type="number"
                />
              </v-col>
              <v-col>
                <label>{{ this.$t('fields.nDisk') }}</label>
                <v-text-field
                  v-model.number="album.nDisks"
                  variant="outlined"
                  density="compact"
                  placeholder=">1"
                  type="number"
                />
              </v-col>
            </v-row>
          </v-container>
          <div>
            <label>{{ this.$t('fields.notes') }}</label>
            <v-text-field
              v-model="album.notes"
              variant="outlined"
              density="compact"
              :placeholder="$t('albumModal.placeholders.notes')"
            />
          </div>
        </component>
      </v-form>
      <div
        class="d-flex flex-column-reverse flex-sm-row justify-space-evenly mt-8 button-container"
      >
        <v-btn :width="$vuetify.display.xs ? '100%' : 180" variant="outlined">
          {{ $t(`albumModal.buttons.${isEditing ? 'cancel' : 'reset'}`) }}
        </v-btn>
        <v-btn :width="$vuetify.display.xs ? '100%' : 180" color="primary" @click="submitAlbum">
          {{ $t('albumModal.buttons.submit') }}
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { fetchRelease } from '@/utils/discogs'
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useLibraryStore } from '@/stores/library'
import { useModalStore } from '@/stores/modal'

export default {
  name: 'AlbumModal',
  data() {
    return {
      discogsId: null,
      genres: [
        'rock',
        'electronic',
        'pop',
        'folk',
        'jazz',
        'funk',
        'classical',
        'hipHop',
        'latin',
        'stage',
        'reggae',
        'nonMusic',
        'children',
        'military'
      ]
    }
  },
  computed: {
    ...mapState(useModalStore, ['show']),
    ...mapWritableState(useModalStore, ['album']),
    ...mapState(useLibraryStore, ['artists']),

    isEditing() {
      return !!this.album.id
    },

    genreSelectItems() {
      return this.genres.map((genre) => ({
        title: this.$t(`fields.genreOptions.${genre}`),
        value: genre
      }))
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
      if (album) this.album = { ...this.album, ...album }
    },

    correctAlbumInputTypes() {
      const intFields = ['released', 'topRS1', 'topRS3', 'condition', 'nDisks']
      const parseIntFields = intFields.reduce(
        (info, field) => ({
          ...info,
          [field]: isNaN(parseInt(this.album[field])) ? null : parseInt(this.album[field])
        }),
        {}
      )

      return { ...this.album, ...parseIntFields }
    },

    submitAlbum() {
      const album = this.correctAlbumInputTypes(this.album)
      const { id, ...albumInfo } = album

      if (this.isEditing) {
        this.editAlbum(id, albumInfo)
      } else this.addAlbum(albumInfo)

      this.closeModal()
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        if (this.album.discogs) {
          const regex = /^https:\/\/www.discogs.com\/es\/release\/(\d+)/
          const match = this.album.discogs.match(regex)
          this.discogsId = match[1]
        }
      }
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

@media screen and (max-width: 600px) {
  .close-btn {
    position: fixed;
    top: 8px;
    right: 8px;
    z-index: 10;
  }

  .button-container {
    background-color: white;
    row-gap: 16px;
    position: fixed;
    left: 0;
    bottom: 0px;
    padding: 16px 16px 32px;
    width: 100vw;
  }

  .sticky-header {
    position: sticky;
    top: -32px;
    padding-top: 20px;
    padding-bottom: 4px;
    margin-bottom: 12px;
    background-color: white;
    z-index: 5;
  }
}
</style>
