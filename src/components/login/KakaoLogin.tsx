import React from "react";
import styled from "styled-components";
import kakaoLoginImg from "./kakaologin.png";

const KakaoLoginBtn = styled.img`
    
`;

const KakaoLogin = ():JSX.Element => {
    const K_REST_API_KEY = import.meta.env.VITE_K_REST_API;
    const K_REDIRECT_URI = import.meta.env.VITE_K_REDIRECT_URI;
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;
    const handleKakaologin = () =>{

        window.location.href=kakaoURL;
    }
    return(
        <a href = {kakaoURL}>
            <KakaoLoginBtn src={kakaoLoginImg} alt="kakaologin" onClick={handleKakaologin}></KakaoLoginBtn>
        </a>
    )
}

export default KakaoLogin;