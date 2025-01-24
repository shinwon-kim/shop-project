import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom"
import styled from "styled-components";
import Search from "../common/Search";
import Drawer from "../common/Drawer";
import { User } from "../api/UserApi";

interface NavProps{
    currentUser: User | null;
}


const StyledLink = styled(Link)`
    font-size: 32px;
    font-weight: bold;
    margin: 0 30px;

`;



const NavBlock = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    color: white;
    

    .nav{
        position: fixed;
        width: 100%;
        height: 60px;
        top: 0;
        background-color: #272f3d;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-around;
        z-index: 2;
    };
    
    
    .userInfo{
        width: 150px;
        margin: 0 30px;
        display: flex;
        justify-content: center;
        flex-wrap: nowrap;
        white-space: nowrap;
        line-height: 35px;

        & p{
            display: inline-block;
            margin: 0 5px; 
            font-size: 14px;  
        }

        & svg{
            width: 35px; 
            height: 35px; 
            fill: white;
            margin: 0;
            vertical-align: middle; 
            
        }
    }

    .navShop{
        width: 100%;
        height: 30px;
        background-color: #2c3030;
        position: fixed;
        top: 60px;
        z-index: 1;
        display: flex;
        flex-direction: row;
        align-items: center;

        & .drawerBtn{
            background: none;
            border: none;
        }

        & svg{
            margin-left: 30px;
            fill: white;
            cursor: pointer;
        }

        & ul{
            margin: 0;
            display: flex;
            list-style: none;
        };
        & li{
            margin: 10px;
        }
    }


`;

const Nav = ({currentUser}:NavProps):JSX.Element => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(()=>{
        if(currentUser){
            console.log("user looged in:", currentUser);

        }
    },[currentUser]);

    const toggleDrawer = ()=>{
        setIsDrawerOpen(true);
    }

    return (
        <NavBlock>  
            <div className="nav">

                <StyledLink to="/">SHOP</StyledLink>
                
                <Search/>
                <div className="userInfo">
                    {currentUser ? (
                        <>
                            <p>Hello, {currentUser.name?.firstname}</p>
                            <Link to="/mypage">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 73.825a182.175 182.175 0 1 0 182.18 182.18A182.177 182.177 0 0 0 256 73.825zm0 71.833a55.05 55.05 0 1 1-55.054 55.046A55.046 55.046 0 0 1 256 145.658zm.52 208.723h-80.852c0-54.255 29.522-73.573 48.885-90.906a65.68 65.68 0 0 0 62.885 0c19.363 17.333 48.885 36.651 48.885 90.906z" data-name="Profile"/></svg>
                            </Link>
                        </>
                    ):(
                        <Link to="/login">
                            <p>Hello, sign in</p>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 73.825a182.175 182.175 0 1 0 182.18 182.18A182.177 182.177 0 0 0 256 73.825zm0 71.833a55.05 55.05 0 1 1-55.054 55.046A55.046 55.046 0 0 1 256 145.658zm.52 208.723h-80.852c0-54.255 29.522-73.573 48.885-90.906a65.68 65.68 0 0 0 62.885 0c19.363 17.333 48.885 36.651 48.885 90.906z" data-name="Profile"/></svg>
                        </Link>
                    )}
                </div>
            </div>
            <div className="navShop">
                <Drawer onOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}/>
                <button className="drawerBtn" onClick={toggleDrawer}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                        <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
                    </svg>
                </button>
                <ul>
                    <li>Fashion</li>
                    <li>Jewelery</li>
                    <li>Electronics</li>
                </ul>
            </div>
        </NavBlock>
    )

}

export default Nav;