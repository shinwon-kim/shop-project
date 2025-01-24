import { useState, useEffect } from "react";
import "./App.css";
import {BrowserRouter} from "react-router-dom";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer"; 
import Router from "./components/router/router";
import { User } from "./components/api/UserApi"; 
// import Products from "./components/store/products";


function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() =>{
    const timer = setTimeout(()=>{
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  },[]);

  const handleLogin = (user :User) =>{
    setCurrentUser(user);
  }
  const handleLogout = () =>{
    setCurrentUser(null);
  }


  if(isLoading){
    return(
      <div className="loading-screen">
          <img src="./loading_.gif" alt="Loading..." />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Nav currentUser={currentUser}/>
      <Router onLogin={handleLogin} currentUser={currentUser} onLogout={handleLogout}/>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
