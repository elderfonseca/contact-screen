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

export const store = new Vuex.Store({
  state: {
    contacts: [],
    newContact: ''
  },
  getters: {
    NEW_CONTACT: state => state.newContact,
    CONTACTS: state => state.contacts
  },
  actions: {
    loadContacts ({ commit }) {
      axios
        .get('http://localhost:3000/contact')
        .then(r => r.data)
        .then(contacts => {
        commit('SET_CONTACTS', contacts)
        })
    },
    addContacts ({ commit }, contacts) {
      axios
        .post('http://localhost:3000/contact', contacts)
        .then(r => r.data)
        .then(contacts => {
          commit('ADD_CONTACT', contacts)
        })
    }
  },
  mutations: {
    SET_CONTACTS (state, contacts) {
      state.contacts = contacts
    },
    ADD_CONTACT (state, contacts) {
      state.contacts.push(contacts)
    }
  }
})