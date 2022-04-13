const { id, isPreview } = artkit.parseQueryParameters({
  id: 'number',
  isPreview: 'boolean'
})

function setup() {
  createCanvas(windowWidth, windowHeight);

  if (isPreview) noLoop()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  const seed = id * 100000
  randomSeed(seed)
  noiseSeed(seed)

  const shape = random() < 0.5 ? 'Circle' : 'Square';
  
  noStroke()
  fill(random(255), random(255), random(255));
  const size = min(windowWidth, windowHeight) * 0.5

  if (shape === 'Circle') {
    circle((windowWidth - size / 2), (windowHeight - size / 2), size)
  } else {
    rect(windowWidth - size, windowHeight - size, size)
  }
  
  var c = document.getElementById("defaultCanvas0");
  var ctx = c.getContext("2d");
  kImage = new Image();
  kImage.src = 'k-circle.png';
  ctx.drawImage(kImage, (windowWidth) / 4, (windowHeight) / 4, size, size);
  
  fill(random(255), random(255), random(255));
  ctx.font = `${size / 4}px Arial`;
  const w = (windowWidth  - size / 1.32);
  const h = (windowHeight - size / 2.5);
  ctx.fillText(`FC${id}`, w, h);

  if (isPreview) {
    saveMetadata({
      Shape: shape
    })
  }
}

// Call this function once the art has been fully rendered.
// This saves the metadata attributes and preview image.
function saveMetadata(attributes) {
  artkit.saveMetadata({
    attributes() {
      return attributes
    },
    // This function should return a 'data:' url containing an image
    image() {
      const canvas = document.querySelector('canvas')
      return canvas.toDataURL('image/png', 100)
    }
  })
}
