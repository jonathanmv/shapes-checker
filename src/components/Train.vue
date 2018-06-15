<template lang="html">
  <b-container>
    <b-row>
      <b-col>
        <h1>Draw {{shape}}</h1>
        <p>Draw one {{shape}} in each board. Click the button below after finishing the drawings.</p>
        <p>
          <b-form-checkbox v-model="showHits"
            title="Show which regions are considered an interesting point to keep track of the shape"
            value="true"
            unchecked-value="false">
            Show hits on add samples
          </b-form-checkbox>
        </p>
      </b-col>
    </b-row>
    <b-row>
      <b-col :key="index" v-for="index in samplesToCollect">
        <Chalkboard :showHits="showHits" ref="boards" />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <p>{{numberOfSamples}} Samples added</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button @click="addTrainingData" class="float-right" variant="primary">Add Samples</b-button>
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
    resolution: { type: Number, default: 20 },
    samplesToCollect: { type: Number, default: 4 }
  },
  components: { Chalkboard },
  data: () => ({
    trainData: [],
    showHits: true
  }),
  computed: {
    numberOfSamples () {
      return this.trainData.length
    }
  },
  methods: {
    getVectors () {
      return this.$refs.boards.map(board => board.getImageVector(this.resolution))
    },
    addTrainingData () {
      const vectors = this.getVectors()
      const output = { [this.shape]: 1 }
      const data = vectors.map(input => ({ input, output }))
      this.trainData = this.trainData.concat(data)
      this.$emit('data-added', this.trainData)
    },
    clear () {
      this.$refs.boards.forEach(board => board.clear())
    }
  }
}
</script>

<style lang="css" scoped>
</style>
