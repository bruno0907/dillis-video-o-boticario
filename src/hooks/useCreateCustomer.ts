import { useMutation } from "react-query";
import { queryClient } from "../services/queryClient";
import { createCustomer } from "../services/users/createCustomer";
import { NewCustomerProps } from "../types";

const RETRY_ATTEMPTS = process.env.REACT_APP_RETRY_ATTEMPTS // número de tentativas
const RETRY_DELAY = process.env.REACT_APP_RETRY_DELAY // ms multiplicado pelo numero de tentativa === 20 segundos

export const useCreateCustomer = () => useMutation(
  async ({ name, email, authorizeSendMail, authorizeDisplayVideo }: NewCustomerProps) => {
    await createCustomer({ name, email, authorizeSendMail, authorizeDisplayVideo })
  }, { 
    retry: Number(RETRY_ATTEMPTS),
    retryDelay: Number(RETRY_DELAY),  
    onSuccess: () => queryClient.invalidateQueries(['customers[]'])
  }
)
