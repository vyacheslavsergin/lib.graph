import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { calculateDataToGraph } from '../../../../../utils'

import * as actions from '../../../../../__data__/actions'

import classes from './line-chart-button.module.scss'
import {connect} from "react-redux";

const LineChartButton = (props) => {

  const {
    title,
    periodType,
    startDate,
    profitabilityChart: {
      activePeriodType,
      rawArray,
    },
    setActivePeriodType,
    setChartPoints,
    setInitialStatePeriod,
    setLineChartValue,
  } = props

  const setStateToGraph = () => {
    if (periodType === activePeriodType) {
      return
    }

    const dataRawArray = rawArray.filter((item) => new Date(startDate) <= new Date(item.date))

    const dataFiltered = calculateDataToGraph(dataRawArray)

    const lastElementData = dataFiltered[dataFiltered.length - 1]

    setLineChartValue(lastElementData)

    setActivePeriodType(periodType)

    setChartPoints(dataFiltered)

    setInitialStatePeriod(true)
  }

  return (
    <button
      className={classnames(classes.btn, {
        [classes['is-active']]: periodType === activePeriodType
      })}
      type="button"
      onClick={setStateToGraph}
    >
      <span className={classes.title}>{title}</span>
    </button>
  )
}

LineChartButton.propTypes = {
  title: PropTypes.string.isRequired,
  periodType: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  profitabilityChart: PropTypes.shape({
    activePeriodType: PropTypes.string,
    rawArray: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.instanceOf(Date),
      value: PropTypes.number
    })),
    selectedPeriodType: PropTypes.string,
  }).isRequired,
  setActivePeriodType: PropTypes.func.isRequired,
  setChartPoints: PropTypes.func.isRequired,
  setInitialStatePeriod: PropTypes.func.isRequired,
  setLineChartValue: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  profitabilityChart: state.profitabilityChart
})

const mapDispatchToProps = {
  setActivePeriodType: actions.setActivePeriodTypeProfitabilityChart,
  setChartPoints: actions.setChartPointsProfitabilityChart,
  setInitialStatePeriod: actions.setInitialStatePeriodProfitabilityChart,
  setLineChartValue: actions.setLineChartValueProfitabilityChart,
}

export default connect(mapStateToProps, mapDispatchToProps)(LineChartButton)
