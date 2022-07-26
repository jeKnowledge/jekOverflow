import React from 'react'
import search from '../../assets/img/search.png'
import './Searchbar.css';

const SearchBar = () => (
    <form className='sb_container' action="/" method="get">
        <img className='search-image' src={search} alt="searchIMG"/>
        <input
            type="text"
            id="header-search"
            name="s"
        />
    </form>
);

export default SearchBar;