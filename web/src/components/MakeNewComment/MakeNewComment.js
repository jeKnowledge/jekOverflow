import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './MakeNewComment.css'

const MakeNewComment = (props) => {
    const [body, setBody] = useState('')
    const [id, setId] = useState('')

    const enterPressed = (event3) => {
        if ((event3.keyCode === 13) && (body !== '')) {
            const token = localStorage.getItem('Authorization');

            axios.post(`http://127.0.0.1:8000/api/comments/`, {
            'body': body,
            'answer': Number(id),
            'created': new Date(),
            'updated': new Date(),
            },
            {
            headers: {
                "Authorization": token,
                "Content-Type": 'application/json'
            }
            }
        )
        .then(res => console.log(res))
        .catch(error => console.err(error))
        }
    } 

    useEffect(() => {
        setId(props.id)
    }, [props])

    return (
    <div>
        <form>
            <textarea 
            className='mnc-body-post'
            type="text"
            placeholder='Adicionar comentário'
            required
            value={body}
            onChange={(event) => setBody(event.target.value)}
            onKeyDown={(event2) => enterPressed(event2)}
            />
        </form>
    </div>
    )
}

export default MakeNewComment