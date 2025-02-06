import styled from "styled-components";
import {Link} from "react-router-dom";

interface IBreadCrumbsProps {
    readonly category?: string;
    readonly crumb?: string;
}

const BreadCrumbWrapper = styled.div`
    font-size: 16px;
    font-family: "Frutiger";
    color: #acacac;
    width: 100%;
    text-align: left;
    margin: 0 0 1px 50px;
    a {
        text-decoration: none;
    }
`;

const BreadCrumb = ({ category = "", crumb = "" }: IBreadCrumbsProps) => {
    return (
        <BreadCrumbWrapper>
            <Link to="/">Home</Link> &gt;{" "}
            <Link to={`/${category.toLowerCase()}`}>
                {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
            </Link> 
            {crumb && <> &gt; <span>{crumb.charAt(0).toUpperCase() + crumb.slice(1).toLowerCase()}</span></>}
        </BreadCrumbWrapper>
    );
};

export default BreadCrumb;
