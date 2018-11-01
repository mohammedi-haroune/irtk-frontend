<template>
  <v-layout>
    <v-flex text-xs-center>
        <document v-for="doc in corpus.documents" :key="doc.fileid" :doc="doc"> </document>
    </v-flex>
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
        documents: $backend.$fetchDocuments()
      }
    }
  }
}
</script>
