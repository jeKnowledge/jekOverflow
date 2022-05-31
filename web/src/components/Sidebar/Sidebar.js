import React from 'react'
import './Sidebar.css'
import {SidebarData} from './SidebarData'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <ul className='sidebar-list'>
            {SidebarData.map((value, key) => {
                return (
                <div className='row-separator'>
                    <li key={key}
                        className='row'
                        onClick={() => {
                            window.location.pathname = value.link;
                        }}>
                        <div>{value.title}</div>
                    </li>
                </div>)
            })}
        </ul>
    </div>
  )
}

export default Sidebar