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
import { Calendar, Clock, MapPin, User, ChevronLeft, ChevronRight } from "lucide-react"

export default function StudentSchedulePage() {
    const [currentWeek, setCurrentWeek] = useState(0)

    const subjects = {
        Matemáticas: { color: "bg-blue-500", textColor: "text-blue-700", bgColor: "bg-blue-50" },
        Historia: { color: "bg-green-500", textColor: "text-green-700", bgColor: "bg-green-50" },
        Física: { color: "bg-purple-500", textColor: "text-purple-700", bgColor: "bg-purple-50" },
        Inglés: { color: "bg-orange-500", textColor: "text-orange-700", bgColor: "bg-orange-50" },
        Química: { color: "bg-red-500", textColor: "text-red-700", bgColor: "bg-red-50" },
        Literatura: { color: "bg-pink-500", textColor: "text-pink-700", bgColor: "bg-pink-50" },
        "Educación Física": { color: "bg-yellow-500", textColor: "text-yellow-700", bgColor: "bg-yellow-50" },
    }

    const weeklySchedule = {
        Lunes: [
            { time: "08:00-09:30", subject: "Matemáticas", teacher: "Prof. María González", room: "Aula 201" },
            { time: "09:45-11:15", subject: "Historia", teacher: "Prof. Carlos Ruiz", room: "Aula 105" },
            { time: "11:30-13:00", subject: "Física", teacher: "Prof. Laura Martín", room: "Lab. Ciencias" },
            { time: "14:00-15:30", subject: "Inglés", teacher: "Prof. Ana Torres", room: "Aula 302" },
        ],
        Martes: [
            { time: "08:00-09:30", subject: "Química", teacher: "Prof. Roberto Silva", room: "Lab. Química" },
            { time: "09:45-11:15", subject: "Literatura", teacher: "Prof. Carmen López", room: "Aula 203" },
            { time: "11:30-13:00", subject: "Matemáticas", teacher: "Prof. María González", room: "Aula 201" },
            { time: "14:00-15:30", subject: "Educación Física", teacher: "Prof. Diego Morales", room: "Gimnasio" },
        ],
        Miércoles: [
            { time: "08:00-09:30", subject: "Inglés", teacher: "Prof. Ana Torres", room: "Aula 302" },
            { time: "09:45-11:15", subject: "Física", teacher: "Prof. Laura Martín", room: "Lab. Ciencias" },
            { time: "11:30-13:00", subject: "Historia", teacher: "Prof. Carlos Ruiz", room: "Aula 105" },
            { time: "14:00-15:30", subject: "Química", teacher: "Prof. Roberto Silva", room: "Lab. Química" },
        ],
        Jueves: [
            { time: "08:00-09:30", subject: "Literatura", teacher: "Prof. Carmen López", room: "Aula 203" },
            { time: "09:45-11:15", subject: "Matemáticas", teacher: "Prof. María González", room: "Aula 201" },
            { time: "11:30-13:00", subject: "Inglés", teacher: "Prof. Ana Torres", room: "Aula 302" },
            { time: "14:00-15:30", subject: "Física", teacher: "Prof. Laura Martín", room: "Lab. Ciencias" },
        ],
        Viernes: [
            { time: "08:00-09:30", subject: "Historia", teacher: "Prof. Carlos Ruiz", room: "Aula 105" },
            { time: "09:45-11:15", subject: "Educación Física", teacher: "Prof. Diego Morales", room: "Gimnasio" },
            { time: "11:30-13:00", subject: "Literatura", teacher: "Prof. Carmen López", room: "Aula 203" },
            { time: "14:00-15:30", subject: "Matemáticas", teacher: "Prof. María González", room: "Aula 201" },
        ],
    }

    const todaySchedule = weeklySchedule["Lunes"] // Simulamos que hoy es lunes

    const getWeekDates = (weekOffset: number) => {
        const today = new Date()
        const monday = new Date(today)
        monday.setDate(today.getDate() - today.getDay() + 1 + weekOffset * 7)

        const dates = []
        for (let i = 0; i < 5; i++) {
            const date = new Date(monday)
            date.setDate(monday.getDate() + i)
            dates.push(date)
        }
        return dates
    }

    const weekDates = getWeekDates(currentWeek)
    const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

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
                            <BreadcrumbPage>Horarios</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Mi Horario</h1>
                        <p className="text-muted-foreground">Consulta tu horario de clases por día, semana o mes.</p>
                    </div>
                </div>

                <Tabs defaultValue="today" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="today">Hoy</TabsTrigger>
                        <TabsTrigger value="week">Semana</TabsTrigger>
                        <TabsTrigger value="month">Mes</TabsTrigger>
                    </TabsList>

                    {/* Today View */}
                    <TabsContent value="today" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Clases de Hoy - Lunes
                                </CardTitle>
                                <CardDescription>
                                    {new Date().toLocaleDateString("es-ES", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {todaySchedule.map((classItem, index) => {
                                        const subjectInfo = subjects[classItem.subject as keyof typeof subjects]
                                        return (
                                            <div
                                                key={index}
                                                className={`p-4 rounded-lg border-l-4 ${subjectInfo.bgColor}`}
                                                style={{ borderLeftColor: subjectInfo.color.replace("bg-", "") }}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className={`font-semibold ${subjectInfo.textColor}`}>{classItem.subject}</h3>
                                                    <Badge variant="outline" className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {classItem.time}
                                                    </Badge>
                                                </div>
                                                <div className="space-y-1 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4" />
                                                        {classItem.teacher}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="h-4 w-4" />
                                                        {classItem.room}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Week View */}
                    <TabsContent value="week" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            <Calendar className="h-5 w-5" />
                                            Horario Semanal
                                        </CardTitle>
                                        <CardDescription>
                                            Semana del {weekDates[0].toLocaleDateString("es-ES")} al{" "}
                                            {weekDates[4].toLocaleDateString("es-ES")}
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" onClick={() => setCurrentWeek(currentWeek - 1)}>
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => setCurrentWeek(currentWeek + 1)}>
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                    {weekDays.map((day, dayIndex) => (
                                        <div key={day} className="space-y-2">
                                            <div className="text-center p-2 bg-muted rounded-lg">
                                                <h3 className="font-semibold">{day}</h3>
                                                <p className="text-sm text-muted-foreground">{weekDates[dayIndex].getDate()}</p>
                                            </div>
                                            <div className="space-y-2">
                                                {weeklySchedule[day as keyof typeof weeklySchedule].map((classItem, index) => {
                                                    const subjectInfo = subjects[classItem.subject as keyof typeof subjects]
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={`p-2 rounded text-xs ${subjectInfo.bgColor} border-l-2`}
                                                            style={{ borderLeftColor: subjectInfo.color.replace("bg-", "") }}
                                                        >
                                                            <div className={`font-medium ${subjectInfo.textColor}`}>{classItem.subject}</div>
                                                            <div className="text-muted-foreground">{classItem.time}</div>
                                                            <div className="text-muted-foreground">{classItem.room}</div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Month View */}
                    <TabsContent value="month" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Vista Mensual
                                </CardTitle>
                                <CardDescription>Resumen de materias por mes</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {Object.entries(subjects).map(([subject, info]) => {
                                        // Calcular horas semanales (simulado)
                                        const weeklyHours =
                                            Object.values(weeklySchedule)
                                                .flat()
                                                .filter((classItem) => classItem.subject === subject).length * 1.5 // 1.5 horas por clase

                                        const monthlyHours = weeklyHours * 4 // 4 semanas por mes

                                        return (
                                            <Card
                                                key={subject}
                                                className={`${info.bgColor} border-l-4`}
                                                style={{ borderLeftColor: info.color.replace("bg-", "") }}
                                            >
                                                <CardHeader className="pb-2">
                                                    <CardTitle className={`text-lg ${info.textColor}`}>{subject}</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between text-sm">
                                                            <span>Horas semanales:</span>
                                                            <span className="font-medium">{weeklyHours}h</span>
                                                        </div>
                                                        <div className="flex justify-between text-sm">
                                                            <span>Horas mensuales:</span>
                                                            <span className="font-medium">{monthlyHours}h</span>
                                                        </div>
                                                        <div className="flex justify-between text-sm">
                                                            <span>Clases por semana:</span>
                                                            <span className="font-medium">
                                                                {
                                                                    Object.values(weeklySchedule)
                                                                        .flat()
                                                                        .filter((classItem) => classItem.subject === subject).length
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
