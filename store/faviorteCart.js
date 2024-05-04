import { AsyncStorage } from "react-native"
import {create} from "zustand"
import { persist } from "zustand/middleware"



export const useFaviorteModal=create((set)=>({
    faviorte:[],
    addfaviorte:(data)=>set((state)=>({faviorte:[...state.faviorte,data]})),
    removefaviorte:(id)=>set((state)=>({faviorte:state.faviorte.filter((ele)=>ele.id!=id)}))
}))