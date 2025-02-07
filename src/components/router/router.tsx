import React from "react";
import { Routes, Route} from "react-router-dom";
import { ProductProvider} from "../context/ProductContext";
import Home from "../store/Home";
import Login from "../login/Login";
import Signup from "../login/Signup";
import MyPage from "../store/MyPage";
import ProductsView from "../views/ProductsView";
import Cart from "../store/Cart";
import Fashion from "../views/Fashion";
import Jewelery from "../views/Jewelery";
import Electronics from "../views/Electronics";
import Grocery from "../views/Grocery";
import Sports from "../views/Sports";

const Router = ():JSX.Element => {
    return(
        <ProductProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductsView />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/fashion" element={<Fashion />} />
                <Route path="/jewelery" element={<Jewelery />} />
                <Route path="/electronics" element={<Electronics />} />
                <Route path="/grocery" element={<Grocery />} />
                <Route path="/sports" element={<Sports />} />
            </Routes>
        </ProductProvider>
    )
}

export default Router;