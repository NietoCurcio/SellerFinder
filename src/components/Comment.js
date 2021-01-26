import React from 'react'
import Reputation from './Reputation'

const Comment = ({ comment }) => {
  return (
    <div className="comment mt-3">
      <div>
        <h6>{comment.author.name}</h6>
        <Reputation reputation={comment.author.reputation} />
      </div>
      <p>{comment.comment}</p>
    </div>
  )
}

export default Comment
