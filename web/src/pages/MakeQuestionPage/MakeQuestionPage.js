import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './MakeQuestionPage.css'
import Axios from "axios";

const MakeQuestionPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (event) => {
    Axios.post(`http://127.0.0.1:8000/api/questions/`, {
      'title': title,
      'body': body,
      'vote': 0
      },
      {
          headers: {
              "Authorization": `AUTHORIZATION_KEY`,
              "Content-Type": 'application/json'
          }
      }
    )
    .then(res => console.log(res))
    .catch(error => console.err(error))
    this.props.history.push('/home')
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
                <div className='mq-tag-com'><p>Adiciona ate (numero de tags a definir) que melhor descrevem a tua pergunta</p></div>
                <div className='tag-box'>
                  <form>
                    <input className='mq-text-tag-post' type="text" required/>
                  </form>
                </div>
              </div>
            </div>
            <div className='send-button'>
              <button onClick={handleSubmit} type="button" className="btn btn-primary" size="sm">Fazer Pergunta</button>
            </div>
        </div>
    </div>
  )
}

export default MakeQuestionPage