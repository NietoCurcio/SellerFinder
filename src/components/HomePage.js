import React, { useEffect, useContext } from 'react'
import AppContext from '../context/appContext'
import Spinner from './SpinnerState'
import ProductItem from './ProductItem'

function HomePage() {
  const appContext = useContext(AppContext)

  useEffect(() => {
    appContext.getData()
  }, [])

  return (
    <div className="container">
      <h1 className="my-3">Most Purchased</h1>
      {appContext.loading ? (
        <Spinner />
      ) : (
        <ul className="list-unstyled">
          {appContext.mostPurchased.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              seller={appContext.sellers.find(
                (seller) => seller.id === product.sellerId
              )}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default HomePage
