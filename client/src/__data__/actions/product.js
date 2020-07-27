import * as types from '../action-types'

export const fetchProductStart = () => ({
  type: types.FETCH_PRODUCT_START
})

export const fetchPageSuccess = (response) => ({
  type: types.FETCH_PRODUCT_SUCCESS,
  payload: response.data
})

export const fetchProductError = (e) => ({
  type: types.FETCH_PRODUCT_ERROR,
  error: e
})

export const retryProduct = () => ({
  type: types.PRODUCT_RETRY
})

export const fetchProduct = (productCode) => ({
  type: types.FETCH_PRODUCT,
  payload: productCode
})
