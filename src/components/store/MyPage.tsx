import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { User } from "../api/UserApi";

interface MyPageProps {
    currentUser: User | null;
    onLogout : () => void;
}


const MyPageBlock = styled.div`
    width: 100%;
    height: 100vh;
    padding-top: 130px; 
    padding-bottom: 83px;

    /* display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; */

    .userInfo{
        font-size: 34px;
        margin-bottom: 20px;
    }

    .logoutBtn{
        width: 120px;
        height: 40px;
        background-color: #662d91;
        border-radius: 2px;
        border: none;
        color: white;
        cursor: pointer;
    }

`;


const Mypage = ({currentUser, onLogout}:MyPageProps):JSX.Element => {
    
    return(
        <MyPageBlock>
            <div className="userInfo">
                {currentUser?.name.firstname.toUpperCase()}
            </div>
            <button className="logoutBtn" onClick={onLogout}>
                Log out
            </button>

        </MyPageBlock>
    )
}

export default Mypage;