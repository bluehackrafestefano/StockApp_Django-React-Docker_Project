import axios from 'axios';
import {createContext, useState} from 'react'
import { toastErrorNotify, toastSuccessNotify } from '../helper/ToastNotify';

export const AuthContext = createContext();

const url = "http://localhost:8000/"

const AuthContextProvider = (props)=>{
  const [currentUser,setCurrentUser] = useState(sessionStorage.getItem('username') || false);
  let keys = sessionStorage.getItem('token')
  const [myKey,setMyKey] = useState(keys && window.atob(keys))

  const createUser = async (userInfo,navigate)=>{
    try {
      const res = await axios.post(`${url}users/register/`,userInfo)
      console.log(res)
      if(res.data.token){
        console.log(res)
        setMyKey(res.data.token)
        setCurrentUser(res.data.username)
        sessionStorage.setItem('username',res.data.username)
        const myToken = window.btoa(res.data.token)
        sessionStorage.setItem('token',myToken)
        toastSuccessNotify('User registered successfully.')
        navigate("/stock/dashboard")
      }

      
    } catch (error) {
      console.log(error)
    }
  }

  const signIn = async (userInfo,navigate)=>{
    try {
      const res = await axios.post(`${url}users/auth/login/`,userInfo)
      console.log(res)
      if(res.data.key){
        console.log(res)
        setMyKey(res.data.key)
        setCurrentUser(res.data.user.username)
        sessionStorage.setItem("admin",res.data.user.is_superuser)
        sessionStorage.setItem('username',res.data.user.username)
        const myToken = window.btoa(res.data.key)
        sessionStorage.setItem('token',myToken)
        toastSuccessNotify('User login successfully.')
        navigate("/stock/dashboard")
      }

      
    } catch (error) {
      toastErrorNotify('User not login.')
      console.log(error)
    }
  }

  const logOut = async (navigate)=>{
    try {
      var config = {
        method: 'post',
        url: `${url}users/auth/logout/`,
        headers: { 
          'Authorization': `Token ${myKey}`, 
        }
      };
      const res = await axios(config)
      console.log(res)
      if (res.status === 200) {
        setCurrentUser(false)
        setMyKey(false)
        sessionStorage.clear()
        toastSuccessNotify('User log out successfully.')
        navigate("/")
      }
      
      
    } catch (error) {
      
    }
  }
  

 let value = {
    createUser,
    currentUser,
    myKey,
    signIn,
    logOut
 }


  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;