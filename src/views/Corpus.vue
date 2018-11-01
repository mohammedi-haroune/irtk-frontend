<template>
  <v-container>
    <v-layout>
      <v-flex>
        <input
          type="file"
          multiple
        >
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Corpus',
  data () {
    return {
      file: ''
    }
  }
}
</script>

<style scoped>

</style>
