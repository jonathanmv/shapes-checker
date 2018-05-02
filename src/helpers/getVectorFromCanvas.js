// based on https://gist.github.com/mac2000/fc54e6d6bdcbfde28b03dc2a43611270

/**
 * Makes a vector of 1s and 0s out of the image in a canvas.
 * 0 indicates an absence of color while 1 is the opposite
 */

export default ({ canvas, columns }) => {
  const { clientWidth, clientHeight } = canvas
  const context = canvas.getContext('2d')
  const xStep = clientWidth / columns
  const yStep = clientHeight / columns
  const vector = []
  for (let x = 0; x < clientWidth; x += xStep) {
    for (let y = 0; y < clientHeight; y += yStep) {
      const sample = context.getImageData(x, y, xStep, yStep)
      const isEmpty = sample.data.find(value => value > 0) === undefined
      vector.push(isEmpty ? 0 : 1)
    }
  }

  return vector
}
