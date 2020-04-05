<template>
  <b-container>
    <div class="row">
      <div class="col-md-10 mt-5 mx-auto">
        <h1 class="h3 mb-3 font-weight-normal">Nouveau Ticket</h1>

        <validation-observer ref="observer" v-slot="{ passes }">
          <b-form @submit.stop.prevent="passes(onSubmit)">
            <b-form-group label="Priorité">
              <b-form-radio-group
                v-model="priority"
                :options="priorities.options"
                plain
                name="plain-inline"
              ></b-form-radio-group>
            </b-form-group>

            <validation-provider name="name" :rules="{ required: true, min: 3 }" v-slot="validationContext">
              <b-form-group id="name" label="Nom du Ticket" label-for="name">
                <b-form-input
                  id="name"
                  name="name"
                  v-model="name"
                  :state="getValidationState(validationContext)"
                  aria-describedby="name"
                ></b-form-input>

                <b-form-invalid-feedback id="name">
                  {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <b-form-group id="range" label="A rendre avant le :" label-for="range">
              <vc-date-picker is-required mode="range" v-model="range" />
            </b-form-group>

            <validation-provider name="stage" :rules="{ required: true }" v-slot="validationContext">
              <b-form-group id="stage" label="Etat" label-for="stage">
                <b-form-select
                  :state="getValidationState(validationContext)"
                  v-model="stage"
                  :options="stages.options"
                ></b-form-select>
              </b-form-group>
              <b-form-invalid-feedback id="stage">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </validation-provider>

            <b-form-group id="description" label="Déscription" label-for="description">
              <ckeditor :editor="editor" v-model="description" :config="editorConfig"></ckeditor>
            </b-form-group>

            <!-- <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select> -->
            <!-- <div class="mt-3">
                Selected:
                <strong>{{ selected }}</strong>
              </div> -->

            <b-button type="submit" variant="primary">Créer</b-button>
          </b-form>
        </validation-observer>
      </div>
    </div>
  </b-container>
</template>

<script>
import PostsService from '@/services/PostsService'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-vue'
export default {
  name: 'addTicket',
  components: { ckeditor: CKEditor.component },
  data() {
    return {
      name: '',
      description: '',
      priority: 2,
      range: {},
      stage: 'on-hold',

      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
        removePlugins: ['ImageToolbar', 'ImageUpload', 'MediaEmbed']
      },
      priorities: {
        options: [
          { text: 'Elever', value: 3 },
          { text: 'Moyenne', value: 2 },
          { text: 'Basse', value: 1 }
        ]
      },
      stages: {
        options: [
          { text: 'En attente', value: 'on-hold' },
          { text: 'En cours', value: 'in-progress' },
          { text: 'Vérification', value: 'needs-review' },
          { text: 'Approuvé', value: 'approved' }
        ]
      }
    }
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    async addTicket() {
      debugger
      await PostsService.addTicket({
        name: this.name,
        description: this.description,
        priority: this.priority,
        stage: this.stage,
        startDate: this.range.start,
        endDate: this.range.end
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
<style>
.ck-content {
  height: 300px;
}
</style>
