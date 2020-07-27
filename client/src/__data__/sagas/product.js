import { put, call } from 'redux-saga/effects'

import * as actions from '../../__data__/actions'
import { baseURL, qsList } from '../../keys'

import axios from '../services'

const fetchProduct = async (productCode) => {
  const url = `${baseURL}product?${qsList.productCode}=${productCode}`
  return axios.get(url)
}

export default function* sagaWorker (data) {
  try {
    yield put(actions.fetchProductStart())
    const payload = yield call(fetchProduct, data.payload)
    yield put(actions.fetchPageSuccess(payload))
    console.info('FETCH_PRODUCT_SUCCESS')
  } catch (e) {
    yield put(actions.fetchProductError(e))
    console.error(e)
  }
}
