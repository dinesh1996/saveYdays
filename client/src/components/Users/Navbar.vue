<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">FlyPaper</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-bind:to="{ name: 'Home' }">Home</b-nav-item>

          <b-nav-item v-if="auth == ''" v-bind:to="{ name: 'Login' }">Login</b-nav-item>
          <b-nav-item v-if="auth == ''" v-bind:to="{ name: 'Register' }">Register</b-nav-item>
          <b-nav-item v-if="auth == 'loggedin'" v-bind:to="{ name: 'Tickets' }">Tickets</b-nav-item>
          <b-nav-item v-if="auth == 'loggedin'" v-bind:to="{ name: 'DashBoard' }">DashBoard</b-nav-item>
          <b-nav-item v-if="auth == 'loggedin'" v-bind:to="{ name: 'Profile' }">Profile</b-nav-item>
          <b-nav-item v-if="auth == 'loggedin'" v-bind:to="{ name: 'Déconnexion' }">Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import EventBus from './EventBus'
EventBus.$on('logged-in', (test) => {
  console.log(test)
})
export default {
  data() {
    return {
      auth: '',
      user: ''
    }
  },
  methods: {
    logout() {
      this.$cookies.remove('Token') // return this
      // this.$cookie.set('Token', res.data.token, '1d')
    }
  },
  mounted() {
    EventBus.$on('logged-in', (status) => {
      this.auth = status
    })
  }
}
</script>
