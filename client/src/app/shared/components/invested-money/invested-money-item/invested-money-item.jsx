import React from 'react'
import PropTypes from 'prop-types'

import classes from './invested-money-item.module.scss'

export const InvestedMoneyItem = ({ item }) => {
  const percent = '%'
  return (
    <li className={classes.item}>
      <div className={classes['col-1']}>
        <div className={classes.circle} style={{ backgroundColor: item.color }} />
        <div className={classes.title}>{item.title}</div>
      </div>
      <div><b>{item.value}{percent}</b></div>
    </li>
  )
}

InvestedMoneyItem.propTypes = {
  item: PropTypes.object
}

InvestedMoneyItem.defaultProps = {
  item: {}
}
