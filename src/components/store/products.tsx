import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
    id: number;
    username: string;
    name: string;
}

const Products = (): JSX.Element => {
    const [users, setUsers] = useState<User[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>{
        const fetchUsers = async () => {
            try {
                setError(null);
                setUsers(null);
                setLoading(true);
                const response = await axios.get("https://fakestoreapi.com/users");
                setUsers(response.data);
            } catch(error: unknown){
                if(error instanceof Error){
                    setError(error.message);
                } else{
                    setError("알 수 없는 에러 발생");
                }
            }
            setLoading(false);
        };
        fetchUsers();
    },[]);

    if(loading) return <div>로딩중...</div>;
    if(error) return <div> 에러가 발생했습니다 </div>;
    if(!users) return <></>;

    return (
        <ul>
            {users.map((user) => (
                <li key = {user.id}>
                    {user.username} 
                </li>
            ))}
        </ul>
    );
};

export default Products;