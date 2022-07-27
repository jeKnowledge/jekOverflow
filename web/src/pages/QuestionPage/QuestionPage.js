import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Button from 'react-bootstrap/Button'
import Answer from '../../components/Answers/Answer'
import axios from 'axios'
import arrowup from './../../assets/img/arrowup.png'
import arrowdown from './../../assets/img/arrowdown.png'
import qbutton from './../../assets/img/qbutton.png'
import './QuestionPage.css'
import MakeNewAnswer from '../../components/MakeNewAnswer/MakeNewAnswer'

const QuestionPage = () => {
    let { id } = useParams()
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
    

    return (
    <div className='questionpage'>
        <div className='qp-top'><Navbar /></div>
        <div className='qp-bottom'>
            <Sidebar />
            <div className='qp-bottom-content'>
                <div className='qp-bottom-content-top'>
                    <div className='qp-title'><p>{question?.title}</p></div>
                    <div className='qp-bct2'><Button variant="btn btn-default" size="sm" style={{padding: '0px',  border: 'none'}} href="/make-question/"><img src={qbutton} alt="qbutton"/></Button></div>
                </div>
                <div className='qp-body'>
                    <div className='qp-body-left'>
                        <Button variant="text" size="small" style={{display: "flex", flexDirection: "column"}}><img src={arrowup} alt="arrowUP" onClick={voteUP}/></Button>
                        <p className='qp-vote'>{question?.vote}</p>
                        <Button variant="text" size="small" style={{display: "flex", flexDirection: "column"}}><img src={arrowdown} alt="arrowDOWN" onClick={voteDown}/></Button>
                    </div>
                    <div className='qp-body-right'><p>{question?.body}</p></div>
                </div>
                <div className='answers-list'>
                    {answers.map((answer, index) => (
                        answer.question === Number(id)
                        ? (<Answer key={index} answer={answer} />)
                        : null
                    ))}
                </div>
                <div><MakeNewAnswer/></div>
            </div>
        </div>
    </div>
  )
}

export default QuestionPage