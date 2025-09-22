"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
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
import {
    Users,
    ClipboardList,
    GraduationCap,
    MessageSquare,
    Calendar,
    AlertCircle,
    CheckCircle,
    Clock,
} from "lucide-react"

export default function Dashboard() {
    const [selectedCourse, setSelectedCourse] = useState<string>("3a-matematicas")

    const courses = [
        { value: "3a-matematicas", label: "3° A - Matemáticas" },
        { value: "4b-algebra", label: "4° B - Álgebra" },
        { value: "2c-geometria", label: "2° C - Geometría" },
    ]

    // Obtener día actual
    const today = new Date()
    const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    const currentDay = dayNames[today.getDay()]

    // Datos por curso
    const courseData = {
        "3a-matematicas": {
            students: 28,
            averageGrade: 5.8,
            attendance: 94.2,
            lastClass: "Ecuaciones Cuadráticas",
            todayClasses: [
                {
                    subject: "Matemáticas",
                    grade: "3° A",
                    time: "09:00 - 10:30",
                    room: "Aula 205",
                    topic: "Factorización",
                    status: "pending",
                },
                {
                    subject: "Matemáticas",
                    grade: "3° A",
                    time: "14:00 - 15:30",
                    room: "Aula 205",
                    topic: "Productos Notables",
                    status: "pending",
                },
            ],
            gradeDistribution: {
                excellent: 8, // 6.0-7.0
                good: 12, // 5.0-5.9
                regular: 6, // 4.0-4.9
                poor: 2, // 1.0-3.9
            },
        },
        "4b-algebra": {
            students: 25,
            averageGrade: 6.1,
            attendance: 96.8,
            lastClass: "Sistemas de Ecuaciones",
            todayClasses: [
                {
                    subject: "Álgebra",
                    grade: "4° B",
                    time: "11:00 - 12:30",
                    room: "Aula 301",
                    topic: "Matrices",
                    status: "pending",
                },
            ],
            gradeDistribution: {
                excellent: 12,
                good: 10,
                regular: 3,
                poor: 0,
            },
        },
        "2c-geometria": {
            students: 30,
            averageGrade: 5.5,
            attendance: 92.1,
            lastClass: "Triángulos",
            todayClasses: [
                {
                    subject: "Geometría",
                    grade: "2° C",
                    time: "14:00 - 15:30",
                    room: "Aula 102",
                    topic: "Teorema de Pitágoras",
                    status: "pending",
                },
            ],
            gradeDistribution: {
                excellent: 5,
                good: 15,
                regular: 8,
                poor: 2,
            },
        },
    }

    const currentCourse = courseData[selectedCourse as keyof typeof courseData]

    const stats = [
        {
            title: "Estudiantes en Curso",
            value: currentCourse.students.toString(),
            change: "Total matriculados",
            icon: Users,
            color: "text-blue-600",
        },
        {
            title: "Asistencia Promedio",
            value: `${currentCourse.attendance}%`,
            change: "+2.1% vs mes anterior",
            icon: ClipboardList,
            color: "text-green-600",
        },
        {
            title: "Promedio del Curso",
            value: currentCourse.averageGrade.toFixed(1),
            change: "+0.2 vs mes anterior",
            icon: GraduationCap,
            color: "text-purple-600",
        },
        {
            title: "Mensajes Pendientes",
            value: "3",
            change: "Requieren respuesta",
            icon: MessageSquare,
            color: "text-orange-600",
        },
    ]

    const recentActivities = [
        {
            type: "attendance",
            message: `Asistencia registrada para ${courses.find((c) => c.value === selectedCourse)?.label}`,
            time: "Hace 2 horas",
            status: "completed",
        },
        {
            type: "grade",
            message: `Notas actualizadas - ${currentCourse.lastClass}`,
            time: "Hace 4 horas",
            status: "completed",
        },
        {
            type: "message",
            message: "Nuevo mensaje de la Dirección Académica",
            time: "Hace 6 horas",
            status: "pending",
        },
        {
            type: "observation",
            message: "Observación registrada para estudiante del curso",
            time: "Ayer",
            status: "completed",
        },
    ]

    const getClassStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="h-4 w-4 text-green-600" />
            case "in-progress":
                return <Clock className="h-4 w-4 text-blue-600" />
            default:
                return <Clock className="h-4 w-4 text-gray-600" />
        }
    }

    return (
        <div className="flex flex-col">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="/profesor">EduAdmin</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Dashboard</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground">Bienvenida, Prof. María González. Resumen de actividad por curso.</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline">
                            <Calendar className="mr-2 h-4 w-4" />
                            Ver Horario
                        </Button>
                        <Button>
                            <ClipboardList className="mr-2 h-4 w-4" />
                            Tomar Asistencia
                        </Button>
                    </div>
                </div>

                {/* Course Selector */}
                <Card>
                    <CardHeader>
                        <CardTitle>Seleccionar Curso</CardTitle>
                        <CardDescription>Elige el curso para ver las estadísticas específicas</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                            <SelectTrigger className="w-full max-w-sm">
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
                    </CardContent>
                </Card>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground">{stat.change}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Today's Classes */}
                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle>Clases de Hoy - {currentDay}</CardTitle>
                            <CardDescription>
                                {courses.find((c) => c.value === selectedCourse)?.label} •{" "}
                                {today.toLocaleDateString("es-ES", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {currentCourse.todayClasses.length > 0 ? (
                                    currentCourse.todayClasses.map((class_, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                {getClassStatusIcon(class_.status)}
                                                <div className="space-y-1">
                                                    <p className="font-medium">{class_.subject}</p>
                                                    <p className="text-sm text-muted-foreground">{class_.topic}</p>
                                                </div>
                                            </div>
                                            <div className="text-right space-y-1">
                                                <p className="text-sm font-medium">{class_.time}</p>
                                                <p className="text-sm text-muted-foreground">{class_.room}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>No tienes clases programadas para hoy</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Activities */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Actividad Reciente</CardTitle>
                            <CardDescription>Últimas acciones del curso</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivities.map((activity, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                            {activity.status === "completed" ? (
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                            ) : (
                                                <AlertCircle className="h-5 w-5 text-orange-600" />
                                            )}
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium">{activity.message}</p>
                                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Performance Overview */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Distribución de Notas</CardTitle>
                            <CardDescription>Rendimiento del curso seleccionado (escala 1.0 - 7.0)</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Excelente (6.0 - 7.0)</span>
                                    <span className="text-sm text-muted-foreground">
                                        {currentCourse.gradeDistribution.excellent} estudiantes
                                    </span>
                                </div>
                                <Progress
                                    value={(currentCourse.gradeDistribution.excellent / currentCourse.students) * 100}
                                    className="h-2"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Bueno (5.0 - 5.9)</span>
                                    <span className="text-sm text-muted-foreground">
                                        {currentCourse.gradeDistribution.good} estudiantes
                                    </span>
                                </div>
                                <Progress
                                    value={(currentCourse.gradeDistribution.good / currentCourse.students) * 100}
                                    className="h-2"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Regular (4.0 - 4.9)</span>
                                    <span className="text-sm text-muted-foreground">
                                        {currentCourse.gradeDistribution.regular} estudiantes
                                    </span>
                                </div>
                                <Progress
                                    value={(currentCourse.gradeDistribution.regular / currentCourse.students) * 100}
                                    className="h-2"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Insuficiente (1.0 - 3.9)</span>
                                    <span className="text-sm text-muted-foreground">
                                        {currentCourse.gradeDistribution.poor} estudiantes
                                    </span>
                                </div>
                                <Progress
                                    value={(currentCourse.gradeDistribution.poor / currentCourse.students) * 100}
                                    className="h-2"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Resumen del Curso</CardTitle>
                            <CardDescription>Métricas clave del curso seleccionado</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Promedio General</span>
                                    <span className="text-sm text-muted-foreground">{currentCourse.averageGrade.toFixed(1)}</span>
                                </div>
                                <Progress value={(currentCourse.averageGrade / 7) * 100} className="h-2" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Asistencia</span>
                                    <span className="text-sm text-muted-foreground">{currentCourse.attendance}%</span>
                                </div>
                                <Progress value={currentCourse.attendance} className="h-2" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Estudiantes Aprobados</span>
                                    <span className="text-sm text-muted-foreground">
                                        {currentCourse.gradeDistribution.excellent + currentCourse.gradeDistribution.good} de{" "}
                                        {currentCourse.students}
                                    </span>
                                </div>
                                <Progress
                                    value={
                                        ((currentCourse.gradeDistribution.excellent + currentCourse.gradeDistribution.good) /
                                            currentCourse.students) *
                                        100
                                    }
                                    className="h-2"
                                />
                            </div>
                            <div className="pt-4 border-t">
                                <p className="text-sm text-muted-foreground">
                                    <strong>Última clase:</strong> {currentCourse.lastClass}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
