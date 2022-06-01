import { SignInProps } from "../../types";
import { api } from "../api";

export const signIn = async({ username, password }: SignInProps) => {
  return await api.post('/sign-in', {   
    username,
    password   
  })
}