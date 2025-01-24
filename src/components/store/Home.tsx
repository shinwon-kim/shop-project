import React, { useEffect, useState} from "react";
import styled from "styled-components";
import { fetchProducts, Product } from "../api/ProductApi";

const HomeBlock = styled.div`
  width: 100%;

  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  
  padding-top: 100px; /* 네비게이션 바 크기에 맞게 여백 조정 */
  padding-bottom: 60px; /* 푸터 크기에 맞게 여백 추가 */

  .product{
    width: 400px;
    height: 400px;
    border: 1px solid black;
    padding-top: 20px;
    text-align: center;
  }
  img{
    width: 80%;
    height: 80%;
    object-fit: contain;
    
  }
`;


const Home = ():JSX.Element =>{
  const [image, setImage] = useState<string>("");

  const handleProduct = async() =>{
    try{
      const img: Product[] = await fetchProducts();
      console.log(img);
    }
    catch(error){
      console.log("Error fetching products:", error);
    }
  }

    return (
        <HomeBlock>
            <h1>Product List</h1>
            <div className="carousel">
              <img src="https://gole.ms/sites/default/files/styles/1062sah/public/2021-03/carousel-example%20%281%29.png?itok=IQ1HeJMr" alt="" />
            </div>
            <div className="product">
                <img src="https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg" alt="women's clothing" />
                <p>"Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket"</p>
            </div>
            <div className="product">
                <img src="https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg" alt="women's clothing" />
                <p>"Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket"</p>
            </div>
           

        </HomeBlock>
    )
}

export default Home;