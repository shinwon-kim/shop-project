import React, { createContext, useContext, useState, useEffect, ReactNode} from "react";
import { db, auth } from "../../firebase";
import { doc, getDoc} from "firebase/firestore";
import { User, onAuthStateChanged } from "firebase/auth";


interface CartContextType{
    cartlist: any[];
    setCartlist: React.Dispatch<React.SetStateAction<any[]>>;
    cartCount: number;
    setCartCount: React.Dispatch<React.SetStateAction<number>>;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);


interface CartProviderProps{
    children: ReactNode;
}

export const CartProvider = ({children}: CartProviderProps) =>{
    const [cartlist, setCartlist] = useState<any[]>([]);
    const [cartCount, setCartCount] = useState<number>(0);
    const [user, setUser] = useState<User | null>(null);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [])

    useEffect(()=>{
        if(user){
            const fetchCartData = async() =>{
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);
                if(userSnap.exists()){
                    const cartlistData = userSnap.data().user_cartlist || [];
                    setCartlist(cartlistData);
                }
            };
            fetchCartData();
        }
    }, [user])

    useEffect(() => {
        const total = cartlist.reduce((acc, item) => acc + (item.quantity || 0), 0);
        setCartCount(total);
        
      }, [cartlist]);

    return(
        <CartContext.Provider value ={{cartlist, setCartlist, cartCount, setCartCount, user, setUser}}>
            {children}
        </CartContext.Provider>
    );
};


export const useCart = ():CartContextType => {
    const context = useContext(CartContext);
    if(!context){
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};