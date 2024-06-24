import { create } from "zustand";

const initialState = {
    stackList: [],
    positionList: [],   
    rangeList: [],
    searchTerm: '',
}

const useStackStore = create((set) => ({
    stacks: initialState,
    addStack: (stack) => set((state) => ({stacks: {...state.stacks, stackList: [...state.stacks.stackList, stack]}})),
    addPosition: (position) => set((state) => ({stacks: {...state.stacks, positionList: [...state.stacks.positionList, position]}})),
    addRange: (range) => set((state) => ({stacks: {...state.stacks, rangeList: [...state.stacks.rangeList, range]}})),
    removeStack: (stack) => set((state) => ({stacks: {...state.stacks, stackList: state.stacks.stackList.filter((item) => item !== stack)}})),
    removePosition: (position) => set((state) => ({stacks: {...state.stacks, positionList: state.stacks.positionList.filter((item) => item !== position)}})),   
    removeRange: (range) => set((state) => ({stacks: {...state.stacks, rangeList: state.stacks.rangeList.filter((item) => item !== range)}})),
    setSearchTerm: (term) => set((state) => ({stacks: {...state.stacks, searchTerm: term}})),
    resetStack: () => set({stacks: initialState}),
}))

export default useStackStore;