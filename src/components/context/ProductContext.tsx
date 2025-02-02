import {createContext, useContext, useState, useEffect} from "react";
import {fetchProducts, Product} from "../api/ProductApi";

interface ProductContextType{
    products: Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({children} : {children: React.ReactNode}) =>{
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const data = await fetchProducts();
                setProducts(data);
            }catch(error){
                setError("Failed to fetch products.");
            }
        };
        fetchData();
    }, []);

    return(
        <ProductContext.Provider value={{products}}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () =>{
    const context = useContext(ProductContext);
    if(!context){
        throw new Error("useProductContext must be used within a ProductProvider");
    }
    return context;
};