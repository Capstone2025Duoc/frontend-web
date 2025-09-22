"use client"

import type React from "react"
import { createContext, useState, useContext, type ReactNode } from "react"

type User = {
    id: number
    name: string
    email: string
    role: string
    grade?: string
}

type AuthContextType = {
    user: User | null
    login: (user: User) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const mockUser = {
    id: 2,
    name: "Ana García López",
    email: "ana.garcia@estudiante.edu",
    role: "student" as const,
    grade: "3° A",
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(mockUser)

    const login = (user: User) => {
        setUser(user)
    }

    const logout = () => {
        setUser(null)
        
    }

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
