import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Button from 'react-bootstrap/Button'
import Answer from '../../components/Answers/Answer'
import axios from 'axios'
import arrowup from './arrowup.png'
import arrowdown from './arrowdown.png'
import './QuestionPage.css'

const QuestionPage = () => {
    let { id } = useParams()
    let [question, setQuestion] = useState(null)
    let [answers, setAnswers] = useState([]);

    const voteUP = () => {
      const voteAPI = `http://127.0.0.1:8000/api/questions/${id}/vote/`
      const getVote = axios.get(voteAPI)
      axios.all([getVote]).then(
        axios.spread((...allData) => {
          const allDataVote = allData[0].data
          setQuestion(allDataVote)
        })
      )
    }

    const voteDown = () => {
      console.log("VOTE DOWN");
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
              console.log(allDataAnswers)
              setAnswers(allDataAnswers)
            })
          )
        }
    
        fetchData()
      },[id])

    return (
    <div className='questionpage'>
        <div className='qp-top'><Navbar /></div>
        <div className='qp-bottom'>
            <Sidebar />
            <div className='qp-bottom-content'>
                <div className='qp-bottom-content-top'>
                    <div className='qp-title'><p>{question?.title}</p></div>
                    <div className='qp-bct2'><Button variant='primary' height='sm' href="/make-question/">Fazer Pergunta</Button></div>
                </div>
                <div className='qp-body'>
                    <div className='qp-body-left'>
                        <button><img src={arrowup} alt="arrowUP" onClick={voteUP} /></button>
                        <p className='qp-vote'>{question?.vote}</p>
                        <button><img src={arrowdown} alt="arrowDOWN" onClick={voteDown} /></button>
                    </div>
                    <div className='qp-body-right'><p>{question?.body}</p></div>
                </div>
                <div className='answers-list'>
                    {answers.map((answer, index) => (
                        <Answer key={index} answer={answer} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default QuestionPage