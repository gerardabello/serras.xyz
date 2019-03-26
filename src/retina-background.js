import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import { withRouter } from 'react-router-dom'

import Ring from './figures/ring'
import Zig from './figures/zig'
import Half from './figures/half'
import Plus from './figures/plus'
import Hex from './figures/hex'
import Triangle from './figures/triangle'
import Square from './figures/square'

import poissonDiscSampler from './sampling'

const FIGURE_SHAPES = {
  ring: Ring,
  zig: Zig,
  half: Half,
  plus: Plus,
  hex: Hex,
  triangle: Triangle,
  square: Square
}

const COLORS = [
  '#212D40',
  '#212D40',
  '#364156',
  '#364156',
  '#7D4E57',
  '#D66853'
]

function shuffle (iarray) {
  let array = [...iarray]
  let count = array.length
  let randomnumber
  let temp
  while (count) {
    randomnumber = (Math.random() * count--) | 0
    temp = array[count]
    array[count] = array[randomnumber]
    array[randomnumber] = temp
  }

  return array
}

const PreRoot = styled.div`
  background-color: #11151c;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Root = styled.div`
  min-width: 1000px;
  min-height: 1000px;
  width: 100%;
  height: 100%;
  position: relative;

  @media (max-width: 550px) {
    transform: scale(0.85);
  }

  @media (max-width: 400px) {
    transform: scale(0.65);
  }
`

const Wrapper = styled.div`
  left: ${p => p.left}%;
  top: ${p => p.top}%;
  position: absolute;

  * {
    transition: all 0.6s ease;
  }
`

const generateShapes = () => {
  const margin = 0.2
  const spacing = 0.23
  let shapes = []
  // width, height, radius
  const sampler = poissonDiscSampler(1 + margin * 2, 1 + margin * 2, spacing)

  let sample

  while ((sample = sampler())) {
    shapes.push({
      position: [sample[0] - margin, sample[1] - margin]
    })
  }

  shapes.forEach(shape => {})

  const shapeList = Object.keys(FIGURE_SHAPES)

  shapes = shuffle(shapes)

  shapes = shapes.map((s, i) => ({
    position: s.position,
    shape: shapeList[i % shapeList.length]
  }))

  shapes = shuffle(shapes)

  shapes = shapes.map((s, i) => ({
    position: s.position,
    shape: s.shape,
    color: COLORS[Math.floor(Math.random() * COLORS.length)]
  }))

  return shapes
}

const Shape = ({ onlyBasicColor, shape }) => {
  const C = FIGURE_SHAPES[shape.shape]
  const contentCollision =
    shape.position[0] > 0.3 &&
    shape.position[0] < 0.7 &&
    shape.position[1] > 0.3 &&
    shape.position[1] < 0.7
  return (
    <Wrapper left={shape.position[0] * 100} top={shape.position[1] * 100}>
      <C color={onlyBasicColor || contentCollision ? COLORS[0] : shape.color} />
    </Wrapper>
  )
}

class Background extends Component {
  constructor () {
    super()
    this.state = { shapes: generateShapes() }
  }

  render () {
    const { location } = this.props

    return (
      <PreRoot>
        <Root>
          {this.state.shapes.map((s, i) => (
            <Shape
              onlyBasicColor={location.pathname === '/about'}
              key={i}
              shape={s}
            />
          ))}
        </Root>
      </PreRoot>
    )
  }
}

export default withRouter(Background)
