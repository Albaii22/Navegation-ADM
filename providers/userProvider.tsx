import React, { useContext, useState } from "react";
import { Usertype, authContext } from "../componentes/userContext";

type UserProviderProps = {
  children: JSX.Element | JSX.Element[];
};

const UserProvider = (props: UserProviderProps) => {
  const { children } = props;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleUser = (usuario: string) => {
    setUser(usuario);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const defaultValue: Usertype = {
    user,
    handleUser,
    handleLogin,
    isLoggedIn,
  };

  return (
    <authContext.Provider value={defaultValue}>{children}</authContext.Provider>
  );
};

export default UserProvider;
