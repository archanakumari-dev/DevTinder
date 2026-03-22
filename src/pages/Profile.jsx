import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import EditProfile from '../components/EditProfile'

const Profile = () => {

  const user=useSelector((store)=>store.user)
  
  return (
    user && (<div className='min-h-screen bg-gray-50 py-10 px-4'>
        <EditProfile user={user?.user}/>
    </div>)
  )
}

export default Profile