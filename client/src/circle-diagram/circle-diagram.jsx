import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

import classes from './circle-diagram.module.scss'

/**
 * Renders CircleDiagram.
 * @param {Array} data
 * [{value: 0.5, color: "#5fe3c0"}, {value: 0.1, color: "#8662c7"}]
 * @param {Object} options The options for CircleDiagram.
 * @return {JSX} JSX Component
 */
export const CircleDiagram = ({ data, options }) => {

  const node = useRef(null)

  const [gRef, setGRef] = useState(null)

  const stringifyOptions = JSON.stringify(options)

  const { width, height, radius, innerRadius, padAngle } = options

  let g = null

  const calculatingCenter = 2

  const pie = d3.pie()
  .sort(null)
  .value((d) => d.value)
  .padAngle(padAngle)

  let arcPath = null

  const cent = {
    x: width / calculatingCenter,
    y: height / calculatingCenter
  }

  const draw = () => {
    arcPath = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(radius)

    const paths = g
    .selectAll('path')
    .data(pie(data))

    paths
    .enter()
    .append('path')
    .attr('class', classes.arc)
    .attr('d', arcPath)
    .attr('fill', (d) => d.data.color)
  }

  const update = () => {
    const paths = g
    .selectAll('path')

    arcPath = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(radius)

    paths.attr('d', arcPath)
  }

  useEffect(() => {
    setGRef(node.current)
  }, [stringifyOptions])

  if (gRef) {
    g = d3.select(gRef)

    const pathLength = g.selectAll('path').size()

    if (pathLength === 0) {
      draw()
    } else {
      update()
    }
  }

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${cent.x}, ${cent.y})`} ref={node} />
    </svg>
  )
}

CircleDiagram.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
  })).isRequired,
  options: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    radius: PropTypes.number,
    innerRadius: PropTypes.number,
    padAngle: PropTypes.number
  })
}

CircleDiagram.defaultProps = {
  options: {
    width: 160,
    height: 160,
    radius: 80,
    innerRadius: 65,
    padAngle: 0.02
  }
}
