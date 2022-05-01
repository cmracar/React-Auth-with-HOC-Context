import React, { useContext, useState, useEffect, ReactNode } from "react";

export interface User {
    username?: string | undefined;
    password?: string | undefined;
}

export interface AuthContextType {
    user: User | undefined;
    loading: boolean;
    login: (email: string, password: string) => void;
    signUp: (email: string, name: string, password: string) => void;
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const login = (username: string, password: string) => {
        setLoading(true)
        console.log("Login process");
        setUser({
            username: username,
            password: password
        })
        setLoading(false)
    }

    const signUp = (username: string, email: string, password: string) => {
        setLoading(true)
        console.log("Sign Up process");
        setUser({
            username: username,
            password: password
        })
        setLoading(false)
    }

    const logout = () => {
        console.log("Logout process");
        setUser(undefined);
    }

    useEffect(() => {
        if (user) {
            setUser(user);
        } else {
            setUser(undefined);
        }
    }, []);

    const values = {
        user,
        loading,
        login,
        signUp,
        logout
    };

    return (
        <AuthContext.Provider value={values}>
            {!loading && children}
        </AuthContext.Provider>
    );
}