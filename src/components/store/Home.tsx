import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"; 
import { useProductContext } from "../context/ProductContext";
import styled from "styled-components";
import Loading from "../common/Loading";
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";

const HomeWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  min-height: 100vh;
  padding-top: 100px; 
  padding-bottom: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  
  margin: 0 auto;
`;

const Banner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HomeBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;

  h2 {
    text-align: left;
    margin: 100px 0 10px 20px;
    padding-left: 10px;
    border-left: 4px solid #4900c6;
  }

  .scrollContainer {
    position: relative;
    width: 100%;
    max-width: 1200px; 
    overflow: hidden;
  }

  .productWrapper {
    display: flex;
    flex-wrap: nowrap;
    gap: 30px;
    padding: 10px 0;
    overflow-x: auto;
    width: 100%;
    max-width: 100%;
    scroll-behavior: smooth;
  }

  .productWrapper::-webkit-scrollbar {
    display: none;
  }

  .product {
    width: 300px;
    min-width: 300px;
    height: 400px;
    border: 3px solid #cecece;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px;

    & .productDetail {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }

    & img {
      width: 100%;
      height: 250px;
      object-fit: contain;
    }
  }

  .scrollButton {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 10px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    z-index: 10;
    font-size: 15px;

    &:hover {
      background-color: #3e00a1d4;
    }

    &.left {
      left: 0;
    }

    &.right {
      right: 0;
    }
  }
`;


const Home = (): JSX.Element => {
  const { products } = useProductContext();
  const productWrapperRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const filteredProducts = products.filter(product => product.note === "best");

  const handleScroll = (direction: "left" | "right") => {
    if (productWrapperRef.current) {
      const scrollAmount = 330; // 한 번에 스크롤할 양
      if (direction === "right") {
        productWrapperRef.current.scrollLeft += scrollAmount;
      } else if (direction === "left") {
        productWrapperRef.current.scrollLeft -= scrollAmount;
      }
    }
  };

  useEffect(() => {
    const checkScroll = () => {
      if (productWrapperRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = productWrapperRef.current;
        
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
      }
    };
  
    const productWrapper = productWrapperRef.current;
    productWrapper?.addEventListener("scroll", checkScroll);

    checkScroll();
  
    return () => {
      productWrapper?.removeEventListener("scroll", checkScroll);
    };
  }, [products]); 

  return (
    <HomeWrapper>
      <Banner>
        <img className="banner" src="./banner.jpg" alt="bannerImg" />
      </Banner>

      <HomeBlock>
        <h2>Best Sellers</h2>

        {products.length === 0 ? (
          <Loading />
        ) : (
          <div className="scrollContainer">
            <button className="scrollButton left" onClick={() => handleScroll("left")}
              disabled={!canScrollLeft} style={{ visibility: canScrollLeft ? "visible" : "hidden" }}>
              <IoIosArrowBack  />
            </button>

            <div className="productWrapper" ref={productWrapperRef}>
              {filteredProducts.map((product) => (
                <div key={product.id} className="product">
                  <Link to={`/product/${product.id}`} className="productDetail">
                    <img src={product.image} alt={product.title} />
                    <p>{product.title}</p>
                    <p>${product.price}</p>
                  </Link>
                </div>
              ))}
            </div>

            <button className="scrollButton right" onClick={() => handleScroll("right")}
              disabled={!canScrollRight} style={{ visibility: canScrollRight ? "visible" : "hidden" }}>
              <IoIosArrowForward />
            </button>
          </div>
        )}
      </HomeBlock>

    </HomeWrapper>
  );
};

export default Home;
