import {useState, useEffect} from "react";
import styled from "styled-components";
import { FaStar, FaRegStar, FaRegStarHalfStroke   } from "react-icons/fa6";


interface RateProps {
    rate: number | undefined,
    count: number | undefined,
}

const RateBlock = styled.div`
    font-family: "Frutiger";
    font-size: 13px;
    display: flex;
    flex-wrap: nowrap;
    gap: 10px;
    text-align: left;
    align-items: center;

    .countText{
        color: #272727;
    }

  
`;

const Rating = ({rate = 0, count = 0}:RateProps):JSX.Element =>{
    const [star, setStar] = useState<JSX.Element[]>([]);

    useEffect(()=>{
        if (rate === undefined) return;

        const integerPart  = Math.floor(rate)
        const decimalPart  = Math.round((rate - integerPart ) * 10);
        const starArray: JSX.Element[] = [];

        for(let i = 0; i < integerPart; i++){
            starArray.push(<FaStar key={i} color="gold"/>);
        }
        if(decimalPart >= 5){
            starArray.push(<FaRegStarHalfStroke  key="half" color="gold" />);
        }
        while(starArray.length < 5){
            starArray.push(<FaRegStar key={`empty-${starArray.length}`} color="gold"/>)
        }


        setStar(starArray);

    }, [rate])


    return(
        <RateBlock>
            <div className="starWrapper">
                {rate} {star}
            </div>
            <div className="countText">
                ({count} ratings)
            </div>
        </RateBlock>
    )
}

export default Rating;