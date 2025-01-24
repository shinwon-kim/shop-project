import axios from "axios";
const API_URL = "https://fakestoreapi.com/users";

export interface User{
    id?: number;
    email: string;
    username: string;
    password: string;
    name: {
        firstname: string;
        lastname: string;
    };
    address: {
        city: string;
        street: string;
        number: number;
        zipcode: string;
    };
    phone: string;

};


export const userApi = {
    fetchUsers: async (): Promise<User[]> => {
        try{
            const response = await axios.get<User[]>(API_URL);
            return response.data;
        }
        catch(error: any){
            console.log("Error fetching users:", error);
            throw error;
        }
    },

    createUser: async (user: User): Promise<User> => {
        try{
            const response = await axios.post<User>(API_URL, user);
            console.log("Respose Data:",response.data);
            return response.data;

        }catch(error: any){
            console.log("Error creating user:", error)
            throw error;
        }
    } 
}