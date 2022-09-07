import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Button from 'react-bootstrap/Button'
import Answer from '../../components/Answers/Answer'
import axios from 'axios'
import arrowup from './../../assets/img/arrowup.png'
import arrowupP from './../../assets/img/arrowupP.png'
import arrowdown from './../../assets/img/arrowdown.png'
import arrowdownP from './../../assets/img/arrowdownP.png'
import './QuestionPage.css'
import MakeNewAnswer from '../../components/MakeNewAnswer/MakeNewAnswer'
import { getUserFromLocalStorage } from '../../utility/utils'

const QuestionPage = () => {
    let { id } = useParams()
    let [usertoken, setUsertoken] = useState('');
    let [qUser, setqUser] = useState(null);
    let [username, setUsername] = useState('');
    let [userpic, setUserPic] = useState('');
    let [userPoints, setUserPoints] = useState('')
    let [userPage, setUserPage] = useState('')
    let [question, setQuestion] = useState(null);
    let [answers, setAnswers] = useState([]);
    const [voteFilter, setVoteFilter] = useState(null);

    const voteUP = () => {
      if (voteFilter.length !== 0 && voteFilter[0].vote === 1) return

      const auth = localStorage.getItem('Authorization');
      if (voteFilter.length !== 0 && voteFilter[0].vote === -1) {
        axios.put(`http://127.0.0.1:8000/api/questions-vote/${voteFilter[0].id}/`, {
          'user': getUserFromLocalStorage().sub,
          'question': id,
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
          const voteAPI = `http://127.0.0.1:8000/api/questions/${id}/vote-up/`
          const repUPAPI = `http://127.0.0.1:8000/api/users/${question.user}/rep-up/`
          const getVote = axios.get(voteAPI)
          const getRep = axios.get(repUPAPI)
          axios.all([getVote, getRep]).then(
            axios.spread((...allData) => {
              const allDataVote = allData[0].data
              setQuestion(allDataVote)
            })
          )

          window.location.reload(false)
        })
        .catch(error => console.error(error))
      }
      else {
        axios.post(`http://127.0.0.1:8000/api/questions-vote/`, {
          'user': getUserFromLocalStorage().sub,
          'question': id,
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
          const voteAPI = `http://127.0.0.1:8000/api/questions/${id}/vote-up/`
          const repUPAPI = `http://127.0.0.1:8000/api/users/${question.user}/rep-up/`
          const getVote = axios.get(voteAPI)
          const getRep = axios.get(repUPAPI)
          axios.all([getVote, getRep]).then(
            axios.spread((...allData) => {
              const allDataVote = allData[0].data
              setQuestion(allDataVote)
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
        axios.put(`http://127.0.0.1:8000/api/questions-vote/${voteFilter[0].id}/`, {
          'user': getUserFromLocalStorage().sub,
          'question': id,
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
          const voteAPI = `http://127.0.0.1:8000/api/questions/${id}/vote-down/`
          const repDOWNAPI = `http://127.0.0.1:8000/api/users/${question.user}/rep-down/`
          const getVote = axios.get(voteAPI)
          const getRep = axios.get(repDOWNAPI)
          axios.all([getVote, getRep]).then(
            axios.spread((...allData) => {
              const allDataVote = allData[0].data
              setQuestion(allDataVote)
            })
          )

          window.location.reload(false)
        })
        .catch(error => console.error(error))
      }
      else {
        axios.post(`http://127.0.0.1:8000/api/questions-vote/`, {
          'user': getUserFromLocalStorage().sub,
          'question': id,
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
          const voteAPI = `http://127.0.0.1:8000/api/questions/${id}/vote-down/`
          const repDOWNAPI = `http://127.0.0.1:8000/api/users/${question.user}/rep-down/`
          const getVote = axios.get(voteAPI)
          const getRep = axios.get(repDOWNAPI)
          axios.all([getVote, getRep]).then(
            axios.spread((...allData) => {
              const allDataVote = allData[0].data
              setQuestion(allDataVote)
            })
          )

          window.location.reload(false)
        }
        )
        .catch(error => console.error(error))
      }
    }

    useEffect( () => {
      const fetchData = () => {
        const user = getUserFromLocalStorage()

        const questionAPI = `http://127.0.0.1:8000/api/questions/${id}/`
        const answersAPI = `http://127.0.0.1:8000/api/answers/`
        const voteFilterAPI = `http://127.0.0.1:8000/api/questions-vote/${id}/${user.sub}/`
    
        const getQuestion = axios.get(questionAPI)
        const getAsnwers = axios.get(answersAPI)
        const getVoteFilter = axios.get(voteFilterAPI)
        axios.all([getQuestion, getAsnwers, getVoteFilter]).then(
          axios.spread((...allData) => {
            setQuestion(allData[0].data)
            setAnswers(allData[1].data)
            setVoteFilter(allData[2].data)
          })
        )
      }

      const viewUpdate = () => {
        const viewAPI = `http://127.0.0.1:8000/api/questions/${id}/nview-update/`
        const getView = axios.get(viewAPI)
        axios.all([getView]).then(
          axios.spread((...allData) => {
            const allDataView = allData[0].data
            setQuestion(allDataView)
          })
        )
      }

      fetchData()
      viewUpdate()
    },[id])
    
    useEffect(() => {
      if(question) setUsertoken(question.user)
    }, [question])

    useEffect(() => {
      const getqUser = () => {
        const usersAPI = `http://127.0.0.1:8000/api/users/${usertoken}/`
        const getUsers = axios.get(usersAPI)
        axios.all([getUsers]).then(
          axios.spread((...allData) => {
            setqUser(allData[0].data)
          })
        )
      }
      
      if(usertoken) getqUser()
    }, [usertoken])

    useEffect(() => {
      if(qUser) {
        setUsername(qUser.username)
        setUserPic(qUser.image)
        setUserPoints(qUser.reputation)
        setUserPage(`/users/${qUser.id_token}`)
      }
    }, [qUser])

    return (
    <div className='questionpage'>
        <div className='qp-top'><Navbar /></div>
        <div className='qp-bottom'>
            <Sidebar page={'questions'}/>
            <div className='qp-bottom-content'>
                <div className='qp-bottom-content-top'>
                    <div className='qp-title'><p>{question?.title}</p></div>
                </div>
                <div className='qp-body'>
                    <div className='qp-body-left'>
                        {voteFilter? <Button variant="text" size="small" style={{display: "flex", flexDirection: "column"}}><img src={voteFilter[0]?.vote === 1? arrowupP : arrowup} alt="arrowUP" onClick={voteUP}/></Button>:null}
                        <p className='qp-vote'>{question?.vote}</p>
                        {voteFilter? <Button variant="text" size="small" style={{display: "flex", flexDirection: "column"}}><img src={voteFilter[0]?.vote === -1? arrowdownP : arrowdown} alt="arrowDOWN" onClick={voteDown}/></Button>:null}
                    </div>
                    <div className='qp-body-right'><p>{question?.body}</p></div>
                </div>
                <div className='qp-user'>
                  <img className='qp-userpic' src={userpic} alt='userpic' />
                  <div>
                    <a className='qp-username' href={userPage}>{username}</a>
                    <p>{userPoints}</p>
                  </div>
                </div>
                <div className='qp-answers-count'>{question?.n_answers} respostas</div>
                <div className='answers-list'>
                    {answers.map((answer, index) => (
                        answer.question === Number(id)
                        ? (<Answer key={index} answer={answer}/>)
                        : null
                    ))}
                </div>
                <div className='qp-mna' ><MakeNewAnswer/></div>
            </div>
        </div>
    </div>
  )
}

export default QuestionPage