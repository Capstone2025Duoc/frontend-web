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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Plus, Eye, Filter, Download, AlertTriangle, CheckCircle, Info, Calendar, User } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export default function ObservationsPage() {
    const [selectedType, setSelectedType] = useState<string>("all")
    const [selectedStudent, setSelectedStudent] = useState<string>("all")

    const observationTypes = [
        { value: "all", label: "Todas las observaciones" },
        { value: "positive", label: "Positivas" },
        { value: "negative", label: "Negativas" },
        { value: "neutral", label: "Informativas" },
    ]

    const students = [
        { value: "all", label: "Todos los estudiantes" },
        { value: "ana-garcia", label: "Ana García López" },
        { value: "carlos-rodriguez", label: "Carlos Rodríguez Pérez" },
        { value: "maria-fernandez", label: "María Fernández Silva" },
        { value: "juan-martinez", label: "Juan Martínez González" },
        { value: "laura-sanchez", label: "Laura Sánchez Ruiz" },
    ]

    const [observations, setObservations] = useState([
        {
            id: 1,
            studentId: "2023001",
            studentName: "Ana García López",
            type: "positive",
            category: "Académico",
            title: "Excelente participación en clase",
            description:
                "Ana demostró un gran entendimiento del tema de ecuaciones cuadráticas y ayudó a sus compañeros durante la actividad grupal.",
            date: new Date("2024-11-20"),
            author: "Prof. María González",
            course: "3° A - Matemáticas",
        },
        {
            id: 2,
            studentId: "2023004",
            studentName: "Juan Martínez González",
            type: "negative",
            category: "Comportamiento",
            title: "Distracción durante la clase",
            description:
                "Juan estuvo distraído durante la explicación del tema y no completó los ejercicios asignados. Se recomienda seguimiento.",
            date: new Date("2024-11-19"),
            author: "Prof. María González",
            course: "3° A - Matemáticas",
        },
        {
            id: 3,
            studentId: "2023003",
            studentName: "María Fernández Silva",
            type: "positive",
            category: "Académico",
            title: "Mejora significativa en resolución de problemas",
            description: "María ha mostrado una mejora notable en su capacidad para resolver problemas complejos de álgebra.",
            date: new Date("2024-11-18"),
            author: "Prof. María González",
            course: "4° B - Álgebra",
        },
        {
            id: 4,
            studentId: "2023002",
            studentName: "Carlos Rodríguez Pérez",
            type: "neutral",
            category: "Asistencia",
            title: "Ausencia justificada",
            description:
                "Carlos faltó a clase por cita médica. Se le proporcionó el material de la clase para ponerse al día.",
            date: new Date("2024-11-17"),
            author: "Prof. María González",
            course: "3° A - Matemáticas",
        },
        {
            id: 5,
            studentId: "2023001",
            studentName: "Ana García López",
            type: "positive",
            category: "Liderazgo",
            title: "Liderazgo en proyecto grupal",
            description:
                "Ana lideró efectivamente su grupo en el proyecto de geometría, demostrando excelentes habilidades de organización.",
            date: new Date("2024-11-16"),
            author: "Prof. María González",
            course: "2° C - Geometría",
        },
    ])

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "positive":
                return <CheckCircle className="h-4 w-4 text-green-600" />
            case "negative":
                return <AlertTriangle className="h-4 w-4 text-red-600" />
            default:
                return <Info className="h-4 w-4 text-blue-600" />
        }
    }

    const getTypeBadge = (type: string) => {
        switch (type) {
            case "positive":
                return <Badge className="bg-green-100 text-green-800">Positiva</Badge>
            case "negative":
                return <Badge variant="destructive">Negativa</Badge>
            default:
                return <Badge variant="secondary">Informativa</Badge>
        }
    }

    const filteredObservations = observations.filter((obs) => {
        const typeMatch = selectedType === "all" || obs.type === selectedType
        const studentMatch =
            selectedStudent === "all" ||
            obs.studentName
                .toLowerCase()
                .includes(students.find((s) => s.value === selectedStudent)?.label.toLowerCase() || "")
        return typeMatch && studentMatch
    })

    const getObservationStats = () => {
        const total = observations.length
        const positive = observations.filter((obs) => obs.type === "positive").length
        const negative = observations.filter((obs) => obs.type === "negative").length
        const neutral = observations.filter((obs) => obs.type === "neutral").length

        return { total, positive, negative, neutral }
    }

    const stats = getObservationStats()

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
                            <BreadcrumbPage>Observaciones</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Observaciones</h1>
                        <p className="text-muted-foreground">
                            Registra y consulta observaciones sobre el comportamiento y rendimiento de los estudiantes.
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" />
                            Filtros Avanzados
                        </Button>
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Exportar
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Nueva Observación
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                    <DialogTitle>Registrar Nueva Observación</DialogTitle>
                                    <DialogDescription>Documenta una observación sobre un estudiante o curso.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="student">Estudiante</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar estudiante" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {students.slice(1).map((student) => (
                                                        <SelectItem key={student.value} value={student.value}>
                                                            {student.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="type">Tipo</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Tipo de observación" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="positive">Positiva</SelectItem>
                                                    <SelectItem value="negative">Negativa</SelectItem>
                                                    <SelectItem value="neutral">Informativa</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="category">Categoría</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Categoría" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="academico">Académico</SelectItem>
                                                    <SelectItem value="comportamiento">Comportamiento</SelectItem>
                                                    <SelectItem value="asistencia">Asistencia</SelectItem>
                                                    <SelectItem value="liderazgo">Liderazgo</SelectItem>
                                                    <SelectItem value="participacion">Participación</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="course">Curso</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Curso relacionado" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="3a-matematicas">3° A - Matemáticas</SelectItem>
                                                    <SelectItem value="4b-algebra">4° B - Álgebra</SelectItem>
                                                    <SelectItem value="2c-geometria">2° C - Geometría</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Título</Label>
                                        <Input id="title" placeholder="Título breve de la observación" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Descripción</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Describe detalladamente la observación..."
                                            className="min-h-[100px]"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Registrar Observación</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filtros</CardTitle>
                        <CardDescription>Filtra las observaciones por tipo y estudiante</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="type-filter">Tipo de Observación</Label>
                                <Select value={selectedType} onValueChange={setSelectedType}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {observationTypes.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="student-filter">Estudiante</Label>
                                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar estudiante" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {students.map((student) => (
                                            <SelectItem key={student.value} value={student.value}>
                                                {student.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="search">Buscar</Label>
                                <Input id="search" placeholder="Buscar en observaciones..." className="w-full" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Observaciones</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <p className="text-xs text-muted-foreground">Este mes</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Positivas</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.positive}</div>
                            <p className="text-xs text-muted-foreground">
                                {((stats.positive / stats.total) * 100).toFixed(1)}% del total
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Negativas</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{stats.negative}</div>
                            <p className="text-xs text-muted-foreground">
                                {((stats.negative / stats.total) * 100).toFixed(1)}% del total
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Informativas</CardTitle>
                            <Info className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{stats.neutral}</div>
                            <p className="text-xs text-muted-foreground">
                                {((stats.neutral / stats.total) * 100).toFixed(1)}% del total
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Observations List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Historial de Observaciones</CardTitle>
                        <CardDescription>
                            Lista completa de observaciones registradas ({filteredObservations.length} resultados)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {filteredObservations.map((observation) => (
                                <div key={observation.id} className="border rounded-lg p-4 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                                                <AvatarFallback>
                                                    {observation.studentName
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="space-y-1">
                                                <div className="flex items-center space-x-2">
                                                    <h4 className="font-semibold">{observation.title}</h4>
                                                    {getTypeBadge(observation.type)}
                                                    <Badge variant="outline">{observation.category}</Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    <User className="inline h-3 w-3 mr-1" />
                                                    {observation.studentName} • {observation.course}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            {format(observation.date, "dd MMM yyyy", { locale: es })}
                                        </div>
                                    </div>
                                    <p className="text-sm pl-13">{observation.description}</p>
                                    <div className="flex items-center justify-between pl-13">
                                        <p className="text-xs text-muted-foreground">Registrado por: {observation.author}</p>
                                        <Button variant="ghost" size="sm">
                                            <Eye className="h-4 w-4 mr-1" />
                                            Ver Detalles
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
