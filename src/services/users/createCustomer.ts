import { NewCustomerProps } from "../../types";
import { api } from "../api";

export const createCustomer = async ({ name, email, phone }: NewCustomerProps) => {  
  return await api.post('/customers', {
    name,
    email,
    phone
  })
}
