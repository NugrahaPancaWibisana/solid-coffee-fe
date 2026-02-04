import React from 'react'
import InsertUser from './InsertUser'
import UserListContent from './UserListContent'

function UserlistMenu() {
  return (
    <div className='p-5'>
      <p>userlist</p>
      <UserListHero/>
      <InsertUser/>
    </div>
  )
}

export default UserlistMenu
