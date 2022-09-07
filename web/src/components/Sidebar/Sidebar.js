import React from 'react'
import './Sidebar.css'
import Button from 'react-bootstrap/Button'

import homeP from './../../assets/img/homeP.png'
import pergP from './../../assets/img/pergP.png'
import utilizP from './../../assets/img/utilizP.png'
import tagP from './../../assets/img/tagP.png'
import { useNavigate } from 'react-router-dom'

const Sidebar = (props) => {
    const navigate = useNavigate();

    return (
        <div className='sidebar'>
            <div className='sidebar-list'>
                {(props.page === 'home') ?
                <div className='sidebar-bt'><Button variant="btn btn-default" size="sm" style={{padding: '0px',  border: 'none'}} onClick={()=>{navigate('/home/')}}><img src={homeP} alt="homeP"/></Button></div> :
                <div className='sidebar-bt'><button className='sidebar-button' onClick={()=>{navigate('/home/')}}>Home</button></div>
                }
                {(props.page === 'questions') ?
                <div className='sidebar-bt'><Button variant="btn btn-default" size="sm" style={{padding: '0px',  border: 'none'}} onClick={()=>{navigate('/questions/')}}><img src={pergP} alt="pergP"/></Button></div> :
                <div className='sidebar-bt'><button className='sidebar-button' onClick={()=>{navigate('/questions/')}}>Perguntas</button></div>
                }
                {(props.page === 'users') ?
                <div className='sidebar-bt'><Button variant="btn btn-default" size="sm" style={{padding: '0px',  border: 'none'}} onClick={()=>{navigate('/users/')}}><img src={utilizP} alt="utilizP"/></Button></div> :
                <div className='sidebar-bt'><button className='sidebar-button' onClick={()=>{navigate('/users/')}}>Utilizadores</button></div>
                }
                {(props.tags === 'tags') ?
                <div className='sidebar-bt'><Button variant="btn btn-default" size="sm" style={{padding: '0px',  border: 'none'}} onClick={()=>{navigate('/tags/')}}><img src={tagP} alt="tagP"/></Button></div> :
                <div className='sidebar-bt'><button className='sidebar-button' onClick={()=>{navigate('/tags/')}}>Tags</button></div>
                }
            </div>
        </div>
  )
}

export default Sidebar