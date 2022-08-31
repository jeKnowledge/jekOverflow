import React, { useState, useEffect } from 'react'
import '../Navbar/Navbar.css'
import logo from './../../assets/img/jklogo.png'
import SearchBar from '../Searchbar/Searchbar'
import { getUser, logOut } from '../../utility/utils'
import { IoIosLogOut } from 'react-icons/io'
import { AuthContext } from '../AuthContext'
import { useNavigate } from 'react-router-dom'



const Navbar = (props) => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [userImage, setUserImage] = useState(null)
  const [userPage, setUserPage] = useState('')
  const authcontext = React.useContext(AuthContext);

  const navigate = useNavigate()


  useEffect(() => {
    getUser(setUser)
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

          <li className='nav_item'>
            <IoIosLogOut onClick={() => {
              //clear local storage
              localStorage.clear()

              authcontext.dispatch({ type: "LOGOUT" });
              navigate('/')

            }} className='nav_link' size={30} style={{ marginLeft: 5 }} />
          </li>
        </div>
      </div>
    </nav>
  );
}

export default Navbar