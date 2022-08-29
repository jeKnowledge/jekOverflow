import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Comments.css'

const Comments = ({ comment }) => {
    const [upd_comment, setUPDComment] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchData = () => {
          const commentsAPI = `http://127.0.0.1:8000/api/comments/${comment.id}/`
          const userAPI = `http://127.0.0.1:8000/api/users/${comment.user}/`
      
          const getComments = axios.get(commentsAPI)
          const getUser = axios.get(userAPI)
          axios.all([getComments, getUser]).then(
            axios.spread((...allData) => {
              const allDataComments = allData[0].data
              const allDataUser = allData[1].data
      
              setUPDComment(allDataComments)
              setUser(allDataUser)
            })
          )
        }
    
        fetchData()
      },[comment])

    return (
    <div className='comments-container'>
        <div className='comments-body'>{upd_comment?.body} — <span className='blue-name'>{user?.username}</span></div>
    </div>
    )
}

export default Comments