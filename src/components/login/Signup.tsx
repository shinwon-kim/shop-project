import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { userApi, User} from "../api/UserApi";

interface SignUpProps{
    onLogin: (user: User) => void;
}

const SignupBlock = styled.div`
    width: 100%;
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .inputBox{
        margin: 10px;
        display: flex;
        flex-direction: column;
        text-align: left;
    }


    input{
        width: 300px;
        height: 30px;
        padding: 10px;
        margin: 5px;
        background: #f1f1f1;
        border: none;
        font-family: Frutiger;
        &:focus{
            background-color: #ddd;
            outline: none;
        }
        
    }

    label{
        padding-left: 5px;
    }
    
    button{
        width: 200px;
        height: 40px;
        background-color: #662d91;
        color: white;
        margin: 15px 0;
        font-family: Frutiger Bold;
        cursor: pointer;
        border-radius: 2px;
        border: none;

  }

  p{
    font-size: 0.8em;
    font-family: Frutiger;
    color: #696969;
  }


`;

const Signup = ({onLogin}:SignUpProps):JSX.Element =>{
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        phone: "",
       
        address: {
            city: "",
            street: "",
            number: 0,
            zipcode: "",
        },
        name: {
            lastname: "",
            firstname: "",
        },
    });

    const [error, setError] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name] : value,
        }));
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        if(!formData.username || !formData.password || !formData.email || !formData.phone || !formData.name.lastname || !formData.name.firstname){
            setError("All fields marked with * are required");
            return;
        }
        try{
            const response = await userApi.createUser(formData);
     
            alert("Account created successfully");
            setError("");
            onLogin(response);
            navigate("/");
        } catch(error){
            alert("Error creating account");
            setError("Error creating account");
            console.log(error);
        }


    }

    return(
        <SignupBlock>
            <h1>Create account</h1>
            <p>Please fill in this form to create an account.</p>
            {error && <p style={{ color: "red", fontSize: "1rem"}}>{error}</p>}


            <div className="inputBox">
                <label htmlFor="username">User name *</label>
                <input type="text" name="username" placeholder="USERNAME" value={formData.username} onChange={handleInputChange} required/>
            </div>

            <div className="inputBox">
                <label htmlFor="password">Password *</label>
                <input type="password" name="password" placeholder="PASSWORD" value={formData.password} onChange={handleInputChange} required/>
            </div>

            <div className="inputBox">
                <label htmlFor="email">Email *</label>
                <input type="email" name="email" placeholder="EMAIL ADDRESS" value={formData.email} onChange={handleInputChange} required/>
            </div>

            <div className="inputBox">
                <label htmlFor="phone">Phone *</label>
                <input type="number" name="phone" placeholder="MOBILE PHONE NUMBER" value={formData.phone} onChange={handleInputChange} required/>
            </div>

            <div className="inputBox">
                <label htmlFor="lastname">Last name *</label>
                <input type="text" name="lastname" placeholder="LAST NAME" value={formData.name.lastname} onChange={(e) => setFormData({...formData, name:{...formData.name, lastname:e.target.value }})} required/>
            </div>

            <div className="inputBox">
                <label htmlFor="firstname">First name *</label>
                <input type="text" name="firstname" placeholder="FIRST NAME" value={formData.name.firstname} onChange={(e) =>setFormData({...formData, name:{...formData.name, firstname:e.target.value}})} required/>
            </div>

            <div className="inputBox">
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.address.city}
                    onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
                />
            </div>

            <div className="inputBox">
                <label htmlFor="street">Street</label>
                <input
                    type="text"
                    name="street"
                    placeholder="Street"
                    value={formData.address.street}
                    onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
                />
            </div>


            <p>By creating an account you agree to our <a href="https://policies.google.com/"><u>Terms & Privacy</u></a>.</p>
            
            <button type="submit" onClick={handleSubmit}>
                Create An Account
            </button>

        </SignupBlock>
    )
}

export default Signup;