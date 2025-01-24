import React from "react";
import styled from "styled-components";

const NaverLoginBtn = styled.img`
    width: 50px;
    height: 50px;
`

const NaverLogin = ():JSX.Element =>{
    const naverURL = `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}&state=${process.env.REACT_APP_NAVER_STATE}`;
    return (
        <a href={naverURL}>
            <NaverLoginBtn src={"/kakaologin.png"} alt="naverlogin"></NaverLoginBtn>
        </a>
    )
}


export default NaverLogin;