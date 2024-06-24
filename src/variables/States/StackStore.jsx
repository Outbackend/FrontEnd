import { create } from "zustand";

const initialState = {
    stackList: [],
    positionList: [],   
    rangeList: []
}

const useStackStore = create((set) => ({
    stacks: initialState,
    addStack: (stack) => set((state) => ({stacks: {...state.stacks, stackList: [...state.stacks.stackList, stack]}})),
    addPosition: (position) => set((state) => ({stacks: {...state.stacks, positionList: [...state.stacks.positionList, position]}})),
    addRange: (range) => set((state) => ({stacks: {...state.stacks, rangeList: [...state.stacks.rangeList, range]}})),
    resetStack: () => set({stacks: initialState}),
    removeStack: (stack) => set((state) => ({stacks: {...state.stacks, stackList: state.stacks.stackList.filter((item) => item !== stack)}})),
    removePosition: (position) => set((state) => ({stacks: {...state.stacks, positionList: state.stacks.positionList.filter((item) => item !== position)}})),   
    removeRange: (range) => set((state) => ({stacks: {...state.stacks, rangeList: state.stacks.rangeList.filter((item) => item !== range)}}))

}))

export default useStackStore;