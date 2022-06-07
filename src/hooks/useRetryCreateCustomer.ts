import { useMutation } from "react-query";
import { queryClient } from "../services/queryClient";
import { createCustomer } from "../services/users/createCustomer";
import { NewCustomerProps } from "../types";

export const useRetryCreateCustomer = () => useMutation(
  async ({ name, email, authorizeSendMail, authorizeDisplayVideo }: NewCustomerProps) => {
    return await createCustomer({ name, email, authorizeSendMail, authorizeDisplayVideo })
  }, {
    mutationKey: 'createCustomer',
    retry: 3,
    retryDelay: 5000,
    onSuccess: () => queryClient.invalidateQueries(['customers[]'])
  }
)