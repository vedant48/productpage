import React from 'react'
import { Route, Navigate, Outlet} from 'react-router-dom'
import { isAuthenticated } from '../helpers/auth'



const PrivateRoute = ({path}) => {
  if (isAuthenticated()) {
    return <Route path={path} element={<Outlet />} />
  } else { 
    return <Navigate to="/signin" />
  } 
}

export default PrivateRoute