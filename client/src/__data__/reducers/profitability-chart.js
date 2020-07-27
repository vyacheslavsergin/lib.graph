import {
  CREATE_PROFITABILITY_CHART,
  SET_CHART_POINTS_PROFITABILITY_CHART,
  SET_LINE_CHART_VALUE_PROFITABILITY_CHART,
  SET_ACTIVE_PERIOD_TYPE_PROFITABILITY_CHART,
  SET_INITIAL_STATE_PERIOD_PROFITABILITY_CHART,
} from '../action-types'

const initialState = {
  activePeriodType: '',
  cPoints: [],
  firstElementDataInit: {},
  isInitialStatePeriod: true,
  lastElementDataInit: {},
  periods: [],
  rawArray: [],
  selectedPeriodType: '',
}

const handlers = {
  [CREATE_PROFITABILITY_CHART]: (state, { data }) => ({
    ...state,
    activePeriodType: data.activePeriodType,
    cPoints: data.cPoints,
    firstElementDataInit: data.firstElementDataInit,
    isInitialStatePeriod: data.isInitialStatePeriod,
    lastElementDataInit: data.lastElementDataInit,
    periods: data.periods,
    rawArray: data.rawArray,
    selectedPeriodType: data.selectedPeriodType
  }),
  [SET_CHART_POINTS_PROFITABILITY_CHART]: (state, { chartPoints }) => ({ ...state, cPoints: chartPoints }),
  [SET_LINE_CHART_VALUE_PROFITABILITY_CHART]: (state, { lineChartValue }) => ({ ...state, lastElementDataInit: lineChartValue }),
  [SET_ACTIVE_PERIOD_TYPE_PROFITABILITY_CHART]: (state, { periodType }) => ({ ...state, activePeriodType: periodType }),
  [SET_INITIAL_STATE_PERIOD_PROFITABILITY_CHART]: (state, { isInitialStatePeriod }) => ({ ...state, isInitialStatePeriod }),
  DEFAULT: (state) => state
}

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
