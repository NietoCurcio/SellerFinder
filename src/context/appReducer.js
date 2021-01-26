import * as Actions from './actionTypes'

const AppReducer = (state, action) => {
  switch (action.type) {
    case Actions.FETCH_MOST:
      return { ...state, mostPurchased: action.payload }
    case Actions.FETCH_SELLERS:
      return { ...state, sellers: action.payload }
    case Actions.FETCH_PRODUCT:
      return { ...state, product: action.payload }
    case Actions.LOADING:
      return { ...state, loading: action.payload }
    case Actions.FETCH_FAILED:
      return {
        ...state,
        error: {
          ...state.error,
          msg: action.payload.msg,
          status: action.payload.status,
        },
        loading: false,
      }
    default:
      return state
  }
}

export default AppReducer
