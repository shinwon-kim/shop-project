import styled from "styled-components";
import { useProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";
import Loading from "../common/Loading";

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
    width: 400px;
    height: 450px;
    border: 2px solid #cecece;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;

    & .productDetail{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
    
    & img{
      width: 270px;
      height: 270px;

      object-fit: contain;
    }
  }
`

const Products = ():JSX.Element =>{
    const { products } = useProductContext();

    return(
        <ProductBlock>
            {products.length === 0 ? (
            <Loading />
        ) : (
          products.map((product) => (
            <div className="product" key={product.id} >
              <Link to={`/product/${product.id}`} className="productDetail">
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


