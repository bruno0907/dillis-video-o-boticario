import { CustomerProps } from "../../types";
import { api } from "../api";

export const updateCustomer = async ({ id, name, email, phone }: CustomerProps) => {
  return await api.put(`/customers/${id}`, {
    name,
    email,
    phone    
  }) 
}