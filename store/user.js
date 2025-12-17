import {create} from "zustand"




export const useUserModal=create((set)=>({
    user:{},
    addUser:(data)=>set(()=>({user:{...data}})),
    removeUser:()=>set(()=>({user:{}})),
    updateUser:(data)=>set((state)=>({user:{...state.user,...data}})),
    deleteUser:()=>set(()=>({user:{}})),
}))