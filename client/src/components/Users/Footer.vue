<template>
  <b-card bg-variant="dark" text-variant="white" id="footer" title="Fly Paper">
    <b-card-text>
      With supporting text below as a natural lead-in to additional content.
    </b-card-text>
    <b-button v-bind:to="{ name: 'Home' }" variant="primary">Accueil</b-button>
  </b-card>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
<style scoped>
#footer {
  margin-top: 2%;
}
</style>
