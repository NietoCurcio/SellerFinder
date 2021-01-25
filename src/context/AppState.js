import React, { useReducer } from 'react'
import AppReducer from './appReducer'
import AppContext from './appContext'
import * as Actions from './actionTypes'
import baseUrl from '../config/baseUrl'

const AppState = (props) => {
  const initialState = {
    mostPurchased: [],
    search: [],
    loading: false,
    error: {
      msg: '',
      status: '',
      //   sucesss, danger
    },
  }

  const [state, dispatch] = useReducer(AppReducer, initialState)

  const getMostPurchased = async () => {
    setLoading()
    const data = await fetch(baseUrl + '/mostPurchased')
      .then(
        (response) => response.json(),
        (err) => {
          const error = new Error('Could not connect to the server. ' + err)
          throw error
        }
      )
      .catch((error) => {
        dispatch({
          type: Actions.FETCH_FAILED,
          payload: { msg: error.message, status: 'danger' },
        })
      })
    if (data) {
      dispatch({ type: Actions.FETCH_MOST, payload: data })
    }
  }

  const setLoading = () => {
    dispatch({ type: Actions.LOADING })
  }

  return (
    <AppContext.Provider
      value={{
        mostPurchased: state.mostPurchased,
        search: state.search,
        loading: state.loading,
        error: state.error,
        getMostPurchased,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export default AppState
