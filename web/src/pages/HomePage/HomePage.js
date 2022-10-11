import React, { useState, useEffect } from 'react'
import './HomePage.css'
import axios from 'axios'
import Question from '../../components/Questions/Question'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Button from 'react-bootstrap/Button'
import qbutton from './../../assets/img/qbutton.png'

import hotP from './../../assets/img/hotP.png'
import interesP from './../../assets/img/interesP.png'
import mesP from './../../assets/img/mesP.png'
import recompP from './../../assets/img/recompP.png'
import semaP from './../../assets/img/semaP.png'

import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const [questions, setQuestions] = useState([]);
    const [sorted, setSorted] = useState('view');
    const navigate = useNavigate();

    useEffect(() => {
        getQuestions();
    }, [])

    const filterBountied = () => {
        setSorted("bountied");
        const questionsCopy = [...questions].filter(question => {
            return question.bountied === true
        });
        setQuestions(questionsCopy);
    }

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
        const questionsCopy = [...questions].filter(question => {
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
        const questionsCopy = [...questions].filter(question => {
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

    return (
        <div className='homepage'>
            <div className='top'> <Navbar /> </div>
            <div className='bottom'>
                <Sidebar page={'home'} />
                <div className='bottom-content'>
                    <div className='bottom-content-top'>
                        <div className='bct1'><h1 className='title'>Perguntas Populares</h1></div>
                        <div className='bct2'><Button variant="btn btn-default" size="sm" style={{ padding: '0px', border: 'none' }} onClick={() => { navigate('/make-question/') }}><img className='make-question-button' src={qbutton} alt="qbutton" /></Button></div>
                    </div>
                    <div className='bottom-content-mid'>
                        {sorted === 'view' ?
                            <div ><Button variant="btn btn-default" size="sm" style={{ padding: '0px' }} onClick={sortByView}><img src={interesP} alt="interesP" /></Button></div> :
                            <div ><button className='filter-button' onClick={sortByView}>Interessante</button></div>
                        }
                        {sorted === 'recomp' ?
                            <div ><Button variant="btn btn-default" size="sm" style={{ padding: '0px' }}><img src={recompP} alt="recompN" /></Button></div> :
                            <div ><button className='filter-button' onClick={filterBountied}>Com Recompensa</button></div>
                        }
                        {sorted === 'vote' ?
                            <div ><Button variant="btn btn-default" size="sm" style={{ padding: '0px' }} onClick={sortByVote}><img src={hotP} alt="hotN" /></Button></div> :
                            <div ><button className='filter-button' onClick={sortByVote}>Hot</button></div>
                        }
                        {sorted === 'week' ?
                            <div ><Button variant="btn btn-default" size="sm" style={{ padding: '0px' }} onClick={sortByWeek}><img src={semaP} alt="semaN" /></Button></div> :
                            <div ><button className='filter-button' onClick={sortByWeek}>Semana</button></div>
                        }
                        {sorted === 'month' ?
                            <div ><Button variant="btn btn-default" size="sm" style={{ padding: '0px' }} onClick={sortByMonth}><img src={mesP} alt="mesN" /></Button></div> :
                            <div ><button className='filter-button' onClick={sortByMonth}>Mês</button></div>
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