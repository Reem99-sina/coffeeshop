
import {create} from "zustand"




export const usesearchModal=create((set)=>({
    search:[],
    addsearch:(data)=>set(()=>({search:[...data]})),
    removesearch:()=>set(()=>({search:[]}))
}))