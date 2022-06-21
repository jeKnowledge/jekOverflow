import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import pbutton from './../../assets/img/pbutton.png'
import Button from 'react-bootstrap/Button'
import './MakeNewAnswer.css'

const MakeNewAnswer = () => {
    let { id } = useParams()
    const [body, setBody] = useState('');

    const nanswersUpdate = () => {
      const answerAPI = `http://127.0.0.1:8000/api/questions/${id}/nanswers-update/`
      axios.get(answerAPI)
      window.location.reload(false);
    }

    const handleSubmit = (event) => {
        axios.post(`http://127.0.0.1:8000/api/answers/`, {
          'body': body,
          'question': Number(id)
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
        nanswersUpdate()
      }

    return (
        <div className='mna-container'>
            <div className='mna-title'>A tua resposta</div>
            <div className='mna-body'>
                <form>
                <textarea 
                className='mna-body-post' 
                type="text" 
                required
                value={body}
                onChange={(event) => setBody(event.target.value)} 
                />
                </form>
            </div>
            <div className='mna-send-button'>
              <Button variant="btn btn-default" size="sm" style={{padding: '0px',  border: 'none'}} onClick={handleSubmit}><img src={pbutton} alt="pbutton"/></Button>
            </div>
        </div>
    )
}

export default MakeNewAnswer