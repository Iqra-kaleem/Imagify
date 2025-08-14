import {  useState, createContext } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { useEffect } from "react";

export const AppContext = createContext();

const AppContextProvider =(props)=>{
    const [user , setuser] = useState(null);
    const [showlogin , setshowlogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));

    const [credit , setCredit] = useState(0);

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const loadCreditsData = async ()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/user/credits',{headers: {token}})

            if(data.success){
                setCredit(data.credits)
                setuser(data.user)
            }

        } catch (error) {
           console.log(error) 
           toast.error(error.message)
        }
    }

    const logout = ()=>{
        localStorage.removeItem('token');
        setToken('')
        setuser(null);
    }

    useEffect(()=>{
       if(token){
        loadCreditsData()
       }
    },[token])

    const value ={
        user,
        setuser,
        showlogin,
        setshowlogin,
        backendUrl,
        token, 
        setToken,
        credit ,
        setCredit,
        loadCreditsData,
        logout,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;