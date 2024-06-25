import { create } from "zustand";
import axios from "axios";

const userDetailStore = create((set, get) => ({
    userInfo: null,
    loading: false,
    error: null,

    fetchData: async (id) => {
      set({ loading: true, error: null });
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/user/' + id);
        set({
          userInfo: {
            nickname : response.data['nickname'],
            note : response.data['note'],
            description : response.data['description'],
            rangeList : response.data['range'] !== undefined ? response.data['range'] : [],
            positionList : response.data['position'] !== undefined ? response.data['position'] : [],
            stackList : response.data['stack'] !== undefined ? response.data['stack'] : [],
            projectLog : response.data['projectLog'] !==  undefined ? response.data['projectLog'] : []
          },
          loading: false 
        });
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

    updateData: async (token, id) => {
      try {
        const data = {
          "nickname": get().userInfo.nickname,
          "note": get().userInfo.note,
          "description": get().userInfo.description,
          "range": get().userInfo.rangeList,
          "position": get().userInfo.positionList,
          "stack": get().userInfo.stackList
        }
        const response = await axios.post(
          process.env.REACT_APP_API_URL + '/user/' + id,
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        )
      } catch (error) {
        set({ error: error.message, loading: false });
      }
    },

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

    insertStackList : (value) => 
      set((state) => ({
        userInfo: {
          ...state.userInfo,
          stackList : [...state.userInfo.stackList, value]
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

    deleteStackList : (value) =>
      set((state) => ({
        userInfo: {
          ...state.userInfo,
          stackList : state.userInfo.stackList.filter((i) => i !== value)
        }
      })),
}));

export default userDetailStore;