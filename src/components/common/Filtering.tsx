import { useState, useEffect } from "react";
import styled from "styled-components";

const FilterWrapper = styled.div` 
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
    
    input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        height: 16px;
        background: #cccccc;
        border-radius: 10px;
    }
    
    .priceFilter {
        display: flex;
        flex-direction: row;

    }

    select{
        font-family: "Frutiger";
        outline: none;
        font-size: 14px;
        padding: 0.2em 1em 0.2em 0.5em;
        background-color: #f6f6f6;
        border: 1px solid #caced1;
        border-radius: 0.25rem;
        color: black;
        cursor: pointer;
    }

    label{
        margin-right: 10px;
    }

    @media (max-width: 800px) {
        display: flex;
        flex-direction: column;

    }
    
`;

type FilterProps = {
    setPriceRange: (minPrice: number, maxPrice: number) => void;
    setColor: (color: string) => void;
}

const Filtering = ({ setPriceRange, setColor }: FilterProps): JSX.Element => {
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(1000);
    const [selectedColor, setSelectedColor] = useState<string>("");

    useEffect(() => {
        setPriceRange(minPrice, maxPrice); 
    }, [minPrice, maxPrice, setPriceRange]); 

    useEffect(() => {
        setColor(selectedColor); 
    }, [selectedColor, setColor]); 

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinPrice(Number(e.target.value));
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxPrice(Number(e.target.value));
    };

    return (
        <FilterWrapper>
            <div className="priceFilter">
                <label>Price</label>
                <input type="range" min="0" max="1000" value={minPrice} onChange={handleMinPriceChange} />
                <input type="range" min="0" max="1000" value={maxPrice} onChange={handleMaxPriceChange}/>
                <div className="priceRange">
                    <span>${minPrice}</span> - <span>${maxPrice}</span>
                </div>
            </div>

            <div className="colorFilter">
                <label>Color</label>
                <select className="selected"onChange={(e) => setSelectedColor(e.target.value)} value={selectedColor}>
                    <option value="">All Colors</option>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                    <option value="purple">Purple</option>
                    <option value="beige">Beige</option>
                    <option value="white">White</option>
                    <option value="black">Black</option>
                    <option value="silver">Silver</option>
                    <option value="gold">Gold</option>

                </select>
            </div>
        </FilterWrapper>
    );
}

export default Filtering;
