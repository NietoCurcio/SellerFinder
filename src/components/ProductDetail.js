import React, { useContext, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import AppContext from '../context/appContext'
import Spinner from './SpinnerState'
import Reputation from './Reputation'
import Comment from './Comment'

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
      <div className="detail-card">
        <img src={product.image} alt={product.name} />
        <div>
          <div className="reputation">
            <div>
              <Reputation reputation={seller.reputation} />
            </div>
            <h3>{seller.name}</h3>
            <h4>Sold: {product.sold}</h4>
          </div>
          <h3>{product.name}</h3>
          <h4>{product.description}</h4>
          <h3>Price - {product.price}</h3>
          <h3>Seller's Location - {seller.location}</h3>
        </div>
      </div>
      <h3 className="my-2">Opinions about this product</h3>
      {comments.map((comment) => (
        <Comment comment={comment} />
      ))}
    </div>
  )
}

export default ProductDetail
