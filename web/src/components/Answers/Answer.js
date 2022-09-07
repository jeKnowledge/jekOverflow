import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import arrowup from './../../assets/img/arrowup.png'
import arrowdown from './../../assets/img/arrowdown.png'
import arrowupP from './../../assets/img/arrowupP.png'
import arrowdownP from './../../assets/img/arrowdownP.png'
import './Answer.css'
import MakeNewComment from '../MakeNewComment/MakeNewComment'
import Comments from '../Comments/Comments'
import { getUserFromLocalStorage } from '../../utility/utils'

const Answer = ({ answer }) => {
  let [upd_answer, setUPDAnswer] = useState(null)
  const [comments, setComments] = useState([])
  const [voteFilter, setVoteFilter] = useState(null);

  const voteUP = () => {
    if (voteFilter.length !== 0 && voteFilter[0].vote === 1) return

    const auth = localStorage.getItem('Authorization');
    if (voteFilter.length !== 0 && voteFilter[0].vote === -1) {
      axios.put(`http://127.0.0.1:8000/api/answers-vote/${voteFilter[0].id}/`, {
        'user': getUserFromLocalStorage().sub,
        'answer': answer.id,
        'vote': 1
        },
        {
          headers: {
              "Authorization": auth,
              "Content-Type": 'application/json'
          }
        }
      )
      .then((res) => {
        console.log(res)
        const voteAPI = `http://127.0.0.1:8000/api/answers/${answer.id}/vote-up/`
        const repUPAPI = `http://127.0.0.1:8000/api/users/${answer.user}/rep-up/`
        const getVote = axios.get(voteAPI)
        const getRep = axios.get(repUPAPI)
        axios.all([getVote, getRep]).then(
          axios.spread((...allData) => {
            const allDataVote = allData[0].data
            setUPDAnswer(allDataVote)
          })
        )
        window.location.reload(false)
      })
      .catch(error => console.error(error))
    }
    else {
      console.log('a')
      axios.post(`http://127.0.0.1:8000/api/answers-vote/`, {
        'answer': answer.id,
        'vote': 1
        },
        {
          headers: {
              "Authorization": auth,
              "Content-Type": 'application/json'
          }
        }
      )
      .then((res) => {
        console.log(res)
        const voteAPI = `http://127.0.0.1:8000/api/answers/${answer.id}/vote-up/`
        const repUPAPI = `http://127.0.0.1:8000/api/users/${answer.user}/rep-up/`
        const getVote = axios.get(voteAPI)
        const getRep = axios.get(repUPAPI)
        axios.all([getVote, getRep]).then(
          axios.spread((...allData) => {
            const allDataVote = allData[0].data
            setUPDAnswer(allDataVote)
          })
        )
        window.location.reload(false)
      })
      .catch(error => console.error(error))
    }
  }

  const voteDown = () => {
    if (voteFilter.length !== 0 && voteFilter[0].vote === -1) return

    const auth = localStorage.getItem('Authorization');
    if (voteFilter.length !== 0 && voteFilter[0].vote === 1) {
      axios.put(`http://127.0.0.1:8000/api/answers-vote/${voteFilter[0].id}/`, {
        'user': getUserFromLocalStorage().sub,
        'answer': answer.id,
        'vote': -1
        },
        {
          headers: {
              "Authorization": auth,
              "Content-Type": 'application/json'
          }
        }
      )
      .then((res) => {
        console.log(res)
        const voteAPI = `http://127.0.0.1:8000/api/answers/${answer.id}/vote-down/`
        const repDOWNAPI = `http://127.0.0.1:8000/api/users/${answer.user}/rep-down/`
        const getVote = axios.get(voteAPI)
        const getRep = axios.get(repDOWNAPI)
        axios.all([getVote, getRep]).then(
          axios.spread((...allData) => {
            const allDataVote = allData[0].data
            setUPDAnswer(allDataVote)
          })
        )
        window.location.reload(false)
      })
      .catch(error => console.error(error))
    }
    else {
      axios.post(`http://127.0.0.1:8000/api/answers-vote/`, {
        'answer': answer.id,
        'vote': -1
        },
        {
          headers: {
              "Authorization": auth,
              "Content-Type": 'application/json'
          }
        }
      )
      .then((res) => {
        console.log(res)
        const voteAPI = `http://127.0.0.1:8000/api/answers/${answer.id}/vote-down/`
        const repDOWNAPI = `http://127.0.0.1:8000/api/users/${answer.user}/rep-down/`
        const getVote = axios.get(voteAPI)
        const getRep = axios.get(repDOWNAPI)
        axios.all([getVote, getRep]).then(
          axios.spread((...allData) => {
            const allDataVote = allData[0].data
            setUPDAnswer(allDataVote)
          })
        )
        window.location.reload(false)
      })
      .catch(error => console.error(error))
    }

  }

  useEffect( () => {
    const fetchData = () => {
      const user = getUserFromLocalStorage()

      const answersAPI = `http://127.0.0.1:8000/api/answers/${answer.id}/`
      const commentsAPI = `http://127.0.0.1:8000/api/comments/`
      const voteFilterAPI = `http://127.0.0.1:8000/api/answers-vote/${answer.id}/${user.sub}/`

      const getAsnwers = axios.get(answersAPI)
      const getComments = axios.get(commentsAPI)
      const getVoteFilter = axios.get(voteFilterAPI)
      axios.all([getAsnwers, getComments, getVoteFilter]).then(
        axios.spread((...allData) => {
          setUPDAnswer(allData[0].data)
          setComments(allData[1].data)
          setVoteFilter(allData[2].data)
        })
      )
    }

    fetchData()
  },[answer])

  return (
    <div>
      <div className='answer-container'>
        <div>
          {voteFilter? <Button variant="text" size="small" style={{display: "flex", flexDirection: "column"}}><img src={voteFilter[0]?.vote === 1? arrowupP : arrowup} alt="arrowUP" onClick={voteUP}/></Button>:null}
          <p className='qp-vote'>{upd_answer?.vote}</p>
          {voteFilter? <Button variant="text" size="small" style={{display: "flex", flexDirection: "column"}}><img src={voteFilter[0]?.vote === -1? arrowdownP : arrowdown} alt="arrowDOWN" onClick={voteDown}/></Button>:null}
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
        <MakeNewComment id={answer.id}/>
      </div>
    </div>
  )
}

export default Answer