import { useMutation } from "react-query";
import { queryClient } from "../services/queryClient";
import { createCustomer } from "../services/users/createCustomer";
import { NewCustomerProps } from "../types";

export const useCreateCustomer = () => useMutation(
  async ({ name, email, phone }: NewCustomerProps) => {    
    await createCustomer({ name, email, phone })
  }, {
    onSuccess: () => queryClient.invalidateQueries(['customers[]'])
  }
)
