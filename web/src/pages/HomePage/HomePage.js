import React, { useState, useEffect } from 'react'
import './HomePage.css'
import axios from 'axios'
import Question from '../../components/Questions/Question'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Button from 'react-bootstrap/Button';
import qbutton from './../../assets/img/qbutton.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    let [questions, setQuestions] = useState([])
    let [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getQuestions()
        getUser()
    }, [])
    
    const toMakeQuestion = () => {
        navigate('/make-question/', {state: user.id_token})
    }

    const getQuestions = () => {
        const questionAPI = `http://127.0.0.1:8000/api/questions/`
    
        const getQuestions = axios.get(questionAPI)
        axios.all([getQuestions]).then(
          axios.spread((...allData) => {
            const allDataQuestions = allData[0].data
    
            setQuestions(allDataQuestions)
          })
        )
    }

    const getUser = () => {
        const usersAPI = `http://127.0.0.1:8000/api/users/`
    
        const getUsers = axios.get(usersAPI)
        axios.all([getUsers]).then(
          axios.spread((...allData) => {
            const allDataUsers = allData[0].data
    
            allDataUsers.map((user) => (
                (user.is_active)
                ? setUser(user)
                : null
            ))
          })
        )
    }

    return (
    <div className='homepage'>
        <div className='top'> <Navbar /> </div>
        <div className='bottom'>
            <Sidebar />
            <div className='bottom-content'>
                <div className='bottom-content-top'>
                    <div className='bct1'><h1 className='title'>Perguntas Frequentes</h1></div>
                    <div className='bct2'><Button variant="btn btn-default" size="sm" style={{padding: '0px',  border: 'none'}} onClick={()=>{toMakeQuestion()}}><img src={qbutton} alt="qbutton"/></Button></div>
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