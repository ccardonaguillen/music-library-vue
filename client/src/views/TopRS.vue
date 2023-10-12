<template>
  <v-col cols="11">
    <div class="topRS-header mb-4">
      <v-switch
        hide-details
        v-model="hideOwned"
        color="primary"
        :label="$t('controls.hideOwned')"
        style="flex: 1"
      />
      <h2 style="justify-self: center">Top Rolling Stones {{ topRSNumber }}</h2>
    </div>
    <div class="cards-container">
      <top-r-s-album-card
        :album="album"
        :top-r-s-number="topRSNumber"
        v-for="(album, index) in topRSAlbums"
        :key="album.id"
        v-observe-visibility="{
          callback: (isVisible) => cardVisibilityChanged(isVisible, index),
          intersection: { threshold: 0.1 }
        }"
      />
    </div>
  </v-col>
</template>

<script>
import { useUserStore } from '@/stores/user'
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  where
} from 'firebase/firestore'
import { mapState } from 'pinia'
import TopRSAlbumCard from '@/components/TopRSAlbumCard.vue'

export default {
  name: 'TopRS',
  components: { TopRSAlbumCard },
  props: {
    topRSNumber: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      lastAlbum: null,
      pageSize: 5,
      isFetching: false,
      hideOwned: false,
      topRSAlbums: []
    }
  },
  computed: {
    ...mapState(useUserStore, { userId: 'id' })
  },

  methods: {
    clearAlbumList() {
      this.topRSAlbums = []
      this.lastAlbum = null
    },

    async fetchTopRS(clear = false) {
      if (!this.userId) return
      if (clear) this.clearAlbumList()

      this.isFetching = true
      const libraryRef = collection(getFirestore(), this.userId)

      const filters = [where(`topRS${this.topRSNumber}`, '!=', '')]
      if (this.hideOwned) filters.push(where('owned', '==', false))

      const q = query(
        libraryRef,
        ...filters,
        orderBy(`topRS${this.topRSNumber}`, 'asc'),
        startAfter(this.lastAlbum?.data()[`topRS${this.topRSNumber}`] ?? 0),
        limit(this.pageSize)
      )

      const querySnapshot = await getDocs(q)
      this.lastAlbum = querySnapshot.docs[querySnapshot.docs.length - 1]
      querySnapshot.forEach((doc) => {
        this.topRSAlbums.push({ id: doc.id, ...doc.data() })
      })

      this.isFetching = false
    },

    cardVisibilityChanged(isVisible, index) {
      if (index === this.topRSAlbums.length - 1 && isVisible) this.fetchTopRS()
    }
  },
  created() {
    this.fetchTopRS(false)
  },
  watch: {
    userId() {
      this.fetchTopRS(true)
    },
    hideOwned() {
      this.fetchTopRS(true)
    }
  }
}
</script>

<style scoped>
.topRS-header {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
}
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 32px;
}

@media screen and (max-width: 600px) {
  .topRS-header {
    grid-template-columns: 1fr;
  }
}
</style>
