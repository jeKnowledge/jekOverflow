import React from 'react'
import { Link } from 'react-router-dom'
import './Question.css'

const Question = ({ question }) => {
  return (
    <div className='question-container'>
      <div className='left-data'>
        <div className='votes'>{question.vote}{' '}votos</div>
        <div>{question.n_answers}{' '}respostas</div>
        <div>{question.n_views}{' '}visualizações</div>
      </div>
      <div className='question-title'><Link className='question-link' to={`/questions/${question.id}`}><h3>{question.title}</h3></Link></div>
      <div className='right-data'>Utilizador perguntou à {question.time}</div>
    </div>
  )
}

export default Question