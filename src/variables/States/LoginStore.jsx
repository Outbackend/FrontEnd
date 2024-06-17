import { create } from "zustand";
import { persist } from "zustand/middleware";

const LoginStore = create(
    persist((set) => 
        ({
            isAuthenticated: false,
            user: null,
            token: null,
            login: (token, user) => set({ isAuthenticated: true, token: token, user: user }),
            logout: () => set({ isAuthenticated: false, token: null, user: null }),
        }),
        {
            name: 'auth-storage'
        }
    )
);

export default LoginStore;