<template>
  <v-card>
    <v-card-title primary-title class="headline">
          {{ doc.fileid | removeExtension}}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      {{ doc.sample }}
    </v-card-text>

    <v-card-actions>
      <v-btn color="info" round block>Show File Content</v-btn>
      <v-btn color="success" round block>Statistics</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Document',
  props: {
    doc: Object
  },
  filters: {
    removeExtension (fileid) {
      return fileid
    }
  }
}
</script>

<style scoped>

</style>
