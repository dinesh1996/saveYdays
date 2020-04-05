<template>
  <!-- <h1>weifjweiojf</h1> -->
  <kanban-board :stages="stages" :blocks="blocks" @update-block="updateBlock">
    <!-- <div v-for="stage in stages" :slot="stage" :key="stage">
      <h2>{{ stage }}</h2>
    </div>-->
    <!-- link -->
    <div v-for="block in blocks" :slot="block.id" :key="block.id">
      <div>
        <strong>id:</strong>
        {{ block.id }}
      </div>
      <div>{{ block.title }}</div>

    </div>
  </kanban-board>
</template>

<script>
import Hamoni from 'hamoni-sync'

export default {
  name: 'DashBoard',
  data() {
    return {
      stages: ['on-hold', 'in-progress', 'needs-review', 'approved'],
      blocks: [],
      listPrimitive: null
    }
  },
  mounted: async function () {
    const accountId = '4d803aaf-cdf7-44c9-a804-49f5a4c8efe2'
    const appId = 'b7e4fe70ce9b45cca7a47fe18ecbc99e'
    let hamoni
    const response = await fetch('https://api.sync.hamoni.tech/v1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ accountId, appId })
    })
    const token = await response.json()
    hamoni = new Hamoni(token)
    hamoni
      .connect()
      .then(() => {
        hamoni
          .get('board-12')
          .then((listPrimitive) => {
            this.listPrimitive = listPrimitive
            this.blocks = listPrimitive.getAll()
            listPrimitive.onItemUpdated((item) => {
              this.blocks.splice(item.index, 1, item.value)
            })
          })
          .catch((error) => {
            if (error == 'Error getting state from server') {
              hamoni
                .createList('board-12', blocks)
                .then((listPrimitive) => {
                  this.listPrimitive = listPrimitive
                  this.blocks = listPrimitive.getAll()
                  listPrimitive.onItemUpdated((item) => {
                    this.blocks.splice(item.index, 1, item.value)
                  })
                })
                .catch(console.log)
            }
          })
      })
      .catch(console.log)
  },
  methods: {
    updateBlock(id, status) {
      const block = this.blocks[id]
      this.listPrimitive.update(id, { id, title: block.title, status })
    }
  }
}
const blocks = [
  {
    id: 0,
    status: 'approved',
    title: 'Buy coffee machine'
  },
  {
    id: 1,
    status: 'in-progress',
    title: 'Find better AirBnB options'
  },
  {
    id: 2,
    status: 'on-hold',
    title: 'Approve Q3 budget'
  },
  {
    id: 3,
    status: 'approved',
    title: 'Travel to Guaraguara'
  },
  {
    id: 4,
    status: 'needs-review',
    title: 'Add Redux to the app'
  },
  {
    id: 5,
    status: 'approved',
    title: 'Well, Sleep all day 👩‍🎤'
  },
  {
    id: 6,
    status: 'in-progress',
    title: 'Find language exchange partner'
  }
]
</script>
