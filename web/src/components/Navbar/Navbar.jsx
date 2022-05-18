import React from 'react'
import '../Navbar/Navbar.css'
import pic from './jklogo.png'
import SearchBar from '../Searchbar/Searchbar'

const Navbar = (props) => {
  return (
    <nav className='nav'>
      <div className="nav_container">
        <div className='nav_logo'>
          <img className='nav-logo-image' src={pic} alt="jekLogo" />
          <a href="/home/" className='nav_brand'>JekOverflow</a>
        </div>
        <SearchBar />
        <div className="">
          <li className='nav_item'><a href="/user/id/" className="nav_link">Usuário</a></li>
        </div>
      </div>
    </nav>
  );
}

export default Navbar