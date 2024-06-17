import { create } from "zustand";
import axios from "axios";
import positionList from "../PositionList";

const userDetailStore = create((set) => ({
    userInfo: {
        name: '닉네임',
        note: '소개글',
        description: '저는 현재 리액트에서 \`react-markdown\`를 이용하여 **마크다운**을 랜더링하고 있습니다.',
        rangeList: ['웹'],
        positionList: ['프론트엔드', '백엔드'],
        stackList: ['JavaScript', 'React', 'Spring', 'Python'],
        projectList: [
          {
            name: "프로젝트 이름",
            description:"저는 현재 리액트에서 \`react-markdown\`를 이용하여 **마크다운**을 랜더링하고 있습니다.\n",
            status: "진행중"
          },
          {
            name: "프로젝트 이름",
            description:"저는 현재 리액트에서 \`react-markdown\`를 이용하여 **마크다운**을 랜더링하고 있습니다.\n",
            status: "진행중"
          },
          {
            name: "프로젝트 이름",
            description:"저는 현재 리액트에서 \`react-markdown\`를 이용하여 **마크다운**을 랜더링하고 있습니다.\n",
            status: "진행중"
          },
        ],
    },

    fetchData: async () => {
      try {
        const response = await axios.get(process.env.API_SERVER_URL);
        set({ userInfo: response.data });
      } catch (error) {
        console.error('Error fetching data:', error);
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