import React, { useContext, useEffect } from 'react'
import AppContext from '../context/appContext'
import ProductItem from './ProductItem'
import Spinner from './SpinnerState'

const Search = () => {
  const appContext = useContext(AppContext)

  useEffect(() => {
    setTimeout(() => {
      if (appContext.loading) appContext.setLoading(false)
    }, 15000)
  }, [])

  return appContext.loading ? (
    <div className="container mt-3">
      <Spinner />
    </div>
  ) : (
    <div className="container mt-3">
      <h1>Search Products</h1>
      {!appContext.search.length ? (
        <h3>There's no products with this name</h3>
      ) : (
        appContext.search.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            seller={appContext.sellers.find(
              (seller) => seller.id === product.sellerId
            )}
          />
        ))
      )}
    </div>
  )
}

export default Search
