<template>
  <div id="app">
    <header class="md-layout">
      <md-toolbar class="md-layout-item">
        <h1>Lista de Contatos</h1>
      </md-toolbar>
    </header>
    <ListContact></ListContact>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import 'vue-material/dist/vue-material.min.css'
  import 'vue-material/dist/theme/default.css'
  import ListContact from './components/listContact/listcontact.component'

  // Using Vue Material globally
  Vue.use(VueMaterial)

  export default {
    name: 'app',
    components: {
      ListContact
    }
  }
</script>
