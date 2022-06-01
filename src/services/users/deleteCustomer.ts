import { api } from "../api"

export const deleteCustomer = async (id: string) => {  
  return await api.delete(`/customers/${id}`)
}