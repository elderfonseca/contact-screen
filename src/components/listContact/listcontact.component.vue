<template>
  <div class="md-layout-item md-size-100 md-gutter">
    <md-table>
      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>Nome</md-table-head>
        <md-table-head>Número</md-table-head>
        <md-table-head>Ações</md-table-head>
      </md-table-row>
      <md-table-row v-for="contact in contacts" :key="contact.id">
        <md-table-cell md-numeric>{{ contact.id }}</md-table-cell>
        <md-table-cell>{{ contact.name }}</md-table-cell>
        <md-table-cell>{{ contact.phoneNumber }}</md-table-cell>
        <md-table-cell>
          <md-button class="md-icon-button md-dense md-primary" alt="Editar">
            <md-icon>edit</md-icon>
          </md-button>
          <md-button class="md-icon-button md-dense md-accent" alt="Excluir">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'ListContacts',
    mounted() {
      this.$store.dispatch('loadContacts')
    },
    computed: mapState([
      'contacts'
    ])
  }
</script>