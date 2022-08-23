import React, { useState, useEffect } from 'react'
import './AllUsersPage.css'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import UserSearchBar from '../../components/UserSearchbar/UserSearchbar.jsx'
import Users from '../../components/Users/Users'
import Button from 'react-bootstrap/Button'
import './AllUsersPage.css'
import search from '../../assets/img/search.png'
import reputP from '../../assets/img/reputP.png'
//import reputN from '../../assets/img/reputN.png'
//import nuserP from '../../assets/img/nuserP.png'
import nuserN from '../../assets/img/nuserN.png'
//import voterP from '../../assets/img/voterP.png'
import voterN from '../../assets/img/voterN.png'
//import editP from '../../assets/img/editP.png'
import editN from '../../assets/img/editN.png'
//import moderP from '../../assets/img/moderP.png'
import moderN from '../../assets/img/moderN.png'

const AllUsersPage = () => {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sorted, setSorted] = useState("")

  useEffect(() => {
      getUsers()
  }, [])
    
  let getUsers = async() => {
      let response = await fetch('http://127.0.0.1:8000/api/users/')
      let data = await response.json()
      setUsers(data)
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
                          <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={null}><img src={reputP} alt="reputP"/></Button></div> :
                          <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={null}><img src={reputP} alt="reputP"/></Button></div>
                      }
                      {sorted === 'nuser' ?
                          <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortByNewUser}><img src={nuserN} alt="nuserN"/></Button></div> :
                          <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortByNewUser}><img src={nuserN} alt="nuserN"/></Button></div>    
                      }
                      {sorted === 'voter' ?
                          <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={null}><img src={voterN} alt="voterN"/></Button></div> :
                          <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={null}><img src={voterN} alt="voterN"/></Button></div>
                      }
                      {sorted === 'edit' ?
                          <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={null}><img src={editN} alt="editN"/></Button></div> :
                          <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={null}><img src={editN} alt="editN"/></Button></div>
                      }
                      {sorted === 'moder' ?
                          <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortByModer}><img src={moderN} alt="moderN"/></Button></div> :
                          <div className='bct3'><Button variant="btn btn-default" size="sm" style={{padding: '0px'}} onClick={sortByModer}><img src={moderN} alt="moderN"/></Button></div>
                      }
                    </div>
                  </div>
                  <div className='aup-cb-right'>
                    <div>
                      {users.filter((value)=>{
                        if (searchTerm === "") return value
                        else if (value.username.toLowerCase().includes(searchTerm.toLocaleLowerCase())) return value
                        else return null
                      }).map((user, index) => (<Users key={index} user={user} />))}
                    </div>
                    <div>
                      {users.filter((value)=>{
                        if (searchTerm === "") return value
                        else if (value.username.toLowerCase().includes(searchTerm.toLocaleLowerCase())) return value
                        else return null
                      }).map((user, index) => (<Users key={index} user={user} />))}
                    </div>
                    <div>
                      {users.filter((value)=>{
                        if (searchTerm === "") return value
                        else if (value.username.toLowerCase().includes(searchTerm.toLocaleLowerCase())) return value
                        else return null
                      }).map((user, index) => (<Users key={index} user={user} />))}
                    </div>
                    <div>
                      {users.filter((value)=>{
                        if (searchTerm === "") return value
                        else if (value.username.toLowerCase().includes(searchTerm.toLocaleLowerCase())) return value
                        else return null
                      }).map((user, index) => (<Users key={index} user={user} />))}
                    </div>
                    <div>
                      {users.filter((value)=>{
                        if (searchTerm === "") return value
                        else if (value.username.toLowerCase().includes(searchTerm.toLocaleLowerCase())) return value
                        else return null
                      }).map((user, index) => (<Users key={index} user={user} />))}
                    </div>
                    <div>
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
  </div>
  )
}

export default AllUsersPage