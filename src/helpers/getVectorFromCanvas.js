// based on https://gist.github.com/mac2000/fc54e6d6bdcbfde28b03dc2a43611270

/**
 * Makes a vector of 1s and 0s out of the image in a canvas.
 * 0 indicates an absence of color while 1 is the opposite
 */

export default ({ canvas, columns, showHits }) => {
  const { clientWidth, clientHeight } = canvas
  const context = canvas.getContext('2d')
  const xStep = clientWidth / columns
  const yStep = clientHeight / columns
  if (xStep < 1 || yStep < 1) {
    throw new Error(`Invalid columns number. There can be a maximum of ${Math.min(clientWidth, clientHeight)} columns`)
  }
  const vector = []
  const startTime = performance.now()

  for (let y = 0; y < clientHeight; y += yStep) {
    for (let x = 0; x < clientWidth; x += xStep) {
      const sample = context.getImageData(x, y, xStep, yStep)
      const isEmpty = sample.data.find(value => value > 0) === undefined
      vector.push(isEmpty ? 0 : 1)
      if (!isEmpty && showHits) {
        context.fillStyle = 'rgba(0, 255, 0, 0.6)'
        context.fillRect(x, y, xStep, yStep)
      }
    }
  }

  if (showHits) {
    const time = (performance.now() - startTime) / 1000
    console.log(`Vector length: ${vector.length}. Took: ${time}s`)
    print(vector, columns)
  }

  return vector
}

const print = (vector, columns) => {
  console.log(`Printing vector of ${columns} columns`)
  console.log('--'.padEnd(columns, '-'))
  let rows = []
  for (let i = 0; i < columns; i++) {
    rows.push(vector.slice(i * columns, i * columns + columns).join(''))
  }
  console.log(rows.join('\n'))
  console.log('--'.padEnd(columns, '-'))
}
