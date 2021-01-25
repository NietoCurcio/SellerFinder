import * as Actions from './actionTypes'

const AppReducer = (state, action) => {
  switch (action.type) {
    case Actions.FETCH_MOST:
      return { ...state, loading: false, mostPurchased: action.payload }
    case Actions.LOADING:
      return { ...state, loading: true }
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
