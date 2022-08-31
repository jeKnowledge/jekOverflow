
import axios from 'axios'

const usersAPI = `http://127.0.0.1:8000/api/users/`
export const getUser = (setUser) => {

    const getUsers = axios.get(usersAPI)
    axios.all([getUsers]).then(
        axios.spread((...allData) => {
            const allDataUsers = allData[0].data
            console.log("allUsers from DB: ", allDataUsers)


            allDataUsers.map((user) => (
                (user.is_active)
                    ? setUser(user)
                    : null
            ))
        })
    ).catch(error => {
        console.log(error)
    });
}

export const fetchData = (setUsers) => {
    const getUsers = axios.get(usersAPI)
    axios.all([getUsers]).then(
        axios.spread((...allData) => {
            const allDataUsers = allData[0].data
            setUsers(allDataUsers)
        })
    )
}

export const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('user'))
}

