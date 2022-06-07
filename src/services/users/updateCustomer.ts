import { CustomerProps } from "../../types";
import { api } from "../api";

export const updateCustomer = async ({ 
  id, 
  name, 
  email, 
  authorizeSendMail,
  authorizeDisplayVideo
 }: CustomerProps) => await api.put(`/customers/${id}`, {
  name,
  email,
  authorizeSendMail,
  authorizeDisplayVideo   
}) 
