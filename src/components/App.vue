<script>
import AppFooter from './AppFooter';

import axios from 'axios';
import CPF from 'gerador-validador-cpf';

const usersURL = 'https://convenia-front-end-test.firebaseio.com/users.json';

export default {
  name: 'app',
  components: { AppFooter },
  data () {
    return {
      isCPFValid: false,
      userData: { email: '', password: '' }
    }
  },
  computed: {
    isUserDataValid: function() {
      return (this.userData.email && this.userData.password);
    }
  },
  methods: {
    validateCPF: function(ev) {
      // This will remove any non-digit characters from the input
      // and will also make sure that the string is 11 characters long
      // or shorter.
      let value = ev.target.value.split(/\D/).join('').substr(0, 11);

      // Properly format the string into the standard CPF format
      if (value.length > 9) {
        let cpfPrefix = value.substr(0, 9).replace(/(\d{3})(?=\d+)/g, "$1.");
        let cpfSuffix = value.substr(9);
        ev.target.value = `${cpfPrefix}-${cpfSuffix}`;
      } else {
        ev.target.value = value.replace(/(\d{3})(?=\d+)/g, "$1.");
      }

      // Check if the whole string is a valid CPF number.
      this.isCPFValid = CPF.validate(value);
    },
    submitUser: async function(ev) {
      try {
        // Send data to the server then reset local user data after
        // a successful response, catch the error otherwise.
        await axios.post(usersURL, this.userData);
        this.userData = { email: '', password: '' };
      } catch (err) {
        console.error("Users API Error: ", err);
      }
    }
  }
}
</script>

<template lang="html">
  <div class="page-container d-flex flex-column">
    <div class="container-fluid d-flex flex-column">
      <div class="row">
        <div class="col-md d-flex align-items-end order-md-1 right-column">

          <!-- Logo wrapper -->
          <div class="ml-3 mb-4 mt-4 ml-md-5 mb-md-5 mt-md-0">
            <img src="~img/convenia-logo.png" alt="Convenia Logo" class="convenia-logo ml-md-2">
          </div>

        </div>
        <div class="col-md left-column">

          <!-- left-column contents -->
          <div class="row align-items-center h-100">
            <div class="col mt-5 mb-5 ml-4 mr-4 mr-lg-0">

              <!-- Form legend -->
              <div class="col-xl-6 col-lg-10">
                <div class="mb-5">
                  <p class="h5 mb-4 text-antialiased">Olá,</p>
                  <p class="h5 text-antialiased">
                    Você está acessando o
                    <a href="https://www.convenia.com.br/" target="_blank">Convenia</a>
                    que oferece descontos e vantagens em mais de 5.000
                    estabelecimentos. Economize na compra de produtos e
                    serviços de marcas que interessam.
                  </p>
                </div>
              </div>

              <!-- Login form -->
              <div class="col">
                <form @submit.prevent="submitUser" class="pt-4 no-gutters">
                  <div class="form-group input-group col-md-12 col-lg-6">
                    <input @input="validateCPF" type="text" class="form-control" placeholder="ativar CPF">
                    <div class="input-group-append">
                      <button :disabled="!isCPFValid" type="button" class="btn btn-primary">
                        Ok
                      </button>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-12">
                      <small class="form-text font-weight-bold mb-2">
                        Se você já possui cadastro, <a href="#">faça o login</a>
                      </small>
                    </div>
                    <div class="col-sm-12 col-lg-3 mb-3 mb-lg-0">
                      <input v-model="userData.email" type="email" class="form-control" placeholder="e-mail">
                    </div>
                    <div class="col-sm-12 col-lg-3 mb-3 mb-lg-0">
                      <input v-model="userData.password" type="password" class="form-control" placeholder="senha">
                    </div>
                    <div class="col col-lg-auto order-1 d-flex justify-content-end align-items-center">
                      <button :disabled="!isUserDataValid" type="submit" class="btn btn-primary btn-round">
                        Entrar
                      </button>
                    </div>
                    <div class="col col-lg-12 order-lg-2 mt-lg-2">
                      <small class="font-weight-bold">
                        <a href="#">Esqueci a senha</a>
                      </small>
                    </div>
                  </div>
                </form>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>

    <app-footer />
  </div>
</template>

<style lang="scss" scoped>
@import '~styles/variables';
@import '~bootstrap/scss/mixins';

//  Variables
//  ---------

$right-column-bg: #868686;

//  Page Layout
//  -----------

.page-container {
  min-height: 100%;

  > .container-fluid {
    flex-grow: 1;
    > .row { flex-grow: 1; }
  }
}

.right-column {
  background-color: $right-column-bg;

  flex: 0 0 46.998535871%;
  max-width: 46.998535871%;

  .convenia-logo { max-width: 100%; }

  @include media-breakpoint-down(sm) {
    flex: auto;
    max-width: initial;

    .convenia-logo { width: 8.75rem; }
  }
}

.left-column {
  @include media-breakpoint-down(sm) {
    display: flex;
    flex-direction: column;
  }
}

</style>
