import {
  FETCH_PRODUCT_START,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_ERROR,
  PRODUCT_RETRY
} from '../action-types'

const initialState = {
  data: {},
  loading: false,
  error: null
}

const handlers = {
  [FETCH_PRODUCT_START]: (state) => ({ ...state, loading: true, error: null }),
  [FETCH_PRODUCT_SUCCESS]: (state, { payload }) => ({ ...state, data: payload, loading: false }),
  [FETCH_PRODUCT_ERROR]: (state, { error }) => ({ ...state, loading: false, error }),
  [PRODUCT_RETRY]: (state) => ({ ...state, data: {}, loading: false }),
  DEFAULT: (state) => state
}

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
