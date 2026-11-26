<template>
  <v-layout>

    <v-flex text-xs-center>
     <v-text-field
        label="Term Search"
        placeholder="Start typing to Search"
        prepend-icon="search"
        v-model="term"
        @input="updateResults"
      ></v-text-field>

      <v-data-table
        :headers="headers"
        :items="results"
        item-key="fileid"
        :pagination.sync="pagination"
        hide-actions
        expand
      >
        <template slot="items" slot-scope="{ item }">
          <td>{{ item.fileid }}</td>
          <td class="text-xs-right">{{ item.freq }}</td>
          <td class="text-xs-right">{{ item.tf_idf }}</td>

          <td>
            <v-btn @click.stop="preview(item.fileid)" color="success" flat>Preview</v-btn>
          </td>
        </template>

        <template slot="no-data">
          <v-alert :value="true" icon="warning">
            Sorry, nothing to display here :(
          </v-alert>
        </template>
      </v-data-table>

      <v-dialog v-model="dialog" max-width="500px">
        <document :doc="previewing"></document>
      </v-dialog>
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
      term: 'information',
      dialog: false,
      previewing: {},
      headers: [
        {
          text: 'Document',
          align: 'left',
          sortable: false,
          value: 'fileid'
        },
        { text: 'Frequency', value: 'freq', align: 'right' },
        { text: 'TF_IDF', value: 'tf_idf', align: 'right' },
        { text: 'Preview', value: 'fielid', sortable: false, align: 'center' }
      ],
      // best match first
      pagination: { sortBy: 'tf_idf', descending: true, rowsPerPage: -1 },
      results: [],
      // each keystroke sends a query; only the latest answer is shown
      lastRequest: 0
    }
  },
  mounted () {
    this.updateResults()
  },
  methods: {
    async updateResults () {
      const request = ++this.lastRequest
      const results = await $backend.$find(this.term)
      if (request === this.lastRequest) this.results = results
    },
    async preview (fileid) {
      const docs = await $backend.$fetchDocuments()
      this.previewing = docs.find(d => {
        return d.fileid === fileid
      })
      this.dialog = true
    }
  }
}
</script>
