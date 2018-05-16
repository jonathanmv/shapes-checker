export default class Shape {
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
