import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Question.css'

const Question = ({ question }) => {
  let [user, setUser] = useState(null)
  let [username, setUsername] = useState('')

  useEffect(() => {
    const getUser = () => {
      const usersAPI = `http://127.0.0.1:8000/api/users/${question.user}/`
      const getUsers = axios.get(usersAPI)
      axios.all([getUsers]).then(
        axios.spread((...allData) => {
          setUser(allData[0].data)
        })
      )
    }

    if (user) {
      setUsername(user.username)
    }

    getUser()
  }, [question.user, user])

  return (
    <div className='question-container'>
      <div className='left-data'>
        <div className='votes'>{question.vote}{' '}votos</div>
        <div>{question.n_answers}{' '}respostas</div>
        <div>{question.n_views}{' '}visualizações</div>
      </div>
      <div className='question-title'><Link className='question-link' to={`/questions/${question.id}`}><h3>{question.title}</h3></Link></div>
      <div className='right-data'><span className='blue-name'>{username}</span> perguntou à {question.time}</div>
    </div>
  )
}

export default Question