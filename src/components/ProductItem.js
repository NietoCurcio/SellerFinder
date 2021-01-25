import React from 'react'
import Media from 'react-bootstrap/Media'

const ProductItem = ({ product, seller }) => {
  return (
    <Media as="li">
      <img
        width={64}
        height={64}
        className="mr-3"
        src={product.image}
        alt={product.name}
      />
      <Media.Body>
        <h5>{product.name}</h5>
        <h4>{product.price}</h4>
        <h3>{seller.name}</h3>
        <h2>{seller.reputation}</h2>
      </Media.Body>
    </Media>
  )
}

export default ProductItem
