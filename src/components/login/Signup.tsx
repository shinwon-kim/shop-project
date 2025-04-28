import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const SignupBlock = styled.div`
    width: 100%;
    height: 100vh;
    padding-top: 30px; 
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .inputBox{
        position: relative;
        margin: 10px;
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    input{
        width: 100vw;
        min-width: 200px;
        max-width: 400px;
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
        margin: 15px 0;
    }

  p{
    font-size: 0.8em;
    font-family: Frutiger;
    color: #696969;
    }

    .show{
        position: absolute;
        top: 50%;
        right: 15px;
        cursor: pointer;
    }
`;

const Signup = ():JSX.Element =>{
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [error, setError] = useState<string>("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: {
            lastname: "",
            firstname: "",
        }
    });
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        
        if(name.includes(".")){
            const [parent, child] = name.split(".");
            setFormData((prevData)=>({
                ...prevData,
                [parent]: {
                    ...(prevData[parent as keyof typeof formData] as Record<string, any>),
                    [child]: value,
                },
            }));
        }else{
            setFormData((prevData) => ({
                ...prevData,
                [name] : value,
            }));
        }
        
    };

    const handlesShow = ()=>{
        setShow(!show);
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        if( !formData.email || !formData.password || !formData.name.lastname || !formData.name.firstname){
            setError("All fields marked with * are required");
            return;
        }
        if(formData.password.length < 6){
            setError("Password must be at least 6 characters long");
            return;
        }

        try{
            const userCredential = await createUserWithEmailAndPassword(auth,formData.email,formData.password);

            const user = userCredential.user;
            console.log("Created User:", user);

            await updateProfile(user,{
                displayName: formData.name.firstname, // displayName에 firstname을 설정
            });
            const user_doc = await setDoc(doc(db, "users", user.uid),{
                uid: user.uid,
                user_email: formData.email,
                user_password: formData.password,
                user_lastname : formData.name.lastname,
                user_firstname : formData.name.firstname,
            })

            setError("");
            navigate("/");
  
        } catch(error: any){
            alert("Error creating account");
            console.log(error);
            if(error.code === "auth/email-already-in-use"){
                setError("This email is already in use. Please use a different email.");
            }
            else{
                setError("Error creating account");
            }
        }
    };

    return (
        <SignupBlock>
            <h1>Create account</h1>
            <p>Please fill in this form to create an account.</p>
            {error && <p style={{ color: "red", fontSize: "1rem" }}>{error}</p>}
    
            <form onSubmit={handleSubmit}>
                <div className="inputBox">
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="EMAIL ADDRESS"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="inputBox">
                    <label htmlFor="password">Password *</label>

                    <input
                        type={show ? "password" : "text"}
                        name="password"
                        id="password"
                        placeholder="PASSWORD"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <div className="show" onClick={handlesShow}>
                        {
                            show ? <IoEyeOffOutline/> : <IoEyeOutline/>
                        }
                    </div>
                </div>
    
                <div className="inputBox">
                    <label htmlFor="lastname">Last name *</label>
                    <input
                        type="text"
                        name="name.lastname"
                        id="lastname"
                        placeholder="LAST NAME"
                        value={formData.name.lastname}
                        onChange={handleInputChange}
                        required
                    />
                </div>
    
                <div className="inputBox">
                    <label htmlFor="firstname">First name *</label>
                    <input
                        type="text"
                        name="name.firstname"
                        id="firstname"
                        placeholder="FIRST NAME"
                        value={formData.name.firstname}
                        onChange={handleInputChange}
                        required
                    />
                </div>
    
                <p>
                    By creating an account you agree to our{" "}
                    <a href="https://policies.google.com/">
                        <u>Terms & Privacy</u>
                    </a>.
                </p>
    
                <button type="submit">Create an Account</button>
            </form>
        </SignupBlock>
    );    
}

export default Signup;