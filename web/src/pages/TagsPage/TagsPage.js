import React from 'react'
import './TagsPage.css'
import edugif from "./../../assets/img/edugif.gif"

const TagsPage = () => {
  return (
    <div className='tags-demo'>
        <h1>VERSÃO DEMO</h1>
        <h1>CONTRATE O ESTAGIÁRIO PARA VER A CONTINUAÇÃO</h1>
        <div><img className='edu' src={edugif} alt="wait until the page loads" /></div>
    </div>
  )
}

export default TagsPage