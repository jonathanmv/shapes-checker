<template lang="html">
  <canvas ref="canvas" class="Chalkboard-canvas border" :style="{ 'background-color': backgroundColor }"></canvas>
</template>

<script>
import SignaturePad from 'signature_pad'
import getVectorFromCanvas from '@/helpers/getVectorFromCanvas'

// https://www.designpieces.com/2014/02/chalkboard-look-and-feel/

export default {
  name: 'Chalkboard',
  props: {
    penColor: {
      // default: '#f4f4f0'
      // default: '#000'
      default: '#404047'
    },
    backgroundColor: {
      // default: '#404047'
      default: '#FFF'
    }
  },
  data: () => ({
    pad: null
  }),
  methods: {
    getImageVector (columns = 20) {
      const canvas = this.$refs.canvas
      return getVectorFromCanvas({ canvas, columns })
    },
    clear () {
      this.pad.clear()
    },
    resizeCanvas () {
      var ratio = Math.max(window.devicePixelRatio || 1, 1)
      const { canvas } = this.$refs
      canvas.width = canvas.offsetWidth * ratio
      canvas.height = canvas.offsetHeight * ratio
      canvas.getContext('2d').scale(ratio, ratio)
      this.pad.clear() // otherwise isEmpty() might return incorrect value
    }
  },
  mounted () {
    const canvas = this.$refs.canvas
    const { penColor } = this
    const props = { penColor }
    this.pad = new SignaturePad(canvas, props)
    // this.resizeCanvas()
  }
}
</script>

<style lang="css" scoped>
  .Chalkboard-canvas {
    width: 200px;
    height: 200px;
    /* width: 100%;
    height: 100%; */
  }
</style>
