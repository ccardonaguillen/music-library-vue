<template>
  <main>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="11">
          <v-switch v-model="hideOwned" color="primary" label="Ocultar adquiridos" />
          <div class="cards-container">
            <top-r-s-album-card :album="album" v-for="album in topRSAlbums" :key="album.id" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </main>
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
        // console.log(doc.data())
        this.topRSAlbums.push({ id: doc.id, ...doc.data() })
      })

      this.isFetching = false
    }
  },
  created() {
    console.log('creating')
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
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(550px, 1fr));
  column-gap: 32px;
  row-gap:;
}
</style>
