import { useMutation } from "react-query";
import { queryClient } from "../services/queryClient";
import { updateCustomer } from "../services/users/updateCustomer";
import { CustomerProps } from "../types";

export const useUpdateCustomer = () => useMutation(
  async ({ id, name, email, phone }: CustomerProps) => await updateCustomer({ id, email, name, phone, }), {
    onSuccess: () => queryClient.invalidateQueries(['customers[]'])
  }
)
