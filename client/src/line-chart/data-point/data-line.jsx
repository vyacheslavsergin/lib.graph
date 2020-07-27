import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import classes from './data-line.module.scss'

const DataLine = forwardRef(({ isHidden }, ref) => (
  <g
    className={classnames({
      [classes.isHidden]: isHidden
    })}
    ref={ref}
  >
    <line className={classes.line} />
  </g>
))

DataLine.propTypes = {
  isHidden: PropTypes.bool,
  ref: PropTypes.object
}

DataLine.defaultProps = {
  isHidden: false
}

DataLine.displayName = 'DataLine'

export default DataLine
