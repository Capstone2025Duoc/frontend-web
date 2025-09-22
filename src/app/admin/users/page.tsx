"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { useData } from "@/contexts/data-context"
import {
    Plus,
    Search,
    Filter,
    Edit,
    Trash2,
    Users,
    GraduationCap,
    Shield,
    Phone,
    Calendar,
    MapPin,
    UserCheck,
    UserX,
} from "lucide-react"

export default function UsersManagementPage() {
    const { users, addUser, updateUser, deleteUser } = useData()
    const { toast } = useToast()
    const [selectedRole, setSelectedRole] = useState<string>("all")
    const [selectedStatus, setSelectedStatus] = useState<string>("all")
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingUser, setEditingUser] = useState<any>(null)

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "estudiante" as "profesor" | "estudiante" | "admin",
        phone: "",
        address: "",
        subjects: "",
        courses: "",
        grade: "",
        guardian: "",
        guardianPhone: "",
        department: "",
    })

    const roles = [
        { value: "all", label: "Todos los roles" },
        { value: "profesor", label: "Profesores" },
        { value: "estudiante", label: "Estudiantes" },
        { value: "admin", label: "Administradores" },
    ]

    const statuses = [
        { value: "all", label: "Todos los estados" },
        { value: "active", label: "Activos" },
        { value: "inactive", label: "Inactivos" },
        { value: "suspended", label: "Suspendidos" },
    ]

    const getRoleIcon = (role: string) => {
        switch (role) {
            case "profesor":
                return <GraduationCap className="h-4 w-4 text-blue-600" />
            case "estudiante":
                return <Users className="h-4 w-4 text-green-600" />
            case "admin":
                return <Shield className="h-4 w-4 text-red-600" />
            default:
                return <Users className="h-4 w-4 text-gray-600" />
        }
    }

    const getRoleBadge = (role: string) => {
        switch (role) {
            case "profesor":
                return <Badge className="bg-blue-100 text-blue-800">Profesor</Badge>
            case "estudiante":
                return <Badge className="bg-green-100 text-green-800">Estudiante</Badge>
            case "admin":
                return <Badge className="bg-red-100 text-red-800">Administrador</Badge>
            default:
                return <Badge variant="outline">Desconocido</Badge>
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-100 text-green-800">Activo</Badge>
            case "inactive":
                return <Badge className="bg-yellow-100 text-yellow-800">Inactivo</Badge>
            case "suspended":
                return <Badge variant="destructive">Suspendido</Badge>
            default:
                return <Badge variant="outline">Desconocido</Badge>
        }
    }

    const filteredUsers = users.filter((user) => {
        const roleMatch = selectedRole === "all" || user.role === selectedRole
        const statusMatch = selectedStatus === "all" || user.status === selectedStatus
        const searchMatch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        return roleMatch && statusMatch && searchMatch
    })

    const getUserStats = () => {
        const total = users.length
        const professors = users.filter((u) => u.role === "profesor").length
        const students = users.filter((u) => u.role === "estudiante").length
        const admins = users.filter((u) => u.role === "admin").length
        const active = users.filter((u) => u.status === "active").length

        return { total, professors, students, admins, active }
    }

    const stats = getUserStats()

    const handleDeleteUser = (id: number) => {
        deleteUser(id)
        toast({
            title: "Usuario eliminado",
            description: "El usuario ha sido eliminado exitosamente.",
        })
    }

    const toggleUserStatus = (user: any) => {
        const newStatus = user.status === "active" ? "inactive" : "active"
        updateUser(user.id, { status: newStatus })
        toast({
            title: "Estado actualizado",
            description: `El usuario ahora está ${newStatus === "active" ? "activo" : "inactivo"}.`,
        })
    }

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            role: "estudiante",
            phone: "",
            address: "",
            subjects: "",
            courses: "",
            grade: "",
            guardian: "",
            guardianPhone: "",
            department: "",
        })
        setEditingUser(null)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name || !formData.email) {
            toast({
                title: "Error",
                description: "Nombre y email son requeridos.",
                variant: "destructive",
            })
            return
        }

        const userData: any = {
            name: formData.name,
            email: formData.email,
            role: formData.role,
            phone: formData.phone,
            address: formData.address,
            status: "active",
            joinDate: new Date().toISOString().split("T")[0],
            lastLogin: new Date().toISOString().split("T")[0],
        }

        // Add role-specific fields
        if (formData.role === "profesor") {
            userData.subjects = formData.subjects ? formData.subjects.split(",").map((s) => s.trim()) : []
            userData.courses = formData.courses ? formData.courses.split(",").map((c) => c.trim()) : []
        } else if (formData.role === "estudiante") {
            userData.grade = formData.grade
            userData.guardian = formData.guardian
            userData.guardianPhone = formData.guardianPhone
        } else if (formData.role === "admin") {
            userData.department = formData.department
            userData.permissions = ["all"]
        }

        if (editingUser) {
            updateUser(editingUser.id, userData)
            toast({
                title: "Usuario actualizado",
                description: "Los datos del usuario han sido actualizados exitosamente.",
            })
        } else {
            addUser(userData)
            toast({
                title: "Usuario creado",
                description: "El nuevo usuario ha sido creado exitosamente.",
            })
        }

        setIsDialogOpen(false)
        resetForm()
    }

    const handleEdit = (user: any) => {
        setEditingUser(user)
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            address: user.address,
            subjects: user.subjects?.join(", ") || "",
            courses: user.courses?.join(", ") || "",
            grade: user.grade || "",
            guardian: user.guardian || "",
            guardianPhone: user.guardianPhone || "",
            department: user.department || "",
        })
        setIsDialogOpen(true)
    }

    return (
        <div className="flex flex-col">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Gestión de Usuarios</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
                        <p className="text-muted-foreground">Administra profesores, estudiantes y personal administrativo.</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" />
                            Filtros Avanzados
                        </Button>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button onClick={resetForm}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Nuevo Usuario
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                    <DialogTitle>{editingUser ? "Editar Usuario" : "Crear Nuevo Usuario"}</DialogTitle>
                                    <DialogDescription>
                                        {editingUser ? "Modifica los datos del usuario." : "Registra un nuevo usuario en el sistema."}
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleSubmit}>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Nombre Completo *</Label>
                                                <Input
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="Nombre completo"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email *</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="email@colegio.edu"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="role">Rol *</Label>
                                                <Select
                                                    value={formData.role}
                                                    onValueChange={(value: any) => setFormData({ ...formData, role: value })}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccionar rol" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="profesor">Profesor</SelectItem>
                                                        <SelectItem value="estudiante">Estudiante</SelectItem>
                                                        <SelectItem value="admin">Administrador</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Teléfono</Label>
                                                <Input
                                                    id="phone"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    placeholder="+1 234-567-8900"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="address">Dirección</Label>
                                            <Input
                                                id="address"
                                                value={formData.address}
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                placeholder="Dirección completa"
                                            />
                                        </div>

                                        {/* Role-specific fields */}
                                        {formData.role === "profesor" && (
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="subjects">Materias (separadas por coma)</Label>
                                                    <Input
                                                        id="subjects"
                                                        value={formData.subjects}
                                                        onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                                                        placeholder="Matemáticas, Álgebra"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="courses">Cursos (separados por coma)</Label>
                                                    <Input
                                                        id="courses"
                                                        value={formData.courses}
                                                        onChange={(e) => setFormData({ ...formData, courses: e.target.value })}
                                                        placeholder="3° A, 4° B"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {formData.role === "estudiante" && (
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="grade">Curso</Label>
                                                    <Input
                                                        id="grade"
                                                        value={formData.grade}
                                                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                                        placeholder="3° A"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="guardian">Apoderado</Label>
                                                    <Input
                                                        id="guardian"
                                                        value={formData.guardian}
                                                        onChange={(e) => setFormData({ ...formData, guardian: e.target.value })}
                                                        placeholder="Nombre del apoderado"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="guardianPhone">Teléfono Apoderado</Label>
                                                    <Input
                                                        id="guardianPhone"
                                                        value={formData.guardianPhone}
                                                        onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                                                        placeholder="+1 234-567-8900"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {formData.role === "admin" && (
                                            <div className="space-y-2">
                                                <Label htmlFor="department">Departamento</Label>
                                                <Input
                                                    id="department"
                                                    value={formData.department}
                                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                                    placeholder="Dirección Académica"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <DialogFooter>
                                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                            Cancelar
                                        </Button>
                                        <Button type="submit">{editingUser ? "Actualizar Usuario" : "Crear Usuario"}</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-5">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <p className="text-xs text-muted-foreground">Registrados</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Profesores</CardTitle>
                            <GraduationCap className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{stats.professors}</div>
                            <p className="text-xs text-muted-foreground">Activos</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Estudiantes</CardTitle>
                            <Users className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.students}</div>
                            <p className="text-xs text-muted-foreground">Matriculados</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Administradores</CardTitle>
                            <Shield className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{stats.admins}</div>
                            <p className="text-xs text-muted-foreground">Con permisos</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
                            <UserCheck className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.total > 0 ? ((stats.active / stats.total) * 100).toFixed(1) : 0}% del total
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filtros</CardTitle>
                        <CardDescription>Filtra usuarios por rol, estado o búsqueda</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="role-filter">Rol</Label>
                                <Select value={selectedRole} onValueChange={setSelectedRole}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar rol" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roles.map((role) => (
                                            <SelectItem key={role.value} value={role.value}>
                                                {role.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status-filter">Estado</Label>
                                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statuses.map((status) => (
                                            <SelectItem key={status.value} value={status.value}>
                                                {status.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="search">Buscar Usuario</Label>
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="search"
                                        placeholder="Nombre o email..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-8"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Users Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Usuarios</CardTitle>
                        <CardDescription>Gestiona todos los usuarios del sistema ({filteredUsers.length} usuarios)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Usuario</TableHead>
                                    <TableHead>Rol</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Contacto</TableHead>
                                    <TableHead>Último Acceso</TableHead>
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <div className="flex items-center space-x-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                                    <AvatarFallback>
                                                        {user.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{user.name}</p>
                                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                {getRoleIcon(user.role)}
                                                {getRoleBadge(user.role)}
                                            </div>
                                        </TableCell>
                                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="flex items-center space-x-1 text-sm">
                                                    <Phone className="h-3 w-3" />
                                                    <span>{user.phone}</span>
                                                </div>
                                                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                                    <MapPin className="h-3 w-3" />
                                                    <span className="truncate max-w-[150px]">{user.address}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-1 text-sm">
                                                <Calendar className="h-3 w-3" />
                                                <span>{user.lastLogin}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <Button variant="ghost" size="sm" onClick={() => handleEdit(user)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => toggleUserStatus(user)}
                                                    className={user.status === "active" ? "text-yellow-600" : "text-green-600"}
                                                >
                                                    {user.status === "active" ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="text-red-600"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
