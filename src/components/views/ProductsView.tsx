import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useProductContext } from "../context/ProductContext";
import {auth, db} from "../../firebase";
import {doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";
import Rating from "../common/Rating";
import { useCart } from "../context/CartContext";
import BreadCrumb from "../common/BreadCrumb";

const ProductsViewBlock = styled.div<{ isDescriptionFull: boolean }>`
  padding-top: 20px;
  padding-bottom: 100px;
  position: relative;
  width: 100%;
  max-width: 1200px;
  min-height: 100vh; 
  text-align: center;
  display: flex;
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  overflow-x: hidden;

  @media (max-width: 800px) {
    padding-top: 130px;
    padding-bottom: 160px;
  }

  .contentWrapper {
    display: flex;
    width: 100%;
    max-width: 900px; 
    gap: 30px; 
    margin-top: 15px;

    @media (max-width: 800px) {
      flex-direction: column;
    }
  }

  .productInfo {
    flex: 1;
    display: flex;
    flex-direction: column; 
    align-items: flex-start;

    @media (max-width: 800px) {
      padding: 23px;
    }
  }

  .productTitle{
    text-align: left;
    font-size: 1.2rem;
    @media (max-width: 800px) {
      font-size: 1.1rem;
    }
  }

  .productImg img{
    width: 300px;
    height: 300px;
    object-fit: contain;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px #d2d2d2;

    @media (max-width: 800px) {
      width: 270px;
      height: 270px;
    }
  }

  .productPrice{
    margin: 10px 0;
    font-size: 26px;
  }

  .productDescript{
    margin: 0;
    font-family: "Frutiger";
    font-size: 13px;
    text-align: left;
  }

  .showMore{
    font-size: 10px;
    font-family: "Frutiger Bold";
    margin-left: 10px;
    padding: 2px;
    border-radius: 10px;
    cursor: pointer;
    background-color: #d8dbff;
  }

  .productRate{
    margin: 10px 0;
  }

  .actionButtons {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 30px;
    margin-top: 20px; 
    margin-right: 100px;

    @media (max-width: 800px) {
      justify-content: flex-end;
      margin-right: 23px;
    }
  }

  .cartBtn button{
    font-size: 18px;
    width: 170px;
    height: 50px;
  }

  .likeBtn{
    width: 30px;
    cursor: pointer;
  }

  .recommendList {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    margin-top: 20px;
    margin-left: 100px;
  }
`;

const ProductsView = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { products } = useProductContext();
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [wish, setWish] = useState<string>("/heart.png");
  const [isWished, setIsWished] = useState(false);

  const { cartlist, setCartlist} = useCart();

  const product = products.find((p) => p.id === Number(id));

  useEffect(()=>{
    if(auth.currentUser){
      checkWishlist();
    }
  },[auth.currentUser, product]);

  const checkWishlist = async() =>{
    if(!auth.currentUser || !product) return;

    const userRef = doc(db, "users", auth.currentUser.uid);
    const userSnap = await getDoc(userRef);

    if(userSnap.exists()){
      const wishlist = userSnap.data().user_wishlist || [];
      const wished = wishlist.some((item:any) => item.id === product.id);
      setIsWished(wished);
      setWish(wished ? "/heart_red.png" : "/heart.png");
    }
  };

  const handleAction = async (x: string) => {
    if (!auth.currentUser) {
        navigate("/login");
        return;
    }

    const userRef = doc(db, "users", auth.currentUser.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        console.log("User not found");
        return;
    }

    const productWithQuantity = { ...product, quantity };
    if (!product) {
      console.log("Product not found");
      return;
  }

    if (x === "cart") {
        // 장바구니 상태 체크
        const cartlist = userSnap.data().user_cartlist || [];
        const isProductInCart = cartlist.some((item: any) => item.id === product.id);

        if(isProductInCart){
          alert("Product is already in cart");
        }
        await updateDoc(userRef, {
          user_cartlist: arrayUnion(productWithQuantity),
        });

        navigate("/cart");
        setCartlist((prevCartlist) => [...prevCartlist, productWithQuantity]);

    }

    if (x === "wish") {
        if (isWished) {
            // 찜 목록에서 제거
            await updateDoc(userRef, {
                user_wishlist: arrayRemove(product),
            });
            setWish("/heart.png");
            setIsWished(false);
        } else {
            // 찜 목록에 추가
            await setDoc(userRef, {
                user_wishlist: arrayUnion(product),
            }, { merge: true });
            setWish("/heart_red.png");
            setIsWished(true);
        }
    }
};


  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value));
    setQuantity(value);
  };

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };


  return (
    <ProductsViewBlock isDescriptionFull={showFullDescription}>
      <BreadCrumb category={product?.category} crumb="" />
      <div className="contentWrapper">
        <div className="productImg">
          <img src={product?.image} alt={product?.title} />
        </div>
        <div className="productInfo">
          <p className="productTitle">{product?.title}</p>
          <p className="productPrice">${product?.price}</p>
          <div className="descriptionWrapper">
            <p className="productDescript">
              <b>About this item :</b>{" "}
              {showFullDescription
                ? product?.description
                : `${product?.description.slice(0, 130)}...`} 
              <span className="showMore" onClick={toggleDescription}>
                {showFullDescription ? "Show less" : "More"}
              </span>
            </p>
          </div>
          <div className="productRate">
            <Rating rate ={product?.rating?.rate} count={product?.rating?.count}/>
          </div>
          <div className="quantitySelector">
            <label htmlFor="">Quantity </label>
            <input type="number" value={quantity} onChange={handleQuantityChange} min={1} max={100} />
          </div>
        </div>
      </div>
      
      <div className="actionButtons">
        <div className="wishList">
          <img className="likeBtn" src={wish} alt="" onClick={(x)=>handleAction("wish")}/>
        </div>
        <div className="cartBtn">
            <button type="submit" onClick={(x)=>handleAction("cart")}>Add to Cart</button>
        </div>
      </div>

      {/* <div className="recommendList">
        <h3>Recommend</h3>
      
      </div> */}
    </ProductsViewBlock>
  );
};

export default ProductsView;


