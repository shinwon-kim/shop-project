import React from "react";
import styled from "styled-components";

const FooterBlock = styled.div`
    position: relative;
    width: 100%;
    height: 7rem;
    bottom: 0;
    background-color: #272f3d;

    p{
        color: white;
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