import React from "react";
import {Link} from 'react-router-dom'
import { isAuthenticated, logout } from '../helpers/auth';
import { withRouter } from "../helpers/withrouter";

const Header = ({navigate}) => {
  
  const handleLogout = () => {
    logout(() => {
      navigate('/signin')
    })
  }

  const showNavigation  = () => (
    <>
    <Link to = '/' >Home</Link>

    {!isAuthenticated() && (
      <>
      <Link to = '/signup' >Signup</Link>
      <Link to = '/signin' >Signin</Link>
      </>

    )}

    {isAuthenticated() && isAuthenticated().role === 0 && (
      <>
      <Link to = '/user/dashboard' >Dashboard</Link>
      </>
      )}

    {isAuthenticated() && isAuthenticated().role === 1 && (
      <>
      <Link to = '/admin/dashboard' >Dashboard</Link>
      </>
      )}

    {isAuthenticated() && (
      <>
      <button onClick={handleLogout} >Signout</button>
      </>
      )}

    </>
  )
  return <header id="header">{showNavigation()}</header>
}

export default withRouter(Header);