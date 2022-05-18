import React, { useState, useEffect } from 'react'
import './AllQuestionsPage.css'
import Question from '../../components/Questions/Question'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const AllQuestionsPage = () => {
    let [questions, setQuestions] = useState([])

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
            <Sidebar />
            <div className='aqp-bottom-content'>
                <div className='aqp-bottom-content-top'>
                    <div className='aqp-bct1'><h1 className='aqp-title'>Perguntas</h1></div>
                    <div className='aqp-bct2'><Button variant='primary' height='sm' href="/make-question/">Fazer Pergunta</Button></div>
                </div>
                <div className='aqp-bottom-content-mid'>
                    <div className="btn-group">
                        <button type="button" className="btn btn-primary" size="sm">Recentes</button>
                        <button type="button" className="btn btn-primary" size="sm">Com Recompensa</button>
                        <button type="button" className="btn btn-primary" size="sm">Ativas</button>
                        <button type="button" className="btn btn-primary" size="sm">Sem Resposta</button>
                        <button type="button" className="btn btn-primary" size="sm">Mais</button>
                    </div>
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