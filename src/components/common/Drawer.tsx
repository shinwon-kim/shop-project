import styled from "styled-components";
import { Link }  from "react-router-dom";

interface DrawerProps{
    onOpen: boolean;
    onClose: () => void;
}

const DrawerBlock = styled.div<{$isOpen: boolean}>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    
    display: ${({$isOpen}) => ($isOpen ? "block" : "none") };

    .drawer{
        width: 250px;
        height: 200vh;
        padding: 10px;
        background-color: #F5F5F5;
        
        & ul{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            color: black;
        }
        
        & li{
            padding: 10px 0px;
        }
    }
    .backdrop{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
        background: rgba(0,0,0,0.7);

    }
`;


const Drawer = ({onOpen, onClose}: DrawerProps):JSX.Element => {

    return(
        <DrawerBlock $isOpen={onOpen}>
            <div className="drawer">
                <ul>
                    <li><Link to="/fashion" onClick={onClose}>Fashion</Link></li>
                    <li><Link to="/jewelery" onClick={onClose}>Jewelery</Link></li>
                    <li><Link to="/electronics" onClick={onClose}>Electronics</Link></li>
                    <li><Link to="/grocery" onClick={onClose}>Grocery</Link></li>
                    <li><Link to="/sports" onClick={onClose}>Sports</Link></li>
                </ul>
            </div>
            <div className ="backdrop" onClick={onClose}></div>
        </DrawerBlock>
    )

}

export default Drawer;
