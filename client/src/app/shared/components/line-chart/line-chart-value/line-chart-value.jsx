import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

import classes from './line-chart-value.module.scss'

const LineChartValue = forwardRef((props, ref) => <div className={classes['line-chart-value']} ref={ref} />)

LineChartValue.propTypes = {
  ref: PropTypes.object
}

LineChartValue.displayName = 'LineChartValue'

export default LineChartValue
