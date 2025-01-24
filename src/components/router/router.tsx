import React from "react";
import { Routes, Route} from "react-router-dom";
import Login from "../login/Login";
import Signup from "../login/Signup";
import Oauth from "../login/Oauth";
import Home from "../store/Home";
import Mypage from "../store/Mypage";
import { User } from "../api/UserApi"; 

interface RouterProps {
    currentUser: User | null;
    onLogin: (user: User) => void;
    onLogout: () => void;
}

const Router = ({currentUser, onLogin, onLogout}: RouterProps):JSX.Element => {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={onLogin}/>} />
            <Route path="/signup" element={<Signup onLogin={onLogin}/>} />
            <Route path="/mypage" element={<Mypage currentUser={currentUser} onLogout={onLogout}/>} />
            <Route path="/oauth" element={<Oauth />} />
        </Routes>
    )
}

export default Router;