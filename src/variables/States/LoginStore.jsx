import { create } from "zustand";
import { persist } from "zustand/middleware";

const LoginStore = create(
    persist((set) => 
        ({
            isAuthenticated: false,
            user: null,
            login: (token) => set({ isAuthenticated: true, user: token }),
            logout: () => set({ isAuthenticated: false, user: null }),
        }),
        {
            name: 'auth-storage'
        }
    )
);

export default LoginStore;