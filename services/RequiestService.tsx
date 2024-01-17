import { Register } from "../types/typeRegister"

export const postRegister = async (url:string,RegisteredUser:Register) => {
    const init =  {
        method:'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: RegisteredUser.name,
            email: RegisteredUser.email,
            password: RegisteredUser.psswd
          }),
    }
    const response = await fetch(url,init)
    return response
}

export const getLogging = async (url:string,loggedInUser:Register) => {
  const init =  {
      method:'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: loggedInUser.name,
          password: loggedInUser.psswd
        }),
  }
  const response = await fetch(url,init)
  return response
}

export const logOut = async (url:string) => {
  const init =  {
      method:'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
  }
  const response = await fetch(url,init)
  return response
}

