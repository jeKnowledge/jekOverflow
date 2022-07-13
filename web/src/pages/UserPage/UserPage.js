import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './UserPage.css'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'

const UserPage = () => {
  let { id } = useParams()
  let [user, setUser] = useState(null)
  let [username, setUsername] = useState('')
  let [userImage, setUserImage] = useState('')
  

  useEffect(() => {
    const getUser = () => {
      const usersAPI = `http://127.0.0.1:8000/api/users/${id}/`
      const getUsers = axios.get(usersAPI)
      axios.all([getUsers]).then(
        axios.spread((...allData) => {
          setUser(allData[0].data)
        })
      )
    }

    if (user) {
      setUsername(user.username)
      setUserImage(user.image)

    }

    getUser()
  }, [user, id])

  return (
    <div className='homepage'>
        <div className='top'> <Navbar /> </div>
        <div className='bottom'>
            <Sidebar />
            <div className='bottom-content'>
                <div className='top-bottom-content'>
                  <div className='tbc-image'><img className='avatar-image' src={userImage} alt="userAvatar"/></div>
                  <div className='tbc-right'>
                    <div className='tbc-username'><h3>{username}</h3></div>
                    <div className='tbc-detail'><h3>{username}</h3></div>
                    <div className='tbc-place'><h3>{username}</h3></div>
                  </div>
                </div>
                <div className='bottom-bottom-content'>
                  <div className='left-bottom-content'>
                  
                  </div>
                  <div className='right-bottom-content'>

                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserPage