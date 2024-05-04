import { AsyncStorage } from "react-native"
import {create} from "zustand"
import { persist } from "zustand/middleware"



export const usesearchModal=create((set)=>({
    search:[],
    addsearch:(data)=>set((state)=>({search:[...data]})),
    removesearch:(id)=>set((state)=>({search:[]}))
}))