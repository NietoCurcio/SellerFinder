import React from 'react'
import Media from 'react-bootstrap/Media'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'

const ProductItem = ({ product, seller }) => {
  const history = useHistory()

  const Reputation = ({ reputation }) => {
    let stars = []
    for (let i = 0; i < reputation; i++) {
      stars.push(1)
    }
    return stars.map((star, index) => (
      <FontAwesomeIcon key={index} icon={faStar} />
    ))
  }

  const handleClick = (event, productId) => {
    history.push(`/${productId}`)
  }

  return (
    <Media
      onClick={(event, productId) => handleClick(event, product.id)}
      as="li"
      className="product-item my-4"
    >
      <img
        width={94}
        height={94}
        className="mr-3"
        src={product.image}
        alt={product.name}
      />
      <Media.Body>
        <h5>{product.name}</h5>
        <h4>{product.price}</h4>
        <div>
          <Reputation reputation={seller.reputation} />
        </div>
      </Media.Body>
    </Media>
  )
}

export default ProductItem
