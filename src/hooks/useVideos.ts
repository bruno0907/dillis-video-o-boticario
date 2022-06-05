import { useQuery } from "react-query";
import { getVideos } from "../services/videos/getVideos";

// const _REFRESH_RATE = 1000 * 10 // 10 seconds

export const useVideos = () => useQuery(['videos'], async () => await getVideos(), { 
  // staleTime: Infinity,
  // refetchOnWindowFocus: false,
  // refetchInterval: _REFRESH_RATE,
  // refetchIntervalInBackground: true, 
  keepPreviousData: true
})
