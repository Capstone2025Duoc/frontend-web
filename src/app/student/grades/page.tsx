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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { GraduationCap, TrendingUp, Calendar, FileText, Award, Target, BookOpen } from "lucide-react"
import { useData } from "@/contexts/data-context"
import { useAuth } from "@/components/auth-provider"
import type { JSX } from "react"

export default function StudentGradesPage() {
    const [selectedSubject, setSelectedSubject] = useState<string>("all")

    const { grades: allGrades, evaluations: allEvaluations } = useData()
    const { user: currentUser } = useAuth()

    // Get grades for current student
    const grades = allGrades.filter((grade) => grade.studentId === currentUser?.id)

    // Get evaluations with grades for this student
    const gradesWithEvaluations = grades
        .map((grade) => {
            const evaluation = allEvaluations.find((e) => e.id === grade.evaluationId)
            return {
                ...grade,
                evaluation,
            }
        })
        .filter((item) => item.evaluation) // Only include grades that have evaluations

    const subjects = [
        { value: "all", label: "Todas las materias" },
        { value: "Matemáticas", label: "Matemáticas" },
        { value: "Historia", label: "Historia" },
        { value: "Física", label: "Física" },
        { value: "Inglés", label: "Inglés" },
        { value: "Química", label: "Química" },
        { value: "Literatura", label: "Literatura" },
    ]

    const filteredGrades =
        selectedSubject === "all"
            ? gradesWithEvaluations
            : gradesWithEvaluations.filter((item) => item.evaluation?.subject === selectedSubject)

    const calculateSubjectAverage = (subject: string) => {
        const subjectGrades = gradesWithEvaluations.filter((item) => item.evaluation?.subject === subject)
        if (subjectGrades.length === 0) return 0

        const weightedSum = subjectGrades.reduce((sum, item) => sum + item.grade * (item.evaluation?.weight || 0), 0)
        const totalWeight = subjectGrades.reduce((sum, item) => sum + (item.evaluation?.weight || 0), 0)
        return totalWeight > 0 ? weightedSum / totalWeight : 0
    }

    const getSubjectColor = (subject: string) => {
        const colors: { [key: string]: string } = {
            Matemáticas: "bg-blue-500",
            Historia: "bg-green-500",
            Física: "bg-purple-500",
            Inglés: "bg-orange-500",
            Química: "bg-red-500",
            Literatura: "bg-pink-500",
        }
        return colors[subject] || "bg-gray-500"
    }

    const getGradeColor = (grade: number) => {
        if (grade >= 6.0) {
            return "text-green-500"
        } else if (grade >= 4.0) {
            return "text-yellow-500"
        } else {
            return "text-red-500"
        }
    }

    const getGradeBadgeColor = (grade: number) => {
        if (grade >= 6.0) {
            return "bg-green-100 text-green-800"
        } else if (grade >= 4.0) {
            return "bg-yellow-100 text-yellow-800"
        } else {
            return "bg-red-100 text-red-800"
        }
    }

    const getTypeIcon = (type: string) => {
        const icons: { [key: string]: JSX.Element } = {
            Parcial: <FileText className="h-4 w-4" />,
            Final: <BookOpen className="h-4 w-4" />,
            Quiz: <FileText className="h-4 w-4" />,
            Tarea: <FileText className="h-4 w-4" />,
            Proyecto: <FileText className="h-4 w-4" />,
            Laboratorio: <FileText className="h-4 w-4" />,
            Oral: <FileText className="h-4 w-4" />,
            Ensayo: <FileText className="h-4 w-4" />,
            Complementaria: <FileText className="h-4 w-4" />,
        }
        return icons[type] || <FileText className="h-4 w-4" />
    }

    const studentSubjects = [...new Set(gradesWithEvaluations.map((item) => item.evaluation?.subject).filter(Boolean))]
    const subjectAverages = studentSubjects.map((subject) => ({
        subject: subject!,
        average: calculateSubjectAverage(subject!),
        color: getSubjectColor(subject!),
    }))

    const overallAverage =
        subjectAverages.length > 0
            ? subjectAverages.reduce((sum, subject) => sum + subject.average, 0) / subjectAverages.length
            : 0

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
                            <BreadcrumbPage>Mis Notas</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Mis Calificaciones</h1>
                        <p className="text-muted-foreground">Consulta todas tus notas y seguimiento académico.</p>
                    </div>
                </div>

                {/* Overall Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Promedio General</CardTitle>
                            <GraduationCap className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{overallAverage.toFixed(1)}</div>
                            <p className="text-xs text-muted-foreground">
                                <TrendingUp className="inline h-3 w-3 mr-1" />
                                Escala 1.0 - 7.0
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Mejor Materia</CardTitle>
                            <Award className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {subjectAverages.length > 0
                                    ? subjectAverages
                                        .reduce((best, current) => (current.average > best.average ? current : best))
                                        .average.toFixed(1)
                                    : "-"}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {subjectAverages.length > 0
                                    ? subjectAverages.reduce((best, current) => (current.average > best.average ? current : best)).subject
                                    : "Sin datos"}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Evaluaciones</CardTitle>
                            <FileText className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-600">{grades.length}</div>
                            <p className="text-xs text-muted-foreground">Total calificadas</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Meta Semestral</CardTitle>
                            <Target className="h-4 w-4 text-orange-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">6.5</div>
                            <Progress value={overallAverage > 0 ? (overallAverage / 6.5) * 100 : 0} className="mt-2" />
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="all" className="space-y-6">
                    <div className="flex items-center justify-between">
                        <TabsList>
                            <TabsTrigger value="all">Todas las Notas</TabsTrigger>
                            <TabsTrigger value="subjects">Por Materia</TabsTrigger>
                        </TabsList>
                        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Filtrar por materia" />
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

                    <TabsContent value="all" className="space-y-6">
                        <div className="grid gap-4">
                            {filteredGrades.map((item) => (
                                <Card key={item.id}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                {getTypeIcon(item.evaluation?.type || "")}
                                                <div>
                                                    <CardTitle className="text-lg">{item.evaluation?.title}</CardTitle>
                                                    <CardDescription className="flex items-center gap-2">
                                                        <span>{item.evaluation?.subject}</span>
                                                        <span>•</span>
                                                        <span>{item.evaluation?.teacherName}</span>
                                                        <span>•</span>
                                                        <Calendar className="h-3 w-3" />
                                                        <span>{item.submittedDate}</span>
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className={`text-3xl font-bold ${getGradeColor(item.grade)}`}>{item.grade}</div>
                                                <div className="text-sm text-muted-foreground">de {item.evaluation?.maxGrade}</div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <Badge className={getGradeBadgeColor(item.grade)}>{item.evaluation?.type}</Badge>
                                                <span className="text-sm text-muted-foreground">Peso: {item.evaluation?.weight}%</span>
                                            </div>
                                            <div className="p-3 bg-muted rounded-lg">
                                                <p className="text-sm font-medium mb-1">Retroalimentación:</p>
                                                <p className="text-sm text-muted-foreground">{item.feedback}</p>
                                            </div>
                                            <Progress value={(item.grade / 7.0) * 100} className="h-2" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            {filteredGrades.length === 0 && (
                                <Card>
                                    <CardContent className="flex items-center justify-center py-8">
                                        <div className="text-center">
                                            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                            <h3 className="text-lg font-medium text-muted-foreground">No hay calificaciones</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {selectedSubject === "all"
                                                    ? "Aún no tienes calificaciones registradas."
                                                    : `No tienes calificaciones en ${selectedSubject}.`}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="subjects" className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            {subjectAverages.map((subject) => (
                                <Card key={subject.subject}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="flex items-center gap-2">
                                                <div className={`w-3 h-3 rounded-full ${subject.color}`} />
                                                {subject.subject}
                                            </CardTitle>
                                            <div className={`text-2xl font-bold ${getGradeColor(subject.average)}`}>
                                                {subject.average.toFixed(1)}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <Progress value={(subject.average / 7.0) * 100} className="h-2" />
                                            <div className="space-y-2">
                                                {gradesWithEvaluations
                                                    .filter((item) => item.evaluation?.subject === subject.subject)
                                                    .slice(0, 3)
                                                    .map((item) => (
                                                        <div key={item.id} className="flex items-center justify-between text-sm">
                                                            <span className="text-muted-foreground">{item.evaluation?.title}</span>
                                                            <span className={`font-medium ${getGradeColor(item.grade)}`}>{item.grade}</span>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            {subjectAverages.length === 0 && (
                                <Card className="md:col-span-2">
                                    <CardContent className="flex items-center justify-center py-8">
                                        <div className="text-center">
                                            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                            <h3 className="text-lg font-medium text-muted-foreground">No hay materias</h3>
                                            <p className="text-sm text-muted-foreground">Aún no tienes calificaciones en ninguna materia.</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
