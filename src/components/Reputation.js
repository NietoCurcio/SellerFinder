import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Reputation = ({ reputation }) => {
  let stars = []
  for (let i = 0; i < reputation; i++) {
    stars.push(1)
  }
  return stars.map((star, index) => (
    <FontAwesomeIcon key={index} icon={faStar} />
  ))
}

export default Reputation
