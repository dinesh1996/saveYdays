<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import UsersService from '@/services/UsersService'
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Activation'
    }
  },
  mounted() {
    this.active(this.$route.params.token)
  },
  methods: {
    async active(activeToken) {
      await UsersService.activeUser(activeToken)
        .then((result) => {
          console.log(result)
          this.$swal('Felicitation', 'Votre compte est activé!', 'success')
          this.$router.push({ name: 'Login' })
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
