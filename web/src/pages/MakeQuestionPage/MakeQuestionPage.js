import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './MakeQuestionPage.css'
import axios from "axios";
import Button from 'react-bootstrap/Button'
import qbutton from './../../assets/img/qbutton.png'
import { useNavigate, useLocation } from 'react-router-dom';

const MakeQuestionPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  

  const handleSubmit = (event) => {
    axios.post(`http://127.0.0.1:8000/api/questions/`, {
      'title': title,
      'body': body,
      'vote': 0,
      'user': location.state,
      'created': new Date(),
      'updated': new Date()
      },
      {
      headers: {
          "Authorization": `AUTHORIZATION_KEY`,
          "Content-Type": 'application/json'
      }
      }
    )
    navigate('/home/')
  }

  return (
    <div className='make-question'>
        <div className='mq-top'> <Navbar /> </div>
        <div className='mq-bottom'> 
            <div className='mq-title'><h1>Faz uma pergunta</h1></div>
            <div className='mq-box-container'>
              <div className='margin-all'>
                <div className='mqbc-title-body-tag'><h2>Título</h2></div>
                <div className='mq-title-com'><p>Sê específico e pensa que estás a fazer a pergunta a uma  pessoa (aka não sejas braindead)</p></div>
                <div className='title-body-box'>
                  <form onSubmit={handleSubmit}>
                    <input 
                      className='mq-text-tag-post' 
                      type="text" 
                      required
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}  
                    />
                  </form>
                </div>
                <div className='mqbc-title-body-tag'><h2>Corpo</h2></div>
                <div className='mq-body-com'><p>Inclui toda a informação que aches necessária para te responderem à pergunta</p></div>
                <div className='title-body-box'>
                  <form>
                    <textarea 
                    className='mq-body-post' 
                    type="text" 
                    required
                    value={body}
                    onChange={(event) => setBody(event.target.value)} 
                  />
                  </form>
                </div>
                <div className='mqbc-title-body-tag'><h2>Tags</h2></div>
                <div className='mq-tag-com'><p>Adiciona ate 3 que melhor descrevem a tua pergunta</p></div>
                <div className='tag-box'>
                  <form>
                    <input className='mq-text-tag-post' type="text" required/>
                  </form>
                </div>
              </div>
            </div>
            <div className='send-button'>
            <div className='bct2'><Button variant="btn btn-default" size="sm" style={{padding: '0px',  border: 'none'}} onClick={handleSubmit} ><img src={qbutton} alt="qbutton"/></Button></div>
            </div>
        </div>
    </div>
  )
}

export default MakeQuestionPage