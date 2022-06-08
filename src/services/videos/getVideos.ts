import { CustomerResponseProps } from '../../types';
import { api } from '../api';


export const getVideos = async () => {
  const { data } = await api.get<{ data: CustomerResponseProps[] }>('/customers')  
  
  const videos = data.data
    .filter(user => user.authorize_display_video === true)
    .map(video => video.video_url)  
  
  return videos
}
