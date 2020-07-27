import React from 'react'
import PropTypes from 'prop-types'

import {InvestedMoneyList} from './invested-money-list/invested-money-list'

export const InvestedMoney = ({ data }) => (
  <InvestedMoneyList data={data} />
)

InvestedMoney.propTypes = {
  data: PropTypes.array
}

InvestedMoney.defaultProps = {
  data: []
}
