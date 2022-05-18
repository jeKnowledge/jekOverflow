import React from 'react'
import './Sidebar.css'
import {SidebarData} from './SidebarData'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <ul className='sidebar-list'>
            {SidebarData.map((value, key) => {
                return (
                <li key={key}
                    className='row'
                    onClick={() => {
                        window.location.pathname = value.link;
                    }}>
                    <div>{value.title}</div>
                </li>)
            })}
        </ul>
    </div>
  )
}

export default Sidebar