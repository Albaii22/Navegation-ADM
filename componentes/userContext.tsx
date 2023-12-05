import React from "react";

type Usertype = {
  user: string;
  handleUser: Function;
  isLoggedIn: boolean;
  handleLogin: Function;
};

const authContext = React.createContext({} as Usertype);

export { authContext, Usertype };
