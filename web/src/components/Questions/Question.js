import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Question.css'

const Question = ({ question }) => {
  let [user, setUser] = useState(null)
  let [username, setUsername] = useState('')
  let [time, setTime] = useState('')

  useEffect(() => {
    const getTime = () => {
      var question_date = new Date(question.created);
      var actual_date = new Date();
      let qtime = ''
  
      const diff = actual_date.getTime() - question_date.getTime();
  
      let msec = diff;
      const hh = Math.floor(msec / 1000 / 60 / 60);
      msec -= hh * 1000 * 60 * 60;
      const mm = Math.floor(msec / 1000 / 60);
      msec -= mm * 1000 * 60;
      const ss = Math.floor(msec / 1000);
      msec -= ss * 1000;
  
      if (hh > 0) qtime = hh.toString() + ' horas';
      else {
        if (mm > 0) qtime = mm.toString() + ' minutos';
        else {
          if (ss > 0) qtime = ss.toString() + ' segundos';
          else qtime = 'now';
        }
      }
      setTime(qtime)
    }
    getTime();
  }, [question.created])

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

    getUser()
  }, [question.user])

  useEffect(() => {
    if (user) {
      setUsername(user.username)
    }
  }, [user])

  return (
    <div className='question-container'>
      <div className='left-data'>
        <div className='votes'>{question.vote}{' '}votos</div>
        <div>{question.n_answers}{' '}respostas</div>
        <div>{question.n_views}{' '}visualizações</div>
      </div>
      <div className='right-data'>
        <div className='question-title'><Link className='question-link' to={`/questions/${question.id}`}><h3>{question.title}</h3></Link></div>
        <div className='right-datab'><span className='blue-name'>{username}</span> perguntou à {time}</div>
      </div>
    </div>
  )
}

export default Question