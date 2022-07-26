import React from 'react'
import search from '../../assets/img/search.png'
import './UserSearchbar.css';

const UserSearchBar = () => (
    <form className='usb_container' action="/" method="get">
        <img className='search-image' src={search} alt="searchIMG"/>
        <input
            type="text"
            id="header-search"
            name="s"
        />
    </form>
);

export default UserSearchBar;