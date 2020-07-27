import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { uniqueIdList } from '../shared'

import classes from './info.module.scss'

const Info = forwardRef(({ isHidden }, ref) => (
  <g
    className={classnames({
      [classes['is-hidden']]: isHidden
    })}
    ref={ref}
  >
    <defs>
      <filter id={uniqueIdList.info} x="-15%" y="0" width="130%" height="200%">
        <feOffset result="offOut" in="SourceGraphic" dx="0" dy="15" />
        <feColorMatrix
          result="matrixOut"
          in="offOut"
          type="matrix"
          values="0.9 0 0 0 0 0 0.9 0 0 0 0 0 0.9 0 0 0 0 0 1 0"
        />
        <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="8" />
        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
      </filter>
    </defs>
    <rect
      className={classes.rect}
      filter={`url(#${uniqueIdList.info})`}
      height="32"
      rx="20"
      width="144"
    />
    <text
      className={classes.text}
      alignmentBaseline="middle"
      fontSize="12"
      strokeWidth="0"
      textAnchor="middle"
      x="72"
      y="16"
    />
  </g>
))

Info.propTypes = {
  ref: PropTypes.object,
  isHidden: PropTypes.bool.isRequired
}

Info.defaultProps = {
  isHidden: false
}

Info.displayName = 'Info'

export default Info
