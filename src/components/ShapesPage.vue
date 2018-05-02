<template lang="html">
  <b-container>
    <b-row>
      <b-col>
        <h1>Known shapes</h1>
        <ul>
          <li :key="name" v-for="name in shapeNames">
            {{ name }}
          </li>
        </ul>
        <b-button @click="addingShape = true" variant="outline-primary" v-if="!addingShape">
          Add shape
        </b-button>
        <b-button @click="train" variant="primary" v-if="shapeNames.length">
          Train
        </b-button>
        <b-alert :show="training">Training ...</b-alert>
        <div v-if="trained">
          <p>Training error: {{trainingResults.error}}</p>
          <p>Training iterations: {{trainingResults.iterations}}</p>
        </div>
      </b-col>
      <b-col v-if="addingShape">
        <AddShape @shape="addShape" />
      </b-col>
      <b-col v-if="trained && !addingShape">
        <Chalkboard ref="canvasTest"/>
        <b-button @click="predict" variant="success">Check</b-button>
        <b-button @click="clear" variant="link">Clear</b-button>
        <h2>Results</h2>
        <h1>{{prediction}}</h1>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import brain from 'brain.js'
import AddShape from '@/components/AddShape'
import Chalkboard from '@/components/Chalkboard'

export default {
  name: 'ShapesPage',
  components: { AddShape, Chalkboard },
  data: () => ({
    addingShape: false,
    shapes: [],
    net: null,
    training: false,
    trainingResults: {},
    trained: false,
    prediction: null
  }),
  methods: {
    addShape (shape) {
      this.shapes.push(shape)
      this.addingShape = false
    },
    async train () {
      const data = this.shapes.reduce((data, shape) => data.concat(shape.getTrainingData()), [])
      this.net = new brain.NeuralNetwork()
      this.training = true
      this.trained = false
      this.trainingResults = await this.net.trainAsync(data, { log: true })
      this.training = false
      this.trained = true
    },
    predict () {
      const data = this.$refs.canvasTest.getImageVector()
      this.prediction = brain.likely(data, this.net)
    },
    clear () {
      this.$refs.canvasTest.clear()
      this.prediction = null
    }
  },
  computed: {
    shapeNames () {
      return this.shapes.map(({name}) => name)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
