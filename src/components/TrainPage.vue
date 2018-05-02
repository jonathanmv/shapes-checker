<template lang="html">
  <b-container>
    <b-row>
      <b-col>
        <Train @trained="onTrainedData" shape="circle" />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <Train @trained="onTrainedData" shape="square" />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert :show="training">Training ...</b-alert>
        <div v-if="!training">
          <b-button @click="train" variant="primary">Train</b-button>
          <p>Training error: {{trainingError}}</p>
          <p>Training iterations: {{trainingIterations}}</p>
        </div>
      </b-col>
      <b-col>
        <Chalkboard ref="test"/>
        <b-button @click="check" variant="success">Check</b-button>
        <b-button @click="clear" variant="link">Clear</b-button>
      </b-col>
      <b-col>
        <h2>Results</h2>
        <h1>{{prediction}}</h1>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import brain from 'brain.js'
import Train from '@/components/Train'
import Chalkboard from '@/components/Chalkboard'

export default {
  name: 'TrainPage',
  components: { Train, Chalkboard },
  data: () => ({
    trainData: [],
    training: false,
    trainingError: null,
    trainingIterations: null,
    net: null,
    prediction: null
  }),
  methods: {
    onTrainedData (data) {
      this.trainData = this.trainData.concat(data)
    },
    async train () {
      if (!this.net) {
        this.net = new brain.NeuralNetwork()
      }
      this.trainingError = null
      this.trainingIterations = null
      this.training = true
      const options = { log: true }
      const { error, iterations } = await this.net.trainAsync(this.trainData, options)
      this.trainingError = error
      this.trainingIterations = iterations
      this.training = false
    },
    check () {
      const data = this.$refs.test.getImageVector()
      this.prediction = brain.likely(data, this.net)
    },
    clear () {
      this.$refs.test.clear()
      this.prediction = null
    }
  }
}
</script>

<style lang="css" scoped>
</style>
