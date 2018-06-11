<template lang="html">
  <b-container>
    <h1>Draw {{shape}}</h1>
    <p>Draw one {{shape}} in each board. Click the button below after finishing the drawings.</p>
    <b-row>
      <b-col>
        <Chalkboard ref="sample1" />
      </b-col>
      <b-col>
        <Chalkboard ref="sample2" />
      </b-col>
      <b-col>
        <Chalkboard ref="sample3" />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button @click="train" class="float-right" variant="primary">Save</b-button>
        <b-button @click="clear" class="float-right" variant="link">Clear</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Chalkboard from '@/components/Chalkboard'

export default {
  name: 'Train',
  props: {
    shape: { required: true },
    resolution: { type: Number, default: 20 }
  },
  components: { Chalkboard },
  data: () => ({
    trainData: []
  }),
  computed: {
    boards () {
      return [1, 2, 3].map(i => this.$refs['sample' + i])
    }
  },
  methods: {
    getVectors () {
      return this.boards.map(board => board.getImageVector(this.resolution))
    },
    train () {
      const vectors = this.getVectors()
      const output = { [this.shape]: 1 }
      const data = vectors.map(input => ({ input, output }))
      this.trainData = this.trainData.concat(data)
      this.$emit('trained', this.trainData)
    },
    clear () {
      this.boards.forEach(board => board.clear())
    }
  }
}
</script>

<style lang="css" scoped>
</style>
