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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Users,
    Search,
    Filter,
    Download,
    Calendar,
    GraduationCap,
    TrendingUp,
    TrendingDown,
    Minus,
    AlertTriangle,
    Shield,
    CheckCircle,
} from "lucide-react"

export default function StudentsPage() {
    const [selectedCourse, setSelectedCourse] = useState<string>("all")
    const [searchTerm, setSearchTerm] = useState<string>("")

    const courses = [
        { value: "all", label: "Todos los cursos" },
        { value: "3a-matematicas", label: "3° A - Matemáticas" },
        { value: "4b-algebra", label: "4° B - Álgebra" },
        { value: "2c-geometria", label: "2° C - Geometría" },
    ]

    const students = [
        {
            id: 1,
            studentId: "2023001",
            name: "Ana García López",
            course: "3° A - Matemáticas",
            average: 6.7,
            attendance: 96,
            trend: "up",
            status: "active",
            dropoutRisk: "bajo",
            dropoutProbability: 15,
            lastActivity: "2024-11-20",
        },
        {
            id: 2,
            studentId: "2023002",
            name: "Carlos Rodríguez Pérez",
            course: "3° A - Matemáticas",
            average: 5.9,
            attendance: 92,
            trend: "up",
            status: "active",
            dropoutRisk: "medio",
            dropoutProbability: 45,
            lastActivity: "2024-11-19",
        },
        {
            id: 3,
            studentId: "2023003",
            name: "María Fernández Silva",
            course: "4° B - Álgebra",
            average: 6.8,
            attendance: 98,
            trend: "stable",
            status: "active",
            dropoutRisk: "bajo",
            dropoutProbability: 8,
            lastActivity: "2024-11-20",
        },
        {
            id: 4,
            studentId: "2023004",
            name: "Juan Martínez González",
            course: "3° A - Matemáticas",
            average: 4.8,
            attendance: 88,
            trend: "down",
            status: "attention",
            dropoutRisk: "alto",
            dropoutProbability: 78,
            lastActivity: "2024-11-18",
        },
        {
            id: 5,
            studentId: "2023005",
            name: "Laura Sánchez Ruiz",
            course: "2° C - Geometría",
            average: 5.9,
            attendance: 94,
            trend: "up",
            status: "active",
            dropoutRisk: "medio",
            dropoutProbability: 35,
            lastActivity: "2024-11-20",
        },
        {
            id: 6,
            studentId: "2023006",
            name: "Diego López Morales",
            course: "4° B - Álgebra",
            average: 6.5,
            attendance: 95,
            trend: "stable",
            status: "active",
            dropoutRisk: "bajo",
            dropoutProbability: 12,
            lastActivity: "2024-11-19",
        },
    ]

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case "up":
                return <TrendingUp className="h-4 w-4 text-green-600" />
            case "down":
                return <TrendingDown className="h-4 w-4 text-red-600" />
            default:
                return <Minus className="h-4 w-4 text-gray-600" />
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-100 text-green-800">Activo</Badge>
            case "attention":
                return <Badge className="bg-yellow-100 text-yellow-800">Atención</Badge>
            case "inactive":
                return <Badge variant="destructive">Inactivo</Badge>
            default:
                return <Badge variant="outline">Desconocido</Badge>
        }
    }

    const getDropoutRiskBadge = (risk: string, probability: number) => {
        switch (risk) {
            case "alto":
                return (
                    <div className="flex items-center space-x-2">
                        <Badge variant="destructive" className="flex items-center space-x-1">
                            <AlertTriangle className="h-3 w-3" />
                            <span>Alto ({probability}%)</span>
                        </Badge>
                    </div>
                )
            case "medio":
                return (
                    <div className="flex items-center space-x-2">
                        <Badge className="bg-yellow-100 text-yellow-800 flex items-center space-x-1">
                            <Shield className="h-3 w-3" />
                            <span>Medio ({probability}%)</span>
                        </Badge>
                    </div>
                )
            case "bajo":
                return (
                    <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-800 flex items-center space-x-1">
                            <CheckCircle className="h-3 w-3" />
                            <span>Bajo ({probability}%)</span>
                        </Badge>
                    </div>
                )
            default:
                return <Badge variant="outline">Sin evaluar</Badge>
        }
    }

    const filteredStudents = students.filter((student) => {
        const courseMatch =
            selectedCourse === "all" || student.course === courses.find((c) => c.value === selectedCourse)?.label
        const searchMatch =
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.studentId.includes(searchTerm)
        return courseMatch && searchMatch
    })

    const getStudentStats = () => {
        const total = students.length
        const active = students.filter((s) => s.status === "active").length
        const needsAttention = students.filter((s) => s.status === "attention").length
        const highRisk = students.filter((s) => s.dropoutRisk === "alto").length
        const averageGrade = students.reduce((sum, s) => sum + s.average, 0) / total
        const averageAttendance = students.reduce((sum, s) => sum + s.attendance, 0) / total

        return { total, active, needsAttention, highRisk, averageGrade, averageAttendance }
    }

    const stats = getStudentStats()

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
                            <BreadcrumbPage>Estudiantes</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestión de Estudiantes</h1>
                        <p className="text-muted-foreground">Consulta información académica y predicción de deserción escolar.</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" />
                            Filtros Avanzados
                        </Button>
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Exportar Lista
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filtros</CardTitle>
                        <CardDescription>Filtra la lista de estudiantes por curso o búsqueda</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="course-filter">Curso</Label>
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
                                <Label htmlFor="search">Buscar Estudiante</Label>
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="search"
                                        placeholder="Nombre o ID..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-8"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <p className="text-xs text-muted-foreground">En todos los cursos</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Estudiantes Activos</CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                            <p className="text-xs text-muted-foreground">
                                {((stats.active / stats.total) * 100).toFixed(1)}% del total
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Riesgo Alto</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{stats.highRisk}</div>
                            <p className="text-xs text-muted-foreground">Deserción probable</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Requieren Atención</CardTitle>
                            <TrendingDown className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">{stats.needsAttention}</div>
                            <p className="text-xs text-muted-foreground">Seguimiento especial</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Promedio General</CardTitle>
                            <GraduationCap className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{stats.averageGrade.toFixed(1)}</div>
                            <p className="text-xs text-muted-foreground">Escala 1.0-7.0</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Asistencia Promedio</CardTitle>
                            <Calendar className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-600">{stats.averageAttendance.toFixed(1)}%</div>
                            <p className="text-xs text-muted-foreground">Asistencia general</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Students Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Estudiantes con Predicción de Deserción</CardTitle>
                        <CardDescription>
                            Información académica y análisis de riesgo de deserción ({filteredStudents.length} estudiantes)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Estudiante</TableHead>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Curso</TableHead>
                                    <TableHead>Promedio</TableHead>
                                    <TableHead>Asistencia</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Riesgo de Deserción</TableHead>
                                    <TableHead>Tendencia</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredStudents.map((student) => (
                                    <TableRow key={student.id}>
                                        <TableCell className="font-medium">{student.name}</TableCell>
                                        <TableCell>{student.studentId}</TableCell>
                                        <TableCell>{student.course}</TableCell>
                                        <TableCell>{student.average.toFixed(1)}</TableCell>
                                        <TableCell>{student.attendance}%</TableCell>
                                        <TableCell>{getStatusBadge(student.status)}</TableCell>
                                        <TableCell>{getDropoutRiskBadge(student.dropoutRisk, student.dropoutProbability)}</TableCell>
                                        <TableCell>{getTrendIcon(student.trend)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Dropout Risk Analysis */}
                <Card>
                    <CardHeader>
                        <CardTitle>Análisis de Riesgo de Deserción</CardTitle>
                        <CardDescription>Recomendaciones basadas en el modelo de Machine Learning</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="p-4 border rounded-lg bg-red-50">
                                <div className="flex items-center space-x-2 mb-2">
                                    <AlertTriangle className="h-5 w-5 text-red-600" />
                                    <h4 className="font-semibold text-red-800">Riesgo Alto</h4>
                                </div>
                                <p className="text-sm text-red-700 mb-3">
                                    {students.filter((s) => s.dropoutRisk === "alto").length} estudiantes requieren intervención inmediata
                                </p>
                                <div className="space-y-1 text-xs text-red-600">
                                    <p>• Reunión urgente con padres</p>
                                    <p>• Plan de apoyo académico</p>
                                    <p>• Seguimiento semanal</p>
                                </div>
                            </div>

                            <div className="p-4 border rounded-lg bg-yellow-50">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Shield className="h-5 w-5 text-yellow-600" />
                                    <h4 className="font-semibold text-yellow-800">Riesgo Medio</h4>
                                </div>
                                <p className="text-sm text-yellow-700 mb-3">
                                    {students.filter((s) => s.dropoutRisk === "medio").length} estudiantes necesitan monitoreo
                                </p>
                                <div className="space-y-1 text-xs text-yellow-600">
                                    <p>• Tutorías adicionales</p>
                                    <p>• Comunicación con padres</p>
                                    <p>• Seguimiento quincenal</p>
                                </div>
                            </div>

                            <div className="p-4 border rounded-lg bg-green-50">
                                <div className="flex items-center space-x-2 mb-2">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <h4 className="font-semibold text-green-800">Riesgo Bajo</h4>
                                </div>
                                <p className="text-sm text-green-700 mb-3">
                                    {students.filter((s) => s.dropoutRisk === "bajo").length} estudiantes con buen rendimiento
                                </p>
                                <div className="space-y-1 text-xs text-green-600">
                                    <p>• Mantener motivación</p>
                                    <p>• Reconocer logros</p>
                                    <p>• Seguimiento mensual</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
