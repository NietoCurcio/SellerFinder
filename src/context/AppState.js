import React, { useReducer } from 'react'
import AppReducer from './appReducer'
import AppContext from './appContext'
import * as Actions from './actionTypes'
import baseUrl from '../config/baseUrl'

const AppState = (props) => {
  const initialState = {
    mostPurchased: [],
    search: [],
    sellers: [],
    products: [],
    loading: true,
    error: {
      msg: '',
      status: '',
      //   sucesss, danger
    },
  }

  const [state, dispatch] = useReducer(AppReducer, initialState)

  const getData = async () => {
    setLoading(true)
    const mostData = await fetch(baseUrl + '/most')
      .then(
        (response) => response.json(),
        (err) => {
          const error = new Error(
            'Could not connect to the server. Failed to fetch most purchased ' +
              err
          )
          throw error
        }
      )
      .catch((error) => {
        dispatch({
          type: Actions.FETCH_FAILED,
          payload: { msg: error.message, status: 'danger' },
        })
      })
    if (mostData) {
      dispatch({ type: Actions.FETCH_MOST, payload: mostData })
    }

    const sellersData = await fetch(baseUrl + '/sellers')
      .then(
        (response) => response.json(),
        (err) => {
          const error = new Error(
            'Could not connect to the server. Failed to fetch sellers ' + err
          )
          throw error
        }
      )
      .catch((error) => {
        dispatch({
          type: Actions.FETCH_FAILED,
          payload: { msg: error.message, status: 'danger' },
        })
      })
    if (sellersData) {
      dispatch({ type: Actions.FETCH_SELLERS, payload: sellersData })
    }

    setLoading(false)
  }

  const setLoading = (option) => {
    dispatch({ type: Actions.LOADING, payload: option })
  }

  return (
    <AppContext.Provider
      value={{
        mostPurchased: state.mostPurchased,
        sellers: state.sellers,
        products: state.products,
        search: state.search,
        loading: state.loading,
        error: state.error,
        getData,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export default AppState
