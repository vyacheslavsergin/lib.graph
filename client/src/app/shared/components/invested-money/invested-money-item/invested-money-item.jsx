import React from 'react'
import PropTypes from 'prop-types'

import { toFormat } from '../../../../../utils'

import classes from './invested-money-item.module.scss'

export const InvestedMoneyItem = ({item}) => {
  const {color, title, value} = item

  const val = toFormat(value)

  const percent = '%'

  return (
    <li className={classes.item}>
      <div className={classes['col-1']}>
        <div className={classes.circle} style={{backgroundColor: color}}/>
        <div className={classes.title}>{title}</div>
      </div>
      <div><b>{val}{percent}</b></div>
    </li>
  )
}

InvestedMoneyItem.propTypes = {
  item: PropTypes.object
}

InvestedMoneyItem.defaultProps = {
  item: {}
}
