import React from "react";
import styled from "styled-components";

const FooterBlock = styled.div`
    position: absolute;
    width: 100%;
    height: 7rem;
    bottom: 0;
    
    background-color: #e7e7e7;

    p{
        color: black;
        text-align: center; 
        line-height: 5rem; 
    }
`;


const Footer = (): JSX.Element =>{
   return(
        <FooterBlock>
           <p>© COPYRIGHT 2025. ALL RIGHTS RESERVED.</p>
        </FooterBlock>
   );
}

export default Footer;