import React, {useState, useEffect} from 'react'
import { useParams, useLocation } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Button from 'react-bootstrap/Button'
import Answer from '../../components/Answers/Answer'
import axios from 'axios'
import arrowup from './../../assets/img/arrowup.png'
import arrowdown from './../../assets/img/arrowdown.png'
import './QuestionPage.css'
import MakeNewAnswer from '../../components/MakeNewAnswer/MakeNewAnswer'

const QuestionPage = () => {
    const location = useLocation()
    const { user } = location.state
    let { id } = useParams()
    let [usertoken, setUsertoken] = useState('');
    let [qUser, setqUser] = useState(null);
    let [username, setUsername] = useState('');
    let [userpic, setUserPic] = useState('');
    let [userPoints, setUserPoints] = useState('')
    let [userPage, setUserPage] = useState('')
    let [question, setQuestion] = useState(null);
    let [answers, setAnswers] = useState([]);

    const voteUP = () => {
      const voteAPI = `http://127.0.0.1:8000/api/questions/${id}/vote-up/`
      const getVote = axios.get(voteAPI)
      axios.all([getVote]).then(
        axios.spread((...allData) => {
          const allDataVote = allData[0].data
          setQuestion(allDataVote)
        })
      )
    }

    const voteDown = () => {
      const voteAPI = `http://127.0.0.1:8000/api/questions/${id}/vote-down/`
      const getVote = axios.get(voteAPI)
      axios.all([getVote]).then(
        axios.spread((...allData) => {
          const allDataVote = allData[0].data
          setQuestion(allDataVote)
        })
      )
    }

    useEffect( () => {
      const fetchData = () => {
        const questionAPI = `http://127.0.0.1:8000/api/questions/${id}/`
        const answersAPI = `http://127.0.0.1:8000/api/answers/`
    
        const getQuestion = axios.get(questionAPI)
        const getAsnwers = axios.get(answersAPI)
        axios.all([getQuestion, getAsnwers]).then(
          axios.spread((...allData) => {
            const allDataQuestion = allData[0].data
            const allDataAnswers = allData[1].data
    
            setQuestion(allDataQuestion)
            setAnswers(allDataAnswers)
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
                        <Button variant="text" size="small" style={{display: "flex", flexDirection: "column"}}><img src={arrowup} alt="arrowUP" onClick={voteUP}/></Button>
                        <p className='qp-vote'>{question?.vote}</p>
                        <Button variant="text" size="small" style={{display: "flex", flexDirection: "column"}}><img src={arrowdown} alt="arrowDOWN" onClick={voteDown}/></Button>
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
                        ? (<Answer key={index} answer={answer} user={user}/>)
                        : null
                    ))}
                </div>
                <div className='qp-mna' ><MakeNewAnswer user={user}/></div>
            </div>
        </div>
    </div>
  )
}

export default QuestionPage