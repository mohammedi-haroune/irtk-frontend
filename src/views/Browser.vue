<template>
  <v-layout row wrap>
    <v-flex xs12>
      <h3> {{corpus.name}}</h3>
    </v-flex>
    <template v-for="doc in corpus.documents">
      <v-flex :key="doc.fileid" ma-2 md5>
        <document :key="doc.fileid" :doc="doc"> </document>
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
import Document from '../components/Document'
import $backend from '../backend'
export default {
  components: { Document },
  data () {
    return {
      corpus: {
        name: 'documents',
        readme: '',
        licence: '',
        documents: []
      }
    }
  },
  mounted () {
    this.getDocuments()
  },
  methods: {
    async getDocuments () {
      const docs = await $backend.$fetchDocuments()
      console.log(docs)
      this.corpus.documents = docs
    }
  }
}
</script>
