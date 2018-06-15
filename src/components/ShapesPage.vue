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
          <b-button @click="download" variant="info">
            Download
          </b-button>
        </div>
      </b-col>
      <b-col v-if="addingShape">
        <AddShape @shape="addShape" :resolution="resolution" />
      </b-col>
      <b-col v-if="trained && !addingShape">
        <Chalkboard ref="canvasTest"/>
        <div>
          <b-button @click="predict" variant="success">Check</b-button>
          <b-button @click="clear" variant="link">Clear</b-button>
          <h2>Results</h2>
          <h1>{{prediction}}</h1>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import brain from 'brain.js'
import AddShape from '@/components/AddShape'
import LoadModel from '@/components/LoadModelFromUrl'
import Chalkboard from '@/components/Chalkboard'
import download from '@/helpers/download'
import Shape from '@/classes/Shape'

export default {
  name: 'ShapesPage',
  components: { AddShape, Chalkboard, LoadModel },
  data: () => ({
    addingShape: false,
    shapes: [],
    net: null,
    training: false,
    trainingResults: {},
    trained: false,
    prediction: null,
    resolution: 10
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
      this.trainingResults = null
      this.prediction = null
      this.trainingResults = await this.net.trainAsync(data, { log: true })
      this.training = false
      this.trained = true
    },
    predict () {
      const data = this.$refs.canvasTest.getImageVector(this.resolution)
      this.prediction = brain.likely(data, this.net)
    },
    clear () {
      this.$refs.canvasTest.clear()
      this.prediction = null
    },
    download () {
      const model = this.net.toJSON()
      const shapes = this.shapeNames
      const json = { model, shapes }
      download(JSON.stringify(json), 'model.json', 'text/json')
    },
    modelLoaded (data) {
      const { model, shapes } = data
      this.net = this.net || new brain.NeuralNetwork()
      this.net.fromJSON(model)
      this.shapes = shapes.map(name => new Shape({ name, data: [1] }))
      this.training = false
      this.trained = true
      this.trainingResults = {}
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
