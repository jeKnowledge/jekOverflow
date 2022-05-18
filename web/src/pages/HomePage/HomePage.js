import React, { useState, useEffect } from 'react'
import './HomePage.css'
import Question from '../../components/Questions/Question'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
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
    <div className='homepage'>
        <div className='top'> <Navbar /> </div>
        <div className='bottom'>
            <Sidebar />
            <div className='bottom-content'>
                <div className='bottom-content-top'>
                    <div className='bct1'><h1 className='title'>Perguntas Frequentes</h1></div>
                    <div className='bct2'><Button variant='primary' height='sm' href="/make-question/">Fazer Pergunta</Button></div>
                </div>
                <div className='bottom-content-mid'>
                    <div className="btn-group">
                        <button type="button" className="btn btn-primary" size="sm">Interessante</button>
                        <button type="button" className="btn btn-primary" size="sm">Com Recompensa</button>
                        <button type="button" className="btn btn-primary" size="sm">Hot</button>
                        <button type="button" className="btn btn-primary" size="sm">Semana</button>
                        <button type="button" className="btn btn-primary" size="sm">Mês</button>
                    </div>
                </div>
                <div className='content-body'>
                    <div className='questions-list'>
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

export default HomePage