import { useState, useEffect } from "react";
import "./App.css";
import {BrowserRouter} from "react-router-dom";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer"; 
import Router from "./components/router/router";
import { CartProvider } from "./components/context/CartContext";

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
        <Router />
        <Footer/>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App;
