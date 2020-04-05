<template>
  <div class="container">
    <div class="jumbotron mt-5">
      <div class="col-sm-8 mx-auto">
        <h1 class="text-center">PROFILE</h1>
      </div>
      <table class="table col-md-6 mx-auto">
        <tbody>
          <tr>
            <td>Fist Name</td>
            <td>{{ firstName }}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{{ lastName }}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{{ email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import UsersService from '@/services/UsersService'
export default {
  name: 'Profile',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: ''
    }
  },
  mounted() {
    let token = this.$cookie.get('Token')
    if (token) {
      this.getProfile(token)
    } else {
      this.$swal('NO!', 'Vous devez de connecter', 'error')
      this.$router.push({ name: 'Login' })
    }
  },
  methods: {
    async getProfile(token) {
      await UsersService.getCurrent(token)
        .then((res) => {
          console.log(res)

          this.firstName = res.data.user.firstName
          this.lastName = res.data.user.lastName
          this.email = res.data.user.email
        })
        .catch((err) => {
          console.log(err.response)
          this.$swal('No!', err.response.data.message, 'error')
          this.$router.push({ name: 'Login' })
        })
    }
  }
}
</script>
