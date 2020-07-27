import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import * as actions from '../../__data__/actions'

import {ComponentFactory} from '../component-factory/component-factory'

const LibGraphPage = (props) => {

  const {initData, fetchProduct} = props

  useEffect(() => {
    fetchProduct('params')
  }, [fetchProduct])

  if (!initData?.data?.body) {
    return <div>loading</div>
  }

  return (
    <div>
      {initData.data.body.widgets.map((widget, idx) => {
        return <ComponentFactory key={idx} widget={widget}/>
      })}
    </div>
  )
}

LibGraphPage.propTypes = {
  initData: PropTypes.shape({
    data: PropTypes.shape({
      body: PropTypes.object
    })
  }),
  fetchProduct: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    initData: state.product
  }
}

// const mapDispatchToProps = {
//   fetchProduct: actions.fetchProduct,
//   retryProduct: actions.retryProduct
// }

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProduct: (params) => dispatch(actions.fetchProduct(params)),
    retryProduct: () => dispatch(actions.retryProduct())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LibGraphPage)
