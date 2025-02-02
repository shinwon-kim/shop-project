// import axios from "axios";
// const API_URL = "https://fakestoreapi.com/users";

// export interface User{
//     id?: number;
//     email: string;
//     username: string;
//     password: string;
//     name: {
//         firstname: string;
//         lastname: string;
//     };
//     address: {
//         city: string;
//         street: string;
//         number: number;
//         zipcode: string;
//     };
//     phone: string;

// };


// export const userApi = {
//     fetchUsers: async (): Promise<User[]> => {
//         try{
//             const response = await axios.get<User[]>(API_URL);
//             return response.data;
//         }
//         catch(error: any){
//             console.log("Error fetching users:", error);
//             throw error;
//         }
//     },

//     createUser: async (user: User): Promise<User> => {
//         try{
//             const response = await axios.post<User>(API_URL, user);
//             console.log("Respose Data:",response.data);
//             return response.data;

//         }catch(error: any){
//             console.log("Error creating user:", error)
//             throw error;
//         }
//     } 
// }


import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

export const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (auth.currentUser) {
            const userRef = doc(db, "users", auth.currentUser.uid);
    
            const unsubscribeFirestore = onSnapshot(userRef, (docSnap) => {
                if (docSnap.exists()) {
                    setUserInfo(docSnap.data());
                } else {
                    console.log("Firestore에서 사용자 정보 없음.");
                    setUserInfo(null);
                }
            });
    
            return () => unsubscribeFirestore(); 
        }
    }, [auth.currentUser]);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            if (user) {
                await fetchUserInfo(user);
            } else {
                setUserInfo(null);
            }
        }); 
    
        return () => unsubscribeAuth(); 
    }, []);


    const fetchUserInfo = async (user: any) => {
    
        const userId = user.uid;
        const userRef = doc(db, "users", userId);

        try {
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                setUserInfo(userSnap.data()); // Firestore에서 가져온 사용자 정보 저장
            } else {
                console.log("사용자 정보가 없습니다.");
                setUserInfo(null);
            }
        } catch (error) {
            console.error("사용자 정보를 가져오는 중 오류 발생:", error);
            setUserInfo(null);
        } finally {
            setLoading(false);
        }
    };



    return { userInfo, loading };
};


























// import { useEffect, useState } from "react";
// import { auth, db } from "../../firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";


// export const useUserInfo = () =>{
    
//     const [userInfo, setUserInfo] = useState<any>(null); // 사용자 정보를 저장할 상태

//     useEffect(()=>{
//         if(auth.currentUser){
//             console.log(">>>>‼️‼️‼️‼️",auth.currentUser)
//             fetchUserInfo(auth.currentUser);
//         }
//     }, [auth.currentUser]);
    
    
//     const fetchUserInfo = async(user: any)=>{
//         if(!user){
//             setUserInfo(null);

//             return;
//         }

//         const userId = user.uid;
//         const userRef = doc(db, "users", userId);

//         try {
//             const userSnap = await getDoc(userRef);
//             if (userSnap.exists()) {
//                 setUserInfo(userSnap.data()); // 사용자 정보 저장
//             } else{
//                 console.log("사용자 정보가 없습니다.");
//                 setUserInfo(null);
//             }

//         } catch(error) {
//             console.error("사용자 정보를 가져오는 중 오류 발생:", error);
//             setUserInfo(null); // 오류 발생 시 사용자 정보 초기화
//         } 
//     };

//         useEffect(()=>{
//             const unsubscribe = onAuthStateChanged(auth, async(user) => {
//                 if(user){
//                     await fetchUserInfo(user);
//                 } else{
//                     setUserInfo(null);
//                 }
//             });
    
//             return () => unsubscribe();
//         }, []);

//     return {userInfo};

// };
// const [ state, dispatch ] = useReducer(reducer, null);
// const test = onAuthStateChanged(auth, async(user)=>{

//     const querySnapshot = await getDocs(collection(db, "users"));
//     querySnapshot.forEach((doc) =>{
//         const userData = doc.data();
//         console.log(doc.id, "=>", userData.user_firstname);
        
//     })
//     return () => test();
// })