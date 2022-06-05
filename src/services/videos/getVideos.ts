import { CustomerProps } from '../../types';
import { api } from '../api';


export const getVideos = async () => {
  const { data } = await api.get<{ data: CustomerProps[] }>('/customers')  
  const videos = data.data.map(user => user.video_url)
  return videos
}
