import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import {GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {auth, db} from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";  
import styled from "styled-components";
import googleLoginImg from "./googlelogin.png";


const GoogleLoginBtn = styled.img`
    cursor: pointer;
    
`;


const GoogleLogin = () :JSX.Element =>{
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate(); 
    const detectLanguage = (displayName: string | null): [string, string] => {
        if (!displayName) return ["", ""]; // displayName이 없는 경우 빈 문자열 반환
    
        const firstChar = displayName.charAt(0); // 첫 번째 글자 가져오기
        const isKorean = /[가-힣]/.test(firstChar); // 첫 글자가 한글인지 확인
    
        if (isKorean){ // 한국어
            const lastname = firstChar;
            const firstname = displayName.slice(1);
            return [firstname, lastname];
        } else{ // 영어
            const nameParts = displayName.split(" ");
            if (nameParts.length >= 2) {
                return [nameParts.slice(0, -1).join(" "), nameParts[nameParts.length - 1]];
            } else {
                return [displayName, ""]; // 성이 없는 경우
            }
        }
    };
    
    const handleGoogleLogin = async () =>{
        setError(null);


        const provider = new GoogleAuthProvider();

        try{
            const result = await signInWithPopup(auth, provider) // 팝업창 띄워서 로그인
            const user = result.user;
            console.log("Google 로그인 성공:", result);

            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);

            if(!docSnap.exists()){
                const [firstname, lastname] = detectLanguage(user.displayName);
                await setDoc(userRef, {
                    uid: user.uid,
                    user_email: user.email,
                    user_firstname: firstname,
                    user_lastname: lastname,
            });
                console.log("새로운 유저 정보가 Firestore에 저장되었습니다.");
            }else {
                console.log("이미 유저 정보가 Firestore에 존재합니다.");
            }

            navigate("/");

        }catch(error:any){
            console.error("Google 로그인 실패:", error);
            setError("Google 로그인에 실패했습니다. 다시 시도해주세요.");
        }
    }

    return(
        <div>
            
            <GoogleLoginBtn src={googleLoginImg} alt="google login" onClick={handleGoogleLogin}></GoogleLoginBtn>
        

        </div>
    )

}

export default GoogleLogin;