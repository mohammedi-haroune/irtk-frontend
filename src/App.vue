<template>
  <v-app :dark="isDark">
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        @click.native.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        @click.native.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.native.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <v-flex ma-2>
          <v-alert :value="corpusName == null" type="warning" dismissible>No Corpus Selected !</v-alert>
          <v-alert :value="corpusName != null" type="success" dismissible>Selected Corpus: {{ corpusName }}</v-alert>
        </v-flex>
      </v-toolbar-title>
      <v-btn
        icon
        @click.native.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view keep-alive></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <v-list subheader>
        <v-subheader>Appearance</v-subheader>
        <v-list-tile @click="isDark = !isDark">
          <v-list-tile-action>
            <v-btn icon>
              <v-icon :color="isDark ? 'white' : 'black'">invert_colors</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Invert Colors</v-list-tile-title>
            <v-list-tile-sub-title>Use {{isDark ? 'Light': 'Dark'}} Theme</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018 </span>
      <v-spacer></v-spacer>
      <span> Made With <v-icon small>fa-heart</v-icon> By MOHAMMEDI Haroune</span>
    </v-footer>
  </v-app>
</template>

<script>
import $backend from './backend'
export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        { icon: 'apps', title: 'Welcome', to: '/welcome' },
        { icon: 'create', title: 'Corpus', to: '/corpus' },
        { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' },
        { icon: 'explore', title: 'Corpus Browser', to: '/browser' },
        { icon: 'search', title: 'Find Words', to: '/find' },
        { icon: 'check', title: 'Corpus Selection', to: '/select' },
        { icon: 'fa fa-file', title: 'Boolean Model', to: '/boolean' },
        { icon: 'fa fa-heart', title: 'Vector Model', to: '/vector' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Information Retrieval ToolKit',
      isDark: true
    }
  },
  computed: {
    corpusName () {
      return this.$store.state.corpus.name
    }
  },
  mounted () {
    this.getSelectedCorpus()
  },
  methods: {
    getSelectedCorpus () {
      $backend.$selectedCorpus()
        .then(corpus => this.$store.commit('setCorpus', corpus))
    }
  }
}
</script>
