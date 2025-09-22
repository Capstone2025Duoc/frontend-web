"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import {
    Download,
    FileText,
    BarChart3,
    CalendarIcon,
    Users,
    GraduationCap,
    ClipboardList,
    FileSpreadsheet,
    Filter,
    Eye,
} from "lucide-react"

export default function ReportsPage() {
    const [selectedReportType, setSelectedReportType] = useState<string>("")
    const [selectedFormat, setSelectedFormat] = useState<string>("pdf")
    const [selectedPeriod, setSelectedPeriod] = useState<string>("month")
    const [selectedCourse, setSelectedCourse] = useState<string>("all")
    const [selectedProfessor, setSelectedProfessor] = useState<string>("all")
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()
    const [includeGraphics, setIncludeGraphics] = useState(true)
    const [includeDetails, setIncludeDetails] = useState(true)

    const reportTypes = [
        {
            value: "attendance",
            label: "Reporte de Asistencia",
            description: "Estadísticas de asistencia por curso, profesor o período",
            icon: ClipboardList,
            color: "text-blue-600",
        },
        {
            value: "grades",
            label: "Reporte de Calificaciones",
            description: "Análisis de notas y rendimiento académico",
            icon: GraduationCap,
            color: "text-green-600",
        },
        {
            value: "observations",
            label: "Reporte de Observaciones",
            description: "Resumen de observaciones por tipo y frecuencia",
            icon: FileText,
            color: "text-purple-600",
        },
        {
            value: "students",
            label: "Reporte de Estudiantes",
            description: "Información completa de estudiantes y su progreso",
            icon: Users,
            color: "text-orange-600",
        },
        {
            value: "professors",
            label: "Reporte de Profesores",
            description: "Estadísticas de carga académica y desempeño",
            icon: GraduationCap,
            color: "text-red-600",
        },
        {
            value: "comprehensive",
            label: "Reporte Integral",
            description: "Análisis completo del sistema educativo",
            icon: BarChart3,
            color: "text-indigo-600",
        },
    ]

    const formats = [
        { value: "pdf", label: "PDF", icon: FileText },
        { value: "excel", label: "Excel", icon: FileSpreadsheet },
    ]

    const periods = [
        { value: "week", label: "Última semana" },
        { value: "month", label: "Último mes" },
        { value: "quarter", label: "Último trimestre" },
        { value: "semester", label: "Último semestre" },
        { value: "year", label: "Último año" },
        { value: "custom", label: "Período personalizado" },
    ]

    const courses = [
        { value: "all", label: "Todos los cursos" },
        { value: "1a", label: "1° A" },
        { value: "1b", label: "1° B" },
        { value: "2a", label: "2° A" },
        { value: "2b", label: "2° B" },
        { value: "3a", label: "3° A" },
        { value: "3b", label: "3° B" },
        { value: "4a", label: "4° A" },
        { value: "4b", label: "4° B" },
    ]

    const professors = [
        { value: "all", label: "Todos los profesores" },
        { value: "maria-gonzalez", label: "Prof. María González" },
        { value: "carlos-ruiz", label: "Dr. Carlos Ruiz" },
        { value: "laura-martin", label: "Prof. Laura Martín" },
        { value: "ana-torres", label: "Prof. Ana Torres" },
        { value: "roberto-silva", label: "Prof. Roberto Silva" },
    ]

    const [recentReports] = useState([
        {
            id: 1,
            name: "Reporte de Asistencia - Noviembre 2024",
            type: "attendance",
            format: "pdf",
            generatedBy: "Director Juan Pérez",
            generatedAt: "2024-11-20 14:30",
            size: "2.3 MB",
            downloads: 12,
        },
        {
            id: 2,
            name: "Calificaciones Segundo Parcial",
            type: "grades",
            format: "excel",
            generatedBy: "Coord. Académica",
            generatedAt: "2024-11-18 09:15",
            size: "1.8 MB",
            downloads: 8,
        },
        {
            id: 3,
            name: "Observaciones Mensuales",
            type: "observations",
            format: "pdf",
            generatedBy: "Director Juan Pérez",
            generatedAt: "2024-11-15 16:45",
            size: "1.2 MB",
            downloads: 5,
        },
    ])

    const generateReport = () => {
        // Aquí se implementaría la lógica de generación de reportes
        alert(
            `Generando reporte: ${reportTypes.find((r) => r.value === selectedReportType)?.label} en formato ${selectedFormat.toUpperCase()}`,
        )
    }

    const getReportTypeIcon = (type: string) => {
        const reportType = reportTypes.find((r) => r.value === type)
        if (!reportType) return <FileText className="h-4 w-4" />
        const Icon = reportType.icon
        return <Icon className={`h-4 w-4 ${reportType.color}`} />
    }

    const getFormatIcon = (format: string) => {
        const formatType = formats.find((f) => f.value === format)
        if (!formatType) return <FileText className="h-4 w-4" />
        const Icon = formatType.icon
        return <Icon className="h-4 w-4" />
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
                            <BreadcrumbPage>Reportes</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Generación de Reportes</h1>
                        <p className="text-muted-foreground">
                            Genera reportes personalizados en PDF o Excel con filtros avanzados.
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Report Generator */}
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                Generar Nuevo Reporte
                            </CardTitle>
                            <CardDescription>Configura los parámetros para generar un reporte personalizado</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Report Type Selection */}
                            <div className="space-y-3">
                                <Label>Tipo de Reporte</Label>
                                <div className="grid gap-3">
                                    {reportTypes.map((type) => (
                                        <div
                                            key={type.value}
                                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedReportType === type.value
                                                ? "border-primary bg-primary/5"
                                                : "border-border hover:bg-muted/50"
                                                }`}
                                            onClick={() => setSelectedReportType(type.value)}
                                        >
                                            <div className="flex items-start space-x-3">
                                                <type.icon className={`h-5 w-5 mt-0.5 ${type.color}`} />
                                                <div className="flex-1">
                                                    <h4 className="font-medium">{type.label}</h4>
                                                    <p className="text-sm text-muted-foreground">{type.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Format Selection */}
                            <div className="space-y-2">
                                <Label>Formato de Salida</Label>
                                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar formato" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {formats.map((format) => (
                                            <SelectItem key={format.value} value={format.value}>
                                                <div className="flex items-center space-x-2">
                                                    <format.icon className="h-4 w-4" />
                                                    <span>{format.label}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Period Selection */}
                            <div className="space-y-2">
                                <Label>Período</Label>
                                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar período" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {periods.map((period) => (
                                            <SelectItem key={period.value} value={period.value}>
                                                {period.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Custom Date Range */}
                            {selectedPeriod === "custom" && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Fecha Inicio</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !startDate && "text-muted-foreground",
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {startDate ? format(startDate, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Fecha Fin</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !endDate && "text-muted-foreground",
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {endDate ? format(endDate, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            )}

                            {/* Filters */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Curso</Label>
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
                                    <Label>Profesor</Label>
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
                            </div>

                            {/* Options */}
                            <div className="space-y-3">
                                <Label>Opciones del Reporte</Label>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="graphics"
                                            checked={includeGraphics}
                                            onCheckedChange={(checked) => setIncludeGraphics(!!checked)}
                                        />
                                        <Label htmlFor="graphics">Incluir gráficos y visualizaciones</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="details"
                                            checked={includeDetails}
                                            onCheckedChange={(checked) => setIncludeDetails(!!checked)}
                                        />
                                        <Label htmlFor="details">Incluir detalles individuales</Label>
                                    </div>
                                </div>
                            </div>

                            <Button onClick={generateReport} className="w-full" disabled={!selectedReportType}>
                                <Download className="mr-2 h-4 w-4" />
                                Generar Reporte
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Recent Reports */}
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Reportes Recientes
                            </CardTitle>
                            <CardDescription>Historial de reportes generados recientemente</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentReports.map((report) => (
                                    <div key={report.id} className="p-4 border rounded-lg">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-3">
                                                {getReportTypeIcon(report.type)}
                                                <div className="space-y-1">
                                                    <h4 className="font-medium">{report.name}</h4>
                                                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                        <span>Por {report.generatedBy}</span>
                                                        <span>•</span>
                                                        <span>{report.generatedAt}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                        {getFormatIcon(report.format)}
                                                        <span>{report.size}</span>
                                                        <span>•</span>
                                                        <span>{report.downloads} descargas</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Button variant="ghost" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Report Templates */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Plantillas de Reportes
                        </CardTitle>
                        <CardDescription>Plantillas predefinidas para reportes comunes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="p-4 border rounded-lg">
                                <div className="space-y-2">
                                    <h4 className="font-medium">Reporte Mensual Completo</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Incluye asistencia, calificaciones y observaciones del último mes
                                    </p>
                                    <Button variant="outline" size="sm" className="w-full">
                                        Usar Plantilla
                                    </Button>
                                </div>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <div className="space-y-2">
                                    <h4 className="font-medium">Informe de Rendimiento</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Análisis detallado de calificaciones y tendencias académicas
                                    </p>
                                    <Button variant="outline" size="sm" className="w-full">
                                        Usar Plantilla
                                    </Button>
                                </div>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <div className="space-y-2">
                                    <h4 className="font-medium">Reporte de Asistencia</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Estadísticas de asistencia por curso y período seleccionado
                                    </p>
                                    <Button variant="outline" size="sm" className="w-full">
                                        Usar Plantilla
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
