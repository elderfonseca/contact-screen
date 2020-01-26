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
    loadContacts ({ commit }) {
      axios
        .get(apiUrl)
        .then(r => r.data)
        .then(contacts => {
        commit('SET_CONTACTS', contacts)
        })
    },
    addContacts ({ commit }, contacts) {
      axios
        .post(apiUrl, contacts)
        .then(r => r.data)
        .then(contacts => {
          commit('ADD_CONTACT', contacts)
        })
    },
    removeContact ({ commit }, id) {
      axios
        .delete(apiUrl + id)
        .then(r => r.data)
        .then(() => {
          commit('DEL_CONTACT', id)
        })
    },
    editContact ({ commit }, contacts) {
      axios
        .put(apiUrl + contacts.id, contacts)
        .then(r => r.data)
        .then((contacts) => {
          commit('EDIT_CONTACT', contacts)
        })
    }
  },
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