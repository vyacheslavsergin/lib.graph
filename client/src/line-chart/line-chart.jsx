import React, {useRef, useEffect, useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import throttle from 'lodash/throttle'

import {isPhoneViewport, noop} from '../utils'
import {Context} from './context'
import {throttleWait} from './shared'
import classes from './line-chart.module.scss'

/**
 * Renders LineChart.
 * @param {Function} setLineChartValueHandler
 * This way is necessary to improve performance Internet Explorer 11
 * В случае если необходимо отображать данные над графиком, используется подход с нативным javascript, он необходимом для оптимизации перерендера в браузере Internet Explorer 11.
 * export const setLineChartValueHandler = (node, value) => {}
 * node - lineChartValueRef.current
 * value - lineChartValue.value

 * @param {Array} chartPoints
 * chartPoints
 * [{date: new Date(2019-04-17), value: 0.00000473}, {date: new Date(2019-04-18), value: -0.00001034}]
 *
 * @param {Object} children LineChart has React components into itself.
 *
 * @param {Object} lastElementDataInit
 * Data for creating a dash point line that displays the last point on the graph.
 * Данные для создания штрихпунктирной линии, отображающей последнюю точку на графике.
 * {date: new Date(2020-04-02), value: 1.697346096744412}
 *
 * @param {Object} lineChartValue
 * node - lineChartValueRef.current
 *
 * @param {Object} lineChartValueRef
 * value - lineChartValue.value
 *
 * @param {Object} options
 * settings for building graphics
 *
 * @param {String} selectedPeriodType
 * tickFormat
 *
 * @param {Number} transitionDuration
 * Duration animation.
 *
 * @return {JSX} JSX Component
 */
const LineChart = ({
  chartPoints,
  children,
  lastElementDataInit,
  lineChartValue,
  lineChartValueRef,
  options,
  selectedPeriodType,
  setLineChartValueHandler,
  transitionDuration,
}) => {

  const node = useRef(null)

  const {
    curveCardinalTension,
    heightChart,
    margin,
    offsetOptions,
    ticks,
    yScaleDomain,
  } = options

  const setMargin = useCallback(() => ({
    top: margin.top,
    right: isPhoneViewport() ? margin.mobileRight : margin.right,
    bottom: margin.bottom,
    left: isPhoneViewport() ? margin.mobileLeft : margin.left
  }), [margin])

  const marginTransformed = setMargin()

  let offsetLineChart = offsetOptions.desktopViewportOffset

  if (isPhoneViewport()) {
    offsetLineChart = offsetOptions.phoneViewportOffset
  } else {
    offsetLineChart = offsetOptions.desktopViewportOffset
  }

  const [width, changeWidth] = useState(0)
  const height = heightChart - marginTransformed.top - marginTransformed.bottom
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth)

  const onResize = () => {
    if (!node.current) {
      return false
    }

    const bounds = node.current.getBoundingClientRect()

    setViewportWidth(window.innerWidth)

    return changeWidth(bounds.width - setMargin().left - setMargin().right)
  }

  const onResizeMemoized = useCallback(onResize, [setMargin])

  useEffect(() => {
    window.addEventListener('resize', throttle(onResizeMemoized, throttleWait))
    return () => window.removeEventListener('resize', onResizeMemoized)
  }, [onResizeMemoized])

  useEffect(() => onResizeMemoized(), [onResizeMemoized, chartPoints])

  const xMin = d3.min(chartPoints, (d) => d.date)
  const xMax = d3.max(chartPoints, (d) => d.date)
  const yMin = d3.min(chartPoints, (d) => d.value)
  const yMax = d3.max(chartPoints, (d) => d.value)

  const xScale = d3
  .scaleTime()
  .domain([xMin, xMax])
  .range([0, width - offsetLineChart])

  const xScaleAxis = d3
  .scaleTime()
  .domain([xMin, xMax])
  // .range([0, width])
  .range([0, width - offsetLineChart])

  const yScale = d3.scaleLinear()
  .domain([yMin - yScaleDomain, yMax])
  .range([height, 0])
  .nice()

  const lineGenerator = d3.line()
  .x((d) => xScale(d.date))
  .y((d) => yScale(d.value))
  .curve(d3.curveCardinal.tension(curveCardinalTension))

  const areaGenerator = d3.area()

  .x((d) => xScale(d.date))
  .y0(height)
  .y1((d) => yScale(d.value))
  .curve(d3.curveCardinal.tension(curveCardinalTension))

  const sizes = {height, offsetLineChart, viewportWidth, width}
  const scale = {xScale, xScaleAxis, yScale}
  const shapeGenerator = {areaGenerator, lineGenerator}

  return (
    <Context.Provider
      value={{
        chartPoints,
        lastElementDataInit,
        lineChartValue,
        lineChartValueRef,
        node,
        scale,
        selectedPeriodType,
        setLineChartValueHandler,
        shapeGenerator,
        sizes,
        ticks,
        transitionDuration,
      }}
    >
      <div className={classes['line-chart-wrapper']}>
        <div className={classes['line-chart-container']} ref={node}>
          <svg
            width={width + marginTransformed.left + marginTransformed.right}
            height={height + marginTransformed.top + marginTransformed.bottom}
          >
            <g transform={`translate(${marginTransformed.left}, ${marginTransformed.top})`}>
              {children}
            </g>
          </svg>
        </div>
      </div>
    </Context.Provider>
  )
}

LineChart.propTypes = {
  chartPoints: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    value: PropTypes.number
  })).isRequired,
  children: PropTypes.node.isRequired,
  lastElementDataInit: PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    value: PropTypes.number
  }).isRequired,
  lineChartValue: PropTypes.shape({
    date: PropTypes.instanceOf(Date),
    value: PropTypes.number
  }),
  lineChartValueRef: PropTypes.object.isRequired,
  options: PropTypes.object,
  selectedPeriodType: PropTypes.oneOf(['M', 'Y']),
  setLineChartValueHandler: PropTypes.func,
  transitionDuration: PropTypes.number
}

LineChart.defaultProps = {
  lastElementDataInit: {},
  lineChartValue: {},
  options: {
    heightChart: 255,
    margin: {
      top: 40,
      right: 24,
      bottom: 50,
      left: 24,
      mobileRight: 24,
      mobileLeft: 4
    },
    yScaleDomain: 0,
    curveCardinalTension: 0.5,
    offsetOptions: {
      phoneViewportOffset: 52,
      desktopViewportOffset: 72
    },
    ticks: {
      ticksYCountLeft: 30,
      ticksYCountRight: 5
    }
  },
  selectedPeriodType: 'M',
  setLineChartValueHandler: noop,
  transitionDuration: 500
}

export default LineChart
