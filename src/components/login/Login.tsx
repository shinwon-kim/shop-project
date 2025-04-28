import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";
import GoogleLogin from "./GoogleLogin";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase";

const StyledLink = styled(Link)`
  font-family: Frutiger;
  text-decoration: underline;
  color: #007FFF;
`;

const LoginBlock = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 20px; 
  padding-bottom: 100px;
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
    width: 100vw;
    min-width: 200px;
    max-width: 350px;
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
    margin: 15px 0;
  }

  .line{
    display: flex;
    align-items: center;
    margin: 20px 0;
    text-align: center;
    width: 350px;
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

const Login = ():JSX.Element =>{
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");


  const handleLogin = async () =>{
    setError("");
    try{
      if(!email || !password){
        setError("Email and password ard required");
        return;
      }
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      navigate("/");
      alert(`Welcome ${user.displayName}`)

    }
    catch(error: any){
      console.log("Error logging in:", error);
      if(error.code === "auth/invalid-credentials"){
          setError("Invalid email or password");
      }
      else{
        setError("Somthing went wrong. Please try agian.");
      }
    }
  }
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  

  return (
      <LoginBlock>
          <h1>Sign In</h1>
          <GoogleLogin />

          <div className="line"> 
            <span> OR </span>   
          </div>
          <div className="errorMessage">
            {error}
          </div>

          <label htmlFor="mail">Email</label>
          <input type="email" placeholder="EMAIL" id="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyPress}/>
          
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="PASSWORD" id="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyPress}/>

          <button type="submit" onClick={handleLogin} > Continue </button>

          <StyledLink to="/signup">Create your account</StyledLink>

      </LoginBlock>
  )
}

export default Login;