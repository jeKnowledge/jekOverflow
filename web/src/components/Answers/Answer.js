import React from 'react'
import './Answer.css'

const Answer = ({ answer }) => {
  return (
    <div className='answer-container'>
      <div className='answer-body'>{answer.body}</div>
      <div className='space'></div>
    </div>
  )
}

export default Answer