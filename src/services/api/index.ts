import axios from "axios";

const URI = process.env.REACT_APP_API_URI

export const api = axios.create({
  baseURL: URI
})