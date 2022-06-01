import { useMutation } from "react-query";
import { queryClient } from "../services/queryClient";
import { deleteCustomer } from "../services/users/deleteCustomer";

export const useDeleteCustomer = () => useMutation(
  async (id: string) => await deleteCustomer(id), {
    onSuccess: () => queryClient.invalidateQueries('customers[]')
  }
)
