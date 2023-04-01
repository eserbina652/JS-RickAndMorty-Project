(function () {
  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')
  let w = canvas.width = window.innerWidth * 0.73
  let h = canvas.height = 8500
  let particles = []
  let properties = {
    bgColor: '#0a100e',
    particleColor: 'rgb(0,255,255)',
    particleRadius: 2,
    particleCount: 300,
    particleMaxVelocity: 1.4,
    lineLength: 300
  }
  canvas.style.zIndex = '-1'
  document.querySelector('#APIBlock').append(canvas)


  window.onresize = function () {
    w = canvas.width = window.innerWidth * 0.67
    h = canvas.height = 8500

  }

  class Particle {
    constructor() {
      this.x = Math.random() * w
      this.y = Math.random() * h
      this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity
      this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity

    }

    position() {
      this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX
      this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY
      this.x += this.velocityX
      this.y += this.velocityY
    }

    reDraw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fillStyle = properties.particleColor
      ctx.fill()

    }
  }

  function reDrawBg() {
    ctx.fillStyle = properties.bgColor
    ctx.fillRect(0, 0, w, h)
  }

  function drawLines() {
    let x1, y1, x2, y2, length, opacity
    for (let i in particles) {
      for (let j in particles) {
        x1 = particles[i].x
        y1 = particles[i].y
        x2 = particles[j].x
        y2 = particles[j].y
        length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
        if (length < properties.lineLength) {
          opacity = 1 - length / properties.lineLength
          ctx.lineWidth = '0,5'
          ctx.strokeStyle = 'rgba(0,93,79, ' + opacity + ')'
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.closePath()
          ctx.stroke()
        }
      }
    }
  }

  function reDrawParticles() {
    for (let i in particles) {
      particles[i].position()
      particles[i].reDraw()
    }
  }

  function loop() {
    reDrawBg()
    reDrawParticles()
    drawLines()
    requestAnimationFrame(loop)
  }


  function init() {
    for (let i = 0; i < properties.particleCount; i++) {
      particles.push(new Particle)
    }
    loop()
  }

  init()

}())

