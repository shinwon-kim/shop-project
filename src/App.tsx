import { useState, useEffect } from "react";
import {BrowserRouter } from "react-router-dom";
import "./App.css";
import { CartProvider } from "./components/context/CartContext";
import Nav from "./components/layout/Nav";
import ScrollTop from "../src/components/common/ScrollTop"
import Footer from "./components/layout/Footer"; 
import Router from "./components/router/router";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() =>{
    const timer = setTimeout(()=>{
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  },[]);


  if(isLoading){
    return(
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <CartProvider>
        <Nav />
        <ScrollTop />
        <Router />
        <Footer/>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App;
