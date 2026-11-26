<template>
  <v-layout>

    <v-flex text-xs-center>
     <v-text-field
        label="Query Search"
        placeholder="Start typing to Search"
        prepend-icon="search"
        v-model="query"
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
          <td class="text-xs-right">{{ item.inner_product }}</td>
          <td class="text-xs-right">{{ item.dice_coef }}</td>
          <td class="text-xs-right">{{ item.cosinus_measure }}</td>
          <td class="text-xs-right">{{ item.jaccard_coef }}</td>

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
      query: 'information',
      dialog: false,
      previewing: {},
      headers: [
        {
          text: 'Document',
          align: 'left',
          sortable: false,
          value: 'fileid'
        },
        { text: 'Inner Product', value: 'inner_product', align: 'right' },
        { text: 'Dice Coef', value: 'dice_coef', align: 'right' },
        { text: 'Cosinus Measure', value: 'cosinus_measure', align: 'right' },
        { text: 'Jaccard Coef', value: 'jaccard_coef', align: 'right' },
        { text: 'Preview', value: 'fielid', sortable: false, align: 'center' }
      ],
      // best match first
      pagination: { sortBy: 'cosinus_measure', descending: true, rowsPerPage: -1 },
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
      const results = await $backend.$vector(this.query)
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
