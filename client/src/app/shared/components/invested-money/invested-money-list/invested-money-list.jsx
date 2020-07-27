import React from 'react'
import PropTypes from 'prop-types'

import {InvestedMoneyItem} from '../invested-money-item/invested-money-item'

import classes from './invested-money-list.module.scss'

export const InvestedMoneyList = ({ data }) => {
  const elements = () => data.map((item) => (<InvestedMoneyItem key={item.title} item={item} />))
  return (
    <ul className={classes.list}>
      {elements()}
    </ul>
  )
}

InvestedMoneyList.propTypes = {
  data: PropTypes.array
}

InvestedMoneyList.defaultProps = {
  data: []
}
