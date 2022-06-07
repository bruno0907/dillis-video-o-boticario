import { NewCustomerProps } from "../../types";
import { api } from "../api";

export const createCustomer = async ({ 
  name, 
  email, 
  authorizeSendMail, 
  authorizeDisplayVideo 
}: NewCustomerProps) => await api.post('/customers', {
  name,
  email,
  authorizeSendMail,
  authorizeDisplayVideo
})

