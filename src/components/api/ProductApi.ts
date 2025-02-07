import axios from "axios";

export interface Product {
    id: number;
    title: string;
    price: number;
    quantity?: number ;
    description: string;
    category: string;
    color?: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    note?: string;
};

export const fetchProducts = async ():Promise<Product[]> => {
    try{
        const response = await axios.get<Product[]>("https://67a354f931d0d3a6b783254d.mockapi.io/product");
        return response.data;

    }catch(error){
        console.log("Error fetching products:", error);
        throw error;
    }
};