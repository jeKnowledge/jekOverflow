import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Users.css'

const Users = ({user}) => {
  return (
    <div className='user-container'>
        <div className='user-image'>
            {user.image}
        </div>
        <div className='user-content'>
            <div><Link to={`/users/${user.id_token}`}>{user.username}</Link></div>
            <div className='user-name' >-locale-</div>
            <div>30</div>
            <div>tags</div>
        </div>
    </div>
  )
}

export default Users