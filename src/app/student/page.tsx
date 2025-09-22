"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Calendar, GraduationCap, Clock, Bell, TrendingUp, FileText, Award, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function EstudianteDashboard() {
    const today = new Date()
    const dayName = today.toLocaleDateString("es-ES", { weekday: "long" })
    const fullDate = today.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    const todayClasses = [
        {
            id: 1,
            subject: "Matemáticas",
            teacher: "Prof. María González",
            time: "08:00 - 09:30",
            room: "Aula 201",
            status: "completed",
            color: "bg-blue-500",
        },
        {
            id: 2,
            subject: "Historia",
            teacher: "Prof. Carlos Ruiz",
            time: "09:45 - 11:15",
            room: "Aula 105",
            status: "in-progress",
            color: "bg-green-500",
        },
        {
            id: 3,
            subject: "Física",
            teacher: "Prof. Laura Martín",
            time: "11:30 - 13:00",
            room: "Lab. Ciencias",
            status: "pending",
            color: "bg-purple-500",
        },
        {
            id: 4,
            subject: "Inglés",
            teacher: "Prof. Ana Torres",
            time: "14:00 - 15:30",
            room: "Aula 302",
            status: "pending",
            color: "bg-orange-500",
        },
    ]

    const recentGrades = [
        { subject: "Matemáticas", grade: 6.5, type: "Examen", date: "2024-11-18" },
        { subject: "Historia", grade: 6.8, type: "Ensayo", date: "2024-11-15" },
        { subject: "Física", grade: 5.8, type: "Laboratorio", date: "2024-11-12" },
        { subject: "Inglés", grade: 6.2, type: "Oral", date: "2024-11-10" },
    ]

    const notifications = [
        {
            id: 1,
            title: "Nueva tarea de Matemáticas",
            message: "Ejercicios del capítulo 5 para el viernes",
            time: "Hace 2 horas",
            type: "assignment",
            read: false,
        },
        {
            id: 2,
            title: "Calificación disponible",
            message: "Tu nota del examen de Historia ya está disponible",
            time: "Hace 4 horas",
            type: "grade",
            read: false,
        },
        {
            id: 3,
            title: "Recordatorio",
            message: "Reunión de padres el próximo martes",
            time: "Ayer",
            type: "reminder",
            read: true,
        },
    ]

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "completed":
                return <Badge className="bg-green-100 text-green-800">Completada</Badge>
            case "in-progress":
                return <Badge className="bg-blue-100 text-blue-800">En Curso</Badge>
            case "pending":
                return <Badge variant="outline">Pendiente</Badge>
            default:
                return <Badge variant="outline">Desconocido</Badge>
        }
    }

    const getGradeColor = (grade: number) => {
        if (grade >= 6.0) return "text-green-600"
        if (grade >= 5.0) return "text-blue-600"
        if (grade >= 4.0) return "text-yellow-600"
        return "text-red-600"
    }

    const averageGrade = recentGrades.reduce((sum, grade) => sum + grade.grade, 0) / recentGrades.length
    const attendanceRate = 96 // Simulado

    return (
        <div className="flex flex-col">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>Dashboard</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">¡Hola, Ana! 👋</h1>
                        <p className="text-muted-foreground">
                            Bienvenida a tu portal estudiantil. Aquí tienes tu resumen académico.
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground capitalize">{dayName}</p>
                        <p className="text-lg font-semibold">{fullDate}</p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Promedio General</CardTitle>
                            <GraduationCap className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{averageGrade.toFixed(1)}</div>
                            <p className="text-xs text-muted-foreground">
                                <TrendingUp className="inline h-3 w-3 mr-1" />
                                +0.3 desde el mes pasado
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Asistencia</CardTitle>
                            <Calendar className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{attendanceRate}%</div>
                            <Progress value={attendanceRate} className="mt-2" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Clases Hoy</CardTitle>
                            <Clock className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-600">{todayClasses.length}</div>
                            <p className="text-xs text-muted-foreground">
                                {todayClasses.filter((c) => c.status === "completed").length} completadas
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Notificaciones</CardTitle>
                            <Bell className="h-4 w-4 text-orange-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">{notifications.filter((n) => !n.read).length}</div>
                            <p className="text-xs text-muted-foreground">Sin leer</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Today's Classes */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Clases de Hoy
                            </CardTitle>
                            <CardDescription>Tu horario para {dayName}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {todayClasses.map((classItem) => (
                                    <div key={classItem.id} className="flex items-center space-x-4 p-3 rounded-lg border">
                                        <div className={`w-3 h-3 rounded-full ${classItem.color}`} />
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <p className="font-medium">{classItem.subject}</p>
                                                {getStatusBadge(classItem.status)}
                                            </div>
                                            <p className="text-sm text-muted-foreground">{classItem.teacher}</p>
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {classItem.time}
                                                </span>
                                                <span>{classItem.room}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Grades */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="h-5 w-5" />
                                Calificaciones Recientes
                            </CardTitle>
                            <CardDescription>Tus últimas evaluaciones</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentGrades.map((grade, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                                        <div className="space-y-1">
                                            <p className="font-medium">{grade.subject}</p>
                                            <p className="text-sm text-muted-foreground">{grade.type}</p>
                                            <p className="text-xs text-muted-foreground">{grade.date}</p>
                                        </div>
                                        <div className={`text-2xl font-bold ${getGradeColor(grade.grade)}`}>{grade.grade}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Notifications */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            Notificaciones Recientes
                        </CardTitle>
                        <CardDescription>Mensajes y alertas importantes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {notifications.slice(0, 3).map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`flex items-start space-x-4 p-3 rounded-lg border ${!notification.read ? "bg-blue-50 border-blue-200" : ""}`}
                                >
                                    <div className="flex-shrink-0">
                                        {notification.type === "assignment" && <FileText className="h-5 w-5 text-blue-600" />}
                                        {notification.type === "grade" && <GraduationCap className="h-5 w-5 text-green-600" />}
                                        {notification.type === "reminder" && <AlertCircle className="h-5 w-5 text-orange-600" />}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <p className="font-medium">{notification.title}</p>
                                            {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                                        </div>
                                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                                        <p className="text-xs text-muted-foreground">{notification.time}</p>
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
