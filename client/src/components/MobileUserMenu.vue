<template>
  <v-navigation-drawer width="300" temporary v-model="show">
    <v-list>
      <v-list-item :title="username" :subtitle="email">
        <template v-slot:prepend>
          <v-avatar v-if="isUserSignedIn"> <v-img :src="profilePicture" /> </v-avatar>
        </template>
      </v-list-item>
    </v-list>
    <v-divider />

    <v-list>
      <v-list-item
        prepend-icon="mdi-home-account"
        :title="$t('header.home')"
        :to="{ name: 'home' }"
      />
      <v-list-item
        prepend-icon="mdi-format-list-bulleted"
        title="Top 500 RS 1"
        :to="{ name: 'topRS1' }"
      />
      <v-list-item
        prepend-icon="mdi-format-list-bulleted"
        title="Top 500 RS 3"
        :to="{ name: 'topRS3' }"
      />
    </v-list>
    <v-divider />
    <v-list>
      <v-list-item :title="$t('controls.language')">
        <template v-slot:append>
          <v-btn-toggle
            v-model="$i18n.locale"
            color="deep-purple-accent-3"
            density="compact"
            class="d-flex align-center"
          >
            <v-btn value="en" height="28" variant="outlined" size="x-small">
              <v-img width="20" :src="langFlags.en" />
            </v-btn>
            <v-btn value="es" height="28" variant="outlined" size="x-small">
              <v-img width="20" :src="langFlags.es" />
            </v-btn>
          </v-btn-toggle>
        </template>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn
          block
          :text="$t('controls.logout')"
          prepend-icon="mdi-power"
          color="primary"
          @click="logOutUser"
        />
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import esFlag from '@/assets/flags/es.svg'
import gbFlag from '@/assets/flags/gb.svg'
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  name: 'MobileUserMenu',
  props: {
    modelValue: Boolean
  },
  data() {
    return {
      langFlags: { es: esFlag, en: gbFlag }
    }
  },
  computed: {
    ...mapState(useUserStore, ['id', 'username', 'email', 'profilePicture', 'isUserSignedIn']),

    show: {
      get() {
        return this.modelValue
      },
      set(value) {
        return this.$emit('update:modelValue', value)
      }
    }
  },
  methods: {
    ...mapActions(useUserStore, ['signIn', 'logOutUser'])
  }
}
</script>

<style scoped></style>
