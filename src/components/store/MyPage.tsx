import {useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
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
    align-items: center;
    margin: 0 auto;
    overflow-x: hidden;

    .userInfo{
        font-size: 30px;
        margin-bottom: 30px;

         & h2{
            margin: 20px 0;
        }
        &::after{
            content: "";
            width: 900px;
            border: 1px solid #dedddd;
            display: block;
        }

        @media (max-width: 800px) {
            font-size: 24px;
        }
    }

    .logoutBtn{
        width: 120px;
        height: 40px;
        margin-top: 40px; 
    }

    .wishList{
        display: flex;
        flex-direction: column;
        gap: 7px;
        min-height: 300px;
        min-width: 500px;
        padding: 30px 50px;
        background-color: #f3f3f3;
        margin: 30px;
        font-size: 1rem;

        h3 {
            font-size: 1.2rem;
        }

        @media (max-width: 800px) {
            min-width: 450px;
            font-size: 0.8rem;
            h3 {
                font-size: 1rem;
            }
        }

        @media (max-width: 500px) {
            min-width: 360px;
            font-size: 0.6rem;
            h3 {
                font-size: 0.9rem;
            }
        }
    }

    .wishlistItem{
        height: auto;
        border: 1px solid #cacaca;
        border-radius: 8px;
        background-color: white;
        padding: 10px; 
        gap: 15px; 
        
        & .itemDetails{
            display: flex;
            justify-content: flex-start; 
            align-items: center;
        }

        & img{
            width: 100px;
            height: 100px;
            object-fit: contain;
        }

        @media (max-width: 800px) {
            & img{
                width: 80px;
                height: 80px;
            }
        }
        @media (max-width: 500px) {
            & img{
                width: 60px;
                height: 60px;
            }
        }
    }
`;

const MyPage = ():JSX.Element => {
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
                    const wishlistData = userSnap.data().user_wishlist || [];
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
            {/* <div>
                Point 13,400 | Coupon 5 | Reivew 3
            </div> */}

            <div className="wishList">
                <h3>Whish List</h3>
                {wishlist.length > 0 ? wishlist?.map((item, index) =>(
                    <div key={index} className="wishlistItem">
                        <Link to={`/product/${item.id}`} className="itemDetails">
                            <img src={item.image} alt ={item.title}/>
                            <h4>{item.title}</h4>
                        </Link>
                    </div>
                )): (<p>No items in your Wish List</p>)}
            </div>

            <button className="logoutBtn" onClick={()=>{signOut(auth); navigate("/");}}>
                Log out
            </button>
        </MyPageBlock>
    )
}

export default MyPage;