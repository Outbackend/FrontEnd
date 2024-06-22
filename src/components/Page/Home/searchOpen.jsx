import {create} from 'zustand'

const searchWindow = create((set) => ({
    isOpen: false,
    onOpen: ()=> set({isOpen:true}),
    onClose: ()=> set({isOpen:false}),
}))

export default searchWindow