import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminPrivate = () => {
    const { adminInfo } = useSelector((state)=>state.auth)
  return (
    <>
      {adminInfo ? <Outlet /> : <Navigate to='/admin' replace />}
    </>
  )
}

export default AdminPrivate