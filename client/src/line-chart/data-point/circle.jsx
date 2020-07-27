import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { uniqueIdList } from '../shared'

import classes from './circle.module.scss'

const Circle = forwardRef(({ isHidden }, ref) => (
  <g
    className={classnames({
      [classes['is-hidden']]: isHidden
    })}
    ref={ref}
  >
    <defs>
      <filter id={uniqueIdList.circle} x="-15%" y="-15%" width="130%" height="130%">
        <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />
        <feColorMatrix
          type="matrix"
          result="matrixOut"
          in="offOut"
          values="0.3 0 0 0 0 0 0.3 0 0 0 0 0 0.3 0 0 0 0 0 1 0"
        />
        <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="1" />
        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
      </filter>
    </defs>
    <circle
      className={classes.circle}
      r="6"
      filter={`url(#${uniqueIdList.circle})`}
    />
    <circle
      className={classes['circle-fill']}
      r="4"
    />
  </g>
))

Circle.propTypes = {
  isHidden: PropTypes.bool,
  ref: PropTypes.object
}

Circle.defaultProps = {
  isHidden: false
}

Circle.displayName = 'Circle'

export default Circle
