import { useState, useEffect } from "react";
import "./App.css";
import {BrowserRouter} from "react-router-dom";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer"; 
import Router from "./components/router/router";
// import { UserInfo } from "./components/api/UserApi"; 
import { auth } from "./firebase";
// import Products from "./components/store/products";


function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const user = auth.currentUser;
  // console.log(`This is user info: ${user}`);
  useEffect(() =>{
    const timer = setTimeout(()=>{
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  },[]);

  // const handleLogin = (user :UserInfo) =>{
  //   setCurrentUser(user);
  // }
  // const handleLogout = () =>{
  //   setCurrentUser(null);
  // }


  if(isLoading){
    return(
      <div className="loading-screen">
          <img src="/loading_.gif" alt="Loading..." />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Nav />
      <Router />
      <Footer/>
    </BrowserRouter>
  )
}

export default App
