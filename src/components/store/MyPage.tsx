import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { doc, getDoc } from "firebase/firestore";
import { signOut , User} from "firebase/auth";
import { auth, db } from "../../firebase";


const MyPageBlock = styled.div`
    padding-top: 120px; 
    padding-bottom: 120px;
    width: 100%;
    max-width: 1200px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;


    .userInfo{
        font-size: 34px;
        margin-bottom: 20px;
    }

    .logoutBtn{
        width: 120px;
        height: 40px;
        margin-top: 40px; 
    }

    .wishList{
  
        display: flex;
        gap: 5px;
        padding: 30px 50px;
        flex-direction: column;
        background-color: #f3f3f3;
        margin: 50px;
        
    }

    .wishlistItem{

        height: auto;
        display: flex;
        border: 1px solid gray;
        border-radius: 8px;
        justify-content: flex-start; /* 왼쪽 정렬 */
        align-items: center;
        background-color: white;
        padding: 10px; 
        gap: 15px; 
        

        & img{
            width: 100px;
        }
        & h4{

        }
    }

`;




const Mypage = ():JSX.Element => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [wishlist, setWishlist] = useState<any[]>([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);

        });

        return () => unsubscribe(); 
    }, []);

    useEffect(() => {
        if (user) {
            const userRef = doc(db, "users", user.uid);
            getDoc(userRef).then((userSnap) => {
                if (userSnap.exists()) {
                    const wishlistData = userSnap.data().wishlist || [];
                    setWishlist(wishlistData);
                }
            });
        }
    }, [user]);

    

    
    return(
        <MyPageBlock>
            <div className="userInfo">
                <h2>{user?.displayName?.toUpperCase()}</h2>
            </div>
            <div>
                Point 13,400 | Coupon 5 | Reivew 3
            </div>

            <div className="wishList">
                <h3>Whish List</h3>
                {wishlist.length > 0 ? wishlist?.map((item, index) =>(
                    <div key={index} className="wishlistItem">
                        <img src={item.image} alt ={item.title}></img>
                        <h4>{item.title}</h4>
                    </div>
                )): (<p>No items in your wishlist</p>)}
            </div>

            <button className="logoutBtn" onClick={()=>{signOut(auth); navigate("/");}}>
                Log out
            </button>

          

            

        </MyPageBlock>
    )
}

export default Mypage;