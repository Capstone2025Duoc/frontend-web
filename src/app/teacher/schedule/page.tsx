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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Users, Filter, Download, Plus, ChevronLeft, ChevronRight } from "lucide-react"

export default function SchedulePage() {
    const [currentWeek, setCurrentWeek] = useState(new Date())
    const [viewMode, setViewMode] = useState("week")

    const scheduleData = [
        {
            id: 1,
            subject: "Matemáticas",
            grade: "3° A",
            time: "08:00 - 09:30",
            room: "Aula 205",
            day: "Lunes",
            students: 28,
            color: "bg-blue-100 border-blue-300 text-blue-800",
        },
        {
            id: 2,
            subject: "Álgebra",
            grade: "4° B",
            time: "10:00 - 11:30",
            room: "Aula 301",
            day: "Lunes",
            students: 25,
            color: "bg-green-100 border-green-300 text-green-800",
        },
        {
            id: 3,
            subject: "Geometría",
            grade: "2° C",
            time: "14:00 - 15:30",
            room: "Aula 102",
            day: "Lunes",
            students: 30,
            color: "bg-purple-100 border-purple-300 text-purple-800",
        },
        {
            id: 4,
            subject: "Matemáticas",
            grade: "3° A",
            time: "09:00 - 10:30",
            room: "Aula 205",
            day: "Martes",
            students: 28,
            color: "bg-blue-100 border-blue-300 text-blue-800",
        },
        {
            id: 5,
            subject: "Álgebra",
            grade: "4° B",
            time: "11:00 - 12:30",
            room: "Aula 301",
            day: "Martes",
            students: 25,
            color: "bg-green-100 border-green-300 text-green-800",
        },
        {
            id: 6,
            subject: "Matemáticas",
            grade: "3° A",
            time: "08:00 - 09:30",
            room: "Aula 205",
            day: "Miércoles",
            students: 28,
            color: "bg-blue-100 border-blue-300 text-blue-800",
        },
        {
            id: 7,
            subject: "Geometría",
            grade: "2° C",
            time: "13:00 - 14:30",
            room: "Aula 102",
            day: "Miércoles",
            students: 30,
            color: "bg-purple-100 border-purple-300 text-purple-800",
        },
        {
            id: 8,
            subject: "Álgebra",
            grade: "4° B",
            time: "10:00 - 11:30",
            room: "Aula 301",
            day: "Jueves",
            students: 25,
            color: "bg-green-100 border-green-300 text-green-800",
        },
        {
            id: 9,
            subject: "Matemáticas",
            grade: "3° A",
            time: "15:00 - 16:30",
            room: "Aula 205",
            day: "Jueves",
            students: 28,
            color: "bg-blue-100 border-blue-300 text-blue-800",
        },
        {
            id: 10,
            subject: "Geometría",
            grade: "2° C",
            time: "09:00 - 10:30",
            room: "Aula 102",
            day: "Viernes",
            students: 30,
            color: "bg-purple-100 border-purple-300 text-purple-800",
        },
    ]

    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]
    const timeSlots = [
        "08:00 - 09:30",
        "10:00 - 11:30",
        "11:00 - 12:30",
        "13:00 - 14:30",
        "14:00 - 15:30",
        "15:00 - 16:30",
    ]

    const getClassesForDay = (day: string) => {
        return scheduleData.filter((item) => item.day === day)
    }

    const getClassesForTimeSlot = (day: string, timeSlot: string) => {
        return scheduleData.filter((item) => item.day === day && item.time === timeSlot)
    }

    const WeekView = () => (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h3 className="text-lg font-semibold">Semana del 18 - 22 de Noviembre, 2024</h3>
                    <Button variant="outline" size="sm">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
                <Button variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Hoy
                </Button>
            </div>

            <div className="grid grid-cols-6 gap-4">
                <div className="space-y-2">
                    <div className="h-12 flex items-center justify-center font-medium text-sm">Horario</div>
                    {timeSlots.map((slot, index) => (
                        <div key={index} className="h-20 flex items-center justify-center text-xs text-muted-foreground border-r">
                            {slot}
                        </div>
                    ))}
                </div>

                {days.map((day) => (
                    <div key={day} className="space-y-2">
                        <div className="h-12 flex items-center justify-center font-medium text-sm bg-muted rounded-lg">{day}</div>
                        {timeSlots.map((slot, slotIndex) => {
                            const classes = getClassesForTimeSlot(day, slot)
                            return (
                                <div key={slotIndex} className="h-20 border rounded-lg p-2">
                                    {classes.map((classItem) => (
                                        <div
                                            key={classItem.id}
                                            className={`${classItem.color} p-2 rounded border-l-4 h-full flex flex-col justify-between`}
                                        >
                                            <div>
                                                <p className="font-medium text-xs">{classItem.subject}</p>
                                                <p className="text-xs opacity-80">{classItem.grade}</p>
                                            </div>
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="flex items-center">
                                                    <MapPin className="h-3 w-3 mr-1" />
                                                    {classItem.room}
                                                </span>
                                                <span className="flex items-center">
                                                    <Users className="h-3 w-3 mr-1" />
                                                    {classItem.students}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )

    const ListView = () => (
        <div className="space-y-4">
            {days.map((day) => {
                const dayClasses = getClassesForDay(day)
                return (
                    <Card key={day}>
                        <CardHeader>
                            <CardTitle className="text-lg">{day}</CardTitle>
                            <CardDescription>{dayClasses.length} clases programadas</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {dayClasses.map((classItem) => (
                                    <div key={classItem.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center space-x-4">
                                            <div className={`w-4 h-4 rounded ${classItem.color.split(" ")[0]}`} />
                                            <div>
                                                <p className="font-medium">{classItem.subject}</p>
                                                <p className="text-sm text-muted-foreground">{classItem.grade}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {classItem.time}
                                            </div>
                                            <div className="flex items-center">
                                                <MapPin className="h-4 w-4 mr-1" />
                                                {classItem.room}
                                            </div>
                                            <div className="flex items-center">
                                                <Users className="h-4 w-4 mr-1" />
                                                {classItem.students} estudiantes
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )

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
                            <BreadcrumbPage>Horarios</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Gestión de Horarios</h1>
                        <p className="text-muted-foreground">Visualiza y gestiona tus horarios de clases de forma organizada.</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" />
                            Filtros
                        </Button>
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Exportar
                        </Button>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nueva Clase
                        </Button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Clases</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">24</div>
                            <p className="text-xs text-muted-foreground">Esta semana</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Horas Semanales</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">36</div>
                            <p className="text-xs text-muted-foreground">Horas académicas</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Cursos Activos</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-muted-foreground">Diferentes cursos</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Aulas Utilizadas</CardTitle>
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-muted-foreground">Diferentes aulas</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Schedule Views */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Horario de Clases</CardTitle>
                                <CardDescription>Visualiza tu horario en formato calendario o lista</CardDescription>
                            </div>
                            <Select value={viewMode} onValueChange={setViewMode}>
                                <SelectTrigger className="w-40">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="week">Vista Semanal</SelectItem>
                                    <SelectItem value="list">Vista Lista</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent>{viewMode === "week" ? <WeekView /> : <ListView />}</CardContent>
                </Card>
            </div>
        </div>
    )
}
