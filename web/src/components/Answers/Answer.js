import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import arrowup from './../../assets/img/arrowup.png'
import arrowdown from './../../assets/img/arrowdown.png'
import './Answer.css'

const Answer = ({ answer }) => {
  let [upd_answer, setUPDAnswer] = useState(null)

  const voteUP = () => {
    const voteAPI = `http://127.0.0.1:8000/api/answers/${answer.id}/vote-up/`
    const getVote = axios.get(voteAPI)
    axios.all([getVote]).then(
      axios.spread((...allData) => {
        const allDataVote = allData[0].data
        setUPDAnswer(allDataVote)
      })
    )
  }

  const voteDown = () => {
    const voteAPI = `http://127.0.0.1:8000/api/answers/${answer.id}/vote-down/`
    const getVote = axios.get(voteAPI)
    axios.all([getVote]).then(
      axios.spread((...allData) => {
        const allDataVote = allData[0].data
        setUPDAnswer(allDataVote)
      })
    )
  }

  useEffect( () => {
    const fetchData = () => {
      const answersAPI = `http://127.0.0.1:8000/api/answers/${answer.id}/`
  
      const getAsnwers = axios.get(answersAPI)
      axios.all([getAsnwers]).then(
        axios.spread((...allData) => {
          const allDataAnswers = allData[0].data
  
          setUPDAnswer(allDataAnswers)
        })
      )
    }

    fetchData()
  },[answer])

  return (
    <div className='answer-container'>
      <div>
        <Button variant="text" size="small" style={{display: "flex", flexDirection: "column"}}><img src={arrowup} alt="arrowUP" onClick={voteUP}/></Button>
        <p className='qp-vote'>{upd_answer?.vote}</p>
        <Button variant="text" size="small" style={{display: "flex", flexDirection: "column"}}><img src={arrowdown} alt="arrowDOWN" onClick={voteDown}/></Button>
      </div>
      <div className='answer-body'>{upd_answer?.body}</div>
      <div className='space'></div>
    </div>
  )
}

export default Answer