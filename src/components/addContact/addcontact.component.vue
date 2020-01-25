<template>
  <div class="md-layout-item md-size-100 md-gutter add-contact">
    <md-dialog :md-active.sync="showDialog">
      <form novalidate class="md-layout" @submit.prevent="validateContact">
        <md-card class="md-layout-item md-size-100">
          <md-card-header>
            <div class="md-title">Adicionar Novo Contato</div>
          </md-card-header>
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-size-100">
                <md-field :class="getValidationClass('name')">
                  <label for="name">Nome</label>
                  <md-input name="name" id="name" v-model="form.name" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.name.required">Nome obrigatório</span>
                  <span class="md-error" v-else-if="!$v.form.name.minLength">Nome Inválido</span>
                </md-field>
              </div>
              <div class="md-layout-item md-size-100">
                <md-field :class="getValidationClass('phoneNumber')">
                  <label for="phoneNumber">Telefone</label>
                  <md-input type="tel" v-mask="['(##) ####-####', '(##) #####-####']" name="phoneNumber" id="phoneNumber" v-model="form.phoneNumber" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.phoneNumber.required">Telefone obrigatório</span>
                </md-field>
              </div>
            </div>
          </md-card-content>
          <md-progress-bar md-mode="indeterminate" v-if="sending" />
          <md-card-actions>
            <md-button type="submit" class="md-primary" :disabled="sending">Salvar</md-button>
            <md-button @click="cancelContact" class="md-accent">Cancelar</md-button>
          </md-card-actions>
        </md-card>
        <md-snackbar :md-active.sync="contactSaved">O contato {{ lastContact }} foi salvo com sucesso</md-snackbar>
      </form>
    </md-dialog>

    <md-button class="md-primary md-raised btn-new" @click="showDialog = true">
      Novo Registro
    </md-button>
  </div>
</template>

<script>
import './addcontact.component.scss'
import { validationMixin } from 'vuelidate'
import { mask } from 'vue-the-mask'
import { required, minLength } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'

export default {
  directives: {mask},
  name: 'AddContact',
  mixins: [validationMixin],
  data() {
    return {
      form: {
        name: '',
        phoneNumber: '',
      },
      contactSaved: false,
      sending: false,
      showDialog: false,
      lastContact: null,
    }
  },
  computed: {
    ...mapState(['CONTACTS'])
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(7)
      },
      phoneNumber: {
        required
      }
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm() {
      this.$v.$reset()
      this.form.name = null
      this.form.phoneNumber = null
    },
    saveContact() {
      this.sending = true

      this.$store.dispatch('addContacts', this.form)

      // const baseURI = "http://localhost:3000/contact"

      // this.$http.post(baseURI, {
      //   name: this.form.name,
      //   phoneNumber: this.form.phoneNumber,
      // })

      window.setTimeout(() => {
        this.lastContact = `${this.form.name}`
        this.contactSaved = true
        this.sending = false
        this.clearForm()
      }, 1500)
    },
    validateContact() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.saveContact()
      }
    },
    cancelContact() {
      this.clearForm()
      this.showDialog = false
    }
  }
}
</script>