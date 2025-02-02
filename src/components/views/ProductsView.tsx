import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";
import {auth, db} from "../../firebase";
import {doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";
import Rating from "../common/Rating";

const ProductsViewBlock = styled.div<{ isDescriptionFull: boolean }>`
  padding-top: 120px;
  padding-bottom: 120px;
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
  

  .contentWrapper {
    display: flex;
    flex-direction: row; 
    width: 100%;
    max-width: 900px; 
    gap: 30px; 
  }
  .productInfo {
    flex: 1;
    display: flex;
    flex-direction: column; 
    align-items: flex-start;
  }

  .productTitle{
    text-align: left;
  }

  .productImg img{
    width: 300px;
    height: auto;
    object-fit: contain;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px #d2d2d2;
  }

  .productPrice{
    margin: 10px 0;
    font-size: 28px;
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
      const wishlist = userSnap.data().wishlist || [];
      const wished = wishlist.some((item:any) => item.id === product.id);
      setIsWished(wished);
      setWish(wished ? "/heart_red.png" : "/heart.png");
    }
  };

  const handleWish = async () => {
    if(!auth.currentUser){
      navigate("/login");
      return;
    }
    const userRef = doc(db, "users", auth.currentUser.uid);
    if(isWished){
      await updateDoc(userRef, {
        wishlist: arrayRemove(product),
      });
      setWish("/heart.png");
      setIsWished(false);
    } else{
      await setDoc(userRef, {wishlist: arrayUnion(product)}, {merge: true});
      setWish("/heart_red.png");
      setIsWished(true);
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
      <div className="contentWrapper">
        <div className="productImg">
          <img src={product?.image} alt={product?.title} />
        </div>
        <div className="productInfo">
          <h2 className="productTitle">{product?.title}</h2>
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
            {/* <p>({product?.rating?.rate})</p> */}
          </div>
          <div className="quantitySelector">
            <label htmlFor="">Quantity </label>
            <input type="number" value={quantity} onChange={handleQuantityChange} min={1} max={100} />
          </div>
        </div>
      </div>
      
      <div className="actionButtons">
        <div className="wishList">
          <img className="likeBtn" src={wish} alt="" onClick={handleWish}/>
        </div>
        <div className="cartBtn">
          <Link to="/cart">
            <button type="submit">Add to Cart</button>
          </Link>
        </div>
      </div>

      <div className="recommendList">
        <h3>Recommend</h3>
        <div>
          pants
        </div>
      </div>
    </ProductsViewBlock>
  );
};

export default ProductsView;


