import React from 'react'
import { Link } from 'react-router-dom'
import './Users.css'

const Users = ({user}) => {
  return (
    <div className='user-container'>
        <div><img className='user-image' src={user.image} alt='user-img'/></div>
        <div className='user-content'>
            <div><Link className='user-name' to={`/users/${user.id_token}`}>{user.username}</Link></div>
            <div className='user-detail'>-locale-</div>
            <div className='user-detail'>{user.reputation}</div>
            <div className='user-detail'>tags</div>
        </div>
    </div>
  )
}

export default Users