import React, {useEffect, useRef} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {t} from '../../../../locales/t'
import * as actions from '../../../../__data__/actions'
import {getDate, isEmpty} from '../../../../utils'
import {Typography} from '../typography'
import {
  DataPoint,
  Gradient,
  Line,
  LineChart,
  XYAxis,
} from '../../../../line-chart'

import LineChartButton from './line-chart-button'
import LineChartValue from './line-chart-value'
import {setLineChartValueHandler} from './helpers'
import classes from './line-chart-component.module.scss'

const LineChartComponent = (props) => {

  const {
    createProfitabilityChart,
    profitabilityChart: {
      cPoints,
      firstElementDataInit,
      isInitialStatePeriod,
      lastElementDataInit,
      periods,
      selectedPeriodType,
    },
    widget
  } = props

  const lineChartValueRef = useRef(null)

  useEffect(() => {
    createProfitabilityChart(widget)
  }, [createProfitabilityChart, widget])

  useEffect(() => {
    if (isEmpty(lastElementDataInit)) {
      return
    }

    setLineChartValueHandler(lineChartValueRef.current, lastElementDataInit.value)
  }, [cPoints, lastElementDataInit])

  if (isEmpty(cPoints)) {
    return null
  }

  const transitionDuration = 800

  const options = {
    heightChart: 265,
    margin: {
      top: 45,
      right: 24,
      bottom: 50,
      left: 24,
      mobileRight: 24,
      mobileLeft: 4
    },
    yScaleDomain: 0,
    curveCardinalTension: 0.5,
    offsetOptions: {
      phoneViewportOffset: 62,
      desktopViewportOffset: 72
    },
    ticks: {
      ticksYCountLeft: 30,
      ticksYCountRight: 5,
      ticksXCountBottom: 4
    }
  }

  const { date } = lastElementDataInit

  if (!date) {
    return null
  }

  const isOnePeriod = periods.length === 1

  let periodVal = null

  if (isOnePeriod) {
    periodVal = `${t['for.period']} ${getDate(firstElementDataInit.date)} - ${getDate(lastElementDataInit.date)}`
  }

  if (isInitialStatePeriod && !isOnePeriod) {
    periodVal = t['over.period']
  }

  if (!isInitialStatePeriod) {
    periodVal = `на ${getDate(date)}`
  }

  return (
    <div>
      <Typography.Headline mode="h2">
        {t['profitability.title']} {periodVal}
      </Typography.Headline>
      <LineChartValue ref={lineChartValueRef} />
      {
        !isOnePeriod && <div className={classes['control-panel']}>
          {periods.map((period) => (<LineChartButton
            key={period.periodType}
            periodType={period.periodType}
            startDate={period.startDate}
            title={period.title}
          />))}
        </div>
      }
      <LineChart
        chartPoints={cPoints}
        lastElementDataInit={lastElementDataInit}
        lineChartValue={lastElementDataInit}
        lineChartValueRef={lineChartValueRef}
        options={options}
        selectedPeriodType={selectedPeriodType}
        setLineChartValueHandler={setLineChartValueHandler}
        transitionDuration={transitionDuration}
      >
        <XYAxis />
        <Gradient />
        <DataPoint>
          <Line />
        </DataPoint>
      </LineChart>
    </div>
  )
}

LineChartComponent.propTypes = {
  createProfitabilityChart: PropTypes.func.isRequired,
  profitabilityChart: PropTypes.shape({
    cPoints: PropTypes.array,
    firstElementDataInit: PropTypes.object,
    isInitialStatePeriod: PropTypes.bool,
    lastElementDataInit: PropTypes.object,
    periods: PropTypes.arrayOf(PropTypes.shape({
      periodType: PropTypes.string,
      title: PropTypes.string,
      startDate: PropTypes.string
    })),
    selectedPeriodType: PropTypes.string
  }).isRequired,
  widget: PropTypes.shape({
    data: PropTypes.shape({
      chartPoint: PropTypes.array
    }),
    properties: PropTypes.shape({
      defaultSelectedPeriodType: PropTypes.string,
      periods: PropTypes.array
    })
  }).isRequired
}

const mapStateToProps = (state) => ({
  profitabilityChart: state.profitabilityChart
})

const mapDispatchToProps = {
  createProfitabilityChart: actions.createProfitabilityChart
}

export default connect(mapStateToProps, mapDispatchToProps)(LineChartComponent)
