import React, { useRef, useEffect, useContext } from 'react'
import * as d3 from 'd3'

import { Context } from '../context'
import {
  linearGradient,
  uniqueIdList,
} from '../shared'

const Gradient = () => {

  const {
    chartPoints,
    shapeGenerator,
    sizes,
  } = useContext(Context)

  const { height, width } = sizes

  const { areaGenerator } = shapeGenerator

  const ref = useRef(null)

  useEffect(() => {

    if (!ref.current) {
      return
    }

    d3.select(ref.current)
    .append('linearGradient')
    .attr('id', uniqueIdList.areaGradient)
    .attr('gradientUnits', 'userSpaceOnUse')
    .attr('x1', 0)
    .attr('y1', height)
    .attr('x2', 0)
    .attr('y2', 0)
    .selectAll('stop')
    .data([
      { offset: '0%', color: linearGradient.toTop.to },
      { offset: '100%', color: linearGradient.toTop.top }
    ])
    .enter()
    .append('stop')
    .attr('offset', (d) => d.offset)
    .attr('stop-color', (d) => d.color)

    d3.select(ref.current)
    .append('path')
    .style('fill', `url('#${uniqueIdList.areaGradient}')`)

  }, [chartPoints, width, height])

  useEffect(() => {

    if (!ref.current) {
      return
    }

    d3.select(ref.current)
    .select('path')
    .datum(chartPoints)
    .transition()
    .duration(0)
    .attr('d', areaGenerator)
  })

  return <g ref={ref} />
}

export default Gradient
