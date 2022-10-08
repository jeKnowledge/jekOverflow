import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./UserPage.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Button from 'react-bootstrap/Button';
import UserData from "../../components/UserData/UserData";
import verMais from "../../assets/img/verMais.png";
import user_todasP from "../../assets/img/user_todasP.png"
import user_pergP from "../../assets/img/user_pergP.png"
import user_respP from "../../assets/img/user_respP.png"
import user_pontP from "../../assets/img/user_pontP.png"
import user_rectP from "../../assets/img/recentP.png"

const UserPage = () => {
  let { id } = useParams();
  let [user, setUser] = useState(null)
  let [username, setUsername] = useState("")
  let [userImage, setUserImage] = useState("")
  let [userAbout, setUserAbout] = useState("")

  const [sorted, setSorted] = useState("points")
  const [filter, setFilter] = useState("all")

  const [data, setData] = useState([])

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
      const questionsAPI = `http://127.0.0.1:8000/api/questions/`
      const answersAPI = `http://127.0.0.1:8000/api/answers/`

      const getQuestions = axios.get(questionsAPI)
      const getAsnwers = axios.get(answersAPI)
      axios.all([getQuestions, getAsnwers]).then(
        axios.spread((...allData) => {
          const allDataQuestions = [...allData[0].data].filter((question) => {return question.user === id})
          const allDataAnswers = [...allData[1].data].filter((question) => {return question.user === id})
          const allDatas = allDataQuestions.concat(allDataAnswers)

          setData(allDatas)
        })
      )
    }

    getUser();
    fetchData()
  }, [id]);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setUserImage(user.image);
      setUserAbout(user.about)
    }
  }, [user])

  const filterAll = () => {
    setFilter('all')
    const questionsAPI = `http://127.0.0.1:8000/api/questions/`
    const answersAPI = `http://127.0.0.1:8000/api/answers/`

    const getQuestions = axios.get(questionsAPI)
    const getAsnwers = axios.get(answersAPI)
    axios.all([getQuestions, getAsnwers]).then(
      axios.spread((...allData) => {
        const allDataQuestions = [...allData[0].data].filter((question) => {return question.user === id})
        const allDataAnswers = [...allData[1].data].filter((question) => {return question.user === id})
        const allDatas = allDataQuestions.concat(allDataAnswers)

        setData(allDatas)
      })
    )
  }

  const filterQuestions = () => {
    setFilter('questions')
    const questionsAPI = `http://127.0.0.1:8000/api/questions/`
    const answersAPI = `http://127.0.0.1:8000/api/answers/`

    const getQuestions = axios.get(questionsAPI)
    const getAsnwers = axios.get(answersAPI)
    axios.all([getQuestions, getAsnwers]).then(
      axios.spread((...allData) => {
        const allDataQuestions = [...allData[0].data].filter((question) => {return question.user === id})

        setData(allDataQuestions)
      })
    )
  }

  const filterAnswers = () => {
    setFilter('answers')
    const questionsAPI = `http://127.0.0.1:8000/api/questions/`
    const answersAPI = `http://127.0.0.1:8000/api/answers/`

    const getQuestions = axios.get(questionsAPI)
    const getAsnwers = axios.get(answersAPI)
    axios.all([getQuestions, getAsnwers]).then(
      axios.spread((...allData) => {
        const allDataAnswers = [...allData[1].data].filter((question) => {return question.user === id})

        setData(allDataAnswers)
      })
    )
  }

  const sortPoints = () => {
    setSorted('points')
    const dataCopy = [...data].sort((elementA, elementB) => {
      return elementB.vote - elementA.vote;
    });
    setData(dataCopy);
  }

  const sortRecents = () => {
    setSorted('recent')
    const dataCopy = [...data].sort((elementA, elementB) => {
      const date1 = new Date(elementA.updated)
      const date2 = new Date(elementB.updated)
      return date2 - date1;
    });
    setData(dataCopy);
  }

  return (
    <div className="homepage">
      <div className="top">
        {" "}
        <Navbar />{" "}
      </div>
      <div className="bottom">
        <Sidebar page={'users'}/>
        <div className="bottom-content">
          <div className="top-bottom-content">
            <div className="tbc-image">
              <img className="avatar-image" src={userImage} alt="userAvatar" />
            </div>
            <div className="tbc-right">
              <div className="tbc-title1">{username}</div>
              <div className="tbc-detail">Jeker a x tempo</div>
              <div className="tbc-detail">-location-</div>
            </div>
          </div>
          <div className="bottom-bottom-content">
            <div className="right-bottom-content">
              <div>
                <div className="tbc-title1">Sobre</div>
                <div className="tbc-detail2">{userAbout}</div>
              </div>
              <div>
                <div className="tbc-title1">Top Publicações</div>
                <div className="tbc-filters">
                {filter === 'all' ?
                    <div ><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={filterAll}><img src={user_todasP} alt="user_todasP"/></Button></div> :
                    <div ><button className='filter-button' onClick={filterAll}>Todas</button></div>
                }
                {filter === 'questions' ?
                    <div ><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={filterQuestions}><img src={user_pergP} alt="user_pergN"/></Button></div> :
                    <div ><button className='filter-button' onClick={filterQuestions}>Perguntas</button></div>
                }
                {filter === 'answers' ?
                    <div ><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={filterAnswers}><img src={user_respP} alt="user_respN"/></Button></div> :
                    <div ><button className='filter-button' onClick={filterAnswers}>Respostas</button></div>
                }
                {sorted === 'points' ?
                    <div ><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortPoints}><img src={user_pontP} alt="user_pontP"/></Button></div> :
                    <div ><button className='filter-button' onClick={sortPoints}>Pontuação</button></div>
                }
                {sorted === 'recent' ?
                    <div ><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortRecents}><img src={user_rectP} alt="user_rectN"/></Button></div> :
                    <div ><button className='filter-button' onClick={sortRecents}>Recentes</button></div>
                }
                </div>
                <div className="user-qa">
                  {data.slice(0,4).map((data) => (
                    (<UserData data={data} />)
                  ))}
                </div>
                <div className="all-pubs-btn"><Button variant="btn btn-default" size="sm" style={{padding: '0px', outline: 'none'}} onClick={null}><img src={verMais} alt="verMais"/></Button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
