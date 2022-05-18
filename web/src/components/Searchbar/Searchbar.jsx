import React from 'react'
import './Searchbar.css';

const SearchBar = () => (
    <form className='sb_container' action="/" method="get">
        <input
            type="text"
            id="header-search"
            //placeholder="Search blog posts"
            name="s"
        />
    </form>
);

export default SearchBar;