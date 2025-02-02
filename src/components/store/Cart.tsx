import styled from "styled-components";

const CartBlock = styled.div`
    padding-top: 120px; 
    padding-bottom: 120px;
    width: 100%;
    max-width: 1200px;
    min-height: 100vh;   
`;


const Cart = (): JSX.Element => {

    return(
        <CartBlock>
            <h1>Cart</h1>
        </CartBlock>

    )
}

export default Cart;