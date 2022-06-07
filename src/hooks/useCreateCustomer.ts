import { useMutation } from "react-query";
import { queryClient } from "../services/queryClient";
import { createCustomer } from "../services/users/createCustomer";
import { NewCustomerProps } from "../types";

export const useCreateCustomer = () => useMutation(
  async ({ name, email, authorizeSendMail, authorizeDisplayVideo }: NewCustomerProps) => {
    await createCustomer({ name, email, authorizeSendMail, authorizeDisplayVideo })
  }, {   
    onSuccess: () => queryClient.invalidateQueries(['customers[]'])
  }
)
