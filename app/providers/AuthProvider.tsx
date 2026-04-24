// "use client";

// import { createContext, useContext, useEffect, useRef } from "react";
// import { useUserStore } from "@/app/store/useUserStore";

// const AuthContext = createContext<any>(null);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const { user, setUser, clearUser, setLoading } = useUserStore();

//   const hasFetched = useRef(false);

//   useEffect(() => {
//     if (hasFetched.current) return;
//     hasFetched.current = true;

//     const fetchUser = async () => {
//       try {
//         setLoading(true);

//         const res = await fetch("/api/auth/me", {
//           credentials: "include",
//         });

//         if (!res.ok) {
//           clearUser();
//           return;
//         }

//         const data = await res.json();
//         setUser(data.data.user);
//       } catch {
//         clearUser();
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);