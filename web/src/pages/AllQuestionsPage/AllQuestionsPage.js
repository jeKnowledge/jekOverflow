import React, { useState, useEffect } from 'react'
import './AllQuestionsPage.css'
import Question from '../../components/Questions/Question'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Button from 'react-bootstrap/Button';
import qbutton from './../../assets/img/qbutton.png'

import ativoN from './../../assets/img/ativoN.png'
//import ativoP from './../../assets/img/ativoP.png'
import recompN from './../../assets/img/recompN.png'
//import recompP from './../../assets/img/recompP.png'
//import recentN from './../../assets/img/recentN.png'
import recentP from './../../assets/img/recentP.png'
import srespN from './../../assets/img/srespN.png'
//import srespP from './../../assets/img/srespP.png'

import 'bootstrap/dist/css/bootstrap.min.css';

const AllQuestionsPage = () => {
    let [questions, setQuestions] = useState([])
    const [sorted, setSorted] = useState("");

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

    useEffect(() => {
        getQuestions()
    }, [])
    
    let getQuestions = async() => {
        let response = await fetch('http://127.0.0.1:8000/api/questions/')
        let data = await response.json()
        setQuestions(data)
    }

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
                        <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortByTime}><img src={recentP} alt="recentP"/></Button></div> :
                        <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortByTime}><img src={recentP} alt="recentP"/></Button></div>
                    }
                    {sorted === '' ?
                        <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}}><img src={recompN} alt="recompN"/></Button></div> :
                        <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}}><img src={recompN} alt="recompN"/></Button></div>    
                    }
                    {sorted === 'vote' ?
                        <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={null}><img src={ativoN} alt="ativoN"/></Button></div> :
                        <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={null}><img src={ativoN} alt="ativoN"/></Button></div>
                    }
                    {sorted === 'week' ?
                        <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortByAnswers}><img src={srespN} alt="srespN"/></Button></div> :
                        <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortByAnswers}><img src={srespN} alt="srespN"/></Button></div>
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