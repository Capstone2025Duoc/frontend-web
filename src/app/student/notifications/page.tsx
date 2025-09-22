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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Bell,
    Calendar,
    User,
    FileText,
    GraduationCap,
    AlertCircle,
    CheckCircle,
    Clock,
    MessageSquare,
    BookOpen,
    Target,
    Award,
    Trash2,
    BookMarkedIcon as MarkAsUnread,
} from "lucide-react"

export default function StudentNotificationsPage() {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "Nueva tarea de Matemáticas",
            message:
                "Se ha asignado una nueva tarea: 'Ejercicios del capítulo 5 - Ecuaciones Cuadráticas'. Fecha de entrega: Viernes 22 de Noviembre.",
            type: "assignment",
            priority: "medium",
            from: "Prof. María González",
            subject: "Matemáticas",
            date: "2024-11-20",
            time: "14:30",
            read: false,
            actions: ["Ver tarea", "Marcar como completada"],
        },
        {
            id: 2,
            title: "Calificación disponible",
            message:
                "Tu calificación del examen de Historia 'Revolución Industrial' ya está disponible. Calificación obtenida: 9.2/10. ¡Excelente trabajo!",
            type: "grade",
            priority: "normal",
            from: "Prof. Carlos Ruiz",
            subject: "Historia",
            date: "2024-11-20",
            time: "10:15",
            read: false,
            actions: ["Ver calificación", "Ver retroalimentación"],
        },
        {
            id: 3,
            title: "Recordatorio: Laboratorio de Física",
            message:
                "Recuerda traer tu bata de laboratorio para la práctica de mañana sobre 'Ley de Ohm'. La clase será en el Laboratorio de Ciencias.",
            type: "reminder",
            priority: "high",
            from: "Prof. Laura Martín",
            subject: "Física",
            date: "2024-11-19",
            time: "16:45",
            read: true,
            actions: ["Confirmar asistencia"],
        },
        {
            id: 4,
            title: "Felicitaciones por tu desempeño",
            message:
                "¡Felicitaciones! Has sido seleccionada como estudiante destacada del mes en Química por tu excelente desempeño y participación en clase.",
            type: "achievement",
            priority: "normal",
            from: "Prof. Roberto Silva",
            subject: "Química",
            date: "2024-11-19",
            time: "09:20",
            read: true,
            actions: ["Ver certificado"],
        },
        {
            id: 5,
            title: "Cambio de horario",
            message:
                "La clase de Inglés del viernes se ha movido de 14:00-15:30 a 15:00-16:30 debido a una reunión de profesores. Aula: 302.",
            type: "schedule",
            priority: "medium",
            from: "Prof. Ana Torres",
            subject: "Inglés",
            date: "2024-11-18",
            time: "12:00",
            read: true,
            actions: ["Actualizar calendario"],
        },
        {
            id: 6,
            title: "Reunión de padres programada",
            message:
                "Se ha programado una reunión de padres para el martes 26 de noviembre a las 18:00. Tema: Progreso académico del segundo bimestre.",
            type: "meeting",
            priority: "normal",
            from: "Coordinación Académica",
            subject: "General",
            date: "2024-11-18",
            time: "08:30",
            read: true,
            actions: ["Confirmar asistencia", "Ver agenda"],
        },
        {
            id: 7,
            title: "Nuevo material de estudio",
            message:
                "Se ha subido nuevo material de estudio para el tema 'Análisis Literario' en la plataforma. Incluye ejemplos y ejercicios prácticos.",
            type: "material",
            priority: "low",
            from: "Prof. Carmen López",
            subject: "Literatura",
            date: "2024-11-17",
            time: "15:20",
            read: true,
            actions: ["Descargar material"],
        },
        {
            id: 8,
            title: "Invitación a concurso de ciencias",
            message:
                "¡Te invitamos a participar en el Concurso Interescolar de Ciencias! Fecha límite de inscripción: 30 de noviembre. Categoría: Física.",
            type: "event",
            priority: "normal",
            from: "Coordinación de Ciencias",
            subject: "Física",
            date: "2024-11-16",
            time: "11:45",
            read: true,
            actions: ["Inscribirse", "Ver bases"],
        },
    ])

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "assignment":
                return <FileText className="h-5 w-5 text-blue-600" />
            case "grade":
                return <GraduationCap className="h-5 w-5 text-green-600" />
            case "reminder":
                return <AlertCircle className="h-5 w-5 text-orange-600" />
            case "achievement":
                return <Award className="h-5 w-5 text-purple-600" />
            case "schedule":
                return <Calendar className="h-5 w-5 text-indigo-600" />
            case "meeting":
                return <User className="h-5 w-5 text-pink-600" />
            case "material":
                return <BookOpen className="h-5 w-5 text-teal-600" />
            case "event":
                return <Target className="h-5 w-5 text-red-600" />
            default:
                return <Bell className="h-5 w-5 text-gray-600" />
        }
    }

    const getTypeBadge = (type: string) => {
        switch (type) {
            case "assignment":
                return <Badge className="bg-blue-100 text-blue-800">Tarea</Badge>
            case "grade":
                return <Badge className="bg-green-100 text-green-800">Calificación</Badge>
            case "reminder":
                return <Badge className="bg-orange-100 text-orange-800">Recordatorio</Badge>
            case "achievement":
                return <Badge className="bg-purple-100 text-purple-800">Logro</Badge>
            case "schedule":
                return <Badge className="bg-indigo-100 text-indigo-800">Horario</Badge>
            case "meeting":
                return <Badge className="bg-pink-100 text-pink-800">Reunión</Badge>
            case "material":
                return <Badge className="bg-teal-100 text-teal-800">Material</Badge>
            case "event":
                return <Badge className="bg-red-100 text-red-800">Evento</Badge>
            default:
                return <Badge variant="outline">Notificación</Badge>
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
                return null
        }
    }

    const markAsRead = (id: number) => {
        setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
    }

    const markAsUnread = (id: number) => {
        setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: false } : notif)))
    }

    const deleteNotification = (id: number) => {
        setNotifications(notifications.filter((notif) => notif.id !== id))
    }

    const markAllAsRead = () => {
        setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
    }

    const unreadNotifications = notifications.filter((notif) => !notif.read)
    const readNotifications = notifications.filter((notif) => notif.read)

    const getNotificationStats = () => {
        const total = notifications.length
        const unread = unreadNotifications.length
        const highPriority = notifications.filter((notif) => notif.priority === "high" && !notif.read).length
        const assignments = notifications.filter((notif) => notif.type === "assignment" && !notif.read).length

        return { total, unread, highPriority, assignments }
    }

    const stats = getNotificationStats()

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
                            <BreadcrumbPage>Notificaciones</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Notificaciones</h1>
                        <p className="text-muted-foreground">Mantente al día con mensajes y alertas de tus profesores.</p>
                    </div>
                    <Button onClick={markAllAsRead} variant="outline">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Marcar todas como leídas
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total</CardTitle>
                            <Bell className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <p className="text-xs text-muted-foreground">Notificaciones</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sin Leer</CardTitle>
                            <MarkAsUnread className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{stats.unread}</div>
                            <p className="text-xs text-muted-foreground">Pendientes</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Alta Prioridad</CardTitle>
                            <AlertCircle className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{stats.highPriority}</div>
                            <p className="text-xs text-muted-foreground">Urgentes</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tareas Nuevas</CardTitle>
                            <FileText className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.assignments}</div>
                            <p className="text-xs text-muted-foreground">Por revisar</p>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="unread" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="unread">Sin Leer ({unreadNotifications.length})</TabsTrigger>
                        <TabsTrigger value="all">Todas ({notifications.length})</TabsTrigger>
                        <TabsTrigger value="read">Leídas ({readNotifications.length})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="unread" className="space-y-4">
                        {unreadNotifications.length === 0 ? (
                            <Card>
                                <CardContent className="flex flex-col items-center justify-center py-12">
                                    <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">¡Todo al día!</h3>
                                    <p className="text-muted-foreground text-center">No tienes notificaciones sin leer.</p>
                                </CardContent>
                            </Card>
                        ) : (
                            unreadNotifications.map((notification) => (
                                <Card key={notification.id} className="border-l-4 border-l-blue-500 bg-blue-50/50">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-3">
                                                {getTypeIcon(notification.type)}
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <CardTitle className="text-lg">{notification.title}</CardTitle>
                                                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                                    </div>
                                                    <CardDescription className="flex items-center gap-2 flex-wrap">
                                                        <User className="h-3 w-3" />
                                                        <span>{notification.from}</span>
                                                        <span>•</span>
                                                        <span>{notification.subject}</span>
                                                        <span>•</span>
                                                        <Clock className="h-3 w-3" />
                                                        <span>
                                                            {notification.date} - {notification.time}
                                                        </span>
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {getTypeBadge(notification.type)}
                                                {getPriorityBadge(notification.priority)}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <p className="text-muted-foreground">{notification.message}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    {notification.actions.map((action, index) => (
                                                        <Button key={index} variant="outline" size="sm">
                                                            {action}
                                                        </Button>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                                                        <CheckCircle className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </TabsContent>

                    <TabsContent value="all" className="space-y-4">
                        {notifications.map((notification) => (
                            <Card
                                key={notification.id}
                                className={!notification.read ? "border-l-4 border-l-blue-500 bg-blue-50/50" : ""}
                            >
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3">
                                            {getTypeIcon(notification.type)}
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <CardTitle className="text-lg">{notification.title}</CardTitle>
                                                    {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                                                </div>
                                                <CardDescription className="flex items-center gap-2 flex-wrap">
                                                    <User className="h-3 w-3" />
                                                    <span>{notification.from}</span>
                                                    <span>•</span>
                                                    <span>{notification.subject}</span>
                                                    <span>•</span>
                                                    <Clock className="h-3 w-3" />
                                                    <span>
                                                        {notification.date} - {notification.time}
                                                    </span>
                                                </CardDescription>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getTypeBadge(notification.type)}
                                            {getPriorityBadge(notification.priority)}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <p className="text-muted-foreground">{notification.message}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                {notification.actions.map((action, index) => (
                                                    <Button key={index} variant="outline" size="sm">
                                                        {action}
                                                    </Button>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {notification.read ? (
                                                    <Button variant="ghost" size="sm" onClick={() => markAsUnread(notification.id)}>
                                                        <MarkAsUnread className="h-4 w-4" />
                                                    </Button>
                                                ) : (
                                                    <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                                                        <CheckCircle className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </TabsContent>

                    <TabsContent value="read" className="space-y-4">
                        {readNotifications.length === 0 ? (
                            <Card>
                                <CardContent className="flex flex-col items-center justify-center py-12">
                                    <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">No hay notificaciones leídas</h3>
                                    <p className="text-muted-foreground text-center">
                                        Las notificaciones que marques como leídas aparecerán aquí.
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            readNotifications.map((notification) => (
                                <Card key={notification.id}>
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-3">
                                                {getTypeIcon(notification.type)}
                                                <div className="space-y-1">
                                                    <CardTitle className="text-lg">{notification.title}</CardTitle>
                                                    <CardDescription className="flex items-center gap-2 flex-wrap">
                                                        <User className="h-3 w-3" />
                                                        <span>{notification.from}</span>
                                                        <span>•</span>
                                                        <span>{notification.subject}</span>
                                                        <span>•</span>
                                                        <Clock className="h-3 w-3" />
                                                        <span>
                                                            {notification.date} - {notification.time}
                                                        </span>
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {getTypeBadge(notification.type)}
                                                {getPriorityBadge(notification.priority)}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <p className="text-muted-foreground">{notification.message}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    {notification.actions.map((action, index) => (
                                                        <Button key={index} variant="outline" size="sm">
                                                            {action}
                                                        </Button>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="ghost" size="sm" onClick={() => markAsUnread(notification.id)}>
                                                        <MarkAsUnread className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
