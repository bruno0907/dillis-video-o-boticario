import { CustomerResponseProps, CustomerProps } from '../../types';
import { api } from '../api';

export const getCustomers = async (
  page?: number, 
  perPage?: number | null, 
  searchBy?: string, 
  searchValue?: string
) => {  
  const { data, headers } = await api.get<{ data: CustomerResponseProps[] }>('/customers', {
    params: {
      page,
      perPage,
      searchBy,
      searchValue
    }
  })  
  
  const totalCount = Number(headers['x-total-count'])

  const customers: CustomerProps[] = data.data.map(customer => ({
    id: customer.id,
    name: customer.name,
    email: customer.email,
    authorizeSendMail: customer.authorize_send_mail,
    authorizeDisplayVideo: customer.authorize_display_video,
    videoUrl: customer.video_url,
    createAt: customer.created_at,
    updatedAt: customer.updated_at
  }))
  
  return {
    totalCount,
    customers
  }
}
