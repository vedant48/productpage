import React from "react";
import { BrowserRouter, Routes , Route} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";
import NotFound from "./NotFound";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

const App = () => ( 
  <BrowserRouter>
    <Header /> 
    <main>
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/signup" element = {<Signup/>} />
        <Route path="/signin" element = {<Signin/>} />
        <Route path="/user/dashboard" element = {<UserDashboard/>} />
        <Route path="/admin/dashboard" element = {<AdminDashboard/>} />
        <Route path="*" element = {<NotFound/>} />
      </Routes>
    </main>

  </BrowserRouter> 
);


export default App;
