"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Progress } from "@/components/ui/progress"
import {
    Users,
    GraduationCap,
    Calendar,
    FileText,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    BarChart3,
    PieChart,
    Activity,
    Clock,
} from "lucide-react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart as RechartsPieChart,
    Cell,
    LineChart,
    Line,
    Pie,
} from "recharts"

export default function AdminDashboard() {
    // Datos de ejemplo para gráficos
    const attendanceData = [
        { name: "Lun", asistencia: 95 },
        { name: "Mar", asistencia: 92 },
        { name: "Mié", asistencia: 98 },
        { name: "Jue", asistencia: 89 },
        { name: "Vie", asistencia: 94 },
    ]

    const gradeDistribution = [
        { name: "Excelente (6.0-7.0)", value: 35, color: "#10b981" },
        { name: "Bueno (5.0-5.9)", value: 40, color: "#3b82f6" },
        { name: "Regular (4.0-4.9)", value: 20, color: "#f59e0b" },
        { name: "Insuficiente (1.0-3.9)", value: 5, color: "#ef4444" },
    ]

    const monthlyTrends = [
        { month: "Ago", promedio: 5.8, asistencia: 92 },
        { month: "Sep", promedio: 6.1, asistencia: 94 },
        { month: "Oct", promedio: 6.0, asistencia: 91 },
        { month: "Nov", promedio: 6.2, asistencia: 95 },
    ]

    const observationsData = [
        { tipo: "Positivas", cantidad: 145, color: "#10b981" },
        { tipo: "Neutrales", cantidad: 89, color: "#3b82f6" },
        { tipo: "Mejora", cantidad: 34, color: "#f59e0b" },
    ]

    const stats = [
        {
            title: "Total Estudiantes",
            value: "847",
            change: "+12 este mes",
            icon: Users,
            color: "text-blue-600",
            trend: "up",
        },
        {
            title: "Total Profesores",
            value: "45",
            change: "+2 este mes",
            icon: GraduationCap,
            color: "text-green-600",
            trend: "up",
        },
        {
            title: "Promedio General",
            value: "6.2",
            change: "+0.1 vs mes anterior",
            icon: BarChart3,
            color: "text-purple-600",
            trend: "up",
        },
        {
            title: "Asistencia Promedio",
            value: "94.2%",
            change: "+1.5% vs mes anterior",
            icon: Calendar,
            color: "text-orange-600",
            trend: "up",
        },
    ]

    const recentActivities = [
        {
            type: "user",
            message: "Nuevo profesor registrado: Dr. Carlos Mendoza",
            time: "Hace 2 horas",
            status: "success",
        },
        {
            type: "alert",
            message: "Conflicto de horario detectado en Aula 205",
            time: "Hace 4 horas",
            status: "warning",
        },
        {
            type: "report",
            message: "Reporte mensual de asistencia generado",
            time: "Hace 6 horas",
            status: "success",
        },
        {
            type: "system",
            message: "Backup automático completado",
            time: "Ayer",
            status: "success",
        },
    ]

    const getTrendIcon = (trend: string) => {
        return trend === "up" ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
        ) : (
            <TrendingDown className="h-4 w-4 text-red-600" />
        )
    }

    const getActivityIcon = (type: string) => {
        switch (type) {
            case "user":
                return <Users className="h-4 w-4 text-blue-600" />
            case "alert":
                return <AlertTriangle className="h-4 w-4 text-yellow-600" />
            case "report":
                return <FileText className="h-4 w-4 text-green-600" />
            case "system":
                return <Activity className="h-4 w-4 text-purple-600" />
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
                        <BreadcrumbItem>
                            <BreadcrumbPage>Dashboard Administrativo</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard Administrativo</h1>
                        <p className="text-muted-foreground">
                            Resumen general del sistema educativo y métricas clave de rendimiento.
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline">
                            <FileText className="mr-2 h-4 w-4" />
                            Generar Reporte
                        </Button>
                        <Button asChild>
                            <a href="/admin/analytics">
                                <BarChart3 className="mr-2 h-4 w-4" />
                                Ver Análisis
                            </a>
                        </Button>
                    </div>
                </div>

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
                                <p className="text-xs text-muted-foreground flex items-center">
                                    {getTrendIcon(stat.trend)}
                                    <span className="ml-1">{stat.change}</span>
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Attendance Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Asistencia Semanal
                            </CardTitle>
                            <CardDescription>Porcentaje de asistencia por día</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={attendanceData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="asistencia" fill="#3b82f6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Grade Distribution */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PieChart className="h-5 w-5" />
                                Distribución de Notas
                            </CardTitle>
                            <CardDescription>Distribución general de calificaciones (escala 1.0-7.0)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <RechartsPieChart>
                                    <Pie
                                        data={gradeDistribution}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, value }) => `${value}%`}
                                    >
                                        {gradeDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </RechartsPieChart>
                            </ResponsiveContainer>
                            <div className="mt-4 grid grid-cols-2 gap-2">
                                {gradeDistribution.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-xs text-muted-foreground">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Monthly Trends */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Tendencias Mensuales
                            </CardTitle>
                            <CardDescription>Evolución de promedio académico y asistencia</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={monthlyTrends}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="promedio" stroke="#10b981" strokeWidth={2} name="Promedio" />
                                    <Line type="monotone" dataKey="asistencia" stroke="#3b82f6" strokeWidth={2} name="Asistencia" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Recent Activities */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5" />
                                Actividad Reciente
                            </CardTitle>
                            <CardDescription>Últimas acciones del sistema</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivities.map((activity, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <div className="flex-shrink-0">{getActivityIcon(activity.type)}</div>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium">{activity.message}</p>
                                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                                        </div>
                                        <Badge
                                            variant={activity.status === "success" ? "default" : "secondary"}
                                            className={
                                                activity.status === "success"
                                                    ? "bg-green-100 text-green-800"
                                                    : activity.status === "warning"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-gray-100 text-gray-800"
                                            }
                                        >
                                            {activity.status === "success" ? "Completado" : activity.status === "warning" ? "Alerta" : "Info"}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Observations Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Resumen de Observaciones
                        </CardTitle>
                        <CardDescription>Distribución de observaciones por tipo este mes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            {observationsData.map((item, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">{item.tipo}</span>
                                        <span className="text-2xl font-bold" style={{ color: item.color }}>
                                            {item.cantidad}
                                        </span>
                                    </div>
                                    <Progress value={(item.cantidad / 268) * 100} className="h-2" />
                                    <p className="text-xs text-muted-foreground">{((item.cantidad / 268) * 100).toFixed(1)}% del total</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
