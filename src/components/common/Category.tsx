import { useState, useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Loading from "../common/Loading";
import Filtering from "../common/Filtering";
import BreadCrumb from "./BreadCrumb";
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";

const CategoryWrapper = styled.div`
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
`;

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


const CategoryBlock = styled.div`
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
    }

    @media(max-width: 800px) {
        grid-template-columns: 1fr;  
    }
`;

const Pagination = styled.div`
    display: flex;
    gap: 10px;

    margin-top: 20px;
    border: 2px solid #652ab7;
    border-radius: 30px;
    padding: 0 10px;

    & button {
        width: 35px;
        cursor: pointer;
        background-color: transparent;
        border: none;
        color: black;
        margin: 0;
        
    }
    & button:hover, button.active{
        background-color: #652ab7;
        color: white;
        border-radius: 100%;
        
    }
    & .page:hover, .page.active{
        background-color: transparent;
        color: black;
        
    }
`;

interface CategoryProps{
    category: string;
}

const Category = ({category}:CategoryProps): JSX.Element => {
    const { products } = useProductContext();
    const [section, setSection] = useState<string | null>("all");
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(1000);
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [categoryProducts, setCategoryProducts] = useState<any[]>([]);
    
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 6;
    const [canPagePrev, setCanPagePrev] = useState(false);
    const [canPageNext, setCanPageNext] = useState(true);

    useEffect(() => {
        if (category === "fashion") {
            const fashionProducts = products.filter(
                (product) => product.category === "men's clothing" || product.category === "women's clothing"
            );
            setCategoryProducts(section === "all" ? fashionProducts : fashionProducts.filter((product) => product.category === section));
        } else {
            setCategoryProducts(products.filter((product) => product.category === category));
            setSection("");
        }
    }, [category, section, products]);


    const filteredByPrice = categoryProducts.filter((product) => 
        product.price >= minPrice && product.price <= maxPrice);
    
    const filteredProducts = filteredByPrice.filter((product) =>
        selectedColor == "" || product.color === selectedColor);

    // 페이지네이션
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const pageNumbers = [];
    const lastPageNumber = Math.ceil(filteredProducts.length / itemsPerPage);
    for (let i = 1; i <= lastPageNumber; i++) {
        pageNumbers.push(i);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setCanPagePrev(currentPage > 1);
        setCanPageNext(currentPage < lastPageNumber);
    }, [currentPage, lastPageNumber]);
    
    const handlePageArrow = (page: "prev" | "next") => {
        if (page === "prev" && canPagePrev) {
            setCurrentPage(currentPage - 1);
        } else if (page === "next" && canPageNext) {
            setCurrentPage(currentPage + 1);
        }
    };


    return (
        <CategoryWrapper>
            <BreadCrumb category={category} crumb={section} />
            <h3>{category.charAt(0).toUpperCase()+category.slice(1).toLowerCase()}</h3>
            {category === "fashion" && (
                <Sidebar>
                    <button onClick={() => setSection("all")}>All</button>
                    <button onClick={() => setSection("men's clothing")}>Men's Clothing</button>
                    <button onClick={() => setSection("women's clothing")}>Women's Clothing</button>
                </Sidebar>
            )}
            <Filtering setPriceRange={(min, max) => {setMinPrice(min); setMaxPrice(max);}} 
                    setColor={setSelectedColor}
            />
            <CategoryBlock>
                {products.length === 0 ? (
                    <Loading />
                ) : (currentProducts.map((product) => (
                        <div key={product.id} className="product">
                            <Link to={`/product/${product.id}`} className="productDetail">
                                <img src={product.image} alt={product.title} />
                                <p>{product.title}</p>
                                <p>${product.price}</p>
                            </Link>
                        </div>
                    ))
                )}
            </CategoryBlock>

            {/* 페이지네이션 버튼 */}
            <Pagination>
                <button className="page" disabled={!canPagePrev} style={{color: canPagePrev ? "black": "gray"}}>

                    <IoIosArrowBack onClick={()=>handlePageArrow("prev")} />
                </button>

                {pageNumbers.map((number) => (
   
                    <button key={number} className={currentPage === number ? "active": ""} onClick={() => setCurrentPage(number)}>
                        {number}
                    </button>
                ))}
                <button className="page" disabled={!canPageNext} style={{color: canPageNext ? "black": "gray"}}>
                    <IoIosArrowForward onClick={()=>handlePageArrow("next")}/>
                </button>
            </Pagination>
        </CategoryWrapper>
    );
};

export default Category;
