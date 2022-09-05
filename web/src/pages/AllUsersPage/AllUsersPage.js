import React, { useState, useEffect } from 'react'
import './AllUsersPage.css'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Users from '../../components/Users/Users'
import Button from 'react-bootstrap/Button'
import './AllUsersPage.css'
import search from '../../assets/img/search.png'
import reputP from '../../assets/img/reputP.png'
import nuserP from '../../assets/img/nuserP.png'
import voterP from '../../assets/img/voterP.png'
import editP from '../../assets/img/editP.png'
import moderP from '../../assets/img/moderP.png'
import { fetchData } from '../../utility/utils'

const AllUsersPage = () => {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sorted, setSorted] = useState("reput")

  useEffect(() => {
      fetchData(setUsers)
  }, [])

  const sortByReputation = () => {
    setSorted("reput");
    const usersCopy = [...users].sort((userA, userB)=>{
        return userB.reputation - userA.reputation
    });
    setUsers(usersCopy);
  }

  const sortByVoter = () => {
    setSorted("voter");
    const usersCopy = [...users].sort((userA, userB)=>{
        return userB.votes - userA.votes
    });
    setUsers(usersCopy);
  }

  const sortByEdits = () => {
    setSorted("edit");
    const usersCopy = [...users].sort((userA, userB)=>{
        return userB.edits - userA.edits
    });
    setUsers(usersCopy);
  }

  const sortByNewUser = () => {
    setSorted("nuser");
    const usersCopy = [...users].filter(user=>{
        const date1 = new Date(user.start_date);
        const date = new Date();
        const diff = date.getTime() - date1.getTime();

        const time = Math.floor(diff / 1000 / 60 / 60);
        return (time < 730);
    });
    setUsers(usersCopy);
  }

  const sortByModer = () => {
    setSorted("moder");
    const usersCopy = [...users].filter(user=>{
        return (user.is_staff);
    });
    setUsers(usersCopy);
  }

  return (
  <div className='all-questions-page'>
      <div className='aqp-top'> <Navbar /> </div>
      <div className='aqp-bottom'>
          <Sidebar page={'users'}/>
          <div className='aqp-bottom-content'>
              <div className='aqp-bottom-content-top'>
                  <div className='aqp-bct1'><h1 className='aqp-title'>Utilizadores</h1></div>
              </div>
              <div className='aup-content-body'>
                  <div className='aup-cb-left'>
                    
                  <form className='usb_container'>
                    <img className='search-image' src={search} alt="searchIMG"/>
                    <input
                        type="text"
                        onChange={(event)=>{
                          setSearchTerm(event.target.value);
                        }}
                    />
                  </form>

                    <div className='aup-filters'>
                      {sorted === 'reput' ?
                          <div ><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortByReputation}><img src={reputP} alt="reputP"/></Button></div> :
                          <div ><button className='filter-button' onClick={sortByReputation}>Reputação</button></div>
                      }
                      {sorted === 'nuser' ?
                          <div ><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortByNewUser}><img src={nuserP} alt="nuserN"/></Button></div> :
                          <div ><button className='filter-button' onClick={sortByNewUser}>Novos Utilizadores</button></div>
                      }
                      {sorted === 'voter' ?
                          <div ><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortByVoter}><img src={voterP} alt="voterN"/></Button></div> :
                          <div ><button className='filter-button' onClick={sortByVoter}>Votadores</button></div>
                      }
                      {sorted === 'edit' ?
                          <div ><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortByEdits}><img src={editP} alt="editN"/></Button></div> :
                          <div ><button className='filter-button' onClick={sortByEdits}>Editores</button></div>
                      }
                      {sorted === 'moder' ?
                          <div ><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortByModer}><img src={moderP} alt="moderN"/></Button></div> :
                          <div ><button className='filter-button' onClick={sortByModer}>Moderadores</button></div>
                      }
                    </div>
                  </div>
                  <div className='aup-cb-right'>
                      {users.filter((value)=>{
                        if (searchTerm === "") return value
                        else if (value.username.toLowerCase().includes(searchTerm.toLocaleLowerCase())) return value
                        else return null
                      }).map((user, index) => (<Users key={index} user={user} />))}
                  </div>
              </div>
          </div>
      </div>
  </div>
  )
}

export default AllUsersPage