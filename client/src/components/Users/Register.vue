<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <h1 class="h3 mb-3 font-weight-normal">Register</h1>

        <validation-observer ref="observer" v-slot="{ passes }">
          <b-form @submit.stop.prevent="passes(onSubmit)">
            <validation-provider name="firstName" :rules="{ required: true, min: 3 }" v-slot="validationContext">
              <b-form-group id="firstName" label="Prénom" label-for="firstName">
                <b-form-input
                  id="firstName"
                  name="firstName"
                  v-model="firstName"
                  :state="getValidationState(validationContext)"
                  aria-describedby="firstName"
                ></b-form-input>

                <b-form-invalid-feedback id="firstName">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <validation-provider name="lastName" :rules="{ required: true, min: 3 }" v-slot="validationContext">
              <b-form-group id="lastName" label="Nom de Famille" label-for="lastName">
                <b-form-input
                  id="lastName"
                  name="lastName"
                  v-model="lastName"
                  :state="getValidationState(validationContext)"
                  aria-describedby="lastName"
                ></b-form-input>

                <b-form-invalid-feedback id="lastName">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <validation-provider name="email" :rules="{ required: true, email: true }" v-slot="validationContext">
              <b-form-group id="email" label="Email" type="text" label-for="email">
                <b-form-input
                  id="email"
                  name="email"
                  v-model="email"
                  :state="getValidationState(validationContext)"
                  aria-describedby="email"
                ></b-form-input>

                <b-form-invalid-feedback id="email">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
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

                <b-form-invalid-feedback id="password">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <b-button type="submit" variant="primary">Register!</b-button>
          </b-form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>
<style>
body {
  padding: 1rem;
}
</style>
<script>
import UsersService from '@/services/UsersService'
export default {
  name: 'register',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    onSubmit() {
      this.register()
    },

    async register() {
      await UsersService.register({
        user: {
          firstName: this.firstName,
          lastName: this.firstName,
          email: this.email,
          password: this.password
        }
      })
        .then((res) => {
          console.log(res)
          if (res.data && res.status === 200) {
            this.$swal('Great!', `You have been registered`, 'success')
            this.$router.push({ name: 'Login' })
          }
        })
        .catch((err) => {
          console.log(err.response)
          console.log(this.errors)

          if (err.response.status === 409) {
            this.$swal('NO!', `${err.response.data.message}`, 'error')
          }
        })
    }
  }
}
</script>
