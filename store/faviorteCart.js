
import {create} from "zustand"




export const useFaviorteModal=create((set)=>({
    faviorte:[],
    addfaviorte:(data)=>set((state)=>({faviorte:[...state.faviorte,data]})),
    removefaviorte:(id)=>set((state)=>({faviorte:state.faviorte.filter((ele)=>ele.id!=id)}))
}))