import { createContext, ReactNode, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import supabaseClient from "@/supabaseClient";

interface AuthContextType {
  userData: User | null;
  signUp: (
    email: string,
    password: string
  ) => Promise<{ user: User | null; session: Session | null }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ user: User | null; session: Session | null }>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    //Get the current user session
    const getSession = async () => {
      const { data } = await supabaseClient.auth.getSession();
      setUserData(data.session?.user || null);
    };

    getSession();

    //Listen for auth state changes.
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setUserData(session?.user || null);
      }
    );

    //clean up
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  //? Sign up function
  const signUp = async (
    email: string,
    password: string
  ): Promise<{ user: User | null; session: Session | null }> => {
    const { error, data } = await supabaseClient.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error(error); //? for development
      throw error;
    }

    return data; //? auth.signUp returns both user and session hence the return type.
  };

  //? Sign in function
  const signIn = async (
    email: string,
    password: string
  ): Promise<{ user: User | null; session: Session | null }> => {
    const { error, data } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  };

  //? Sign out function
  /// No need to setUserData to null as it is being handled by the useEffect.
  const signOut = async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ userData, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
