<template>
  <main class="md-layout">
    <div class="md-layout-item md-size-100 md-gutter add-contact">
      <!-- Button that opens the dialog with the form for a new registration -->
      <md-button class="md-primary md-raised btn-new" @click="showDialog = true">
        Novo Registro
      </md-button>
    </div>
    <div class="md-layout-item md-size-100 md-gutter">
      <md-table class="md-scrollbar table-contact">
        <md-table-row>
          <md-table-head md-numeric>ID</md-table-head>
          <md-table-head>Nome</md-table-head>
          <md-table-head>Telefone Celular</md-table-head>
          <md-table-head>Ações</md-table-head>
        </md-table-row>
        <!-- Iteration that assembles the table with the contacts -->
        <md-table-row v-for="contact in contacts" :key="contact.id">
          <md-table-cell md-numeric>{{ contact.id }}</md-table-cell>
          <md-table-cell>{{ contact.name }}</md-table-cell>
          <md-table-cell class="phone-number">{{ contact.phoneNumber }}</md-table-cell>
          <md-table-cell>
            <!-- The edit button brings the same dialog with the form but already with the selected contact's data -->
            <md-button @click.prevent="editContact(contact)" class="md-icon-button md-dense" alt="Editar">
              <md-icon>edit</md-icon>
            </md-button>
            <md-button @click.prevent="removeContact(contact.id)" class="md-icon-button md-dense md-accent" alt="Excluir">
              <md-icon>delete</md-icon>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <!--Dialog with the form --> 
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
                  <span class="md-error" v-else-if="!$v.form.name.numberWords">Nome Inválido</span>
                </md-field>
              </div>
              <div class="md-layout-item md-size-100">
                <md-field :class="getValidationClass('phoneNumber')">
                  <label for="phoneNumber">Telefone Celular</label>
                  <md-input type="tel" v-mask="['(##) ####-####', '(##) #####-####']" name="phoneNumber" id="phoneNumber" v-model="form.phoneNumber" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.phoneNumber.required">Telefone obrigatório</span>
                  <span class="md-error" v-else-if="!$v.form.name.minLength">Telefone Inválido</span>
                  <span class="md-error" v-else-if="!$v.form.name.maxLength">Telefone Inválido</span>
                </md-field>
              </div>
            </div>
          </md-card-content>
          <md-progress-bar md-mode="indeterminate" v-if="sending" />
          <md-card-actions>
            <md-button type="submit" :disabled="sending">Salvar</md-button>
            <md-button @click="cancelContact" class="md-accent" :disabled="sending">Cancelar</md-button>
          </md-card-actions>
        </md-card>
        <md-snackbar :md-active.sync="contactSaved">O contato {{ lastContact }} foi salvo com sucesso</md-snackbar>
      </form>
    </md-dialog>
  </main>
</template>

<script>
  import './listcontact.component.scss'
  import { mapState } from 'vuex'
  import { validationMixin } from 'vuelidate'
  import { mask } from 'vue-the-mask'
  import { required, minLength, maxLength } from 'vuelidate/lib/validators'

  // Custom validation function for the name field
  let wordsArray = ""

  function numberWords(value) {
    wordsArray = value.split(" ")
    let sizeWords = wordsArray.every(function(word) {
      return word.length >= 3
    })
    if (wordsArray.length >= 2  && wordsArray[1] !== "" && sizeWords === true) {
      return true
    } else {
      return false
    }
  }

  export default {
    directives: {mask},
    name: 'ListContacts',
    mixins: [validationMixin],
    data () {
      return {
        form: {
          id: '',
          name: '',
          phoneNumber: '',
        },
        contactSaved: false,
        sending: false,
        showDialog: false,
        lastContact: null,
      }
    },
    validations: {
      // Form validations
      form: {
        name: {
          required,
          numberWords
        },
        phoneNumber: {
          required,
          minLength: minLength(14),
          maxLength: maxLength(15)
        }
      }
    },
    created() {
      // Request for contact list that updates whenever a change is made
      this.$store.dispatch('loadContacts')
    },
    updated() {
      // This function is called here to make sure that the DOM is all assembled.
      this.checkDdd()
    },
    computed: mapState([
      'contacts'
    ]),
    methods: {
      // Checks if the area code is from São Paulo.
      // Positive case adds the class to the parent item to paint the line blue
      checkDdd() {
        let phonesDdd = document.querySelectorAll(".phone-number")
        for (let phone of phonesDdd) {
          let textPhone = phone.innerText
          if (textPhone.substr(1, 2) === '11') {
            let itemLine = phone.parentNode
            itemLine.classList.add('ddd-11')
          }
        }
      },
      // Insert the class that changes the look when validating the form
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      // Validation to submit the form
      validateContact() {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveContact()
        }
      },
      // Function that saves a new contact or edits an existing one
      saveContact() {
        this.sending = true
        if (!this.form.id) {
          // New contact
          this.$store.dispatch('addContacts', this.form)
        } else {
          //Existing contact
          this.$store.dispatch('editContact', this.form)
        }
        window.setTimeout(() => {
          this.contactSaved = true
          this.lastContact = `${this.form.name}`
        }, 1000)
        window.setTimeout(() => {
          this.sending = false
          this.cancelContact()
        }, 2500)
      },
      // Remove contact
      removeContact(id) {
        this.$store.dispatch('removeContact', id)
      },
      // Edit contact
      editContact(contact) {
        this.showDialog = true
        this.form.id = contact.id
        this.form.name = contact.name
        this.form.phoneNumber = contact.phoneNumber
      },
      // Close the modal and clean the form
      cancelContact() {
        this.$v.$reset()
        this.form.name = null
        this.form.phoneNumber = null
        this.form.id = null
        this.contactSaved = false
        this.lastContact = null
        this.showDialog = false
      },
    }
  }
</script>