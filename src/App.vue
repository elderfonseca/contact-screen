<template>
  <div id="app">
    <header class="md-layout">
      <md-toolbar class="md-layout-item">
        <h1>Lista de Contatos</h1>
      </md-toolbar>
    </header>
    <main class="md-layout">
      <AddContact></AddContact>
    </main>
  </div>
</template>

<script>
import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'

import AddContact from './components/addContact/addcontact.component'

Vue.use(VueMaterial)

export default {
  name: 'app',
  components: {
    AddContact
  }
}
</script>
