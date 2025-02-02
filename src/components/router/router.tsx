import React from "react";
import { Routes, Route} from "react-router-dom";
import Login from "../login/Login";
import Signup from "../login/Signup";
import Home from "../store/Home";
import Mypage from "../store/Mypage";
import ProductsView from "../views/ProductsView";
import Cart from "../store/Cart";
import { ProductProvider} from "../context/ProductContext";

const Router = ():JSX.Element => {
    return(
        <ProductProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductsView />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </ProductProvider>
    )
}

export default Router;