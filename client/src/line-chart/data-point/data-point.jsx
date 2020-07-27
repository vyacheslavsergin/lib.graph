import React, {useRef, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import is from 'is_js'

import {isPhoneViewport, isEmpty, noop} from '../../utils'
import {Context} from '../context'
import {getDate} from '../shared'

import Circle from './circle'
import DataLine from './data-line'
import Info from './info'
import classes from './data-point.module.scss'
import dataLineClasses from './data-line.module.scss'
import infoClasses from './info.module.scss'
import circleClasses from './circle.module.scss'

const DataPoint = ({ children }) => {

    const {
        chartPoints,
        lineChartValue,
        lineChartValueRef,
        node,
        scale,
        setLineChartValueHandler,
        sizes,
    } = useContext(Context)

    const { height, offsetLineChart, viewportWidth, width } = sizes
    const { xScale, yScale } = scale

    const dataLine = useRef(null)
    const focus = useRef(null)
    const info = useRef(null)
    const infoDetect = useRef(null)
    const overlay = useRef(null)

    let dataLineRef = null
    let dataLineYRef = null
    let focusRef = null
    let infoRef = null
    let infoDetectRef = null
    let overlayRef = null
    let svgRect = null
    let svgRectLeft = null
    let textRef = null

    let isLeftEdgeOfGraph = false

    let timeout = null

    const additionalHeight = -20
    const bisectDate = d3.bisector((d) => d.date).left
    const offsetLg = 20
    const offset = isPhoneViewport() ? 0 : offsetLg
    const offsetXRect = 72
    const offsetYRect = -42
    const timeoutDelay = 200

    const showCrosshair = () => {
        dataLineRef.classed(dataLineClasses['is-hidden'], false)
        focusRef.classed(circleClasses['is-hidden'], false)
        infoRef.classed(infoClasses['is-hidden'], false)
    }

    const hideCrosshair = () => {
        dataLineRef.classed(dataLineClasses['is-hidden'], true)
        focusRef.classed(circleClasses['is-hidden'], true)
        infoRef.classed(infoClasses['is-hidden'], true)

        if (isEmpty(lineChartValue)) {
            return
        }

        setLineChartValueHandler(lineChartValueRef.current, lineChartValue.value)
    }

    const generateCrosshair = () => {
        showCrosshair()

        const correspondingDate = xScale.invert(d3.mouse(overlay.current)[0])
        const i = bisectDate(chartPoints, correspondingDate, 1)
        const d0 = chartPoints[i - 1]
        const d1 = chartPoints[i]

        if (d1 === void 0) {
            return
        }

        const currentPoint = correspondingDate - d0.date > d1.date - correspondingDate ? d1 : d0

        focusRef.attr('transform', `translate(${xScale(currentPoint.date)}, ${yScale(currentPoint.value)})`)
        dataLineRef.attr('transform', `translate(${xScale(currentPoint.date)}, 0)`)

        dataLineYRef
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', additionalHeight)
        .attr('y2', height)

        textRef.text(getDate(currentPoint.date))

        if (is.touchDevice()) {
            if (!d3.event.targetTouches) {
                return
            }
        }

        infoDetectRef.attr('transform', `translate(${xScale(currentPoint.date) - offsetXRect}, ${offsetYRect})`)

        /**
         * isLeftEdgeOfGraph
         * infoRef is located on the left edge of the graph
         */
        isLeftEdgeOfGraph = infoDetect.current.getBoundingClientRect().left - offset < svgRectLeft

        if (!isLeftEdgeOfGraph) {
            infoRef.attr('transform', `translate(${xScale(currentPoint.date) - offsetXRect}, ${offsetYRect})`)
        } else {
            infoRef.attr('transform', `translate(-4, ${offsetYRect})`)
        }

        if (isEmpty(lineChartValue)) {
            return
        }

        setLineChartValueHandler(lineChartValueRef.current, currentPoint.value)
    }

    const updateDataPoint = () => {
        dataLineRef = d3.select(dataLine.current)
        dataLineYRef = dataLineRef.select('line')
        focusRef = d3.select(focus.current)
        infoRef = d3.select(info.current)
        infoDetectRef = d3.select(infoDetect.current)
        overlayRef = d3.select(overlay.current)
        svgRect = node.current.getBoundingClientRect()
        svgRectLeft = svgRect.left
        textRef = infoRef.select('text')

        infoRef.attr('transform', `translate(0, ${offsetYRect})`)
        infoDetectRef.attr('transform', `translate(0, ${offsetYRect})`)

        overlayRef
        .attr('width', width - offsetLineChart)
        .attr('height', height)
        .on('mouseover', generateCrosshair)
        .on('mouseout', hideCrosshair)
        .on('touchend', () => {
            timeout = setTimeout(() => {
                hideCrosshair()
            }, timeoutDelay)
        })
        .on('mousemove', generateCrosshair)
        .on('touchstart', generateCrosshair)
        .on('touchmove', generateCrosshair)
    }

    useEffect(() => () => clearTimeout(timeout), [])

    useEffect(() => {
        if (width <= 0) {
            return
        }

        document.documentElement.addEventListener("touchmove", noop, true)

        updateDataPoint()

        return () => window.removeEventListener('touchmove', noop)

    }, [chartPoints, width, viewportWidth, updateDataPoint])

    return (
        <g className={classes.dataPoint}>
            <DataLine ref={dataLine} isHidden />
            <Info ref={infoDetect} isHidden />
            <Info ref={info} isHidden />
            {children}
            <Circle ref={focus} isHidden />
            <rect className={classes.overlay} ref={overlay} />
        </g>
    )
}

DataPoint.propTypes = {
    children: PropTypes.object
}

DataPoint.defaultProps = {
    children: null
}

export default DataPoint
