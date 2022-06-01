import { useQuery } from "react-query";
import { getCustomers } from "../services/users/getCustomers";

export const useCustomers = (
  page?: number, 
  perPage?: number | null, 
  searchBy?: string, 
  searchValue?: string
) => useQuery(['customers[]', { page, perPage, searchBy, searchValue }], async () => getCustomers(
  page, 
  perPage, 
  searchBy, 
  searchValue
), {
  staleTime: 1000 * 60 * 10, // 10 minutes
  keepPreviousData: true
})
