<template lang="html">
  <b-form @submit.prevent="addShape">
    <b-form-group label="Shape name:"
                  label-for="shapeName"
                  description="The way anyone would call this shape">
      <b-form-input id="shapeName"
                    type="text"
                    v-model="shape.name"
                    required
                    placeholder="circle">
      </b-form-input>
    </b-form-group>
    <Train @trained="shape.data = $event" :shape="shape.name" />
    <b-button type="submit" variant="primary">Add shape</b-button>
  </b-form>
</template>

<script>
import Train from '@/components/Train'

class Shape {
  constructor ({ name, data }) {
    if (!name || !name.length || !data || !data.length) {
      throw new TypeError('name and data are required to create a shape')
    }

    this.name = name
    this.output = { [name]: 1 }
    this.trainingData = data
  }

  getTrainingData () {
    return this.trainingData
  }
}

export default {
  name: 'AddShape',
  components: { Train },
  data: () => ({
    shape: {
      name: null,
      data: null
    }
  }),
  methods: {
    addShape () {
      try {
        const shape = new Shape(this.shape)
        this.shape = {
          name: null,
          data: null
        }
        this.$emit('shape', shape)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
