import {combineReducers} from 'redux'

import product from './product'
import profitabilityChart from './profitability-chart'

export default combineReducers({
  product, profitabilityChart
})
