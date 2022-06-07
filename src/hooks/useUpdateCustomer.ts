import { useMutation } from "react-query";
import { queryClient } from "../services/queryClient";
import { updateCustomer } from "../services/users/updateCustomer";
import { CustomerProps } from "../types";

export const useUpdateCustomer = () => useMutation(
  async ({ id, name, email, authorizeSendMail, authorizeDisplayVideo }: CustomerProps) => {    
    return await updateCustomer({ id, email, name, authorizeSendMail, authorizeDisplayVideo, })
  }, {
    onSuccess: () => queryClient.invalidateQueries(['customers[]'])
  }
)
