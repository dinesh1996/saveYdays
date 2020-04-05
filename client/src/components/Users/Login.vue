<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <validation-observer ref="observer" v-slot="{ passes }">
          <b-form @submit.stop.prevent="passes(onSubmit)">
            <validation-provider name="email" :rules="{ required: true, email: true }" v-slot="validationContext">
              <b-form-group id="email" label="Identifiant" type="text" label-for="email">
                <b-form-input
                  id="email"
                  name="email"
                  v-model="email"
                  :state="getValidationState(validationContext)"
                  aria-describedby="email"
                ></b-form-input>

                <b-form-invalid-feedback id="email">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <validation-provider name="password" :rules="{ required: true, min: 3 }" v-slot="validationContext">
              <b-form-group id="password" label="Mot de Passe" type="password" label-for="password">
                <b-form-input
                  id="password"
                  name="password"
                  type="password"
                  v-model="password"
                  :state="getValidationState(validationContext)"
                  aria-describedby="password"
                ></b-form-input>

                <b-form-invalid-feedback id="password">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
            <b-button type="submit" class="sign-in" variant="primary">Sign in!</b-button>
            <b-button v-bind:to="{ name: 'Register' }" variant="outline-primary">Pas de compte ?</b-button>
          </b-form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from './EventBus'
import UsersService from '@/services/UsersService'
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    onSubmit() {
      this.login()
    },
    async login() {
      await UsersService.login({
        user: {
          email: this.email,
          password: this.password
        }
      })
        .then((res) => {
          console.log(res)
          this.$cookie.set('Token', res.data.token, '1d')
          // localStorage.setItem('usertoken', res.data)
          this.email = ''
          this.password = ''
          this.$router.push({ name: 'Profile' })
        })
        .catch((err) => {
          this.$swal('NO!', 'Immposible de vous connecter', 'error')
          this.$router.push({ name: 'Login' })
          console.log(err)
        })
      this.emitMethod()
    },
    emitMethod() {
      EventBus.$emit('logged-in', 'loggedin')
    }
  }
}
</script>
<style type="text/css">
/* .sign-in:hover {
  color: #007bff;
  border-color: #007bff;
  background-color: #ffffff;
} */
</style>
