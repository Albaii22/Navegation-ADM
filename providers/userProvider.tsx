import React, {  useState } from "react";
import { userType, userContext } from "../componentes/userContext";
import { Register } from "../types/typeRegister";

type UserProviderProps = {
  children: JSX.Element | JSX.Element[];
};

const UserProvider = (props: UserProviderProps) => {
  const { children } = props;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user,setUser] = useState<Register>({
    name:'',
    email:'',
    psswd:''
  });

  const userFunc = (userName:Register) =>{
    setUser({
    name:userName.name,
    email:userName.email,
    psswd:userName.psswd
    })
}

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const defaultValue: userType = {
    user,
    userFunc,
    isLoggedIn,
    handleLogin
}

  return (
    <userContext.Provider value={defaultValue}>{children}</userContext.Provider>
  );
};

export default UserProvider;
