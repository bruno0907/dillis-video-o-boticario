import { useMutation } from "react-query";
import { queryClient } from "../services/queryClient";
import { createCustomer } from "../services/users/createCustomer";
import { NewCustomerProps } from "../types";

export const useCreateCustomer = () => useMutation(
  async ({ name, email, phone }: NewCustomerProps) => {    
    await createCustomer({ name, email, phone })
  }, {
    retry: 10,
    retryDelay: 3000,
    onSuccess: () => queryClient.invalidateQueries(['customers[]'])
  }
)
