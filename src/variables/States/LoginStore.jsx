import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const LoginStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: (token, user) =>
        set({ isAuthenticated: true, token: token, user: user }),
      logout: () => {
        if (!get().isAuthenticated) {
          alert("이미 로그아웃 상태입니다.");
        } else {
          try {
            axios.post(process.env.REACT_APP_API_URL + "/user/logout", {
              headers: { Authorization: `Bearer ${get().token}` },
            });
          } catch (error) {
            alert("로그아웃에 실패했습니다.");
          }
          set({ isAuthenticated: false, token: null, user: null });
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default LoginStore;
