import React, {useState, useEffect} from "react";
import { fetchProducts, Product } from "../api/ProductApi";
import styled from "styled-components";


const SearchBlock = styled.div`
   
    position: relative;
    display: flex;
    flex-direction: column;


    input{
        position: relative;
        width: 50vw;
        max-width: 600px;
        min-width: 200px;
        height: 30px;
        padding: 6px;
        border-radius: 3px;
        font-family: "Frutiger Bold";
        border: none;
        outline: none;
        
    }

    .searchBtn{
        position: absolute;
        right: 0;
        height: 30px;
        margin: 5px;
        padding: 6px;
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
    }
    .searchResultBox{
        position: absolute;
        top: 42px;
        width: 50vw;
        max-width: 600px;
        min-width: 200px;
        height: auto; 
        min-height: 90px;
        padding: 6px;
        border-radius: 3px;
        border: 1px solid #bdbdbd;;
        background-color: white;
        visibility: hidden;
        color: black;
        text-align: left;
    }

    &:focus-within div{
        visibility: visible;
    }

    .searchIcon{
        font-size: 12px;
        margin: 5px;
        background: none;
        border: none;
        outline: none;
        color: #8f8f8f;

    }

`;


const Search = ():JSX.Element => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [inputValue, setInputValue] = useState<string>("");

    // 초기 상품 데이터를 한 번만 불러오기
    useEffect(() =>{
        const fetchData = async() =>{
            try{
                const result: Product[] = await fetchProducts();
                setProducts(result);
             }catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchData();
    },[]);

    // input값이 변경될 때마다 필터링
    useEffect(() => {
        if(inputValue.trim() === ""){
            setSearchResults([]);
        }
        else{
            const filteredResult = products.filter((p: Product) =>
                p.title.toLowerCase().startsWith(inputValue.toLowerCase())
            );
            setSearchResults(filteredResult);
        }
    }, [inputValue, products]);


    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) =>{
        setInputValue(e.target.value);
    }
    
    let resultContent;
    if(searchResults.length > 0){
        resultContent = searchResults.map((product)=>(
            <p key={product.id}><i className="fa fa-search searchIcon"></i>{product.title} </p>
        ))
    }
    return (
        <SearchBlock >
            <input type="text" placeholder="Search" onChange={handleInputChange}/>
            <button className="searchBtn" type="submit"><i className="fa fa-search"></i></button>
            <div className="searchResultBox">{resultContent}</div>
        </SearchBlock>
        
    )
}

export default Search;