import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './UserData.css'

const UserData = ({data}) => {
    const [type, setType] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        const typeSelector = () => {
            data.title? setType('P') : setType('R')
        }

        const getDate = () => {
            let data_date = new Date(data.updated),
                day = data_date.getDate().toString(),
                dayF = (day.length === 1)? '0'+day : day,
                month = (data_date.getMonth()+1).toString(),
                monthF = (month.length === 1)? '0'+month : month,
                year = data_date.getFullYear();
            setDate(dayF+"/"+monthF+"/"+year)
        }

        typeSelector()
        getDate()
    }, [data])

    return (
        <div className='ud-container'>
            <div className='ud-sidedataL'>
                <div className='ud-sidedata'>{type}</div>
                <div className='ud-sidedata'>{data.vote}</div>
                <div className='ud-maindata'>
                    {(data.title?
                        <Link className='question-link' to={`/questions/${data.id}`} state={{user: data.user}} ><div>{data.title.slice(0,33)+'...'}</div></Link> : 
                        <Link className='question-link' to={`/questions/${data.question}`} state={{user: data.user}} ><div>{data.body.slice(0,33)+'...'}</div></Link>
                    )}
                </div>
            </div>
            <div className='ud-sidedataR'>{date}</div>
        </div>
    )
}

export default UserData