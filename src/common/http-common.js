import axios from 'axios'

const baseURI = "htttp://localhost:3000/contact"

export function save() {
  axios.post(baseURI, {
    name: this.form.name,
    phoneNumber: this.form.phoneNumber,
  })
}

export function list() {
  axios.get('http://localhost:3000/contact')
  .then(response => {
    this.contacts = response.data
  })
  .catch(e => {
    this.errors.push(e)
  })
}