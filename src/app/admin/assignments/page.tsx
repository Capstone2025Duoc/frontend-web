"use client"

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
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    Plus,
    Search,
    Filter,
    Edit,
    Trash2,
    UserCheck,
    Calendar,
    MapPin,
    Clock,
    AlertTriangle,
    CheckCircle,
    Users,
    GraduationCap,
} from "lucide-react"

export default function AssignmentsPage() {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [selectedProfessor, setSelectedProfessor] = useState<string>("")
    const [selectedCourse, setSelectedCourse] = useState<string>("")
    const [selectedSubject, setSelectedSubject] = useState<string>("")
    const [selectedRoom, setSelectedRoom] = useState<string>("")
    const [selectedTime, setSelectedTime] = useState<string>("")
    const [selectedDay, setSelectedDay] = useState<string>("")
    const [conflicts, setConflicts] = useState<string[]>([])

    const professors = [
        { value: "maria-gonzalez", label: "Prof. María González", subjects: ["Matemáticas", "Álgebra"] },
        { value: "carlos-ruiz", label: "Dr. Carlos Ruiz", subjects: ["Historia", "Ciencias Sociales"] },
        { value: "laura-martin", label: "Prof. Laura Martín", subjects: ["Física", "Química"] },
        { value: "ana-torres", label: "Prof. Ana Torres", subjects: ["Inglés", "Literatura"] },
        { value: "roberto-silva", label: "Prof. Roberto Silva", subjects: ["Química", "Biología"] },
    ]

    const courses = [
        { value: "1a", label: "1° A" },
        { value: "1b", label: "1° B" },
        { value: "2a", label: "2° A" },
        { value: "2b", label: "2° B" },
        { value: "3a", label: "3° A" },
        { value: "3b", label: "3° B" },
        { value: "4a", label: "4° A" },
        { value: "4b", label: "4° B" },
    ]

    const subjects = [
        { value: "matematicas", label: "Matemáticas" },
        { value: "algebra", label: "Álgebra" },
        { value: "historia", label: "Historia" },
        { value: "fisica", label: "Física" },
        { value: "quimica", label: "Química" },
        { value: "ingles", label: "Inglés" },
        { value: "literatura", label: "Literatura" },
        { value: "biologia", label: "Biología" },
    ]

    const rooms = [
        { value: "aula-101", label: "Aula 101" },
        { value: "aula-102", label: "Aula 102" },
        { value: "aula-201", label: "Aula 201" },
        { value: "aula-202", label: "Aula 202" },
        { value: "aula-301", label: "Aula 301" },
        { value: "aula-302", label: "Aula 302" },
        { value: "lab-ciencias", label: "Laboratorio de Ciencias" },
        { value: "lab-quimica", label: "Laboratorio de Química" },
        { value: "gimnasio", label: "Gimnasio" },
    ]

    const timeSlots = [
        { value: "08:00-09:30", label: "08:00 - 09:30" },
        { value: "09:45-11:15", label: "09:45 - 11:15" },
        { value: "11:30-13:00", label: "11:30 - 13:00" },
        { value: "14:00-15:30", label: "14:00 - 15:30" },
        { value: "15:45-17:15", label: "15:45 - 17:15" },
    ]

    const days = [
        { value: "lunes", label: "Lunes" },
        { value: "martes", label: "Martes" },
        { value: "miercoles", label: "Miércoles" },
        { value: "jueves", label: "Jueves" },
        { value: "viernes", label: "Viernes" },
    ]

    const [assignments, setAssignments] = useState([
        {
            id: 1,
            professor: "Prof. María González",
            subject: "Matemáticas",
            course: "3° A",
            room: "Aula 201",
            day: "Lunes",
            time: "08:00-09:30",
            students: 28,
            status: "active",
        },
        {
            id: 2,
            professor: "Dr. Carlos Ruiz",
            subject: "Historia",
            course: "3° A",
            room: "Aula 105",
            day: "Lunes",
            time: "09:45-11:15",
            students: 28,
            status: "active",
        },
        {
            id: 3,
            professor: "Prof. Laura Martín",
            subject: "Física",
            course: "4° B",
            room: "Lab. Ciencias",
            day: "Lunes",
            time: "11:30-13:00",
            students: 25,
            status: "active",
        },
        {
            id: 4,
            professor: "Prof. Ana Torres",
            subject: "Inglés",
            course: "2° C",
            room: "Aula 302",
            day: "Lunes",
            time: "14:00-15:30",
            students: 30,
            status: "active",
        },
        {
            id: 5,
            professor: "Prof. Roberto Silva",
            subject: "Química",
            course: "4° A",
            room: "Lab. Química",
            day: "Martes",
            time: "08:00-09:30",
            students: 22,
            status: "conflict",
        },
    ])

    const checkConflicts = () => {
        const newConflicts: string[] = []

        // Verificar conflicto de profesor (mismo profesor, mismo día y hora)
        const professorConflict = assignments.some(
            (assignment) =>
                assignment.professor === professors.find((p) => p.value === selectedProfessor)?.label &&
                assignment.day === days.find((d) => d.value === selectedDay)?.label &&
                assignment.time === selectedTime,
        )

        if (professorConflict) {
            newConflicts.push("El profesor ya tiene una clase asignada en este horario")
        }

        // Verificar conflicto de aula (misma aula, mismo día y hora)
        const roomConflict = assignments.some(
            (assignment) =>
                assignment.room === rooms.find((r) => r.value === selectedRoom)?.label &&
                assignment.day === days.find((d) => d.value === selectedDay)?.label &&
                assignment.time === selectedTime,
        )

        if (roomConflict) {
            newConflicts.push("El aula ya está ocupada en este horario")
        }

        // Verificar conflicto de curso (mismo curso, mismo día y hora)
        const courseConflict = assignments.some(
            (assignment) =>
                assignment.course === courses.find((c) => c.value === selectedCourse)?.label &&
                assignment.day === days.find((d) => d.value === selectedDay)?.label &&
                assignment.time === selectedTime,
        )

        if (courseConflict) {
            newConflicts.push("El curso ya tiene una clase asignada en este horario")
        }

        setConflicts(newConflicts)
        return newConflicts.length === 0
    }

    const handleAssignment = () => {
        if (checkConflicts()) {
            const newAssignment = {
                id: assignments.length + 1,
                professor: professors.find((p) => p.value === selectedProfessor)?.label || "",
                subject: subjects.find((s) => s.value === selectedSubject)?.label || "",
                course: courses.find((c) => c.value === selectedCourse)?.label || "",
                room: rooms.find((r) => r.value === selectedRoom)?.label || "",
                day: days.find((d) => d.value === selectedDay)?.label || "",
                time: selectedTime,
                students: Math.floor(Math.random() * 10) + 20, // Simulado
                status: "active",
            }
            setAssignments([...assignments, newAssignment])
            // Reset form
            setSelectedProfessor("")
            setSelectedCourse("")
            setSelectedSubject("")
            setSelectedRoom("")
            setSelectedTime("")
            setSelectedDay("")
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-100 text-green-800">Activa</Badge>
            case "conflict":
                return <Badge variant="destructive">Conflicto</Badge>
            case "pending":
                return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
            default:
                return <Badge variant="outline">Desconocido</Badge>
        }
    }

    const filteredAssignments = assignments.filter(
        (assignment) =>
            assignment.professor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            assignment.course.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const getAssignmentStats = () => {
        const total = assignments.length
        const active = assignments.filter((a) => a.status === "active").length
        const conflicts = assignments.filter((a) => a.status === "conflict").length
        const totalStudents = assignments.reduce((sum, a) => sum + a.students, 0)

        return { total, active, conflicts, totalStudents }
    }

    const stats = getAssignmentStats()

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
                            <BreadcrumbPage>Asignaciones</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Asignación de Profesores y Cursos</h1>
                        <p className="text-muted-foreground">
                            Gestiona las asignaciones de profesores a cursos y valida conflictos de horario.
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" />
                            Filtros
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Nueva Asignación
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                    <DialogTitle>Crear Nueva Asignación</DialogTitle>
                                    <DialogDescription>Asigna un profesor a un curso con validación de conflictos.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="professor">Profesor</Label>
                                            <Select value={selectedProfessor} onValueChange={setSelectedProfessor}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar profesor" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {professors.map((professor) => (
                                                        <SelectItem key={professor.value} value={professor.value}>
                                                            {professor.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="subject">Materia</Label>
                                            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar materia" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {subjects.map((subject) => (
                                                        <SelectItem key={subject.value} value={subject.value}>
                                                            {subject.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="course">Curso</Label>
                                            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar curso" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {courses.map((course) => (
                                                        <SelectItem key={course.value} value={course.value}>
                                                            {course.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="room">Aula</Label>
                                            <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar aula" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {rooms.map((room) => (
                                                        <SelectItem key={room.value} value={room.value}>
                                                            {room.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="day">Día</Label>
                                            <Select value={selectedDay} onValueChange={setSelectedDay}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar día" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {days.map((day) => (
                                                        <SelectItem key={day.value} value={day.value}>
                                                            {day.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="time">Horario</Label>
                                            <Select value={selectedTime} onValueChange={setSelectedTime}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar horario" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {timeSlots.map((slot) => (
                                                        <SelectItem key={slot.value} value={slot.value}>
                                                            {slot.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    {conflicts.length > 0 && (
                                        <Alert variant="destructive">
                                            <AlertTriangle className="h-4 w-4" />
                                            <AlertDescription>
                                                <div className="space-y-1">
                                                    <p className="font-medium">Conflictos detectados:</p>
                                                    {conflicts.map((conflict, index) => (
                                                        <p key={index} className="text-sm">
                                                            • {conflict}
                                                        </p>
                                                    ))}
                                                </div>
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                    <Button onClick={checkConflicts} variant="outline" className="w-full">
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Validar Conflictos
                                    </Button>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleAssignment} disabled={conflicts.length > 0}>
                                        Crear Asignación
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Asignaciones</CardTitle>
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <p className="text-xs text-muted-foreground">Registradas</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Asignaciones Activas</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                            <p className="text-xs text-muted-foreground">Sin conflictos</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Conflictos</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{stats.conflicts}</div>
                            <p className="text-xs text-muted-foreground">Requieren atención</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Estudiantes Asignados</CardTitle>
                            <Users className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{stats.totalStudents}</div>
                            <p className="text-xs text-muted-foreground">En todas las clases</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Search */}
                <Card>
                    <CardHeader>
                        <CardTitle>Buscar Asignaciones</CardTitle>
                        <CardDescription>Filtra las asignaciones por profesor, materia o curso</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por profesor, materia o curso..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Assignments Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Asignaciones</CardTitle>
                        <CardDescription>
                            Gestiona todas las asignaciones de profesores y cursos ({filteredAssignments.length} asignaciones)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Profesor</TableHead>
                                    <TableHead>Materia</TableHead>
                                    <TableHead>Curso</TableHead>
                                    <TableHead>Horario</TableHead>
                                    <TableHead>Aula</TableHead>
                                    <TableHead>Estudiantes</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredAssignments.map((assignment) => (
                                    <TableRow key={assignment.id}>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <GraduationCap className="h-4 w-4 text-blue-600" />
                                                <span className="font-medium">{assignment.professor}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{assignment.subject}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{assignment.course}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="flex items-center space-x-1 text-sm">
                                                    <Calendar className="h-3 w-3" />
                                                    <span>{assignment.day}</span>
                                                </div>
                                                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                                    <Clock className="h-3 w-3" />
                                                    <span>{assignment.time}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-1">
                                                <MapPin className="h-3 w-3" />
                                                <span>{assignment.room}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-1">
                                                <Users className="h-3 w-3" />
                                                <span>{assignment.students}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <Button variant="ghost" size="sm">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="text-red-600">
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
