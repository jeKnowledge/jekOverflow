import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./UserPage.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Button from 'react-bootstrap/Button';
import UserData from "../../components/UserData/UserData";

import user_todasP from "../../assets/img/user_todasP.png"
//import user_todasN from "../../assets/img/user_todasN.png"
import user_pergN from "../../assets/img/user_pergN.png"
//import user_pergP from "../../assets/img/user_pergP.png"
import user_respN from "../../assets/img/user_respN.png"
//import user_respP from "../../assets/img/user_respP.png"
import user_pontP from "../../assets/img/user_pontP.png"
//import user_pontN from "../../assets/img/user_pontN.png"
import user_rectN from "../../assets/img/user_rectN.png"
//import user_rectP from "../../assets/img/user_rectP.png"

const UserPage = () => {
  let { id } = useParams();
  let [user, setUser] = useState(null)
  let [username, setUsername] = useState("")
  let [userImage, setUserImage] = useState("")
  let [userAbout, setUserAbout] = useState("")

  const [sorted, setSorted] = useState("all")
  const [filter, setFilter] = useState("points")

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
                    <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={filterAll}><img src={user_todasP} alt="user_todasP"/></Button></div> :
                    <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={filterAll}><img src={user_todasP} alt="user_todasP"/></Button></div>
                }
                {filter === 'questions' ?
                    <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={filterQuestions}><img src={user_pergN} alt="user_pergN"/></Button></div> :
                    <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={filterQuestions}><img src={user_pergN} alt="user_pergN"/></Button></div>    
                }
                {filter === 'answers' ?
                    <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={filterAnswers}><img src={user_respN} alt="user_respN"/></Button></div> :
                    <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={filterAnswers}><img src={user_respN} alt="user_respN"/></Button></div>
                }
                {sorted === 'points' ?
                    <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortPoints}><img src={user_pontP} alt="user_pontP"/></Button></div> :
                    <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortPoints}><img src={user_pontP} alt="user_pontP"/></Button></div>
                }
                {sorted === 'recent' ?
                    <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortRecents}><img src={user_rectN} alt="user_rectN"/></Button></div> :
                    <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortRecents}><img src={user_rectN} alt="user_rectN"/></Button></div>
                }
                </div>
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
    </div>
  );
};

export default UserPage;
