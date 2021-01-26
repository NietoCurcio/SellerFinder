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
    product: {},
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

  const getProduct = async (id) => {
    setLoading(true)
    const promises = { product: null, seller: null, comments: null }
    promises.product = await fetch(baseUrl + `/products/${id}`)
      .then(
        (response) => response.json(),
        (err) => {
          const error = new Error(
            'Could not connect to the server. Failed to fetch product ' + err
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
    if (!promises.product) {
      dispatch({
        type: Actions.FETCH_FAILED,
        payload: { msg: 'Could not fetch product', status: 'danger' },
      })
      return
    }

    promises.seller = await fetch(
      baseUrl + `/sellers/${promises.product.sellerId}`
    )
      .then(
        (response) => response.json(),
        (err) => {
          const error = new Error(
            'Could not connect to the server. Failed to fetch seller ' + err
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

    if (!promises.seller) {
      dispatch({
        type: Actions.FETCH_FAILED,
        payload: { msg: 'Could not fetch seller', status: 'danger' },
      })
      return
    }
    // The application gets slow because of 4 fetch calls
    // product, seller, comments and authors of comments
    // but for sake of education...

    // To get faster I could put the comments inside the products object, comments: [{}, {}]
    // each object already with its authors
    // but as I said for education purpose I'll leave it like that
    // Because it's like a sql inner join
    const comments = await fetch(baseUrl + `/comments/?productId=${id}`)
      .then(
        (res) => res.json(),
        (err) => {
          const error = new Error(
            'Could not connect to the server. Failed to fetch comments ' + err
          )
          throw error
        }
      )
      .catch((err) => {
        dispatch({
          type: Actions.FETCH_FAILED,
          payload: { msg: err.message, status: 'danger' },
        })
      })

    if (comments) {
      const sellersId = comments.map((comment) => comment.sellerId)

      let queryUrl = ''
      sellersId.forEach((id) => {
        queryUrl = queryUrl + `id=${id}&`
      })

      const authors = await fetch(baseUrl + `/sellers/?${queryUrl}`)
        .then(
          (res) => res.json(),
          (err) => {
            const error = new Error(
              'Could not connect to the server. Failed to fetch authors comments ' +
                err
            )
            throw error
          }
        )
        .catch((err) => {
          dispatch({
            type: Actions.FETCH_FAILED,
            payload: { msg: err.message, status: 'danger' },
          })
        })

      const commentsFinal = comments.map((comment) => {
        const object = { comment: null, author: null }
        object.comment = comment.comment
        object.author = authors.find((author) => author.id === comment.sellerId)
        return object
      })
      promises.comments = commentsFinal
    } else {
      dispatch({
        type: Actions.FETCH_FAILED,
        payload: { msg: 'Failed to fetch comments', status: 'danger' },
      })
      return undefined
    }

    if (promises.seller && promises.product && promises.comments) {
      dispatch({ type: Actions.FETCH_PRODUCT, payload: promises })
    } else {
      dispatch({
        type: Actions.FETCH_FAILED,
        payload: { msg: 'Failed to fetch product', status: 'danger' },
      })
    }

    setLoading(false)
  }

  const searchProduct = async (input) => {
    setLoading(true)
    const products = await fetch(baseUrl + '/products')
      .then(
        (res) => res.json(),
        (err) => {
          const error = new Error(
            'Could not connect to the server, failed to fetch products ' + err
          )
          throw error
        }
      )
      .catch((err) => {
        dispatch({
          type: Actions.FETCH_FAILED,
          payload: { msg: err.message, status: 'danger' },
        })
      })

    if (!products) {
      dispatch({
        type: Actions.FETCH_FAILED,
        payload: { msg: 'Failed to fetch products', status: 'danger' },
      })
      return
    }

    if (products.length) {
      dispatch({
        type: Actions.FETCH_PRODUCTS,
        payload: products,
      })
      dispatch({
        type: Actions.SEARCH_PRODUCT,
        payload: input,
      })
    } else {
      dispatch({
        type: Actions.FETCH_FAILED,
        payload: { msg: 'Failed to fetch products', status: 'danger' },
      })
    }
    setLoading(false)
  }

  const removeAlert = async () => {
    setTimeout(() => {
      dispatch({
        type: Actions.REMOVE_ALERT,
      })
    }, 15000)
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
        product: state.product,
        search: state.search,
        loading: state.loading,
        error: state.error,
        getData,
        getProduct,
        searchProduct,
        setLoading,
        removeAlert,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export default AppState
