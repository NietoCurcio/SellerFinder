import React, { useContext, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import AppContext from '../context/appContext'
import Spinner from './SpinnerState'
import Reputation from './Reputation'

const ProductDetail = () => {
  const params = useParams()
  const history = useHistory()
  const {
    product: { product, seller, comments },
    getProduct,
    loading,
  } = useContext(AppContext)

  useEffect(() => {
    getProduct(params.id)
    // console.log(appContext.product)
    // https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
    // https://medium.com/dailyjs/i-never-understood-javascript-closures-9663703368e8
  }, [])

  return loading ? (
    <div className="container mt-3">
      <Spinner />
    </div>
  ) : (
    <div className="container product-detail mt-3">
      <h1>{product.name}</h1>
      {console.log(comments)}
      <div>
        <img src={product.image} alt={product.name} />
        <div>
          <Reputation reputation={seller.reputation} />
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
