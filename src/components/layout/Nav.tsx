import {useState, useEffect} from "react";
import { Link } from "react-router-dom"
import styled from "styled-components";
import Search from "../common/Search";
import Drawer from "../common/Drawer";
import { useUserInfo } from "../api/UserApi";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useCart } from "../context/CartContext";

const NavBlock = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    color: black;
    .nav{
        position: fixed;
        width: 100%;
        height: 60px;
        background-color: #fefefe;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-around;
        z-index: 2;
 
        & .title{
            font-size: 32px;
            font-weight: bold;
            margin: 0 30px;
        }   
    };
    
    .userInfo{
        position: relative;
        width: 150px;
        margin: 0 20px;
        display: flex;
        justify-content: center;
        flex-wrap: nowrap;
        white-space: nowrap;
        line-height: 35px;

        & p{
            display: inline-block;
            font-weight: bold;
            margin: 0 5px; 
            font-size: 14px;  
        }

        & svg{
            width: 33px; 
            height: 33px; 
            margin-right: 20px;
            vertical-align: middle; 
        }
        & .cartCounts{
            position: absolute;
            height: 15px;
            width: 15px;
            border-radius: 100%;
            background-color: #7700ff;
            line-height: 15px;
            text-align: center;
            right: 0;
            bottom: 20px;
            font-size: 12px;
            color: white;
        }
    }

    .navShop{
        width: 100%;
        height: 30px;
        background-color: #e7e7e7;
        position: fixed;
        top: 60px;
        z-index: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: black;

        & .drawerBtn{
            background: none;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        & svg{
            margin-left: 30px;
            fill: black;
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
        
        & li:hover{
            color:  #4931c1;
        }
    }
    @media (max-width: 800px) {
        .nav{
            justify-content: space-between;

            & .title{
                margin: 0 5px;
            } 

        .userInfo{
            margin: 0 5px;
        
            & p{
                display: inline-block;
                font-weight: bold;
                margin: 0 5px; 
                font-size: 14px;  
            }

            & svg{
                margin-right: 5px;
            }
        }};
    }
`;

const Nav = ():JSX.Element => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [firstname, setFirstName] = useState<string>("");
    const {cartCount, user, setUser} = useCart();
    const { userInfo } = useUserInfo();

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
        });
        return () => unsubscribe();
    },[setUser]);

    useEffect(()=>{
        if(userInfo){
            setFirstName(userInfo?.user_firstname||"Guest");
        }
        
    },[userInfo]);

    const toggleDrawer = ()=>{
        setIsDrawerOpen(true);
    }
    
    return (
        
        <NavBlock>  
            <div className="nav">
                <Link to="/" className="title">SHOP</Link>
                <Search/>
                <div className="userInfo">
                    {user ? (
                        <>
                            <Link to="/mypage">
                                <p>Hello, {firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase()}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                                    <path d="M22 12C22 6.49 17.51 2 12 2C6.49 2 2 6.49 2 12C2 14.9 3.25 17.51 5.23 19.34C5.23 19.35 5.23 19.35 5.22 19.36C5.32 19.46 5.44 19.54 5.54 19.63C5.6 19.68 5.65 19.73 5.71 19.77C5.89 19.92 6.09 20.06 6.28 20.2C6.35 20.25 6.41 20.29 6.48 20.34C6.67 20.47 6.87 20.59 7.08 20.7C7.15 20.74 7.23 20.79 7.3 20.83C7.5 20.94 7.71 21.04 7.93 21.13C8.01 21.17 8.09 21.21 8.17 21.24C8.39 21.33 8.61 21.41 8.83 21.48C8.91 21.51 8.99 21.54 9.07 21.56C9.31 21.63 9.55 21.69 9.79 21.75C9.86 21.77 9.93 21.79 10.01 21.8C10.29 21.86 10.57 21.9 10.86 21.93C10.9 21.93 10.94 21.94 10.98 21.95C11.32 21.98 11.66 22 12 22C12.34 22 12.68 21.98 13.01 21.95C13.05 21.95 13.09 21.94 13.13 21.93C13.42 21.9 13.7 21.86 13.98 21.8C14.05 21.79 14.12 21.76 14.2 21.75C14.44 21.69 14.69 21.64 14.92 21.56C15 21.53 15.08 21.5 15.16 21.48C15.38 21.4 15.61 21.33 15.82 21.24C15.9 21.21 15.98 21.17 16.06 21.13C16.27 21.04 16.48 20.94 16.69 20.83C16.77 20.79 16.84 20.74 16.91 20.7C17.11 20.58 17.31 20.47 17.51 20.34C17.58 20.3 17.64 20.25 17.71 20.2C17.91 20.06 18.1 19.92 18.28 19.77C18.34 19.72 18.39 19.67 18.45 19.63C18.56 19.54 18.67 19.45 18.77 19.36C18.77 19.35 18.77 19.35 18.76 19.34C20.75 17.51 22 14.9 22 12ZM16.94 16.97C14.23 15.15 9.79 15.15 7.06 16.97C6.62 17.26 6.26 17.6 5.96 17.97C4.44 16.43 3.5 14.32 3.5 12C3.5 7.31 7.31 3.5 12 3.5C16.69 3.5 20.5 7.31 20.5 12C20.5 14.32 19.56 16.43 18.04 17.97C17.75 17.6 17.38 17.26 16.94 16.97Z" fill="#000000"/>
                                    <path d="M12 6.92969C9.93 6.92969 8.25 8.60969 8.25 10.6797C8.25 12.7097 9.84 14.3597 11.95 14.4197C11.98 14.4197 12.02 14.4197 12.04 14.4197C12.06 14.4197 12.09 14.4197 12.11 14.4197C12.12 14.4197 12.13 14.4197 12.13 14.4197C14.15 14.3497 15.74 12.7097 15.75 10.6797C15.75 8.60969 14.07 6.92969 12 6.92969Z" fill="#000000"/>
                                </svg>
                            </Link>
                            <Link to="/cart">
                            <div className="cartCounts">
                                {cartCount}
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                                <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            </Link>
                        </>
                    ):(
                        <Link to="/login">
                            <p>Hello, sign in</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                                <path d="M22 12C22 6.49 17.51 2 12 2C6.49 2 2 6.49 2 12C2 14.9 3.25 17.51 5.23 19.34C5.23 19.35 5.23 19.35 5.22 19.36C5.32 19.46 5.44 19.54 5.54 19.63C5.6 19.68 5.65 19.73 5.71 19.77C5.89 19.92 6.09 20.06 6.28 20.2C6.35 20.25 6.41 20.29 6.48 20.34C6.67 20.47 6.87 20.59 7.08 20.7C7.15 20.74 7.23 20.79 7.3 20.83C7.5 20.94 7.71 21.04 7.93 21.13C8.01 21.17 8.09 21.21 8.17 21.24C8.39 21.33 8.61 21.41 8.83 21.48C8.91 21.51 8.99 21.54 9.07 21.56C9.31 21.63 9.55 21.69 9.79 21.75C9.86 21.77 9.93 21.79 10.01 21.8C10.29 21.86 10.57 21.9 10.86 21.93C10.9 21.93 10.94 21.94 10.98 21.95C11.32 21.98 11.66 22 12 22C12.34 22 12.68 21.98 13.01 21.95C13.05 21.95 13.09 21.94 13.13 21.93C13.42 21.9 13.7 21.86 13.98 21.8C14.05 21.79 14.12 21.76 14.2 21.75C14.44 21.69 14.69 21.64 14.92 21.56C15 21.53 15.08 21.5 15.16 21.48C15.38 21.4 15.61 21.33 15.82 21.24C15.9 21.21 15.98 21.17 16.06 21.13C16.27 21.04 16.48 20.94 16.69 20.83C16.77 20.79 16.84 20.74 16.91 20.7C17.11 20.58 17.31 20.47 17.51 20.34C17.58 20.3 17.64 20.25 17.71 20.2C17.91 20.06 18.1 19.92 18.28 19.77C18.34 19.72 18.39 19.67 18.45 19.63C18.56 19.54 18.67 19.45 18.77 19.36C18.77 19.35 18.77 19.35 18.76 19.34C20.75 17.51 22 14.9 22 12ZM16.94 16.97C14.23 15.15 9.79 15.15 7.06 16.97C6.62 17.26 6.26 17.6 5.96 17.97C4.44 16.43 3.5 14.32 3.5 12C3.5 7.31 7.31 3.5 12 3.5C16.69 3.5 20.5 7.31 20.5 12C20.5 14.32 19.56 16.43 18.04 17.97C17.75 17.6 17.38 17.26 16.94 16.97Z" fill="#000000"/>
                                <path d="M12 6.92969C9.93 6.92969 8.25 8.60969 8.25 10.6797C8.25 12.7097 9.84 14.3597 11.95 14.4197C11.98 14.4197 12.02 14.4197 12.04 14.4197C12.06 14.4197 12.09 14.4197 12.11 14.4197C12.12 14.4197 12.13 14.4197 12.13 14.4197C14.15 14.3497 15.74 12.7097 15.75 10.6797C15.75 8.60969 14.07 6.92969 12 6.92969Z" fill="#000000"/>
                            </svg>
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
                    <li><Link to="/fashion">Fashion</Link></li>
                    <li><Link to="/jewelery">Jewelery</Link></li>
                    <li><Link to="/electronics">Electronics</Link></li>
                    <li><Link to="/grocery">Grocery</Link></li>
                    <li><Link to="/sports">Sports</Link></li>
                </ul>
            </div>
        </NavBlock>
    )

}

export default Nav;