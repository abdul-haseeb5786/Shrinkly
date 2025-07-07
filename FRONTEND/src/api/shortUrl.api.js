import axios from "axios"
import axiosInstance from "../utils/axiosInstance"

export const  createShortUrl = async (url,slug,expiresIn) =>{
 const {data}=  await axiosInstance.post('/api/create', { url,slug,expiresIn })
 return data.shortUrl
}