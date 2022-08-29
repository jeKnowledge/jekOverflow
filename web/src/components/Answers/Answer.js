import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import arrowup from './../../assets/img/arrowup.png'
import arrowdown from './../../assets/img/arrowdown.png'
import './Answer.css'
import MakeNewComment from '../MakeNewComment/MakeNewComment'
import Comments from '../Comments/Comments'

const Answer = ({ answer }) => {
  let [upd_answer, setUPDAnswer] = useState(null)
  const [comments, setComments] = useState([])

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
      const commentsAPI = `http://127.0.0.1:8000/api/comments/`
  
      const getAsnwers = axios.get(answersAPI)
      const getComments = axios.get(commentsAPI)
      axios.all([getAsnwers, getComments]).then(
        axios.spread((...allData) => {
          const allDataAnswers = allData[0].data
          const allDataComments = allData[1].data
  
          setUPDAnswer(allDataAnswers)
          setComments(allDataComments)
        })
      )
    }

    fetchData()
  },[answer])

  return (
    <div>
      <div className='answer-container'>
        <div>
          <Button variant="text" size="small" style={{display: "flex", flexDirection: "column"}}><img src={arrowup} alt="arrowUP" onClick={voteUP}/></Button>
          <p className='qp-vote'>{upd_answer?.vote}</p>
          <Button variant="text" size="small" style={{display: "flex", flexDirection: "column"}}><img src={arrowdown} alt="arrowDOWN" onClick={voteDown}/></Button>
        </div>
        <div className='answer-body'>{upd_answer?.body}</div>
      </div>
      <div className='answer-allcomments'>
        <div className='answer-comments' >
          {comments.map((comment, index) => (
            comment.answer === Number(answer.id)
            ? (<Comments key={index} comment={comment} />)
            : null
          ))}
        </div>
        <div className='space'></div>
        <MakeNewComment id={answer.id} user={answer.user}/>
      </div>
    </div>
  )
}

export default Answer