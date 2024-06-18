import { create } from "zustand";
import axios from "axios";

const userDetailStore = create((set) => ({
    userInfo: {
        name: '닉네임',
        note: '소개글',
        description: `
안녕하세요! 아무튼 풀스택 개발자 닉네임입니다. \n

**사용 가능한 스택**
- React
- Springboot
- Flask
        `,
        rangeList: ['웹'],
        positionList: ['프론트엔드', '백엔드'],
        stackList: ['JavaScript', 'React', 'Spring', 'Python'],
        projectList: [
          {
            name: "토이프로젝트 구인 플랫폼",
            description:"토이프로젝트 인원을 구하는 플랫폼",
            status: "진행중"
          },
          {
            name: "동아리 홍보 플랫폼",
            description:"동아리 홍보 게시판",
            status: "완료"
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