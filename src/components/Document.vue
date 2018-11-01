<template>
  <div>
    <v-card>
      <v-card-text>
        <v-card-title>{{ doc.fileid }} length:  <v-badge color="secondary">{{ doc.sample.length }}</v-badge> </v-card-title>
        <p>{{ doc.sample }}</p>
      </v-card-text>

      <v-card-actions>
        <v-btn color="info" router to="/browser" round block>Show File Content</v-btn>
        <v-btn color="success" router to="/browser" round block>Statistics</v-btn>
      </v-card-actions>
    </v-card>
    <br/>
  </div>
</template>

<script>
export default {
  name: 'Document',
  data () {
    return {
      doc: {
        fileid: '',
        sample: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
