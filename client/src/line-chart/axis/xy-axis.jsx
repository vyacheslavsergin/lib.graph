import React, { useContext } from 'react'

import { Context } from '../context'
import { directionAxis } from '../shared'

import Axis from './axis'
import classes from './axis.module.scss'

const XYAxis = () => {

  const {
    lastElementDataInit,
    scale,
    selectedPeriodType,
    sizes,
    ticks,
  } = useContext(Context)

  const { height, offsetLineChart, width } = sizes
  const { xScaleAxis, yScale } = scale

  const options = {
    lastElementDataInit,
    offsetLineChart,
    selectedPeriodType,
    ticks,
    width,
  }

  const xSettings = {
    ...options,
    className: classes['x-axis'],
    orient: directionAxis.bottom,
    scale: xScaleAxis,
    transform: `translate(0, ${height})`,
  }

  const ySettings = {
    ...options,
    className: classes['y-axis'],
    orient: directionAxis.left,
    scale: yScale,
    transform: 'translate(0, 0)',
  }

  const ySettingsRight = {
    ...options,
    className: classes['y-axis-right'],
    orient: directionAxis.right,
    scale: yScale,
    transform:` translate(${width}, 0)`,
  }

  return (
    <g>
      <Axis {...xSettings} />
      <Axis {...ySettings} />
      <Axis {...ySettingsRight} />
    </g>
  )
}

export default XYAxis
