import * as Actions from './actionTypes'

const AppReducer = (state, action) => {
  switch (action.type) {
    case Actions.FETCH_MOST:
      return { ...state, mostPurchased: action.payload }
    case Actions.FETCH_SELLERS:
      return { ...state, sellers: action.payload }
    case Actions.FETCH_PRODUCT:
      return { ...state, product: action.payload }
    case Actions.FETCH_PRODUCTS:
      return { ...state, products: action.payload }
    case Actions.SEARCH_PRODUCT:
      return {
        ...state,
        search: state.products.filter((product) => {
          return product.name
            .toLowerCase()
            .includes(action.payload.toLowerCase())
        }),
      }
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
    case Actions.REMOVE_ALERT:
      return { ...state, error: { msg: '', status: '' } }
    default:
      return state
  }
}

export default AppReducer
