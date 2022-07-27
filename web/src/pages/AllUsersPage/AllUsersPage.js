import React, { useState, useEffect } from 'react'
import './AllUsersPage.css'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import UserSearchBar from '../../components/UserSearchbar/UserSearchbar.jsx'
import Users from '../../components/Users/Users'
import './AllUsersPage.css'

const AllUsersPage = () => {
  let [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
    }, [])
    
    let getUsers = async() => {
        let response = await fetch('http://127.0.0.1:8000/api/users/')
        let data = await response.json()
        setUsers(data)
    }

  return (
  <div className='all-questions-page'>
      <div className='aqp-top'> <Navbar /> </div>
      <div className='aqp-bottom'>
          <Sidebar />
          <div className='aqp-bottom-content'>
              <div className='aqp-bottom-content-top'>
                  <div className='aqp-bct1'><h1 className='aqp-title'>Utilizadores</h1></div>
              </div>
              <div className='aup-content-body'>
                  <div className='aup-cb-left'>
                    <UserSearchBar />
                  </div>
                  <div className='aup-cb-right'>
                    <div>{users.map((user, index) => (<Users key={index} user={user} />))}</div>
                    <div>{users.map((user, index) => (<Users key={index} user={user} />))}</div>
                    <div>{users.map((user, index) => (<Users key={index} user={user} />))}</div>
                    <div>{users.map((user, index) => (<Users key={index} user={user} />))}</div>
                    <div>{users.map((user, index) => (<Users key={index} user={user} />))}</div>
                    <div>{users.map((user, index) => (<Users key={index} user={user} />))}</div>
                    <div>{users.map((user, index) => (<Users key={index} user={user} />))}</div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  )
}

export default AllUsersPage