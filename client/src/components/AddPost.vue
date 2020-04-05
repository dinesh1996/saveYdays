<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <h1 class="h3 mb-3 font-weight-normal">Nouveau Ticket</h1>

        <validation-observer ref="observer" v-slot="{ passes }">
          <b-form @submit.stop.prevent="passes(onSubmit)">
            <validation-provider name="name" :rules="{ required: true, min: 3 }" v-slot="validationContext">
              <b-form-group id="name" label="Nom du Ticket" label-for="name">
                <b-form-input
                  id="name"
                  name="name"
                  v-model="ticketName"
                  :state="getValidationState(validationContext)"
                  aria-describedby="name"
                ></b-form-input>

                <b-form-invalid-feedback id="name">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <b-button type="submit" variant="primary">Créer</b-button>
          </b-form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'addTicket',
  data() {
    return {
      name: '',
      description: '',
      priority: '',
      deathLine: '',
      state: ''
    }
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    async addTicket() {
      await PostsService.addTicket({
        title: this.title,
        description: this.description
      })
      this.$swal('Great!', `Your post has been added!`, 'success')
      this.$router.push({ name: 'Posts' })
    },
    onSubmit() {
      this.addTicket()
    }
  }
}
</script>
