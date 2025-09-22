"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BookOpen, Eye, EyeOff, AlertCircle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { login } = useAuth()

    // Credenciales de prueba
    const credentials = {
        "profesor@colegio.edu": {
            password: "profesor123",
            role: "teacher",
            redirect: "/teacher",
            name: "Prof. María González",
        },
        "estudiante@colegio.edu": {
            password: "estudiante123",
            role: "student",
            redirect: "/student",
            name: "Ana García López",
        },
        "admin@colegio.edu": {
            password: "admin123",
            role: "admin",
            redirect: "/admin",
            name: "Director Juan Pérez",
        },
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        // Simular delay de autenticación
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const user = credentials[email as keyof typeof credentials]

        if (user && user.password === password) {
            // Usar el método login del contexto
            login({
                id: 1, // ID simulado, puedes cambiarlo según tu lógica
                email,
                role: user.role,
                name: user.name,
            })

            // Redirigir según el rol
            router.push(user.redirect)
        } else {
            setError("Credenciales incorrectas. Verifica tu email y contraseña.")
        }

        setIsLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex items-center justify-center mb-4">
                        <div className="flex aspect-square size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <BookOpen className="size-6" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">EduAdmin</CardTitle>
                    <CardDescription>Sistema de Administración Escolar</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="usuario@colegio.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Ingresa tu contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                        </Button>
                    </form>

                    <div className="mt-6 space-y-4">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Credenciales de prueba</span>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="p-3 bg-muted rounded-lg">
                                <p className="font-medium text-blue-700">👨‍🏫 Profesor</p>
                                <p className="text-xs text-muted-foreground">profesor@colegio.edu / profesor123</p>
                            </div>
                            <div className="p-3 bg-muted rounded-lg">
                                <p className="font-medium text-green-700">👨‍🎓 Estudiante</p>
                                <p className="text-xs text-muted-foreground">estudiante@colegio.edu / estudiante123</p>
                            </div>
                            <div className="p-3 bg-muted rounded-lg">
                                <p className="font-medium text-purple-700">👨‍💼 Administrador</p>
                                <p className="text-xs text-muted-foreground">admin@colegio.edu / admin123</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
