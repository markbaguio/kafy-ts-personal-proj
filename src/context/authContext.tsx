// import { createContext, ReactNode, useEffect, useState } from "react";
// import { Session, User } from "@supabase/supabase-js";
// import supabaseClient from "@/supabaseClient";

// interface AuthContextType {
//   userData: User | null;
//   signUpNewUser: (
//     email: string,
//     password: string,
//     firstName: string,
//     lastName: string
//   ) => Promise<{ user: User | null; session: Session | null }>;
//   signInUser: (
//     email: string,
//     password: string
//   ) => Promise<{ user: User | null; session: Session | null }>;
//   signOutUser: () => Promise<void>;
// }

// export const AuthContext = createContext<AuthContextType | undefined>(
//   undefined
// );

// type AuthProviderProps = {
//   children: ReactNode;
// };

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [userData, setUserData] = useState<User | null>(null);

//   useEffect(() => {
//     //Get the current user session
//     const getSession = async () => {
//       const { data } = await supabaseClient.auth.getSession();
//       setUserData(data.session?.user || null);
//     };

//     getSession();

//     //Listen for auth state changes.
//     //Listens for sign out, sign in, and refresh.
//     const { data: authListener } = supabaseClient.auth.onAuthStateChange(
//       (_event, session) => {
//         setUserData(session?.user || null);
//       }
//     );

//     //clean up
//     return () => {
//       authListener?.subscription?.unsubscribe();
//     };
//   }, []);

//   //? Sign up function
//   const signUpNewUser = async (
//     email: string,
//     password: string,
//     firstName: string,
//     lastName: string
//   ): Promise<{ user: User | null; session: Session | null }> => {
//     // const { error, data } = await supabaseClient.auth.signUp({
//     //   email,
//     //   password,
//     // });
//     const { error, data } = await supabaseClient.auth.signUp({
//       email,
//       password,
//       options: {
//         data: { display_name: `${firstName} ${lastName}` },
//       },
//     });

//     if (error) {
//       // console.error(error); //? for development
//       throw error;
//     }

//     return data; //? auth.signUp returns both user and session hence the return type.
//   };

//   //? Sign in function
//   const signInUser = async (
//     email: string,
//     password: string
//   ): Promise<{ user: User | null; session: Session | null }> => {
//     const { error, data } = await supabaseClient.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       throw error;
//     }

//     return data;
//   };

//   //? Sign out function
//   /// No need to setUserData to null as it is being handled by the useEffect.
//   const signOutUser = async () => {
//     const { error } = await supabaseClient.auth.signOut();

//     if (error) throw error;
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         userData,
//         signUpNewUser: signUpNewUser,
//         signInUser: signInUser,
//         signOutUser: signOutUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
