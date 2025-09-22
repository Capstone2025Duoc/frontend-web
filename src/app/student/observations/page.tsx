"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { FileText, Calendar, User, Search, AlertCircle, CheckCircle, Info, MessageSquare } from "lucide-react"

export default function StudentObservationsPage() {
    const [selectedType, setSelectedType] = useState<string>("all")
    const [selectedSubject, setSelectedSubject] = useState<string>("all")
    const [searchTerm, setSearchTerm] = useState<string>("")

    const observationTypes = [
        { value: "all", label: "Todos los tipos" },
        { value: "positive", label: "Positivas" },
        { value: "neutral", label: "Neutrales" },
        { value: "improvement", label: "Para mejorar" },
    ]

    const subjects = [
        { value: "all", label: "Todas las materias" },
        { value: "matematicas", label: "Matemáticas" },
        { value: "historia", label: "Historia" },
        { value: "fisica", label: "Física" },
        { value: "ingles", label: "Inglés" },
        { value: "quimica", label: "Química" },
        { value: "literatura", label: "Literatura" },
    ]

    const observations = [
        {
            id: 1,
            student: "Ana García López",
            subject: "Matemáticas",
            teacher: "Prof. María González",
            type: "positive",
            title: "Excelente participación en clase",
            description:
                "Ana demostró un entendimiento excepcional de las ecuaciones cuadráticas y ayudó a sus compañeros durante la actividad grupal.",
            date: "2024-11-18",
            priority: "normal",
            tags: ["participación", "colaboración", "comprensión"],
        },
        {
            id: 2,
            student: "Ana García López",
            subject: "Historia",
            teacher: "Prof. Carlos Ruiz",
            type: "positive",
            title: "Ensayo sobresaliente",
            description:
                "Su análisis sobre la Revolución Industrial fue profundo y bien documentado. Mostró excelente capacidad de síntesis.",
            date: "2024-11-15",
            priority: "normal",
            tags: ["escritura", "análisis", "investigación"],
        },
        {
            id: 3,
            student: "Ana García López",
            subject: "Física",
            teacher: "Prof. Laura Martín",
            type: "improvement",
            title: "Mejorar precisión en laboratorio",
            description:
                "Aunque comprende bien los conceptos teóricos, necesita ser más cuidadosa con las mediciones en los experimentos de laboratorio.",
            date: "2024-11-12",
            priority: "medium",
            tags: ["laboratorio", "precisión", "mediciones"],
        },
        {
            id: 4,
            student: "Ana García López",
            subject: "Inglés",
            teacher: "Prof. Ana Torres",
            type: "positive",
            title: "Excelente fluidez oral",
            description:
                "Su presentación sobre planes futuros fue muy fluida y natural. Ha mejorado significativamente su pronunciación.",
            date: "2024-11-10",
            priority: "normal",
            tags: ["oral", "fluidez", "pronunciación"],
        },
        {
            id: 5,
            student: "Ana García López",
            subject: "Química",
            teacher: "Prof. Roberto Silva",
            type: "positive",
            title: "Dominio excepcional de la tabla periódica",
            description:
                "Demostró un conocimiento perfecto de los elementos y sus propiedades. Su método de estudio es muy efectivo.",
            date: "2024-11-08",
            priority: "normal",
            tags: ["memorización", "comprensión", "método de estudio"],
        },
        {
            id: 6,
            student: "Ana García López",
            subject: "Literatura",
            teacher: "Prof. Carmen López",
            type: "neutral",
            title: "Análisis literario en desarrollo",
            description:
                "Su interpretación de Don Quijote es correcta pero podría profundizar más en el contexto histórico y social de la obra.",
            date: "2024-11-05",
            priority: "low",
            tags: ["análisis", "contexto histórico", "interpretación"],
        },
        {
            id: 7,
            student: "Ana García López",
            subject: "Matemáticas",
            teacher: "Prof. María González",
            type: "positive",
            title: "Consistencia en tareas",
            description: "Ha entregado todas las tareas a tiempo y con excelente calidad. Su dedicación es evidente.",
            date: "2024-11-03",
            priority: "normal",
            tags: ["puntualidad", "calidad", "dedicación"],
        },
        {
            id: 8,
            student: "Ana García López",
            subject: "Física",
            teacher: "Prof. Laura Martín",
            type: "improvement",
            title: "Revisar unidades de medida",
            description:
                "Maneja muy bien las fórmulas de cinemática, pero debe prestar más atención a las unidades de medida en sus cálculos.",
            date: "2024-11-01",
            priority: "medium",
            tags: ["unidades", "cálculos", "atención al detalle"],
        },
    ]

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "positive":
                return <CheckCircle className="h-4 w-4 text-green-600" />
            case "improvement":
                return <AlertCircle className="h-4 w-4 text-yellow-600" />
            case "neutral":
                return <Info className="h-4 w-4 text-blue-600" />
            default:
                return <FileText className="h-4 w-4" />
        }
    }

    const getTypeBadge = (type: string) => {
        switch (type) {
            case "positive":
                return <Badge className="bg-green-100 text-green-800">Positiva</Badge>
            case "improvement":
                return <Badge className="bg-yellow-100 text-yellow-800">Para Mejorar</Badge>
            case "neutral":
                return <Badge className="bg-blue-100 text-blue-800">Neutral</Badge>
            default:
                return <Badge variant="outline">Desconocido</Badge>
        }
    }

    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case "high":
                return <Badge variant="destructive">Alta</Badge>
            case "medium":
                return <Badge className="bg-yellow-100 text-yellow-800">Media</Badge>
            case "low":
                return <Badge variant="outline">Baja</Badge>
            default:
                return <Badge variant="outline">Normal</Badge>
        }
    }

    const filteredObservations = observations.filter((observation) => {
        const typeMatch = selectedType === "all" || observation.type === selectedType
        const subjectMatch = selectedSubject === "all" || observation.subject.toLowerCase().includes(selectedSubject)
        const searchMatch =
            observation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            observation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            observation.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        return typeMatch && subjectMatch && searchMatch
    })

    const getObservationStats = () => {
        const total = observations.length
        const positive = observations.filter((obs) => obs.type === "positive").length
        const improvement = observations.filter((obs) => obs.type === "improvement").length
        const neutral = observations.filter((obs) => obs.type === "neutral").length

        return { total, positive, improvement, neutral }
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
                            <BreadcrumbLink href="/estudiante">Dashboard</BreadcrumbLink>
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
                        <h1 className="text-3xl font-bold tracking-tight">Mis Observaciones</h1>
                        <p className="text-muted-foreground">Consulta todas las observaciones y comentarios de tus profesores.</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Observaciones</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <p className="text-xs text-muted-foreground">Registradas</p>
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
                            <CardTitle className="text-sm font-medium">Para Mejorar</CardTitle>
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">{stats.improvement}</div>
                            <p className="text-xs text-muted-foreground">Áreas de oportunidad</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Neutrales</CardTitle>
                            <Info className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{stats.neutral}</div>
                            <p className="text-xs text-muted-foreground">Informativas</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filtros</CardTitle>
                        <CardDescription>Filtra las observaciones por tipo, materia o búsqueda</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="type-filter">Tipo</Label>
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
                                <Label htmlFor="subject-filter">Materia</Label>
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
                            <div className="space-y-2">
                                <Label htmlFor="search">Buscar</Label>
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="search"
                                        placeholder="Título, descripción o etiquetas..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-8"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Observations List */}
                <div className="space-y-4">
                    {filteredObservations.map((observation) => (
                        <Card key={observation.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        {getTypeIcon(observation.type)}
                                        <div className="space-y-1">
                                            <CardTitle className="text-lg">{observation.title}</CardTitle>
                                            <CardDescription className="flex items-center gap-2 flex-wrap">
                                                <span>{observation.subject}</span>
                                                <span>•</span>
                                                <User className="h-3 w-3" />
                                                <span>{observation.teacher}</span>
                                                <span>•</span>
                                                <Calendar className="h-3 w-3" />
                                                <span>{observation.date}</span>
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getTypeBadge(observation.type)}
                                        {observation.priority !== "normal" && getPriorityBadge(observation.priority)}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <p className="text-muted-foreground">{observation.description}</p>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {observation.tags.map((tag, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredObservations.length === 0 && (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No se encontraron observaciones</h3>
                            <p className="text-muted-foreground text-center">
                                No hay observaciones que coincidan con los filtros seleccionados.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
