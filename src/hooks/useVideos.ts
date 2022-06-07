import { useQuery } from "react-query";
import { getVideos } from "../services/videos/getVideos";

export const useVideos = () => useQuery(['videos'], 
  async () => await getVideos(), { 
    keepPreviousData: true
  }
)
