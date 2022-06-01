import { api } from "../api";

export const sendMail = async (id: string) => {
  return await api.post(`/customers/sendMail`, {
    id
  })
}
