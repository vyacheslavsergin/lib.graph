import React from 'react'
import PropTypes from 'prop-types'
import { t } from '../../../../../locales/t'

const LineChartTitle = ({ periodVal }) => (
  <h3>{t['profitability.title']} {periodVal}</h3>
)

LineChartTitle.propTypes = {
  periodVal: PropTypes.string
}

LineChartTitle.defaultProps = {
  periodVal: ''
}

export default LineChartTitle
