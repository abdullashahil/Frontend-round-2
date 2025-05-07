import React from 'react'
import NavBar from '../components/NavBar'
import TaskPanel from '../components/TaskPanel'

const Home = () => {
    return (
        <div className=' text-gray-300'>
            <NavBar />
            <TaskPanel />
        </div>
    )
}

export default Home