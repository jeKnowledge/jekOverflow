import React, { useState, useEffect } from 'react'
import '../Navbar/Navbar.css'
import axios from 'axios'
import logo from './../../assets/img/jklogo.png'
import SearchBar from '../Searchbar/Searchbar'

const Navbar = (props) => {
  let [user, setUser] = useState(null)
  let [username, setUsername] = useState('')
  let [userImage, setUserImage] = useState(null)
  let [userPage, setUserPage] = useState('')

  const getUser = () => {
    const usersAPI = `http://127.0.0.1:8000/api/users/`

    const getUsers = axios.get(usersAPI)
    axios.all([getUsers]).then(
      axios.spread((...allData) => {
        const allDataUsers = allData[0].data

        allDataUsers.map((user) => (
            (user.is_active)
            ? setUser(user)
            : null
        ))
      })
    )
  }

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if (user) {
      setUsername(user.username.split(' ')[0])
      setUserImage(user.image)
      setUserPage(`/users/${user.id_token}`)
    }
  }, [user])

  return (
    <nav className='nav'>
      <div className="nav_container">
        <div className='nav_logo'>
          <img className='nav-logo-image' src={logo} alt="jekLogo" />
          <a href="/home/" className='nav_brand'>jeKoverflow</a>
        </div>
        <SearchBar />
        <div className='nav_container_right'>
          <img className='nav-avatar-image' src={userImage} alt="userAvatar" />
          <li className='nav_item'><a href={userPage} className="nav_link">{username}</a></li>
        </div>
      </div>
    </nav>
  );
}

export default Navbar