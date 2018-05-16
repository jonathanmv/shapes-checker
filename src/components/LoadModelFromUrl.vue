<template lang="html">
  <b-form @submit.prevent="loadModel">
    <b-form-group label="Model url:"
                  label-for="modelUrl"
                  description="Where your model is hosted">
      <b-form-input id="modelUrl"
                    type="url"
                    v-model="modelUrl"
                    required
                    placeholder="http://....">
      </b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary">Load</b-button>
  </b-form>
</template>

<script>
export default {
  data: () => ({
    modelUrl: null
  }),
  methods: {
    async loadModel () {
      console.log(`Loading model from: ${this.modelUrl}`)
      return fetch(this.modelUrl, { method: 'GET' })
        .then(response => response.json())
        .then(model => this.$emit('model', model))
        .catch(error => this.$emit('error', error))
    }
  }
}
</script>

<style lang="css" scoped>
</style>
