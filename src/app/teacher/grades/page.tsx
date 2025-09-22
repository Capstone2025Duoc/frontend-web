"use client"

import type React from "react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useData } from "@/contexts/data-context"
import { useAuth } from "@/components/auth-provider"
import { Plus, Edit, Download, Filter, TrendingUp, TrendingDown, Minus, History, Eye, BookOpen } from "lucide-react"

export default function GradesPage() {
    const { evaluations, grades, addEvaluation, addGrade, updateGrade, users } = useData()
    const { user: currentUser } = useAuth()
    const { toast } = useToast()
    const [selectedCourse, setSelectedCourse] = useState<string>("3° A")
    const [selectedSubject, setSelectedSubject] = useState<string>("all")
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [isEvaluationDialogOpen, setIsEvaluationDialogOpen] = useState(false)
    const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false)
    const [selectedEvaluation, setSelectedEvaluation] = useState<number | null>(null)

    // Form state for new evaluation
    const [evaluationForm, setEvaluationForm] = useState({
        title: "",
        type: "Parcial" as const,
        subject: "Matemáticas",
        course: "3° A",
        weight: "",
        description: "",
        dueDate: "",
    })

    // Form state for new grade
    const [gradeForm, setGradeForm] = useState({
        studentId: "",
        grade: "",
        feedback: "",
    })

    const courses = [
        { value: "3° A", label: "3° A" },
        { value: "4° B", label: "4° B" },
        { value: "2° C", label: "2° C" },
    ]

    const subjects = [
        { value: "all", label: "Todas las materias" },
        { value: "Matemáticas", label: "Matemáticas" },
        { value: "Álgebra", label: "Álgebra" },
        { value: "Historia", label: "Historia" },
        { value: "Física", label: "Física" },
        { value: "Química", label: "Química" },
        { value: "Inglés", label: "Inglés" },
        { value: "Literatura", label: "Literatura" },
    ]

    // Get students for the selected course
    const students = users.filter((user) => user.role === "estudiante" && user.grade === selectedCourse)

    // Get evaluations for current teacher and selected course/subject
    const teacherEvaluations = evaluations.filter((evaluation) => {
        const matchesTeacher = evaluation.teacherId === currentUser?.id
        const matchesCourse = evaluation.course === selectedCourse
        const matchesSubject = selectedSubject === "all" || evaluation.subject === selectedSubject
        return matchesTeacher && matchesCourse && matchesSubject
    })

    // Function to normalize grades (convert 51 to 5.1, etc.)
    const normalizeGrade = (value: string): number => {
        const num = Number.parseFloat(value)
        if (isNaN(num)) return 1.0

        // If greater than 7, divide by 10 until in range
        if (num > 7) {
            let normalized = num
            while (normalized > 7) {
                normalized = normalized / 10
            }
            return Math.max(1.0, Math.min(7.0, normalized))
        }

        return Math.max(1.0, Math.min(7.0, num))
    }

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case "up":
                return <TrendingUp className="h-4 w-4 text-green-600" />
            case "down":
                return <TrendingDown className="h-4 w-4 text-red-600" />
            default:
                return <Minus className="h-4 w-4 text-gray-600" />
        }
    }

    const getGradeBadge = (grade: number) => {
        if (grade >= 6.0) return <Badge className="bg-green-100 text-green-800">Excelente</Badge>
        if (grade >= 5.0) return <Badge className="bg-blue-100 text-blue-800">Bueno</Badge>
        if (grade >= 4.0) return <Badge className="bg-yellow-100 text-yellow-800">Regular</Badge>
        return <Badge variant="destructive">Insuficiente</Badge>
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "completed":
                return <Badge className="bg-green-100 text-green-800">Completada</Badge>
            case "active":
                return <Badge className="bg-blue-100 text-blue-800">Activa</Badge>
            case "draft":
                return <Badge className="bg-gray-100 text-gray-800">Borrador</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    // Calculate student averages and stats
    const getStudentStats = () => {
        const studentStats = students.map((student) => {
            // Get all grades for this student from teacher's evaluations
            const studentGrades = grades.filter((grade) => {
                const currentEvaluation = evaluations.find((evaluationItem) => evaluationItem.id === grade.evaluationId)
                return (
                    grade.studentId === student.id &&
                    currentEvaluation?.teacherId === currentUser?.id &&
                    currentEvaluation?.course === selectedCourse &&
                    (selectedSubject === "all" || currentEvaluation?.subject === selectedSubject)
                )
            })

            if (studentGrades.length === 0) {
                return {
                    student,
                    grades: [],
                    average: 0,
                    totalGrades: 0,
                    lastGrade: null,
                    trend: "stable",
                }
            }

            // Calculate weighted average
            const gradesWithWeights = studentGrades.map((grade) => {
                const evaluation = evaluations.find((evaluationItem) => evaluationItem.id === grade.evaluationId)
                return {
                    grade: grade.grade,
                    weight: evaluation?.weight || 0,
                }
            })

            const totalWeight = gradesWithWeights.reduce((sum, g) => sum + g.weight, 0)
            const weightedSum = gradesWithWeights.reduce((sum, g) => sum + g.grade * g.weight, 0)
            const average = totalWeight > 0 ? weightedSum / totalWeight : 0

            // Get last grade for trend
            const sortedGrades = studentGrades.sort(
                (a, b) => new Date(b.submittedDate || "").getTime() - new Date(a.submittedDate || "").getTime(),
            )
            const lastGrade = sortedGrades[0]

            // Simple trend calculation (comparing last grade with average)
            let trend = "stable"
            if (lastGrade && studentGrades.length > 1) {
                if (lastGrade.grade > average) trend = "up"
                else if (lastGrade.grade < average) trend = "down"
            }

            return {
                student,
                grades: studentGrades,
                average,
                totalGrades: studentGrades.length,
                lastGrade,
                trend,
            }
        })

        return studentStats
    }

    const studentStats = getStudentStats()

    // Filter students based on search
    const filteredStudentStats = studentStats.filter(
        (stat) =>
            stat.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            stat.student.id.toString().includes(searchTerm),
    )

    const getClassStats = () => {
        const studentsWithGrades = studentStats.filter((stat) => stat.totalGrades > 0)

        if (studentsWithGrades.length === 0) {
            return { classAverage: 0, highest: 0, lowest: 0, passing: 0, total: 0, totalGrades: 0 }
        }

        const averages = studentsWithGrades.map((stat) => stat.average)
        const classAverage = averages.reduce((sum, avg) => sum + avg, 0) / averages.length
        const highest = Math.max(...averages)
        const lowest = Math.min(...averages)
        const passing = averages.filter((avg) => avg >= 4.0).length
        const totalGrades = studentStats.reduce((sum, stat) => sum + stat.totalGrades, 0)

        return { classAverage, highest, lowest, passing, total: studentsWithGrades.length, totalGrades }
    }

    const stats = getClassStats()

    const handleAddEvaluation = (e: React.FormEvent) => {
        e.preventDefault()

        if (!evaluationForm.title || !evaluationForm.weight || !evaluationForm.dueDate) {
            toast({
                title: "Error",
                description: "Todos los campos requeridos deben ser completados.",
                variant: "destructive",
            })
            return
        }

        const newEvaluation = {
            title: evaluationForm.title,
            type: evaluationForm.type,
            subject: evaluationForm.subject,
            course: evaluationForm.course,
            teacherId: currentUser?.id || 1,
            teacherName: currentUser?.name || "Profesor",
            weight: Number.parseInt(evaluationForm.weight),
            maxGrade: 7.0,
            dueDate: evaluationForm.dueDate,
            description: evaluationForm.description,
            status: "active" as const,
            createdDate: new Date().toISOString().split("T")[0],
        }

        addEvaluation(newEvaluation)
        toast({
            title: "Evaluación creada",
            description: "La nueva evaluación ha sido creada exitosamente.",
        })

        // Reset form
        setEvaluationForm({
            title: "",
            type: "Parcial",
            subject: "Matemáticas",
            course: "3° A",
            weight: "",
            description: "",
            dueDate: "",
        })
        setIsEvaluationDialogOpen(false)
    }

    const handleAddGrade = (e: React.FormEvent) => {
        e.preventDefault()

        if (!gradeForm.studentId || !gradeForm.grade || !selectedEvaluation) {
            toast({
                title: "Error",
                description: "Todos los campos son requeridos.",
                variant: "destructive",
            })
            return
        }

        const student = users.find((u) => u.id === Number.parseInt(gradeForm.studentId))
        if (!student) {
            toast({
                title: "Error",
                description: "Estudiante no encontrado.",
                variant: "destructive",
            })
            return
        }

        const normalizedGrade = normalizeGrade(gradeForm.grade)

        const newGrade = {
            evaluationId: selectedEvaluation,
            studentId: Number.parseInt(gradeForm.studentId),
            studentName: student.name,
            grade: normalizedGrade,
            submittedDate: new Date().toISOString().split("T")[0],
            feedback: gradeForm.feedback,
            status: "graded" as const,
        }

        addGrade(newGrade)
        toast({
            title: "Nota agregada",
            description: "La calificación ha sido registrada exitosamente.",
        })

        // Reset form
        setGradeForm({
            studentId: "",
            grade: "",
            feedback: "",
        })
        setIsGradeDialogOpen(false)
        setSelectedEvaluation(null)
    }

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
                            <BreadcrumbPage>Evaluaciones y Notas</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Evaluaciones y Calificaciones</h1>
                        <p className="text-muted-foreground">
                            Gestiona evaluaciones y califica a tus estudiantes (escala 1.0 - 7.0).
                        </p>
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
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filtros</CardTitle>
                        <CardDescription>Selecciona el curso y materia</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="course">Curso</Label>
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
                                <Label htmlFor="subject">Materia</Label>
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
                                <Label htmlFor="search">Buscar Estudiante</Label>
                                <Input
                                    id="search"
                                    placeholder="Nombre o ID del estudiante..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-5">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Promedio Curso</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.classAverage.toFixed(1)}</div>
                            <p className="text-xs text-muted-foreground">Escala 1.0 - 7.0</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Nota Más Alta</CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {stats.highest > 0 ? stats.highest.toFixed(1) : "-"}
                            </div>
                            <p className="text-xs text-muted-foreground">Mejor promedio</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Nota Más Baja</CardTitle>
                            <TrendingDown className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{stats.lowest > 0 ? stats.lowest.toFixed(1) : "-"}</div>
                            <p className="text-xs text-muted-foreground">Promedio mínimo</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Estudiantes Aprobados</CardTitle>
                            <TrendingUp className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{stats.passing}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.total > 0 ? ((stats.passing / stats.total) * 100).toFixed(1) : 0}% del total
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Evaluaciones</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{teacherEvaluations.length}</div>
                            <p className="text-xs text-muted-foreground">Creadas</p>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="evaluations" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="evaluations">Evaluaciones</TabsTrigger>
                        <TabsTrigger value="students">Estudiantes</TabsTrigger>
                    </TabsList>

                    <TabsContent value="evaluations" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Evaluaciones - {selectedCourse}</CardTitle>
                                        <CardDescription>
                                            Gestiona las evaluaciones del curso. Crea evaluaciones primero, luego asigna notas.
                                        </CardDescription>
                                    </div>
                                    <Dialog open={isEvaluationDialogOpen} onOpenChange={setIsEvaluationDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button>
                                                <Plus className="mr-2 h-4 w-4" />
                                                Nueva Evaluación
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[500px]">
                                            <DialogHeader>
                                                <DialogTitle>Crear Nueva Evaluación</DialogTitle>
                                                <DialogDescription>
                                                    Crea una evaluación que se aplicará a todos los estudiantes del curso.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <form onSubmit={handleAddEvaluation}>
                                                <div className="grid gap-4 py-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="title">Título de la Evaluación *</Label>
                                                        <Input
                                                            id="title"
                                                            value={evaluationForm.title}
                                                            onChange={(e) => setEvaluationForm({ ...evaluationForm, title: e.target.value })}
                                                            placeholder="Ej: Parcial 1 - Ecuaciones Cuadráticas"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="type">Tipo de Evaluación</Label>
                                                            <Select
                                                                value={evaluationForm.type}
                                                                onValueChange={(value: any) => setEvaluationForm({ ...evaluationForm, type: value })}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Parcial">Parcial</SelectItem>
                                                                    <SelectItem value="Final">Final</SelectItem>
                                                                    <SelectItem value="Quiz">Quiz</SelectItem>
                                                                    <SelectItem value="Tarea">Tarea</SelectItem>
                                                                    <SelectItem value="Proyecto">Proyecto</SelectItem>
                                                                    <SelectItem value="Laboratorio">Laboratorio</SelectItem>
                                                                    <SelectItem value="Oral">Oral</SelectItem>
                                                                    <SelectItem value="Ensayo">Ensayo</SelectItem>
                                                                    <SelectItem value="Complementaria">Complementaria</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="weight">Peso (%) *</Label>
                                                            <Input
                                                                id="weight"
                                                                type="number"
                                                                value={evaluationForm.weight}
                                                                onChange={(e) => setEvaluationForm({ ...evaluationForm, weight: e.target.value })}
                                                                placeholder="30"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="subject">Materia</Label>
                                                            <Select
                                                                value={evaluationForm.subject}
                                                                onValueChange={(value) => setEvaluationForm({ ...evaluationForm, subject: value })}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Matemáticas">Matemáticas</SelectItem>
                                                                    <SelectItem value="Álgebra">Álgebra</SelectItem>
                                                                    <SelectItem value="Historia">Historia</SelectItem>
                                                                    <SelectItem value="Física">Física</SelectItem>
                                                                    <SelectItem value="Química">Química</SelectItem>
                                                                    <SelectItem value="Inglés">Inglés</SelectItem>
                                                                    <SelectItem value="Literatura">Literatura</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="course">Curso</Label>
                                                            <Select
                                                                value={evaluationForm.course}
                                                                onValueChange={(value) => setEvaluationForm({ ...evaluationForm, course: value })}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="3° A">3° A</SelectItem>
                                                                    <SelectItem value="4° B">4° B</SelectItem>
                                                                    <SelectItem value="2° C">2° C</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="dueDate">Fecha de Evaluación *</Label>
                                                        <Input
                                                            id="dueDate"
                                                            type="date"
                                                            value={evaluationForm.dueDate}
                                                            onChange={(e) => setEvaluationForm({ ...evaluationForm, dueDate: e.target.value })}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="description">Descripción</Label>
                                                        <Textarea
                                                            id="description"
                                                            value={evaluationForm.description}
                                                            onChange={(e) => setEvaluationForm({ ...evaluationForm, description: e.target.value })}
                                                            placeholder="Descripción de la evaluación y temas a evaluar..."
                                                        />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button type="button" variant="outline" onClick={() => setIsEvaluationDialogOpen(false)}>
                                                        Cancelar
                                                    </Button>
                                                    <Button type="submit">Crear Evaluación</Button>
                                                </DialogFooter>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Evaluación</TableHead>
                                            <TableHead>Tipo</TableHead>
                                            <TableHead>Peso</TableHead>
                                            <TableHead>Fecha</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead>Calificadas</TableHead>
                                            <TableHead>Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {teacherEvaluations.map((evaluation) => {
                                            const evaluationGrades = grades.filter((grade) => grade.evaluationId === evaluation.id)
                                            const totalStudents = students.length
                                            const gradedStudents = evaluationGrades.length

                                            return (
                                                <TableRow key={evaluation.id}>
                                                    <TableCell>
                                                        <div>
                                                            <div className="font-medium">{evaluation.title}</div>
                                                            <div className="text-sm text-muted-foreground">{evaluation.subject}</div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">{evaluation.type}</Badge>
                                                    </TableCell>
                                                    <TableCell>{evaluation.weight}%</TableCell>
                                                    <TableCell>{evaluation.dueDate}</TableCell>
                                                    <TableCell>{getStatusBadge(evaluation.status)}</TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">
                                                            {gradedStudents}/{totalStudents}
                                                            <div className="text-xs text-muted-foreground">
                                                                {totalStudents > 0 ? ((gradedStudents / totalStudents) * 100).toFixed(0) : 0}%
                                                                completado
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center space-x-1">
                                                            <Dialog
                                                                open={isGradeDialogOpen && selectedEvaluation === evaluation.id}
                                                                onOpenChange={(open) => {
                                                                    setIsGradeDialogOpen(open)
                                                                    if (!open) setSelectedEvaluation(null)
                                                                }}
                                                            >
                                                                <DialogTrigger asChild>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() => setSelectedEvaluation(evaluation.id)}
                                                                    >
                                                                        <Plus className="h-4 w-4" />
                                                                    </Button>
                                                                </DialogTrigger>
                                                                <DialogContent className="sm:max-w-[400px]">
                                                                    <DialogHeader>
                                                                        <DialogTitle>Agregar Calificación</DialogTitle>
                                                                        <DialogDescription>
                                                                            {evaluation.title} - {evaluation.subject}
                                                                        </DialogDescription>
                                                                    </DialogHeader>
                                                                    <form onSubmit={handleAddGrade}>
                                                                        <div className="grid gap-4 py-4">
                                                                            <div className="space-y-2">
                                                                                <Label htmlFor="student">Estudiante *</Label>
                                                                                <Select
                                                                                    value={gradeForm.studentId}
                                                                                    onValueChange={(value) => setGradeForm({ ...gradeForm, studentId: value })}
                                                                                >
                                                                                    <SelectTrigger>
                                                                                        <SelectValue placeholder="Seleccionar estudiante" />
                                                                                    </SelectTrigger>
                                                                                    <SelectContent>
                                                                                        {students.map((student) => (
                                                                                            <SelectItem key={student.id} value={student.id.toString()}>
                                                                                                {student.name}
                                                                                            </SelectItem>
                                                                                        ))}
                                                                                    </SelectContent>
                                                                                </Select>
                                                                            </div>
                                                                            <div className="space-y-2">
                                                                                <Label htmlFor="grade">Calificación (1.0-7.0) *</Label>
                                                                                <Input
                                                                                    id="grade"
                                                                                    value={gradeForm.grade}
                                                                                    onChange={(e) => setGradeForm({ ...gradeForm, grade: e.target.value })}
                                                                                    placeholder="6.5"
                                                                                    required
                                                                                />
                                                                            </div>
                                                                            <div className="space-y-2">
                                                                                <Label htmlFor="feedback">Retroalimentación</Label>
                                                                                <Textarea
                                                                                    id="feedback"
                                                                                    value={gradeForm.feedback}
                                                                                    onChange={(e) => setGradeForm({ ...gradeForm, feedback: e.target.value })}
                                                                                    placeholder="Comentarios sobre el desempeño..."
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <DialogFooter>
                                                                            <Button
                                                                                type="button"
                                                                                variant="outline"
                                                                                onClick={() => {
                                                                                    setIsGradeDialogOpen(false)
                                                                                    setSelectedEvaluation(null)
                                                                                }}
                                                                            >
                                                                                Cancelar
                                                                            </Button>
                                                                            <Button type="submit">Agregar Nota</Button>
                                                                        </DialogFooter>
                                                                    </form>
                                                                </DialogContent>
                                                            </Dialog>
                                                            <Button variant="ghost" size="sm">
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                            <Button variant="ghost" size="sm">
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="students" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>
                                            Registro de Calificaciones - {selectedCourse}
                                            {selectedSubject !== "all" && ` - ${selectedSubject}`}
                                        </CardTitle>
                                        <CardDescription>
                                            Gestiona las notas (1.0 - 7.0). Mostrando {filteredStudentStats.length} estudiantes
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="outline">
                                            <History className="mr-2 h-4 w-4" />
                                            Historial
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Estudiante</TableHead>
                                            <TableHead>Calificaciones</TableHead>
                                            <TableHead>Promedio</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead>Tendencia</TableHead>
                                            <TableHead>Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredStudentStats.map((stat) => (
                                            <TableRow key={stat.student.id}>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">{stat.student.name}</div>
                                                        <div className="text-sm text-muted-foreground">ID: {stat.student.id}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-1">
                                                        {stat.grades.length > 0 ? (
                                                            <>
                                                                {stat.grades.slice(0, 3).map((grade) => {
                                                                    const evaluation = evaluations.find(
                                                                        (evaluationItem) => evaluationItem.id === grade.evaluationId,
                                                                    )
                                                                    return (
                                                                        <div key={grade.id} className="flex items-center justify-between text-sm">
                                                                            <span className="text-muted-foreground truncate max-w-[120px]">
                                                                                {evaluation?.title}
                                                                            </span>
                                                                            <span className="font-medium">{grade.grade.toFixed(1)}</span>
                                                                        </div>
                                                                    )
                                                                })}
                                                                {stat.grades.length > 3 && (
                                                                    <div className="text-xs text-muted-foreground">+{stat.grades.length - 3} más...</div>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <span className="text-muted-foreground text-sm">Sin calificaciones</span>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-bold text-lg">{stat.average > 0 ? stat.average.toFixed(1) : "-"}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {stat.totalGrades} nota{stat.totalGrades !== 1 ? "s" : ""}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {stat.average > 0 ? getGradeBadge(stat.average) : <Badge variant="outline">Sin notas</Badge>}
                                                </TableCell>
                                                <TableCell>{getTrendIcon(stat.trend)}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center space-x-1">
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
