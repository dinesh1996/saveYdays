<template>
  <div>
    <h1>Tickets</h1>
    <div v-if="posts.length > 0">
      <b-table :items="posts" :fields="fields" striped responsive="sm">
        <template v-slot:cell(show_details)="row">
          <b-button size="sm" class="mr-2" v-bind:to="{ name: 'Editpost', params: { id: post._id } }"></b-button>

          <b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails">
            Details via check
          </b-form-checkbox>
        </template>
      </b-table>
    </div>
    <div v-else>
      Pas de Tickets pour le momment..... Voulez-vous en ajouter un ?
      <br />
      <br />
      <b-button v-bind:to="{ name: 'AddTicket' }">Ajouter un Tickets</b-button>
    </div>
  </div>

  <!-- <div v-if="posts.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'Addpost' }" class>Add Post</router-link>
      </div>
      <table>
        <tr>
          <td>Title</td>
          <td width="550">Description</td>
          <td width="100" align="center">Action</td>
        </tr>
        <tr v-for="(post, index) in posts" v-bind:key="index">
          <td>{{ post.title }}</td>
          <td>{{ post.description }}</td>
          <td align="center">
            <router-link v-bind:to="{ name: 'Editpost', params: { id: post._id } }">Edit</router-link>
            |
            <a href="#" @click="deletePost(post._id)">Delete</a>
          </td>
        </tr>
      </table>
    </div>

    <div v-else>
      There are no posts.. Lets add one now
      <br />
      <br />
      <router-link v-bind:to="{ name: 'Addpost' }" class="add_post_link">Add Post</router-link>
    </div>
  </div> -->
</template>

<script>
export default {
  name: 'AllTickets',
  data() {
    return {
      fields: ['first_name', 'last_name', 'show_details'],
      posts: []
    }
  }
  // mounted() {

  //   this.getPosts(this.$cookie.get('token'))
  // },
}
</script>
