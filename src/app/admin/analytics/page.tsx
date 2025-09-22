"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
} from "recharts"
import { TrendingUp, TrendingDown, Users, GraduationCap, Calendar, Download, Target, Award, Clock } from "lucide-react"

// Datos de ejemplo para los análisis
const academicPerformanceData = [
    { subject: "Matemáticas", average: 5.8, students: 120, approved: 85 },
    { subject: "Lenguaje", average: 6.2, students: 120, approved: 92 },
    { subject: "Ciencias", average: 5.5, students: 118, approved: 78 },
    { subject: "Historia", average: 6.0, students: 115, approved: 88 },
    { subject: "Inglés", average: 5.9, students: 120, approved: 83 },
    { subject: "Ed. Física", average: 6.5, students: 120, approved: 98 },
]

const attendanceData = [
    { month: "Ene", attendance: 95, tardiness: 8, absences: 12 },
    { month: "Feb", attendance: 93, tardiness: 12, absences: 15 },
    { month: "Mar", attendance: 96, tardiness: 6, absences: 8 },
    { month: "Abr", attendance: 94, tardiness: 10, absences: 14 },
    { month: "May", attendance: 97, tardiness: 5, absences: 6 },
    { month: "Jun", attendance: 92, tardiness: 15, absences: 18 },
]

const behaviorData = [
    { name: "Positivas", value: 65, color: "#22c55e" },
    { name: "Neutras", value: 25, color: "#eab308" },
    { name: "Negativas", value: 10, color: "#ef4444" },
]

const teacherPerformanceData = [
    { name: "Prof. García", subject: "Matemáticas", satisfaction: 4.8, average: 5.9, students: 30 },
    { name: "Prof. López", subject: "Lenguaje", satisfaction: 4.9, average: 6.2, students: 28 },
    { name: "Prof. Martínez", subject: "Ciencias", satisfaction: 4.6, average: 5.5, students: 32 },
    { name: "Prof. Rodríguez", subject: "Historia", satisfaction: 4.7, average: 6.0, students: 29 },
    { name: "Prof. Silva", subject: "Inglés", satisfaction: 4.5, average: 5.9, students: 31 },
]

const trimesterEvolution = [
    { period: "T1 2023", math: 5.6, language: 6.0, science: 5.3, history: 5.8 },
    { period: "T2 2023", math: 5.7, language: 6.1, science: 5.4, history: 5.9 },
    { period: "T3 2023", math: 5.8, language: 6.2, science: 5.5, history: 6.0 },
]

export default function AnalyticsPage() {
    const [selectedPeriod, setSelectedPeriod] = useState("trimestral")

    const kpis = [
        {
            title: "Tasa de Aprobación",
            value: "87.5%",
            change: "+2.3%",
            trend: "up",
            target: "85%",
            status: "achieved",
        },
        {
            title: "Retención Estudiantil",
            value: "94.2%",
            change: "+1.1%",
            trend: "up",
            target: "95%",
            status: "near",
        },
        {
            title: "Satisfacción Docente",
            value: "4.7/5",
            change: "+0.2",
            trend: "up",
            target: "4.5/5",
            status: "achieved",
        },
        {
            title: "Promedio Institucional",
            value: "5.9",
            change: "+0.1",
            trend: "up",
            target: "6.0",
            status: "near",
        },
    ]

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div className="flex items-center space-x-2">
                    <SidebarTrigger />
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Análisis y Métricas</h2>
                        <p className="text-muted-foreground">Panel de análisis integral del rendimiento institucional</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Seleccionar período" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="semanal">Semanal</SelectItem>
                            <SelectItem value="mensual">Mensual</SelectItem>
                            <SelectItem value="trimestral">Trimestral</SelectItem>
                            <SelectItem value="anual">Anual</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Exportar
                    </Button>
                </div>
            </div>

            {/* KPIs Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {kpis.map((kpi, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                            {kpi.trend === "up" ? (
                                <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : (
                                <TrendingDown className="h-4 w-4 text-red-600" />
                            )}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kpi.value}</div>
                            <div className="flex items-center justify-between mt-2">
                                <p className={`text-xs ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                                    {kpi.change} vs período anterior
                                </p>
                                <Badge variant={kpi.status === "achieved" ? "default" : "secondary"}>Meta: {kpi.target}</Badge>
                            </div>
                            <Progress value={kpi.status === "achieved" ? 100 : 85} className="mt-2" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Análisis Detallado */}
            <Tabs defaultValue="academic" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="academic">
                        <GraduationCap className="mr-2 h-4 w-4" />
                        Rendimiento Académico
                    </TabsTrigger>
                    <TabsTrigger value="attendance">
                        <Calendar className="mr-2 h-4 w-4" />
                        Asistencia
                    </TabsTrigger>
                    <TabsTrigger value="behavior">
                        <Award className="mr-2 h-4 w-4" />
                        Comportamiento
                    </TabsTrigger>
                    <TabsTrigger value="teachers">
                        <Users className="mr-2 h-4 w-4" />
                        Profesores
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="academic" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Promedio por Materia</CardTitle>
                                <CardDescription>Rendimiento académico por asignatura</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={academicPerformanceData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="subject" />
                                        <YAxis domain={[1, 7]} />
                                        <Tooltip />
                                        <Bar dataKey="average" fill="#3b82f6" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Evolución Trimestral</CardTitle>
                                <CardDescription>Tendencia de rendimiento por período</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={trimesterEvolution}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="period" />
                                        <YAxis domain={[5, 7]} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="math" stroke="#ef4444" name="Matemáticas" />
                                        <Line type="monotone" dataKey="language" stroke="#22c55e" name="Lenguaje" />
                                        <Line type="monotone" dataKey="science" stroke="#3b82f6" name="Ciencias" />
                                        <Line type="monotone" dataKey="history" stroke="#f59e0b" name="Historia" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Comparación entre Cursos</CardTitle>
                            <CardDescription>Análisis detallado por materia y curso</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {academicPerformanceData.map((subject, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <GraduationCap className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">{subject.subject}</h4>
                                                <p className="text-sm text-muted-foreground">{subject.students} estudiantes</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold">{subject.average}</div>
                                            <Badge variant={subject.approved >= 85 ? "default" : "secondary"}>
                                                {subject.approved}% aprobación
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="attendance" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Tendencia de Asistencia</CardTitle>
                                <CardDescription>Evolución mensual de la asistencia</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart data={attendanceData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="attendance" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Estadísticas de Asistencia</CardTitle>
                                <CardDescription>Métricas detalladas del período actual</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Asistencia Promedio</span>
                                        <span className="font-semibold">94.5%</span>
                                    </div>
                                    <Progress value={94.5} className="h-2" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Tardanzas</span>
                                        <span className="font-semibold">9.3%</span>
                                    </div>
                                    <Progress value={9.3} className="h-2" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Ausencias Justificadas</span>
                                        <span className="font-semibold">3.2%</span>
                                    </div>
                                    <Progress value={3.2} className="h-2" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Ausencias Injustificadas</span>
                                        <span className="font-semibold">2.0%</span>
                                    </div>
                                    <Progress value={2.0} className="h-2" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="behavior" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Distribución de Observaciones</CardTitle>
                                <CardDescription>Clasificación del comportamiento estudiantil</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={behaviorData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {behaviorData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Indicadores de Disciplina</CardTitle>
                                <CardDescription>Métricas de convivencia escolar</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Award className="h-5 w-5 text-green-600" />
                                        <span>Reconocimientos</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-green-600">156</div>
                                        <p className="text-xs text-muted-foreground">Este mes</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Clock className="h-5 w-5 text-yellow-600" />
                                        <span>Amonestaciones</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-yellow-600">23</div>
                                        <p className="text-xs text-muted-foreground">Este mes</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Target className="h-5 w-5 text-red-600" />
                                        <span>Suspensiones</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-red-600">3</div>
                                        <p className="text-xs text-muted-foreground">Este mes</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="teachers" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Rendimiento Docente</CardTitle>
                            <CardDescription>Evaluación y métricas por profesor</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {teacherPerformanceData.map((teacher, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                                <Users className="h-6 w-6 text-purple-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">{teacher.name}</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {teacher.subject} • {teacher.students} estudiantes
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="text-center">
                                                <div className="text-lg font-bold">{teacher.satisfaction}</div>
                                                <p className="text-xs text-muted-foreground">Satisfacción</p>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-lg font-bold">{teacher.average}</div>
                                                <p className="text-xs text-muted-foreground">Promedio</p>
                                            </div>
                                            <Badge
                                                variant={
                                                    teacher.satisfaction >= 4.7
                                                        ? "default"
                                                        : teacher.satisfaction >= 4.5
                                                            ? "secondary"
                                                            : "destructive"
                                                }
                                            >
                                                {teacher.satisfaction >= 4.7 ? "Excelente" : teacher.satisfaction >= 4.5 ? "Bueno" : "Regular"}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
