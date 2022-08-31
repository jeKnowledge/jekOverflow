import React, { useState, useEffect } from 'react'
import './HomePage.css'
import axios from 'axios'
import Question from '../../components/Questions/Question'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Button from 'react-bootstrap/Button'
import qbutton from './../../assets/img/qbutton.png'

import hotN from './../../assets/img/hotN.png'
//import hotP from './../../assets/img/hotP.png'
//import interesN from './../../assets/img/interesN.png'
import interesP from './../../assets/img/interesP.png'
import mesN from './../../assets/img/mesN.png'
//import mesP from './../../assets/img/mesP.png'
import recompN from './../../assets/img/recompN.png'
import recompNH from './../../assets/img/recompNH.png'
//import recompP from './../../assets/img/recompP.png'
import semaN from './../../assets/img/semaN.png'
//import semaP from './../../assets/img/semaP.png'

import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate, useLocation } from 'react-router-dom'

const HomePage = () => {
    const [questions, setQuestions] = useState([]);
    const [sorted, setSorted] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        getQuestions();
        getUser();
    }, [location])
    
    const sortByView = () => {
        setSorted("view");
        const questionsCopy = [...questions];
        questionsCopy.sort((questionA, questionB) => {
            return questionB.n_views - questionA.n_views;
        });
        setQuestions(questionsCopy);
    }

    const sortByVote = () => {
        setSorted("vote");
        const questionsCopy = [...questions];
        questionsCopy.sort((questionA, questionB) => {
            return questionB.vote - questionA.vote;
        });
        setQuestions(questionsCopy);
    }

    const sortByWeek = () => {
        setSorted("week");
        const questionsCopy = [...questions].filter(question=>{
            const date1 = new Date(question.created);
            const date = new Date();
            const diff = date.getTime() - date1.getTime();

            const time = Math.floor(diff / 1000 / 60 / 60);
            return (time < 168);
        });
        setQuestions(questionsCopy);
    }

    const sortByMonth = () => {
        setSorted("month");
        const questionsCopy = [...questions].filter(question=>{
            const date1 = new Date(question.created);
            const date = new Date();
            const diff = date.getTime() - date1.getTime();

            const time = Math.floor(diff / 1000 / 60 / 60);
            return (time < 730);
        });
        setQuestions(questionsCopy);
    }

    const getQuestions = () => {
        const questionAPI = `http://127.0.0.1:8000/api/questions/`
    
        const getQuestions = axios.get(questionAPI)
        axios.all([getQuestions]).then(
          axios.spread((...allData) => {
            const allDataQuestions = allData[0].data
            
            allDataQuestions.sort((questionA, questionB) => {
                const date1 = new Date(questionA.created)
                const date2 = new Date(questionB.created)
                return date2 - date1;
            });

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

    const funcCons = () => {
        document.getElementById("hp-img2").src={recompNH}
    }

    const funcCons2 = () => {
        document.getElementById("hp-img2").src={recompN}
    }

    return (
    <div className='homepage'>
        <div className='top'> <Navbar /> </div>
        <div className='bottom'>
            <Sidebar page={'home'}/>
            <div className='bottom-content'>
                <div className='bottom-content-top'>
                    <div className='bct1'><h1 className='title'>Perguntas Populares</h1></div>
                    <div className='bct2'><Button variant="btn btn-default" size="sm" style={{padding: '0px',  border: 'none'}} onClick={()=>{navigate('/make-question/', {state: user.id_token})}}><img src={qbutton} alt="qbutton"/></Button></div>
                </div>
                <div className='bottom-content-mid'>
                    {sorted === 'view' ?
                        <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortByView}><img src={interesP} alt="interesP"/></Button></div> :
                        <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortByView}><img src={interesP} alt="interesP"/></Button></div>
                    }
                    {sorted === 'recomp' ?
                        <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}}><img src={recompN} alt="recompN"/></Button></div> :
                        <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}}><img id="hp-img2" src={recompN} onMouseOver={funcCons} onMouseOut={funcCons2} alt="recompN"/></Button></div>    
                    }
                    {sorted === 'vote' ?
                        <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortByVote}><img src={hotN} alt="hotN"/></Button></div> :
                        <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortByVote}><img src={hotN} alt="hotN"/></Button></div>
                    }
                    {sorted === 'week' ?
                        <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortByWeek}><img src={semaN} alt="semaN"/></Button></div> :
                        <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortByWeek}><img src={semaN} alt="semaN"/></Button></div>
                    }
                    {sorted === 'month' ?
                        <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortByMonth}><img src={mesN} alt="mesN"/></Button></div> :
                        <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortByMonth}><img src={mesN} alt="mesN"/></Button></div>
                    }
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
  );
}

export default HomePage;