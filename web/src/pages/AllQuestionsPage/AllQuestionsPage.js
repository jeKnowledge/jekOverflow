import React, { useState, useEffect } from 'react'
import './AllQuestionsPage.css'
import axios from 'axios'
import Question from '../../components/Questions/Question'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Button from 'react-bootstrap/Button'
import qbutton from './../../assets/img/qbutton.png'

import ativoP from './../../assets/img/ativoP.png'
import recompP from './../../assets/img/recompP.png'
import recentP from './../../assets/img/recentP.png'
import srespP from './../../assets/img/srespP.png'

import 'bootstrap/dist/css/bootstrap.min.css';

const AllQuestionsPage = () => {
    let [questions, setQuestions] = useState([])
    let [result, setResult] = useState(null)
    const [sorted, setSorted] = useState("time");

    const sortByTime = () => {
      setSorted("time");
      const questionsCopy = [...questions];
      questionsCopy.sort((questionA, questionB) => {
        const date1 = new Date(questionA.created)
        const date2 = new Date(questionB.created)
        return date2 - date1;
      });
      setQuestions(questionsCopy);
    }

    const sortByAnswers = () => {
      setSorted("answers");
      const questionsCopy = [...questions].filter(question => {
        return (question.n_answers === 0);
      });
      setQuestions(questionsCopy);
    }

    const sortByActives = () => {
        setSorted("actives");
        const questionsCopy = [...questions].filter(question => {
            setResult(false)
            const usersAPI = `http://127.0.0.1:8000/api/users/${question.user}/`
            const getUsers = axios.get(usersAPI)
            axios.all([getUsers]).then(axios.spread((...allData) => {
                if (allData[0].data.is_active) {
                    console.log('a')
                    setResult(true)
                    console.log(result)
                }
            }))
            console.log(result)
            return result
        });
        setQuestions(questionsCopy);
      }
    
    let getQuestions = async() => {
        let response = await fetch('http://127.0.0.1:8000/api/questions/')
        let data = await response.json()
        setQuestions(data)
    }

    useEffect(() => {
        getQuestions()
    }, [])

    return (
    <div className='all-questions-page'>
        <div className='aqp-top'> <Navbar /> </div>
        <div className='aqp-bottom'>
            <Sidebar page={'questions'}/>
            <div className='aqp-bottom-content'>
                <div className='aqp-bottom-content-top'>
                    <div className='aqp-bct1'><h1 className='aqp-title'>Perguntas</h1></div>
                    <div className='aqp-bct2'><Button variant="btn btn-default" size="sm" style={{padding: '0px',  border: 'none'}} href="/make-question/"><img src={qbutton} alt="qbutton"/></Button></div>
                </div>
                <div className='bottom-content-mid'>
                    {sorted === 'time' ?
                        <div ><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortByTime}><img src={recentP} alt="recentP"/></Button></div> :
                        <div ><button className='filter-button' onClick={sortByTime}>Recentes</button></div>
                    }
                    {sorted === '' ?
                        <div ><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={null}><img src={recompP} alt="recompN"/></Button></div> :
                        <div ><button className='filter-button' onClick={null}>Com Recompensa</button></div>   
                    }
                    {sorted === 'actives' ?
                        <div ><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortByActives}><img src={ativoP} alt="ativoN"/></Button></div> :
                        <div ><button className='filter-button' onClick={sortByActives}>Ativas</button></div>
                    }
                    {sorted === 'answers' ?
                        <div ><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortByAnswers}><img src={srespP} alt="srespN"/></Button></div> :
                        <div ><button className='filter-button' onClick={sortByAnswers}>Sem Resposta</button></div>
                    }
                </div>
                <div className='aqp-content-body'>
                    <div className='aqp-questions-list'>
                        {questions.map((question, index) => (
                            <Question key={index} question={question} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AllQuestionsPage