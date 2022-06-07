import { useMutation } from "react-query";
import { queryClient } from "../services/queryClient";
import { createCustomer } from "../services/users/createCustomer";
import { NewCustomerProps } from "../types";

export const useRetryCreateCustomer = () => useMutation(
  async ({ name, email, phone }: NewCustomerProps) => {
    await createCustomer({ name, email, phone })
  }, {
    mutationKey: 'createCustomer',
    retry: 3,
    retryDelay: 5000,
    onSuccess: () => queryClient.invalidateQueries(['customers[]'])
  }
)