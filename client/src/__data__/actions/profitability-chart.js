import * as types from '../action-types'
import { calculateDataToGraph } from '../../utils'

export const createProfitabilityChart = (widget) => {

  const {
    properties: { defaultSelectedPeriodType, periods },
    data: { chartPoints }
  } = widget

  const startDateInit = periods.find((period) => period.periodType === defaultSelectedPeriodType)

  const rawArray = chartPoints.map((n) => ({
    date: new Date(n.date),
    value: Number(n.value)
  }))

  const dataRawArrayInit = rawArray.filter(({ date }) => new Date(startDateInit.startDate) <= new Date(date))

  const data = calculateDataToGraph(dataRawArrayInit)

  const firstElementDataInit = data[0]

  const cPoints = data.filter(({ date }) => new Date(startDateInit.startDate) <= new Date(date))

  const lastElementDataInit = cPoints[cPoints.length - 1]

  const selectedPeriodType = defaultSelectedPeriodType.charAt(defaultSelectedPeriodType.length - 1)

  return {
    type: types.CREATE_PROFITABILITY_CHART,
    data: {
      activePeriodType: defaultSelectedPeriodType,
      cPoints,
      firstElementDataInit,
      isInitialStatePeriod: true,
      lastElementDataInit,
      periods,
      rawArray,
      selectedPeriodType,
    }
  }
}

export const setChartPointsProfitabilityChart = (chartPoints) => ({
  type: types.SET_CHART_POINTS_PROFITABILITY_CHART,
  chartPoints
})

export const setLineChartValueProfitabilityChart = (lastElementData) => ({
  type: types.SET_LINE_CHART_VALUE_PROFITABILITY_CHART,
  lineChartValue: lastElementData
})

export const setActivePeriodTypeProfitabilityChart = (periodType) => ({
  type: types.SET_ACTIVE_PERIOD_TYPE_PROFITABILITY_CHART,
  periodType
})

export const setInitialStatePeriodProfitabilityChart = (isInitialStatePeriod) => ({
  type: types.SET_INITIAL_STATE_PERIOD_PROFITABILITY_CHART,
  isInitialStatePeriod
})
