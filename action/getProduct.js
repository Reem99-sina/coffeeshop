import axios from "axios"

export const getProduct=async(type="hot")=>{
const result=await axios.get(`https://api.sampleapis.com/coffee/${type}`)

return result.data
}