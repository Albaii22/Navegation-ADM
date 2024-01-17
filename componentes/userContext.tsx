import React from "react";
import { Register } from "../types/typeRegister";

type userType = {
  user: Register;
  userFunc: (userData: Register) => void;
  isLoggedIn: boolean;
  handleLogin: () => void;
};

const userContext = React.createContext({} as userType);

export { userContext, userType };
