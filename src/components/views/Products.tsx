import styled from "styled-components";
import { useProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";


const ProductBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;  
    gap: 20px;
    padding-top: 120px; 
    padding-bottom: 120px;
    
    .product{
    width: 450px;
    height: 500px;
    border: 1px solid black;
    padding-top: 20px;
    text-align: center;
    cursor: pointer;
    }

    img{
    width: 80%;
    height: 80%;
    object-fit: contain;
    }
`

const Products = ():JSX.Element =>{
    const { products } = useProductContext();

    return(
        <ProductBlock>
            {products.length === 0 ? (
          <p>Loading products...</p> // 데이터가 없으면 로딩 중 표시
        ) : (
          products.map((product) => (
            <div className="product" key={product.id} >
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} />
                <p>{product.title}</p>
                <p>${product.price}</p> 
              </Link>
            </div>
          ))
        )}

        </ProductBlock>
    );
};

export default Products;


