import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Axios from 'axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default Axios.create({
  headers: {
    'Authorization': false,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

//API URL used
const apiUrl = 'http://localhost:3000/contact/'

export const store = new Vuex.Store({
  state: {
    contacts: [],
    newContact: ''
  },
  getters: {
    CONTACTS: state => state.contacts
  },
  actions: {
    // Request to load contacts
    loadContacts ({ commit }) {
      axios
        .get(apiUrl)
        .then(r => r.data)
        .then(contacts => {
        commit('SET_CONTACTS', contacts)
        }).catch(error => {
          alert(error.response.data.errors)
        })
    },
    // Request to add a new contact
    addContacts ({ commit }, contacts) {
      axios
        .post(apiUrl, contacts)
        .then(r => r.data)
        .then(contacts => {
          commit('ADD_CONTACT', contacts)
        }).catch(error => {
          alert(error.response.data.errors)
        })
    },
    // Request to remove a contact
    removeContact ({ commit }, id) {
      axios
        .delete(apiUrl + id)
        .then(r => r.data)
        .then(() => {
          commit('DEL_CONTACT', id)
        }).catch(error => {
          alert(error.response.data.errors)
        })
    },
    // Request to edit a contact
    editContact ({ commit }, contacts) {
      axios
        .put(apiUrl + contacts.id, contacts)
        .then(r => r.data)
        .then((contacts) => {
          commit('EDIT_CONTACT', contacts)
        }).catch(error => {
          alert(error.response.data.errors)
        })
    }
  },
  // Mutations used to update the application state according to the API
  mutations: {
    SET_CONTACTS (state, contacts) {
      state.contacts = contacts
    },
    ADD_CONTACT (state, contacts) {
      state.contacts.push(contacts)
    },
    DEL_CONTACT (state, id) {
      let index = state.contacts.findIndex(contact => contact.id === id)
      state.contacts.splice(index, 1)
    },
    EDIT_CONTACT (state, contacts) {
      let index = state.contacts.findIndex(contact => contact.id === contacts.id)
      state.contacts.splice(index, 1, contacts)
    }
  }
})