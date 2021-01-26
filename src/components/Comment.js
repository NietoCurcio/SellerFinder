import React from 'react'
import Reputation from './Reputation'

const Comment = ({ comment }) => {
  return (
    <div className="container comment mt-3">
      <div>
        <h6>{comment.author.name}</h6>
        <Reputation reputation={comment.author.reputation} />
      </div>
      <p>{comment.comment}</p>
      {console.log(comment)}
    </div>
  )
}

export default Comment
