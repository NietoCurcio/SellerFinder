import React, { useEffect, useContext } from 'react'
import AppContext from '../context/appContext'
import Spinner from './SpinnerState'
import ProductItem from './ProductItem'

function HomePage() {
  const appContext = useContext(AppContext)

  useEffect(() => {
    appContext.getMostPurchased()
  }, [])

  return (
    <div className="container">
      <h1 className="my-3">Most Purchased</h1>
      {appContext.loading ? (
        <Spinner />
      ) : (
        appContext.mostPurchased.map((product) => (
          <ul className="list-unstyled">
            <ProductItem key={product.id} product={product} />
          </ul>
        ))
      )}
    </div>
  )
}

export default HomePage
