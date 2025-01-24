import axios from "axios";

export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
};

export const fetchProducts = async ():Promise<Product[]> => {
    try{
        const response = await axios.get<Product[]>("https://fakestoreapi.com/products");
        return response.data;

    }catch(error){
        console.log("Error fetching products:", error);
        throw error;
    }
};