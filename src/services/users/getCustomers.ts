import { CustomerProps } from '../../types';
import { masked } from '../../utils/masked';
import { api } from '../api';

export const getCustomers = async (
  page?: number, 
  perPage?: number | null, 
  searchBy?: string, 
  searchValue?: string
) => {  
  const { data, headers } = await api.get<{ data: CustomerProps[] }>('/customers', {
    params: {
      page,
      perPage,
      searchBy,
      searchValue
    }
  })  
  
  const totalCount = Number(headers['x-total-count'])
  
  const customers = data.data.map(customer => ({
    ...customer,
    phone: masked(customer.phone, 'mobile')
  }))
  
  return {
    totalCount,
    customers
  }
}
