import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./AllDataUserPage.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserData from "../../components/UserData/UserData";
import Button from 'react-bootstrap/Button';
import user_todasP from "../../assets/img/user_todasP.png"
import user_pergP from "../../assets/img/user_pergP.png"
import user_respP from "../../assets/img/user_respP.png"
import user_pontP from "../../assets/img/user_pontP.png"
import user_rectP from "../../assets/img/recentP.png"
import qbutton from './../../assets/img/qbutton.png'

const AllQuestionsPage = () => {
    let { id } = useParams();
    let [user, setUser] = useState(null);
    let [username, setUsername] = useState("");
    let [userImage, setUserImage] = useState("");
    let [userAbout, setUserAbout] = useState("");

    const [sorted, setSorted] = useState("points");
    const [filter, setFilter] = useState("all");

    const [data, setData] = useState([]);

    useEffect(() => {
        const getUser = () => {
            const usersAPI = `http://127.0.0.1:8000/api/users/${id}/`;
            const getUsers = axios.get(usersAPI);
            axios.all([getUsers]).then(
                axios.spread((...allData) => {
                    setUser(allData[0].data);
                })
            );
        };

        const fetchData = () => {
            const questionsAPI = `http://127.0.0.1:8000/api/questions/`;
            const answersAPI = `http://127.0.0.1:8000/api/answers/`;

            const getQuestions = axios.get(questionsAPI);
            const getAsnwers = axios.get(answersAPI);
            axios.all([getQuestions, getAsnwers]).then(
                axios.spread((...allData) => {
                    const allDataQuestions = [...allData[0].data].filter(
                        (question) => {
                            return question.user === id;
                        }
                    );
                    const allDataAnswers = [...allData[1].data].filter(
                        (question) => {
                            return question.user === id;
                        }
                    );
                    const allDatas = allDataQuestions.concat(allDataAnswers);

                    setData(allDatas);
                })
            );
        };

        getUser();
        fetchData();
    }, [id]);

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setUserImage(user.image);
            setUserAbout(user.about);
        }
    }, [user]);

    const filterAll = () => {
        setFilter("all");
        const questionsAPI = `http://127.0.0.1:8000/api/questions/`;
        const answersAPI = `http://127.0.0.1:8000/api/answers/`;

        const getQuestions = axios.get(questionsAPI);
        const getAsnwers = axios.get(answersAPI);
        axios.all([getQuestions, getAsnwers]).then(
            axios.spread((...allData) => {
                const allDataQuestions = [...allData[0].data].filter(
                    (question) => {
                        return question.user === id;
                    }
                );
                const allDataAnswers = [...allData[1].data].filter(
                    (question) => {
                        return question.user === id;
                    }
                );
                const allDatas = allDataQuestions.concat(allDataAnswers);

                setData(allDatas);
            })
        );
    };

    const filterQuestions = () => {
        setFilter("questions");
        const questionsAPI = `http://127.0.0.1:8000/api/questions/`;
        const answersAPI = `http://127.0.0.1:8000/api/answers/`;

        const getQuestions = axios.get(questionsAPI);
        const getAsnwers = axios.get(answersAPI);
        axios.all([getQuestions, getAsnwers]).then(
            axios.spread((...allData) => {
                const allDataQuestions = [...allData[0].data].filter(
                    (question) => {
                        return question.user === id;
                    }
                );

                setData(allDataQuestions);
            })
        );
    };

    const filterAnswers = () => {
        setFilter("answers");
        const questionsAPI = `http://127.0.0.1:8000/api/questions/`;
        const answersAPI = `http://127.0.0.1:8000/api/answers/`;

        const getQuestions = axios.get(questionsAPI);
        const getAsnwers = axios.get(answersAPI);
        axios.all([getQuestions, getAsnwers]).then(
            axios.spread((...allData) => {
                const allDataAnswers = [...allData[1].data].filter(
                    (question) => {
                        return question.user === id;
                    }
                );

                setData(allDataAnswers);
            })
        );
    };

    const sortPoints = () => {
        setSorted("points");
        const dataCopy = [...data].sort((elementA, elementB) => {
            return elementB.vote - elementA.vote;
        });
        setData(dataCopy);
    };

    const sortRecents = () => {
        setSorted("recent");
        const dataCopy = [...data].sort((elementA, elementB) => {
            const date1 = new Date(elementA.updated);
            const date2 = new Date(elementB.updated);
            return date2 - date1;
        });
        setData(dataCopy);
    };

    return (
        <div className="all-questions-page">
            <div className="aqp-top">{" "}<Navbar />{" "}</div>
            <div className="aqp-bottom">
                <Sidebar page={"users"} />
                <div className="aqp-bottom-content">
                    <div className="adup-bottom-content-top">
                        <div className="adup-bct1"><h1>As tuas publicações</h1></div>
                        <div className='adup-bct2'><Button variant="btn btn-default" size="sm" style={{padding: '0px',  border: 'none'}} href="/make-question/"><img src={qbutton} alt="qbutton"/></Button></div>
                    </div>
                    <div className="adup-bottom-content-mid">
                        <div className="tbc-filters">
                            {filter === "all" ? (
                                <div>
                                    <Button
                                        variant="btn btn-default"
                                        size="sm"
                                        style={{ padding: "0px" }}
                                        onClick={filterAll}
                                    >
                                        <img
                                            src={user_todasP}
                                            alt="user_todasP"
                                        />
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <button
                                        className="filter-button"
                                        onClick={filterAll}
                                    >
                                        Todas
                                    </button>
                                </div>
                            )}
                            {filter === "questions" ? (
                                <div>
                                    <Button
                                        variant="btn btn-default"
                                        size="sm"
                                        style={{ padding: "0px" }}
                                        onClick={filterQuestions}
                                    >
                                        <img
                                            src={user_pergP}
                                            alt="user_pergN"
                                        />
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <button
                                        className="filter-button"
                                        onClick={filterQuestions}
                                    >
                                        Perguntas
                                    </button>
                                </div>
                            )}
                            {filter === "answers" ? (
                                <div>
                                    <Button
                                        variant="btn btn-default"
                                        size="sm"
                                        style={{ padding: "0px" }}
                                        onClick={filterAnswers}
                                    >
                                        <img
                                            src={user_respP}
                                            alt="user_respN"
                                        />
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <button
                                        className="filter-button"
                                        onClick={filterAnswers}
                                    >
                                        Respostas
                                    </button>
                                </div>
                            )}
                            {sorted === "points" ? (
                                <div>
                                    <Button
                                        variant="btn btn-default"
                                        size="sm"
                                        style={{ padding: "0px" }}
                                        onClick={sortPoints}
                                    >
                                        <img
                                            src={user_pontP}
                                            alt="user_pontP"
                                        />
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <button
                                        className="filter-button"
                                        onClick={sortPoints}
                                    >
                                        Pontuação
                                    </button>
                                </div>
                            )}
                            {sorted === "recent" ? (
                                <div>
                                    <Button
                                        variant="btn btn-default"
                                        size="sm"
                                        style={{ padding: "0px" }}
                                        onClick={sortRecents}
                                    >
                                        <img
                                            src={user_rectP}
                                            alt="user_rectN"
                                        />
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <button
                                        className="filter-button"
                                        onClick={sortRecents}
                                    >
                                        Recentes
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='adup-content-body'>
                        <div className='aqp-questions-list'>
                            <div className="user-qa">
                                {data.map((data) => (
                                    (<UserData data={data} />)
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllQuestionsPage;
