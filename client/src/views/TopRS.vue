<template>
  <v-col cols="11">
    <div class="topRS-header mb-4">
      <v-switch
        hide-details
        v-model="hideOwned"
        color="primary"
        label="Ocultar adquiridos"
        style="flex: 1"
      />
      <h2 style="justify-self: center">Top Rolling Stones {{ number }}</h2>
    </div>
    <div class="cards-container">
      <top-r-s-album-card :album="album" v-for="album in topRSAlbums" :key="album.id" />
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
  startAt,
  where
} from 'firebase/firestore'
import { mapState } from 'pinia'
import TopRSAlbumCard from '@/components/TopRSAlbumCard.vue'

export default {
  name: 'TopRS',
  components: { TopRSAlbumCard },
  props: {
    number: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      isFetching: false,
      hideOwned: false,
      topRSAlbums: []
    }
  },
  computed: {
    ...mapState(useUserStore, { userId: 'id' })
  },

  methods: {
    async fetchTopRS() {
      this.topRSAlbums = []
      if (!this.userId) return

      this.isFetching = true
      const libraryRef = collection(getFirestore(), this.userId)

      const filters = [where(`topRS${this.number}`, '!=', '')]
      if (this.hideOwned) filters.push(where('owned', '==', false))

      const q = query(
        libraryRef,
        ...filters,
        orderBy(`topRS${this.number}`, 'asc'),
        startAt((this.page - 1) * this.pageSize),
        limit(this.pageSize)
      )

      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        this.topRSAlbums.push({ id: doc.id, ...doc.data() })
      })

      this.isFetching = false
    }
  },
  created() {
    this.fetchTopRS()
  },
  watch: {
    userId() {
      this.fetchTopRS()
    },
    hideOwned() {
      this.fetchTopRS()
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
