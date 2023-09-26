<template>
  <v-menu>
    <template v-slot:activator="{ on }">
      <v-chip variant="outlined" v-on="on">
        Testing
        <v-icon icon="mdi-chevron-down" />
      </v-chip>
    </template>
  </v-menu>
</template>

<script>
export default {
  name: 'PillSelect'
}
</script>

<style scoped></style>