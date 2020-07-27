import React, {useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

import {
    directionAxis,
    getAbbreviationMonthNames,
    mathRound,
} from '../shared'

const Axis = (props) => {

    const {
        className,
        lastElementDataInit,
        offsetLineChart,
        orient,
        scale,
        selectedPeriodType,
        ticks,
        transform,
        width,
    } = props

    const ref = useRef(null)

    const axisWidth = width - offsetLineChart
    const monthNames = getAbbreviationMonthNames()

    let ticksYCount = ticks.ticksYCountLeft

    if (orient === directionAxis.right) {
        ticksYCount = ticks.ticksYCountRight
    }

    const updateAxis = () => {

        const tickList = []

        if (orient === directionAxis.left) {

            const axis = d3
            .axisLeft(scale)
            .ticks(ticksYCount)
            .tickSize(-axisWidth)

            const g = d3
            .select(ref.current)
            .call(axis)

            g
            .selectAll('.tick line')
            .attr('class', '')

            g
            .selectAll('.tick line').select((d) => {
                tickList.push(d)
            })

            const result = mathRound(tickList, lastElementDataInit.value)

            g
            .selectAll('.tick line')
            .filter((d) => {
                if (d === result) {
                    return d === result
                }
                return null
            })
            .attr('class', 'is-active')
        }

        if (orient === directionAxis.right) {
            const axis = d3
            .axisLeft(scale)
            .ticks(ticksYCount)
            .tickSize(-width)

            const g = d3
            .select(ref.current)
            .call(axis)

            g.selectAll('.tick line').attr('class', '')
        }

        if (orient === directionAxis.bottom) {

            const axis = d3
            .axisBottom(scale)
            .ticks(ticks.ticksXCountBottom)
            .tickFormat((d) => {
                if (selectedPeriodType === 'Y') {
                    return d.getFullYear()
                }

                return monthNames[d.getMonth()]
            })

            d3.select(ref.current).call(axis)
        }
    }

    useEffect(() => {

        const renderAxis = () => {
            let axis = null

            if (orient === directionAxis.bottom) {
                axis = d3.axisBottom(scale)
            }

            if (orient === directionAxis.left) {
                axis = d3.axisLeft(scale)
            }

            if (orient === directionAxis.right) {
                axis = d3.axisLeft(scale)
            }

            d3.select(ref.current).call(axis)
        }

        renderAxis()
    }, [orient, scale])

    useEffect(() => updateAxis())

    return (
        <g
            className={className}
            ref={ref}
            transform={transform}
        />
    )
}

Axis.propTypes = {
    lastElementDataInit: PropTypes.shape({
        date: PropTypes.instanceOf(Date),
        value: PropTypes.number
    }).isRequired,
    offsetLineChart: PropTypes.number.isRequired,
    orient: PropTypes.string.isRequired,
    scale: PropTypes.func.isRequired,
    selectedPeriodType: PropTypes.oneOf(['M', 'Y']).isRequired,
    ticks: PropTypes.shape({
        ticksYCountLeft: PropTypes.number,
        ticksYCountRight: PropTypes.number,
        ticksXCountBottom: PropTypes.number
    }).isRequired,
    className: PropTypes.string.isRequired,
    transform: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired
}

export default Axis
