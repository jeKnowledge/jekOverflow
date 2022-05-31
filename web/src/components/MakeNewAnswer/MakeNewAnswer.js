import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './MakeNewAnswer.css'

const MakeNewAnswer = () => {
    let { id } = useParams()
    const [body, setBody] = useState('');

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
        this.props.history.push('/home')
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
              <button onClick={handleSubmit} type="button" className="btn btn-primary" size="sm">Publicar</button>
            </div>
        </div>
    )
}

export default MakeNewAnswer