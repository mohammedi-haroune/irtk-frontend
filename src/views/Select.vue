<template>
  <v-layout keep-alive row fluid wrap>
    <v-expansion-panel :value="this.selected === null ? 1 : 1">
      <v-expansion-panel-content ripple>
        <p slot="header" class="headline">
          Selected Corpora
        </p>
      <v-flex ma-2 xs12 v-if="selected">
        <v-card>
          <v-list>
            <v-list-tile
              v-for="(field, i) in selected"
              :key="i"
            >
              <v-list-tile-content>
                <v-list-tile-title v-text="field.key"></v-list-tile-title>
                <v-list-tile-sub-title v-text="field.value"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      </v-expansion-panel-content>
      <v-expansion-panel-content ripple>
        <p slot="header" class="headline">Search for Corpora</p>
        <v-flex ma-2 xs12>
          <v-card dark>
            <v-card-text>
              Explore several corpora ready for consumption!
            </v-card-text>
            <v-card-text>
              <v-autocomplete
                v-model="model"
                :items="items"
                :loading="isLoading"
                :search-input.sync="search"
                color="white"
                hide-no-data
                hide-selected
                item-text="name"
                item-value="Corpora"
                label="Public Corporas"
                placeholder="Start typing to Search"
                prepend-icon="fa fa-database"
                return-object
              ></v-autocomplete>
            </v-card-text>
            <v-divider></v-divider>

            <v-expand-transition>
              <v-card-text>
                <template v-if="model" three-lines>
                  <template
                    v-for="(field, i) in fields">
                    <h3 :key="'h3' + i">{{ field.key }}</h3>
                    <p :key="'p' + i"> {{ field.value}} </p>
                  </template>
                </template>
              </v-card-text>
            </v-expand-transition>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                :disabled="!model"
                color="blue darken-3"
                @click="selectCropus"
              >
                Select
                <v-icon color="blue" right>fa fa-hand-pointer</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-layout>
</template>

<script>
import $backend from '../backend'

export default {
  data: () => ({
    descriptionLimit: 500,
    entries: [],
    isLoading: false,
    model: null,
    search: null
  }),

  computed: {
    selected () {
      return this.getFields(this.$store.state.corpus)
    },
    fields () {
      if (!this.model) return []

      return Object.keys(this.model).map(key => {
        return {
          key: key,
          value: this.model[key] || 'n/a'
        }
      })
    },
    items () {
      return this.entries.map(entry => {
        const description = entry.description.length > this.descriptionLimit
          ? entry.description.slice(0, this.descriptionLimit) + '...'
          : entry.description

        return Object.assign({}, entry, { description })
      })
    }
  },

  watch: {
    search (val) {
      // Items have already been loaded
      if (this.items.length > 0) return

      // Items have already been requested
      if (this.isLoading) return

      this.isLoading = true

      // Lazily load input items
      $backend.$getCorporas()
        .then(res => {
          this.entries = res
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    }
  },
  methods: {
    getFields (object) {
      if (!object) return []

      return Object.keys(object).map(key => {
        return {
          key: key,
          value: object[key] || 'n/a'
        }
      })
    },
    selectCropus () {
      $backend.$selectCorpus(this.model.name)
        .then(this.$store.commit('setCorpus', this.model))
    }
  }
}
</script>

<style scoped>

</style>
