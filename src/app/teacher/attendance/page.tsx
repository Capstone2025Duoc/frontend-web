"use client"

import { useState, useEffect } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Check, X, Clock, Save, Download } from "lucide-react"

export default function AttendancePage() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [selectedCourse, setSelectedCourse] = useState<string>("3a-matematicas")
    const [searchTerm, setSearchTerm] = useState<string>("")

    const courses = [
        { value: "3a-matematicas", label: "3° A - Matemáticas" },
        { value: "4b-algebra", label: "4° B - Álgebra" },
        { value: "2c-geometria", label: "2° C - Geometría" },
    ]

    // Datos de estudiantes por curso
    const studentsByCourse = {
        "3a-matematicas": [
            { id: 1, studentId: "2023001", name: "Ana García López" },
            { id: 2, studentId: "2023002", name: "Carlos Rodríguez Pérez" },
            { id: 3, studentId: "2023003", name: "María Fernández Silva" },
            { id: 4, studentId: "2023004", name: "Juan Martínez González" },
            { id: 5, studentId: "2023005", name: "Laura Sánchez Ruiz" },
            { id: 6, studentId: "2023006", name: "Diego López Morales" },
            { id: 7, studentId: "2023007", name: "Sofia Herrera Castro" },
            { id: 8, studentId: "2023008", name: "Miguel Torres Vega" },
        ],
        "4b-algebra": [
            { id: 9, studentId: "2023009", name: "Carmen Jiménez Ruiz" },
            { id: 10, studentId: "2023010", name: "Roberto Silva Mendoza" },
            { id: 11, studentId: "2023011", name: "Patricia Moreno López" },
            { id: 12, studentId: "2023012", name: "Fernando Castro Díaz" },
            { id: 13, studentId: "2023013", name: "Lucía Vargas Herrera" },
        ],
        "2c-geometria": [
            { id: 14, studentId: "2023014", name: "Andrés Ramírez Soto" },
            { id: 15, studentId: "2023015", name: "Valentina Cruz Peña" },
            { id: 16, studentId: "2023016", name: "Gabriel Ortiz Vega" },
            { id: 17, studentId: "2023017", name: "Isabella Rojas Campos" },
            { id: 18, studentId: "2023018", name: "Sebastián Flores Ruiz" },
        ],
    }

    // Inicializar asistencia con todos presentes
    const [attendanceData, setAttendanceData] = useState<
        Array<{
            id: number
            studentId: string
            name: string
            status: string
        }>
    >([])

    // Actualizar datos cuando cambie el curso
    useEffect(() => {
        const courseStudents = studentsByCourse[selectedCourse as keyof typeof studentsByCourse] || []
        setAttendanceData(
            courseStudents.map((student) => ({
                ...student,
                status: "present", // Todos inician como presentes
            })),
        )
    }, [selectedCourse])

    const updateAttendance = (studentId: number, status: string) => {
        setAttendanceData((prev) => prev.map((student) => (student.id === studentId ? { ...student, status } : student)))
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "present":
                return (
                    <Badge variant="default" className="bg-green-100 text-green-800">
                        Presente
                    </Badge>
                )
            case "absent":
                return <Badge variant="destructive">Ausente</Badge>
            case "late":
                return (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Tarde
                    </Badge>
                )
            default:
                return <Badge variant="outline">Sin marcar</Badge>
        }
    }

    const getAttendanceStats = () => {
        const total = attendanceData.length
        const present = attendanceData.filter((s) => s.status === "present").length
        const late = attendanceData.filter((s) => s.status === "late").length
        const absent = attendanceData.filter((s) => s.status === "absent").length

        return { total, present, late, absent }
    }

    const filteredStudents = attendanceData.filter(
        (student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.studentId.includes(searchTerm),
    )

    const stats = getAttendanceStats()

    const handleSaveAttendance = () => {
        // Aquí se guardaría la asistencia en la base de datos
        alert(
            `Asistencia guardada para ${courses.find((c) => c.value === selectedCourse)?.label} - ${format(selectedDate, "dd/MM/yyyy")}`,
        )
    }

    return (
        <div className="flex flex-col">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="/profesor">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Asistencia</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Toma de Asistencia</h1>
                        <p className="text-muted-foreground">
                            Registra la asistencia de tus estudiantes. Por defecto todos aparecen como presentes.
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Exportar
                        </Button>
                        <Button onClick={handleSaveAttendance}>
                            <Save className="mr-2 h-4 w-4" />
                            Guardar Asistencia
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Configuración</CardTitle>
                        <CardDescription>Selecciona el curso y fecha para tomar asistencia</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
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
                                <Label>Fecha</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !selectedDate && "text-muted-foreground",
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {selectedDate ? format(selectedDate, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={selectedDate} onSelect={(date) => setSelectedDate(date || new Date())} initialFocus />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="search">Buscar Estudiante</Label>
                                <Input
                                    id="search"
                                    placeholder="Nombre o ID del estudiante..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
                            <Check className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Presentes</CardTitle>
                            <Check className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.present}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.total > 0 ? ((stats.present / stats.total) * 100).toFixed(1) : 0}% del total
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tardanzas</CardTitle>
                            <Clock className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">{stats.late}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.total > 0 ? ((stats.late / stats.total) * 100).toFixed(1) : 0}% del total
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Ausentes</CardTitle>
                            <X className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.total > 0 ? ((stats.absent / stats.total) * 100).toFixed(1) : 0}% del total
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Attendance Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Lista de Asistencia - {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: es })}
                        </CardTitle>
                        <CardDescription>
                            Marca la asistencia de cada estudiante. Por defecto todos están presentes.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Nombre del Estudiante</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredStudents.map((student) => (
                                    <TableRow key={student.id}>
                                        <TableCell className="font-medium">{student.studentId}</TableCell>
                                        <TableCell>{student.name}</TableCell>
                                        <TableCell>{getStatusBadge(student.status)}</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button
                                                    size="sm"
                                                    variant={student.status === "present" ? "default" : "outline"}
                                                    onClick={() => updateAttendance(student.id, "present")}
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <Check className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant={student.status === "late" ? "secondary" : "outline"}
                                                    onClick={() => updateAttendance(student.id, "late")}
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <Clock className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant={student.status === "absent" ? "destructive" : "outline"}
                                                    onClick={() => updateAttendance(student.id, "absent")}
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <X className="h-4 w-4" />
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
