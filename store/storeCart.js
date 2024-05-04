import {create} from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"



export const useOrderModal=create((set)=>({
    order:[],
    addOrder:(data)=>set((state)=>({order:[...state.order,{...data,count:1}]})),
    removeOrder:(id)=>set((state)=>({order:state.order.filter((ele)=>ele.id!=id)})),
    updateOrder:(id)=>set((state)=>({order:state.order.map((ele)=>ele?.id==id?{...ele,count:ele.count+1}:ele)}))
}))