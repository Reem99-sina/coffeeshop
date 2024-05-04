import {create} from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"



export const useProductModal=create((set)=>({
    Product:[],
    addProduct:(data)=>set((state)=>({Product:[...data]})),
    removeProduct:(id)=>set((state)=>({Product:state.Product.filter((ele)=>ele.id!=id)})),
    updateProduct:(id)=>set((state)=>({Product:state.Product.map((ele)=>ele?.id==id?{...ele,count:ele.count+1}:ele)}))
}))