import { useState } from "react";
import { useProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loading from "../common/Loading";
import Filtering from "../common/Filtering";
import BreadCrumb from "../common/BreadCrumb"; 

const SportsWrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    min-height: 100vh;
    padding-top: 120px; 
    padding-bottom: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 0 auto;
    flex-wrap: nowrap;
    
`;

const SportsBlock = styled.div`
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);  
    gap: 20px;
    justify-items: center;
    align-items: start;
    margin: 0 auto;
    flex-wrap: wrap;

    .product{
        width: 100%;
        max-width: 350px;  
        height: 400px;
        border: 2px solid #cecece;
        border-radius: 10px;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 20px;

        & .productDetail{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
        }
        
        & img{
            width: 250px;
            height: 250px;

            object-fit: contain;
        }
    }
    @media(max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);  
        
        button{
            width: 100px;
        }
    }

    @media(max-width: 800px) {
        grid-template-columns: 1fr;  
    }
`;

const Sports = ():JSX.Element => {
    const {products} = useProductContext();
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(1000);
    const [selectedColor, setSelectedColor] = useState<string>("");

    const sportsProducts = products.filter(product => product.category === "sports");

    const filteredByPrice = sportsProducts.filter(product => 
        product.price >= minPrice && product.price <= maxPrice);
    
    const filteredProducts = filteredByPrice.filter(product =>
        selectedColor == "" || product.color === selectedColor);

    return(
        <SportsWrapper>
            <BreadCrumb category="Sports" />
            <h3>Sports</h3>
            <Filtering setPriceRange={(min,max) =>{
                    setMinPrice(min);
                    setMaxPrice(max);
                }} setColor={setSelectedColor} />
            <SportsBlock>
            {products.length === 0 ? (<Loading /> )
            : (filteredProducts.map((product)=>(
                    <div key ={product.id} className="product">
                        <Link to={`/product/${product.id}`} className="productDetail">
                            <img src={product.image} alt={product.title} />
                            <p>{product.title}</p>
                            <p>${product.price}</p> 
                        </Link>
                    </div>
                ))
            )}
            </SportsBlock>
        </SportsWrapper>
    )
};

export default Sports;

