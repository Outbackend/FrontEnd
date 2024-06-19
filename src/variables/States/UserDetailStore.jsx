import { create } from "zustand";
import axios from "axios";

const userDetailStore = create((set) => ({
    userInfo: null,
    loading: false,
    error: null,

    fetchData: async (id) => {
      set({ loading: true, error: null });
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/user/' + id);
        set({ userInfo: response.data, loading: false});
      } catch (error) {
        set({ error: error.message, loading: false });
      }
    },

    updateItem: (key, value) =>
      set((state) => ({
        userInfo: {
          ...state.userInfo,
          [key] : value,
        },
    })),

    insertRangeList : (value) => 
      set((state) => ({
        userInfo: {
          ...state.userInfo,
          rangeList : [...state.userInfo.rangeList, value]
        }
    })),

    insertPositionList : (value) => 
      set((state) => ({
        userInfo: {
          ...state.userInfo,
          positionList : [...state.userInfo.positionList, value]
        }
    })),

    insertSkillTagList : (value) => 
      set((state) => ({
        userInfo: {
          ...state.userInfo,
          skillTagList : [...state.userInfo.skillTagList, value]
        }
    })),
    
    deleteRangeList : (value) =>
      set((state) => ({
        userInfo: {
          ...state.userInfo,
          rangeList : state.userInfo.rangeList.filter((i) => i !== value)
        }
      })),

    deletePositionList : (value) =>
      set((state) => ({
        userInfo: {
          ...state.userInfo,
          positionList : state.userInfo.positionList.filter((i) => i !== value)
        }
      })),

    deleteSkillTagList : (value) =>
      set((state) => ({
        userInfo: {
          ...state.userInfo,
          skillTagList : state.userInfo.skillTagList.filter((i) => i !== value)
        }
      })),
}));

export default userDetailStore;