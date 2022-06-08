import React from 'react'
import '../Navbar/Navbar.css'
import logo from './../../assets/img/jklogo.png'
import avatar from './../../assets/img/useravatar.png'
import SearchBar from '../Searchbar/Searchbar'

const Navbar = (props) => {
  return (
    <nav className='nav'>
      <div className="nav_container">
        <div className='nav_logo'>
          <img className='nav-logo-image' src={logo} alt="jekLogo" />
          <a href="/home/" className='nav_brand'>JekOverflow</a>
        </div>
        <SearchBar />
        <div className='nav_container_right'>
          <img className='nav-avatar-image' src={avatar} alt="userAvatar" />
          <li className='nav_item'><a href="/user/id/" className="nav_link">Utilizador</a></li>
        </div>
      </div>
    </nav>
  );
}

export default Navbar