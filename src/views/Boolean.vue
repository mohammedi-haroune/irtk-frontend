<template>
  <v-layout>

    <v-flex text-xs-center>
      <v-text-field
        label="Boolean Query"
        placeholder="Start typing to Search"
        prepend-icon="search"
        v-model="query"
        @input="updateResults"
      ></v-text-field>

      <template v-if="!syntaxError">
        <v-layout row wrap>
          <template v-for="doc in documents">
            <v-flex :key="doc.fileid" ma-2 md5>
              <document :key="doc.fileid" :doc="doc"></document>
            </v-flex>
          </template>
        </v-layout>
      </template>

      <v-alert :value="syntaxError" icon="warning">
        Syntax Error, Please rewrite your query :(
      </v-alert>
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
      query: 'information',
      syntaxError: false,
      documents: [],
      // each keystroke sends a query; only the latest answer is shown
      lastRequest: 0
    }
  },
  mounted () {
    this.updateResults()
  },
  methods: {
    updateResults () {
      const request = ++this.lastRequest
      $backend.$boolean(this.query)
        .then(docs => {
          if (request !== this.lastRequest) return
          this.syntaxError = false
          this.documents = docs
        })
        .catch(() => {
          if (request !== this.lastRequest) return
          this.syntaxError = true
          this.documents = []
        })
    }
  }
}
</script>
