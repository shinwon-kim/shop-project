import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";
import KakaoLogin from "./KakaoLogin";
import { userApi, User} from "../api/UserApi";

interface LoginProps {
  onLogin: (user: User) => void; // 부모 컴포넌트에서 전달받은 로그인 함수
}


const StyledLink = styled(Link)`
  font-family: Frutiger;
  text-decoration: underline;
  color: #007FFF;
`;

const LoginBlock = styled.div`
  width: 100%;
  padding-top: 130px; /* 네비게이션 바 크기에 맞게 여백 조정 */
  padding-bottom: 83px; /* 푸터 크기에 맞게 여백 추가 */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1{
    margin-top: 0px;
    color: #1E2952;
  }
  .errorMessage{
    font-family: Frutiger;
    color: red;
  }

  input{
    width: 250px;
    height: 35px;
    margin: 15px 0;
    border-radius: 2px;
    padding: 5px;
    border: 1px solid #ccc;
    background: #f1f1f1;
    border: none;
    font-family: Frutiger;
    &:focus{
        background-color: #ddd;
        outline: none;
    }
  }
  button{
    width: 120px;
    height: 40px;
    background-color: #662d91;
    color: white;
    font-family: Frutiger Bold;
    margin: 15px 0;
    cursor: pointer;
    border-radius: 2px;
    border: none;
  }

  .line{
    display: flex;
    align-items: center;
    margin: 20px 0;
    text-align: center;
    width: 250px;
  }

  .line::before,
  .line::after{
    content: "";
    flex: 1;
    border: 1px solid black;
  }

  .line span {
    margin: 0 10px;
    color: #1e2952;
  }
  

`;

const Login = ({ onLogin }: LoginProps):JSX.Element =>{
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async () =>{
    try{
      const users: User[] = await userApi.fetchUsers();
      const user = users.find(
        (u: User) => u.username === username && u.password === password
      );
      if(user){
        onLogin(user);
        navigate("/");
      }else{
        setError("Invalid username or password");
      }

    }
    catch(error){
      console.log("Error logging in:", error);
      setError("Somthing went wrong. Please try agian.");
    }
  }

    return (
        <LoginBlock>
            <h1>SIGN IN</h1>
            <KakaoLogin />

            <div className="line"> 
              <span> OR </span>   
            </div>
            <div className="errorMessage">
              {error}
            </div>

            <input type="text" placeholder="USERNAME" value={username} onChange={(e) => setUsername(e.target.value)}/>
            
            <input type="password" placeholder="PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)}/>

            <button type="submit" onClick={handleLogin}> Continue </button>

            <StyledLink to="/signup">Creat your account</StyledLink>

        </LoginBlock>
    )
}

export default Login;