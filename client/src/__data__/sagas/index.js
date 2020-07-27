import { takeEvery } from 'redux-saga/effects'

import * as types from '../action-types'

import sagaProduct from './product'

export function* sagaWatcher () {
  yield takeEvery(types.FETCH_PRODUCT, sagaProduct)
}
