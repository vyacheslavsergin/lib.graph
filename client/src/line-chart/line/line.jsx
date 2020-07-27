import React, {useRef, useEffect, useContext} from 'react'
import * as d3 from 'd3'

import {Context} from '../context'

import classes from './line.module.scss'

const Line = () => {

  const {
    chartPoints,
    shapeGenerator,
    sizes,
    transitionDuration,
  } = useContext(Context)

  const {width} = sizes
  const {lineGenerator} = shapeGenerator

  const ref = useRef(null)

  useEffect(() => {
    d3
    .select(ref.current)
    .append('path')
    .classed(classes.line, true)
  }, [])

  useEffect(() => {

    const updateChart = () => {

      const line = d3
      .select(ref.current)
      .select(`.${classes.line}`)

      const updatedPath = line
      .interrupt()
      .datum(chartPoints)
      .attr('d', lineGenerator)

      const pathLength = updatedPath.node()
      .getTotalLength()

      const transitionPath = d3
      .transition()
      .ease(d3.easeSin)
      .duration(transitionDuration)

      updatedPath
      .attr('stroke-dashoffset', pathLength)
      .attr('stroke-dasharray', pathLength)
      .transition(transitionPath)
      .attr('stroke-dashoffset', 0)
    }

    updateChart()

  }, [chartPoints, width, lineGenerator, transitionDuration])

  return (
    <g ref={ref}/>
  )
}

export default Line
