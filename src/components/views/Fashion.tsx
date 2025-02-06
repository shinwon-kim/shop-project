import { useState } from "react";
import { useProductContext } from "../context/ProductContext";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Loading from "../common/Loading";
import Filtering from "../common/Filtering";
import BreadCrumb from "../common/BreadCrumb"; 

const FashionWrapper = styled.div`
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

    h3{
        margin: 0;
    }

`
const Sidebar = styled.div`
    width: 700px;
    margin-right: 20px;
    display: flex;
    justify-content: center;

    gap: 20px;
    
    & button{
        width: 200px;
    }

    @media(max-width: 1000px) {
        button{
            width: 170px;
        }
    }
`;

const FashionBlock = styled.div`
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
        grid-template-columns: repeat(2, 1fr);  // 화면 크기 줄어들면 2개의 상품
        
        button{
            width: 100px;
        }
    }

    @media(max-width: 800px) {
        grid-template-columns: 1fr;  // 화면 크기가 더 줄어들면 1개의 상품
    }
`;



const Fashion = ():JSX.Element => {
    const { products } = useProductContext();
    const [category, setCategory] = useState<string>("all");
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(1000);
    const [selectedColor, setSelectedColor] = useState<string>("");

    const fashionProducts = products.filter(product =>
        product.category === "men's clothing" || product.category === "women's clothing"
    );
    
    // 카테고리 필터링
    const filteredByCategory = category === "all"
    ? fashionProducts
    : fashionProducts.filter(product => product.category === category);

    // 가격 필터링
    const filteredByPrice = filteredByCategory.filter(product =>
        product.price >= minPrice && product.price <= maxPrice);

    // 색상 필터링
    const filteredProducts = filteredByPrice.filter(product =>
        selectedColor === "" || product.color === selectedColor);

    return(
        <FashionWrapper>
            <BreadCrumb category="Fashion" crumb={category}/>
            {/* <h3>{category.toUpperCase()}</h3> */}
            <h3>Fashion</h3>
            <Sidebar>
                <button onClick={() => setCategory("all")}>All</button>
                <button onClick={() => setCategory("men\'s clothing")}>Men's Clothing</button>
                <button onClick={() => setCategory("women\'s clothing")}>Women's Clothing</button>
            </Sidebar>
            <Filtering setPriceRange={(min,max) =>{
                setMinPrice(min);
                setMaxPrice(max);
            }} setColor={setSelectedColor} />
            <FashionBlock>
                {products.length === 0 ? 
                    (<Loading /> )
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
                </FashionBlock>
        </FashionWrapper>
    )
};

export default Fashion;
