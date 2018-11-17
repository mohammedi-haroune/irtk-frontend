import Vue from 'vue'
import Vuex from 'vuex'
import $bakcend from './backend'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    corpus: {
    }
  },
  mutations: {
    updateCorpus: (state, corpusName) => {
      $bakcend.$getCorpus(corpusName)
        .then(response => {
          state.corpus = response
        })
    },
    setCorpus: (state, corpus) => {
      state.corpus = corpus
    }
  },
  actions: {

  }
})
