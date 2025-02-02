import React, { useEffect, useState} from "react";
import styled from "styled-components";

import Products from "../views/Products";

const HomeBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  
  padding-top: 120px; 
  padding-bottom: 120px; 

  
  .banner{
    width: 100vh;
  }
  
`;


const Home = ():JSX.Element =>{
  

  return (
    <HomeBlock>

        <div className="carousel">
          <img className="banner" src="./banner.jpg" alt="bannerImg" />
        </div>

        <Products />

    </HomeBlock>
  )
}

export default Home;
