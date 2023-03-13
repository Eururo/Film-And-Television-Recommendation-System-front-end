import { useState, useEffect } from 'react';
import AuthContext from './AuthContext'

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(localStorage.getItem("userId"));

    useEffect(() => {
        const url = `${process.env.REACT_APP_IPADDRESS}/user/isLogin`;
        async function isLogin(){
          let response = await fetch(url,{
            credentials: 'include'
          });
          let result = await response.text();
          // console.log("用户ID:");
          // console.log(result);
          let current_id = parseInt(result);
          if(current_id){
            setUserId(current_id);
            localStorage.setItem("userId",current_id);
          }
          else{
            setUserId(current_id);
            localStorage.removeItem("userId");
          }
        }
        isLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ userId }}>{children}</AuthContext.Provider>
    );
};