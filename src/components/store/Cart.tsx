import { useState, useEffect } from "react";
import styled from "styled-components";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FiX } from "react-icons/fi";

const CartBlock = styled.div`
    width: 100%;
    padding-top: 120px; 
    padding-bottom: 120px;
    max-width: 1200px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    position: relative;
    
    /* border: 1px solid black; */

    .cartHeader{
        margin: 20px 0;

        &::after{
            content: "";
            width: 100vw;
            border: 1px solid #c2c2c2;
            display: block;
            flex-grow: 1;
        }
    }
    .cartContents{ // 상품 전체
        display: grid;
        grid-template-rows: auto 1fr;
        width: 100%;
    }

    .cartHeaderRow{
        display: grid;
        grid-template-columns: 1fr 90px 100px; 
        align-items: center;
        width: 100%;
        margin-bottom: 20px; 
        
        & p{
            margin: 0; 
            text-align: center;
        }
    }
    
    .cartItem{
        border: 1px solid #c2c2c2;
        border-radius: 10px;
        margin: 10px;
        padding: 10px 5px;
        display: grid;
        grid-template-columns: 1fr 90px 80px; 
        align-items: center;
        position: relative;
        gap: 0px;

        & .delete{
            position: absolute;
            right: 10px;
            top: 10px;
            cursor: pointer;
            color: #959595;
        }

        & img{
            width: 150px;   
            height: 150px; 
            object-fit: contain; 
        }

        & .cartItemTitle{
            display: flex;
            align-items: center;  
            width: 100%;
            gap: 10px; 

            & h4 {
                flex: 1; 
                text-align: left; 
                font-size: 18px;
            }
        }
        & .cartItemCount{
            border: 2px solid #61389c;
            border-radius: 4px;
            display: flex;
            align-items: center;
            margin: 0 auto;
            
            & button{
                width: 20px;
                height: 20px;
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .decrease{
                border-radius: 1px 0 0 1px;
            }
            .increase{
                border-radius: 0 1px 1px 0;
            }

            & div{
                margin: 0 10px;
                font-family: "Frutiger";
            }
        }

    }
    .cartSubtotal{
        & p{
            margin: 30px 0 5px 0 ;
            font-size: 20px;
        }
        
        &::before{
            content: "";
            width: 100vw;
            border: 1px solid #c2c2c2;
            display: block;
        }

    }
`;


const Cart = (): JSX.Element => {
    // const [user, setUser] = useState<User | null>(null);
    // const [cartlist, setCartlist] = useState<any[]>([]);
    // const [cartlistCount, setCartlistCount] = useState<number>(0);
    const [subtotal, setSubtotal] = useState<number>(0);
    const { cartlist, setCartlist, cartCount, setCartCount, user, setUser } = useCart();

    useEffect(()=>{
        const fetchCartData = async() =>{
            if(user){
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if(userSnap.exists()){
                    const userCart = userSnap.data().user_cartlist || [];
                    setCartlist(userCart);
                }
            }
        };
        fetchCartData();
    }, [user, setCartlist]);

    useEffect(() => {
        const subtotal = cartlist.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0) ;
        setSubtotal(subtotal);
        if (user && cartlist.length > 0) {
            const userRef = doc(db, "users", user.uid);
            updateDoc(userRef, {
                user_cartlist: cartlist
            });
        }
    }, [cartlist, user]);


    const handleDelete = async(itemID: string) =>{
        if (!user) return;
        const userRef = doc(db, "users", user.uid);

        await updateDoc(userRef, {
            user_cartlist: arrayRemove(cartlist.find(item =>item.id === itemID))
        });
        setCartlist(cartlist.filter(item => item.id !== itemID));
    }

    const handleCount = async(action: string, itemID: string) =>{
        const updatedCartlist = cartlist.map((item) =>{
            if(item.id === itemID){
                let updatedQuantity = item.quantity;

                if (action === "dec" && updatedQuantity > 1) {
                    updatedQuantity -= 1;
                } else if(action === "inc"){
                    updatedQuantity += 1;
                }
                return {...item, quantity: updatedQuantity}
            }
            return item;
        });
        setCartlist(updatedCartlist);

        if(user){
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                user_cartlist: updatedCartlist
            });
        }

    };


    return(
        <CartBlock>
            <div className="cartHeader">
                <h1>Shopping Cart</h1>
            </div>
            <div className="cartContents">
                <div className="cartHeaderRow">
                    <p>Product Details</p>
                    <p>Quantity</p>
                    <p>Price</p>
                </div>
                {cartlist.length > 0 ? cartlist?.map((item, index) =>(
                    <div key={index} className="cartItem">
                        <FiX className="delete" onClick={()=>handleDelete(item.id)}/>
                        <Link to={`/product/${item.id}`} className="a">
                            <div className="cartItemTitle">
                                <img src={item.image} alt={item.title} />
                                <h4>{item.title}</h4>
                            </div>
                        </Link>
                            <div className="cartItemCount">
                                <button className="decrease" onClick={((x)=>handleCount("dec", item.id))}>-</button>
                                <div>{item.quantity}</div>
                                <button className="increase" onClick={((x)=>handleCount("inc", item.id))}>+</button>
                            </div>
                            <div className="cartItemPrice">
                                <p>${item.price}</p>
                            </div>
                    </div>
                )): <p> No items in your Cart</p>}
            </div>

            <div className="cartSubtotal">
                <p> Subtotal ({cartCount} items): ${subtotal.toFixed(2)} </p>
            </div>

            <button>Proceed to Checkout</button>


        </CartBlock>

    )
}

export default Cart;