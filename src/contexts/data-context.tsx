"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

// Types
interface User {
    id: number
    name: string
    email: string
    role: "profesor" | "estudiante" | "admin"
    status: "active" | "inactive" | "suspended"
    phone: string
    address: string
    joinDate: string
    lastLogin: string
    subjects?: string[]
    courses?: string[]
    grade?: string
    guardian?: string
    guardianPhone?: string
    department?: string
    permissions?: string[]
}

interface Evaluation {
    id: number
    title: string
    type: "Parcial" | "Final" | "Quiz" | "Tarea" | "Proyecto" | "Laboratorio" | "Oral" | "Ensayo" | "Complementaria"
    subject: string
    course: string
    teacherId: number
    teacherName: string
    weight: number
    maxGrade: number
    dueDate: string
    description: string
    status: "draft" | "active" | "completed"
    createdDate: string
}

interface Grade {
    id: number
    evaluationId: number
    studentId: number
    studentName: string
    grade: number
    submittedDate?: string
    feedback: string
    status: "pending" | "graded" | "late"
}

interface Attendance {
    id: number
    studentId: number
    studentName: string
    course: string
    subject: string
    date: string
    status: "present" | "absent" | "late" | "excused"
    teacherId: number
    teacher: string
    notes?: string
}

interface Observation {
    id: number
    studentId: number
    studentName: string
    teacherId: number
    teacher: string
    course: string
    type: "academic" | "behavioral" | "positive" | "concern"
    title: string
    description: string
    date: string
    priority: "low" | "medium" | "high"
    status: "open" | "in_progress" | "resolved"
}

interface Assignment {
    id: number
    teacherId: number
    teacherName: string
    course: string
    subject: string
    classroom: string
    schedule: {
        day: string
        startTime: string
        endTime: string
    }
    status: "active" | "inactive"
    conflicts: string[]
}

interface DataContextType {
    // Users
    users: User[]
    addUser: (user: Omit<User, "id">) => void
    updateUser: (id: number, user: Partial<User>) => void
    deleteUser: (id: number) => void
    getUserById: (id: number) => User | undefined
    getUsersByRole: (role: string) => User[]

    // Evaluations
    evaluations: Evaluation[]
    addEvaluation: (evaluation: Omit<Evaluation, "id">) => void
    updateEvaluation: (id: number, evaluation: Partial<Evaluation>) => void
    deleteEvaluation: (id: number) => void
    getEvaluationsByTeacher: (teacherId: number) => Evaluation[]
    getEvaluationsByCourse: (course: string) => Evaluation[]

    // Grades
    grades: Grade[]
    addGrade: (grade: Omit<Grade, "id">) => void
    updateGrade: (id: number, grade: Partial<Grade>) => void
    deleteGrade: (id: number) => void
    getGradesByStudent: (studentId: number) => Grade[]
    getGradesByEvaluation: (evaluationId: number) => Grade[]

    // Attendance
    attendance: Attendance[]
    addAttendance: (attendance: Omit<Attendance, "id">) => void
    updateAttendance: (id: number, attendance: Partial<Attendance>) => void
    getAttendanceByStudent: (studentId: number) => Attendance[]
    getAttendanceByTeacher: (teacherId: number) => Attendance[]

    // Observations
    observations: Observation[]
    addObservation: (observation: Omit<Observation, "id">) => void
    updateObservation: (id: number, observation: Partial<Observation>) => void
    deleteObservation: (id: number) => void
    getObservationsByStudent: (studentId: number) => Observation[]
    getObservationsByTeacher: (teacherId: number) => Observation[]

    // Assignments
    assignments: Assignment[]
    addAssignment: (assignment: Omit<Assignment, "id" | "conflicts">) => void
    updateAssignment: (id: number, assignment: Partial<Assignment>) => void
    deleteAssignment: (id: number) => void
    checkConflicts: (assignment: Omit<Assignment, "id" | "conflicts">) => string[]
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function useData() {
    const context = useContext(DataContext)
    if (context === undefined) {
        throw new Error("useData must be used within a DataProvider")
    }
    return context
}

export function DataProvider({ children }: { children: React.ReactNode }) {
    // Initial data - Users
    const [users, setUsers] = useState<User[]>([
        // Profesores
        {
            id: 1,
            name: "Prof. María González",
            email: "maria.gonzalez@colegio.edu",
            role: "profesor",
            status: "active",
            phone: "+1 234-567-8901",
            address: "Calle Principal 123",
            joinDate: "2023-01-15",
            lastLogin: "2024-11-20",
            subjects: ["Matemáticas", "Álgebra"],
            courses: ["3° A", "4° B"],
        },
        {
            id: 3,
            name: "Dr. Carlos Ruiz",
            email: "carlos.ruiz@colegio.edu",
            role: "profesor",
            status: "active",
            phone: "+1 234-567-8904",
            address: "Plaza Mayor 789",
            joinDate: "2022-08-20",
            lastLogin: "2024-11-19",
            subjects: ["Historia", "Ciencias Sociales"],
            courses: ["2° B", "3° A"],
        },
        {
            id: 6,
            name: "Prof. Laura Martín",
            email: "laura.martin@colegio.edu",
            role: "profesor",
            status: "active",
            phone: "+1 234-567-8908",
            address: "Avenida Libertad 456",
            joinDate: "2023-03-10",
            lastLogin: "2024-11-20",
            subjects: ["Física", "Química"],
            courses: ["3° A", "4° B"],
        },
        {
            id: 7,
            name: "Prof. Ana Torres",
            email: "ana.torres@colegio.edu",
            role: "profesor",
            status: "active",
            phone: "+1 234-567-8909",
            address: "Calle del Sol 789",
            joinDate: "2022-09-05",
            lastLogin: "2024-11-19",
            subjects: ["Inglés", "Literatura"],
            courses: ["2° C", "3° A"],
        },
        {
            id: 8,
            name: "Prof. Roberto Silva",
            email: "roberto.silva@colegio.edu",
            role: "profesor",
            status: "active",
            phone: "+1 234-567-8910",
            address: "Plaza Central 321",
            joinDate: "2023-02-20",
            lastLogin: "2024-11-20",
            subjects: ["Química", "Biología"],
            courses: ["4° B", "2° C"],
        },
        {
            id: 9,
            name: "Prof. Carmen López",
            email: "carmen.lopez@colegio.edu",
            role: "profesor",
            status: "active",
            phone: "+1 234-567-8911",
            address: "Barrio Norte 654",
            joinDate: "2022-01-15",
            lastLogin: "2024-11-18",
            subjects: ["Literatura", "Filosofía"],
            courses: ["3° A", "4° B"],
        },

        // Estudiantes 3° A
        {
            id: 2,
            name: "Ana García López",
            email: "ana.garcia@estudiante.edu",
            role: "estudiante",
            status: "active",
            phone: "+1 234-567-8902",
            address: "Avenida Central 456",
            joinDate: "2024-03-01",
            lastLogin: "2024-11-20",
            grade: "3° A",
            guardian: "María López",
            guardianPhone: "+1 234-567-8903",
        },
        {
            id: 4,
            name: "Juan Martínez González",
            email: "juan.martinez@estudiante.edu",
            role: "estudiante",
            status: "active",
            phone: "+1 234-567-8905",
            address: "Barrio Norte 321",
            joinDate: "2024-03-01",
            lastLogin: "2024-11-15",
            grade: "3° A",
            guardian: "Luis Martínez",
            guardianPhone: "+1 234-567-8906",
        },
        {
            id: 10,
            name: "Sofía Rodríguez Pérez",
            email: "sofia.rodriguez@estudiante.edu",
            role: "estudiante",
            status: "active",
            phone: "+1 234-567-8912",
            address: "Calle Nueva 987",
            joinDate: "2024-03-01",
            lastLogin: "2024-11-20",
            grade: "3° A",
            guardian: "Carmen Pérez",
            guardianPhone: "+1 234-567-8913",
        },
        {
            id: 11,
            name: "Diego Fernández Silva",
            email: "diego.fernandez@estudiante.edu",
            role: "estudiante",
            status: "active",
            phone: "+1 234-567-8914",
            address: "Plaza Vieja 123",
            joinDate: "2024-03-01",
            lastLogin: "2024-11-19",
            grade: "3° A",
            guardian: "Roberto Silva",
            guardianPhone: "+1 234-567-8915",
        },
        {
            id: 12,
            name: "Valentina Cruz Peña",
            email: "valentina.cruz@estudiante.edu",
            role: "estudiante",
            status: "active",
            phone: "+1 234-567-8916",
            address: "Avenida Sur 456",
            joinDate: "2024-03-01",
            lastLogin: "2024-11-20",
            grade: "3° A",
            guardian: "María Peña",
            guardianPhone: "+1 234-567-8917",
        },

        // Estudiantes 4° B
        {
            id: 13,
            name: "Carmen Jiménez Ruiz",
            email: "carmen.jimenez@estudiante.edu",
            role: "estudiante",
            status: "active",
            phone: "+1 234-567-8918",
            address: "Calle Este 789",
            joinDate: "2024-03-01",
            lastLogin: "2024-11-19",
            grade: "4° B",
            guardian: "Ana Ruiz",
            guardianPhone: "+1 234-567-8919",
        },
        {
            id: 14,
            name: "Roberto Silva Mendoza",
            email: "roberto.silva.est@estudiante.edu",
            role: "estudiante",
            status: "active",
            phone: "+1 234-567-8920",
            address: "Barrio Centro 321",
            joinDate: "2024-03-01",
            lastLogin: "2024-11-18",
            grade: "4° B",
            guardian: "Carlos Mendoza",
            guardianPhone: "+1 234-567-8921",
        },
        {
            id: 15,
            name: "Isabella Morales Castro",
            email: "isabella.morales@estudiante.edu",
            role: "estudiante",
            status: "active",
            phone: "+1 234-567-8922",
            address: "Plaza Norte 654",
            joinDate: "2024-03-01",
            lastLogin: "2024-11-20",
            grade: "4° B",
            guardian: "Lucía Castro",
            guardianPhone: "+1 234-567-8923",
        },

        // Estudiantes 2° C
        {
            id: 16,
            name: "Andrés Ramírez Soto",
            email: "andres.ramirez@estudiante.edu",
            role: "estudiante",
            status: "active",
            phone: "+1 234-567-8924",
            address: "Calle Oeste 987",
            joinDate: "2024-03-01",
            lastLogin: "2024-11-19",
            grade: "2° C",
            guardian: "Pedro Soto",
            guardianPhone: "+1 234-567-8925",
        },
        {
            id: 17,
            name: "Camila Vargas Herrera",
            email: "camila.vargas@estudiante.edu",
            role: "estudiante",
            status: "active",
            phone: "+1 234-567-8926",
            address: "Avenida Norte 123",
            joinDate: "2024-03-01",
            lastLogin: "2024-11-20",
            grade: "2° C",
            guardian: "Sandra Herrera",
            guardianPhone: "+1 234-567-8927",
        },

        // Admin
        {
            id: 5,
            name: "Director Juan Pérez",
            email: "director@colegio.edu",
            role: "admin",
            status: "active",
            phone: "+1 234-567-8907",
            address: "Centro Administrativo",
            joinDate: "2020-01-01",
            lastLogin: "2024-11-20",
            department: "Dirección Académica",
            permissions: ["all"],
        },
    ])

    // Evaluations data
    const [evaluations, setEvaluations] = useState<Evaluation[]>([
        // === MATEMÁTICAS 3° A - Prof. María González ===
        {
            id: 1,
            title: "Parcial 1 - Ecuaciones Cuadráticas",
            type: "Parcial",
            subject: "Matemáticas",
            course: "3° A",
            teacherId: 1,
            teacherName: "Prof. María González",
            weight: 30,
            maxGrade: 7.0,
            dueDate: "2024-11-18",
            description: "Evaluación de ecuaciones cuadráticas, métodos de resolución y aplicaciones.",
            status: "completed",
            createdDate: "2024-11-01",
        },
        {
            id: 2,
            title: "Quiz - Funciones Lineales",
            type: "Quiz",
            subject: "Matemáticas",
            course: "3° A",
            teacherId: 1,
            teacherName: "Prof. María González",
            weight: 15,
            maxGrade: 7.0,
            dueDate: "2024-11-10",
            description: "Evaluación rápida sobre funciones lineales y sus propiedades.",
            status: "completed",
            createdDate: "2024-10-25",
        },
        {
            id: 3,
            title: "Tarea - Ejercicios Capítulo 3",
            type: "Tarea",
            subject: "Matemáticas",
            course: "3° A",
            teacherId: 1,
            teacherName: "Prof. María González",
            weight: 10,
            maxGrade: 7.0,
            dueDate: "2024-11-05",
            description: "Resolución de ejercicios del capítulo 3 del libro de texto.",
            status: "completed",
            createdDate: "2024-10-20",
        },
        {
            id: 4,
            title: "Parcial 2 - Sistemas de Ecuaciones",
            type: "Parcial",
            subject: "Matemáticas",
            course: "3° A",
            teacherId: 1,
            teacherName: "Prof. María González",
            weight: 30,
            maxGrade: 7.0,
            dueDate: "2024-12-05",
            description: "Evaluación de sistemas de ecuaciones lineales y métodos de resolución.",
            status: "active",
            createdDate: "2024-11-15",
        },
        {
            id: 5,
            title: "Nota Complementaria - Participación",
            type: "Complementaria",
            subject: "Matemáticas",
            course: "3° A",
            teacherId: 1,
            teacherName: "Prof. María González",
            weight: 15,
            maxGrade: 7.0,
            dueDate: "2024-12-15",
            description: "Evaluación continua de participación en clase y resolución de ejercicios.",
            status: "active",
            createdDate: "2024-11-01",
        },

        // === HISTORIA 3° A - Dr. Carlos Ruiz ===
        {
            id: 6,
            title: "Ensayo - Revolución Industrial",
            type: "Ensayo",
            subject: "Historia",
            course: "3° A",
            teacherId: 3,
            teacherName: "Dr. Carlos Ruiz",
            weight: 25,
            maxGrade: 7.0,
            dueDate: "2024-11-15",
            description: "Ensayo analítico sobre las causas y consecuencias de la Revolución Industrial.",
            status: "completed",
            createdDate: "2024-10-30",
        },
        {
            id: 7,
            title: "Quiz - Primera Guerra Mundial",
            type: "Quiz",
            subject: "Historia",
            course: "3° A",
            teacherId: 3,
            teacherName: "Dr. Carlos Ruiz",
            weight: 15,
            maxGrade: 7.0,
            dueDate: "2024-11-08",
            description: "Evaluación sobre las causas, desarrollo y consecuencias de la Primera Guerra Mundial.",
            status: "completed",
            createdDate: "2024-10-25",
        },
        {
            id: 8,
            title: "Parcial 1 - Siglo XIX",
            type: "Parcial",
            subject: "Historia",
            course: "3° A",
            teacherId: 3,
            teacherName: "Dr. Carlos Ruiz",
            weight: 35,
            maxGrade: 7.0,
            dueDate: "2024-10-25",
            description: "Evaluación comprehensiva del siglo XIX: revoluciones, nacionalismo e imperialismo.",
            status: "completed",
            createdDate: "2024-10-01",
        },

        // === FÍSICA 3° A - Prof. Laura Martín ===
        {
            id: 9,
            title: "Laboratorio - Ley de Ohm",
            type: "Laboratorio",
            subject: "Física",
            course: "3° A",
            teacherId: 6,
            teacherName: "Prof. Laura Martín",
            weight: 20,
            maxGrade: 7.0,
            dueDate: "2024-11-12",
            description: "Práctica experimental para verificar la Ley de Ohm y medición de resistencias.",
            status: "completed",
            createdDate: "2024-11-01",
        },
        {
            id: 10,
            title: "Parcial 1 - Cinemática",
            type: "Parcial",
            subject: "Física",
            course: "3° A",
            teacherId: 6,
            teacherName: "Prof. Laura Martín",
            weight: 35,
            maxGrade: 7.0,
            dueDate: "2024-11-05",
            description: "Evaluación de conceptos de cinemática: movimiento rectilíneo y uniformemente acelerado.",
            status: "completed",
            createdDate: "2024-10-15",
        },
        {
            id: 11,
            title: "Quiz - Movimiento Rectilíneo",
            type: "Quiz",
            subject: "Física",
            course: "3° A",
            teacherId: 6,
            teacherName: "Prof. Laura Martín",
            weight: 15,
            maxGrade: 7.0,
            dueDate: "2024-10-28",
            description: "Evaluación rápida sobre conceptos básicos de movimiento rectilíneo.",
            status: "completed",
            createdDate: "2024-10-20",
        },

        // === INGLÉS 3° A - Prof. Ana Torres ===
        {
            id: 12,
            title: "Presentación Oral - Future Plans",
            type: "Oral",
            subject: "Inglés",
            course: "3° A",
            teacherId: 7,
            teacherName: "Prof. Ana Torres",
            weight: 20,
            maxGrade: 7.0,
            dueDate: "2024-11-10",
            description: "Presentación oral sobre planes futuros usando tiempo futuro y vocabulario específico.",
            status: "completed",
            createdDate: "2024-10-25",
        },
        {
            id: 13,
            title: "Ensayo - Environmental Issues",
            type: "Ensayo",
            subject: "Inglés",
            course: "3° A",
            teacherId: 7,
            teacherName: "Prof. Ana Torres",
            weight: 25,
            maxGrade: 7.0,
            dueDate: "2024-11-03",
            description: "Ensayo argumentativo sobre problemas ambientales actuales.",
            status: "completed",
            createdDate: "2024-10-15",
        },
        {
            id: 14,
            title: "Quiz - Grammar (Past Perfect)",
            type: "Quiz",
            subject: "Inglés",
            course: "3° A",
            teacherId: 7,
            teacherName: "Prof. Ana Torres",
            weight: 15,
            maxGrade: 7.0,
            dueDate: "2024-10-26",
            description: "Evaluación de gramática enfocada en el uso del Past Perfect.",
            status: "completed",
            createdDate: "2024-10-18",
        },

        // === QUÍMICA 3° A - Prof. Roberto Silva ===
        {
            id: 15,
            title: "Quiz - Tabla Periódica",
            type: "Quiz",
            subject: "Química",
            course: "3° A",
            teacherId: 8,
            teacherName: "Prof. Roberto Silva",
            weight: 15,
            maxGrade: 7.0,
            dueDate: "2024-11-08",
            description: "Evaluación sobre propiedades periódicas y estructura de la tabla periódica.",
            status: "completed",
            createdDate: "2024-10-25",
        },
        {
            id: 16,
            title: "Laboratorio - Reacciones Ácido-Base",
            type: "Laboratorio",
            subject: "Química",
            course: "3° A",
            teacherId: 8,
            teacherName: "Prof. Roberto Silva",
            weight: 20,
            maxGrade: 7.0,
            dueDate: "2024-11-01",
            description: "Práctica de laboratorio sobre reacciones ácido-base y titulaciones.",
            status: "completed",
            createdDate: "2024-10-20",
        },
        {
            id: 17,
            title: "Parcial 1 - Enlaces Químicos",
            type: "Parcial",
            subject: "Química",
            course: "3° A",
            teacherId: 8,
            teacherName: "Prof. Roberto Silva",
            weight: 30,
            maxGrade: 7.0,
            dueDate: "2024-10-24",
            description: "Evaluación sobre tipos de enlaces químicos y sus propiedades.",
            status: "completed",
            createdDate: "2024-10-01",
        },

        // === LITERATURA 3° A - Prof. Carmen López ===
        {
            id: 18,
            title: "Ensayo - Análisis de Don Quijote",
            type: "Ensayo",
            subject: "Literatura",
            course: "3° A",
            teacherId: 9,
            teacherName: "Prof. Carmen López",
            weight: 30,
            maxGrade: 7.0,
            dueDate: "2024-11-05",
            description: "Análisis literario profundo de la obra Don Quijote de la Mancha.",
            status: "completed",
            createdDate: "2024-10-15",
        },
        {
            id: 19,
            title: "Quiz - Figuras Literarias",
            type: "Quiz",
            subject: "Literatura",
            course: "3° A",
            teacherId: 9,
            teacherName: "Prof. Carmen López",
            weight: 20,
            maxGrade: 7.0,
            dueDate: "2024-10-29",
            description: "Evaluación sobre reconocimiento y uso de figuras retóricas.",
            status: "completed",
            createdDate: "2024-10-20",
        },

        // === ÁLGEBRA 4° B - Prof. María González ===
        {
            id: 20,
            title: "Parcial 1 - Sistemas de Ecuaciones",
            type: "Parcial",
            subject: "Álgebra",
            course: "4° B",
            teacherId: 1,
            teacherName: "Prof. María González",
            weight: 35,
            maxGrade: 7.0,
            dueDate: "2024-11-16",
            description: "Evaluación de sistemas de ecuaciones lineales y métodos de resolución avanzados.",
            status: "completed",
            createdDate: "2024-11-01",
        },
        {
            id: 21,
            title: "Quiz - Matrices",
            type: "Quiz",
            subject: "Álgebra",
            course: "4° B",
            teacherId: 1,
            teacherName: "Prof. María González",
            weight: 15,
            maxGrade: 7.0,
            dueDate: "2024-11-08",
            description: "Evaluación sobre operaciones con matrices y determinantes.",
            status: "completed",
            createdDate: "2024-10-25",
        },
        {
            id: 22,
            title: "Tarea - Determinantes",
            type: "Tarea",
            subject: "Álgebra",
            course: "4° B",
            teacherId: 1,
            teacherName: "Prof. María González",
            weight: 10,
            maxGrade: 7.0,
            dueDate: "2024-11-01",
            description: "Ejercicios de cálculo de determinantes 2x2 y 3x3.",
            status: "completed",
            createdDate: "2024-10-20",
        },
        {
            id: 23,
            title: "Parcial 2 - Polinomios",
            type: "Parcial",
            subject: "Álgebra",
            course: "4° B",
            teacherId: 1,
            teacherName: "Prof. María González",
            weight: 30,
            maxGrade: 7.0,
            dueDate: "2024-10-20",
            description: "Evaluación sobre operaciones con polinomios y factorización.",
            status: "completed",
            createdDate: "2024-10-01",
        },

        // === QUÍMICA 2° C - Prof. Roberto Silva ===
        {
            id: 24,
            title: "Quiz - Enlaces Químicos",
            type: "Quiz",
            subject: "Química",
            course: "2° C",
            teacherId: 8,
            teacherName: "Prof. Roberto Silva",
            weight: 20,
            maxGrade: 7.0,
            dueDate: "2024-11-14",
            description: "Evaluación sobre tipos de enlaces químicos básicos.",
            status: "completed",
            createdDate: "2024-11-01",
        },
        {
            id: 25,
            title: "Laboratorio - Mezclas y Soluciones",
            type: "Laboratorio",
            subject: "Química",
            course: "2° C",
            teacherId: 8,
            teacherName: "Prof. Roberto Silva",
            weight: 25,
            maxGrade: 7.0,
            dueDate: "2024-11-07",
            description: "Práctica de separación de mezclas y preparación de soluciones.",
            status: "completed",
            createdDate: "2024-10-25",
        },
        {
            id: 26,
            title: "Parcial 1 - Estructura Atómica",
            type: "Parcial",
            subject: "Química",
            course: "2° C",
            teacherId: 8,
            teacherName: "Prof. Roberto Silva",
            weight: 35,
            maxGrade: 7.0,
            dueDate: "2024-10-30",
            description: "Evaluación sobre estructura atómica y modelos atómicos.",
            status: "completed",
            createdDate: "2024-10-10",
        },
    ])

    // Grades data - Now linked to evaluations
    const [grades, setGrades] = useState<Grade[]>([
        // === MATEMÁTICAS 3° A - Parcial 1 (Evaluation ID: 1) ===
        {
            id: 1,
            evaluationId: 1,
            studentId: 2,
            studentName: "Ana García López",
            grade: 6.5,
            submittedDate: "2024-11-18",
            feedback: "Excelente comprensión de los conceptos básicos. Mejorar en problemas complejos.",
            status: "graded",
        },
        {
            id: 2,
            evaluationId: 1,
            studentId: 4,
            studentName: "Juan Martínez González",
            grade: 5.8,
            submittedDate: "2024-11-18",
            feedback: "Buen esfuerzo. Revisar métodos de factorización.",
            status: "graded",
        },
        {
            id: 3,
            evaluationId: 1,
            studentId: 10,
            studentName: "Sofía Rodríguez Pérez",
            grade: 6.7,
            submittedDate: "2024-11-18",
            feedback: "Excelente trabajo. Muy buena técnica de resolución.",
            status: "graded",
        },
        {
            id: 4,
            evaluationId: 1,
            studentId: 11,
            studentName: "Diego Fernández Silva",
            grade: 5.5,
            submittedDate: "2024-11-18",
            feedback: "Necesita reforzar conceptos básicos. Programar tutoría.",
            status: "graded",
        },
        {
            id: 5,
            evaluationId: 1,
            studentId: 12,
            studentName: "Valentina Cruz Peña",
            grade: 6.9,
            submittedDate: "2024-11-18",
            feedback: "Sobresaliente. Dominio completo del tema.",
            status: "graded",
        },

        // === MATEMÁTICAS 3° A - Quiz Funciones (Evaluation ID: 2) ===
        {
            id: 6,
            evaluationId: 2,
            studentId: 2,
            studentName: "Ana García López",
            grade: 6.8,
            submittedDate: "2024-11-10",
            feedback: "Muy buen dominio del tema. Sigue así.",
            status: "graded",
        },
        {
            id: 7,
            evaluationId: 2,
            studentId: 4,
            studentName: "Juan Martínez González",
            grade: 6.1,
            submittedDate: "2024-11-10",
            feedback: "Mejorando progresivamente. Continúa practicando.",
            status: "graded",
        },
        {
            id: 8,
            evaluationId: 2,
            studentId: 10,
            studentName: "Sofía Rodríguez Pérez",
            grade: 6.9,
            submittedDate: "2024-11-10",
            feedback: "Perfecto dominio del tema.",
            status: "graded",
        },
        {
            id: 9,
            evaluationId: 2,
            studentId: 11,
            studentName: "Diego Fernández Silva",
            grade: 5.2,
            submittedDate: "2024-11-10",
            feedback: "Dificultades con conceptos básicos.",
            status: "graded",
        },
        {
            id: 10,
            evaluationId: 2,
            studentId: 12,
            studentName: "Valentina Cruz Peña",
            grade: 7.0,
            submittedDate: "2024-11-10",
            feedback: "Perfecto. Excelente estudiante.",
            status: "graded",
        },

        // === MATEMÁTICAS 3° A - Tarea Capítulo 3 (Evaluation ID: 3) ===
        {
            id: 11,
            evaluationId: 3,
            studentId: 2,
            studentName: "Ana García López",
            grade: 6.9,
            submittedDate: "2024-11-05",
            feedback: "Todos los ejercicios correctos. Excelente trabajo.",
            status: "graded",
        },
        {
            id: 12,
            evaluationId: 3,
            studentId: 4,
            studentName: "Juan Martínez González",
            grade: 5.9,
            submittedDate: "2024-11-05",
            feedback: "Algunos errores en procedimientos. Revisar.",
            status: "graded",
        },
        {
            id: 13,
            evaluationId: 3,
            studentId: 10,
            studentName: "Sofía Rodríguez Pérez",
            grade: 7.0,
            submittedDate: "2024-11-05",
            feedback: "Trabajo perfecto. Sobresaliente.",
            status: "graded",
        },
        {
            id: 14,
            evaluationId: 3,
            studentId: 11,
            studentName: "Diego Fernández Silva",
            grade: 5.8,
            submittedDate: "2024-11-05",
            feedback: "Mejorar en ejercicios de aplicación.",
            status: "graded",
        },
        {
            id: 15,
            evaluationId: 3,
            studentId: 12,
            studentName: "Valentina Cruz Peña",
            grade: 6.8,
            submittedDate: "2024-11-05",
            feedback: "Trabajo muy ordenado y completo.",
            status: "graded",
        },

        // === HISTORIA 3° A - Ensayo Revolución Industrial (Evaluation ID: 6) ===
        {
            id: 16,
            evaluationId: 6,
            studentId: 2,
            studentName: "Ana García López",
            grade: 6.6,
            submittedDate: "2024-11-15",
            feedback: "Excelente análisis y uso de fuentes históricas.",
            status: "graded",
        },
        {
            id: 17,
            evaluationId: 6,
            studentId: 4,
            studentName: "Juan Martínez González",
            grade: 6.2,
            submittedDate: "2024-11-15",
            feedback: "Buen análisis histórico. Mejorar estructura del ensayo.",
            status: "graded",
        },
        {
            id: 18,
            evaluationId: 6,
            studentId: 10,
            studentName: "Sofía Rodríguez Pérez",
            grade: 6.4,
            submittedDate: "2024-11-15",
            feedback: "Muy buen trabajo de investigación.",
            status: "graded",
        },
        {
            id: 19,
            evaluationId: 6,
            studentId: 11,
            studentName: "Diego Fernández Silva",
            grade: 5.4,
            submittedDate: "2024-11-15",
            feedback: "Necesita mejorar argumentación y uso de fuentes.",
            status: "graded",
        },
        {
            id: 20,
            evaluationId: 6,
            studentId: 12,
            studentName: "Valentina Cruz Peña",
            grade: 6.8,
            submittedDate: "2024-11-15",
            feedback: "Ensayo excepcional con análisis crítico.",
            status: "graded",
        },

        // === HISTORIA 3° A - Quiz Primera Guerra Mundial (Evaluation ID: 7) ===
        {
            id: 21,
            evaluationId: 7,
            studentId: 2,
            studentName: "Ana García López",
            grade: 6.4,
            submittedDate: "2024-11-08",
            feedback: "Buen conocimiento de causas y consecuencias.",
            status: "graded",
        },
        {
            id: 22,
            evaluationId: 7,
            studentId: 4,
            studentName: "Juan Martínez González",
            grade: 5.8,
            submittedDate: "2024-11-08",
            feedback: "Estudiar más las causas del conflicto.",
            status: "graded",
        },
        {
            id: 23,
            evaluationId: 7,
            studentId: 10,
            studentName: "Sofía Rodríguez Pérez",
            grade: 6.7,
            submittedDate: "2024-11-08",
            feedback: "Excelente conocimiento histórico.",
            status: "graded",
        },
        {
            id: 24,
            evaluationId: 7,
            studentId: 11,
            studentName: "Diego Fernández Silva",
            grade: 5.6,
            submittedDate: "2024-11-08",
            feedback: "Estudiar más las causas del conflicto.",
            status: "graded",
        },
        {
            id: 25,
            evaluationId: 7,
            studentId: 12,
            studentName: "Valentina Cruz Peña",
            grade: 6.8,
            submittedDate: "2024-11-08",
            feedback: "Excelente conocimiento histórico.",
            status: "graded",
        },

        // === FÍSICA 3° A - Laboratorio Ley de Ohm (Evaluation ID: 9) ===
        {
            id: 26,
            evaluationId: 9,
            studentId: 2,
            studentName: "Ana García López",
            grade: 6.3,
            submittedDate: "2024-11-12",
            feedback: "Buen trabajo experimental. Mejorar precisión en mediciones.",
            status: "graded",
        },
        {
            id: 27,
            evaluationId: 9,
            studentId: 4,
            studentName: "Juan Martínez González",
            grade: 5.9,
            submittedDate: "2024-11-12",
            feedback: "Necesita mejorar técnica experimental.",
            status: "graded",
        },
        {
            id: 28,
            evaluationId: 9,
            studentId: 10,
            studentName: "Sofía Rodríguez Pérez",
            grade: 6.7,
            submittedDate: "2024-11-12",
            feedback: "Excelente trabajo experimental y análisis.",
            status: "graded",
        },
        {
            id: 29,
            evaluationId: 9,
            studentId: 11,
            studentName: "Diego Fernández Silva",
            grade: 5.1,
            submittedDate: "2024-11-12",
            feedback: "Dificultades con procedimientos experimentales.",
            status: "graded",
        },
        {
            id: 30,
            evaluationId: 9,
            studentId: 12,
            studentName: "Valentina Cruz Peña",
            grade: 6.8,
            submittedDate: "2024-11-12",
            feedback: "Excelente precisión y análisis de resultados.",
            status: "graded",
        },

        // === INGLÉS 3° A - Presentación Oral (Evaluation ID: 12) ===
        {
            id: 31,
            evaluationId: 12,
            studentId: 2,
            studentName: "Ana García López",
            grade: 6.4,
            submittedDate: "2024-11-10",
            feedback: "Excelente fluidez y pronunciación. Ampliar vocabulario técnico.",
            status: "graded",
        },
        {
            id: 32,
            evaluationId: 12,
            studentId: 4,
            studentName: "Juan Martínez González",
            grade: 5.7,
            submittedDate: "2024-11-10",
            feedback: "Buen esfuerzo. Practicar más la pronunciación.",
            status: "graded",
        },
        {
            id: 33,
            evaluationId: 12,
            studentId: 10,
            studentName: "Sofía Rodríguez Pérez",
            grade: 6.7,
            submittedDate: "2024-11-10",
            feedback: "Excelente fluidez y confianza al hablar.",
            status: "graded",
        },
        {
            id: 34,
            evaluationId: 12,
            studentId: 11,
            studentName: "Diego Fernández Silva",
            grade: 5.2,
            submittedDate: "2024-11-10",
            feedback: "Necesita más práctica oral y confianza.",
            status: "graded",
        },
        {
            id: 35,
            evaluationId: 12,
            studentId: 12,
            studentName: "Valentina Cruz Peña",
            grade: 6.9,
            submittedDate: "2024-11-10",
            feedback: "Excelente nivel de inglés. Casi nativo.",
            status: "graded",
        },

        // === QUÍMICA 3° A - Quiz Tabla Periódica (Evaluation ID: 15) ===
        {
            id: 36,
            evaluationId: 15,
            studentId: 2,
            studentName: "Ana García López",
            grade: 6.7,
            submittedDate: "2024-11-08",
            feedback: "Excelente dominio del tema. Sigue así.",
            status: "graded",
        },
        {
            id: 37,
            evaluationId: 15,
            studentId: 10,
            studentName: "Sofía Rodríguez Pérez",
            grade: 6.9,
            submittedDate: "2024-11-08",
            feedback: "Perfecto dominio del tema. Sobresaliente.",
            status: "graded",
        },
        {
            id: 38,
            evaluationId: 15,
            studentId: 12,
            studentName: "Valentina Cruz Peña",
            grade: 6.8,
            submittedDate: "2024-11-08",
            feedback: "Muy buen conocimiento de la tabla periódica.",
            status: "graded",
        },

        // === LITERATURA 3° A - Ensayo Don Quijote (Evaluation ID: 18) ===
        {
            id: 39,
            evaluationId: 18,
            studentId: 2,
            studentName: "Ana García López",
            grade: 6.5,
            submittedDate: "2024-11-05",
            feedback: "Excelente interpretación. Profundizar más en el contexto histórico.",
            status: "graded",
        },
        {
            id: 40,
            evaluationId: 18,
            studentId: 4,
            studentName: "Juan Martínez González",
            grade: 5.8,
            submittedDate: "2024-11-05",
            feedback: "Buena interpretación básica. Ampliar análisis literario.",
            status: "graded",
        },
        {
            id: 41,
            evaluationId: 18,
            studentId: 12,
            studentName: "Valentina Cruz Peña",
            grade: 6.9,
            submittedDate: "2024-11-05",
            feedback: "Análisis literario excepcional y maduro.",
            status: "graded",
        },

        // === ÁLGEBRA 4° B - Parcial 1 Sistemas (Evaluation ID: 20) ===
        {
            id: 42,
            evaluationId: 20,
            studentId: 13,
            studentName: "Carmen Jiménez Ruiz",
            grade: 6.4,
            submittedDate: "2024-11-16",
            feedback: "Muy buen manejo de métodos de resolución.",
            status: "graded",
        },
        {
            id: 43,
            evaluationId: 20,
            studentId: 14,
            studentName: "Roberto Silva Mendoza",
            grade: 5.9,
            submittedDate: "2024-11-16",
            feedback: "Buen progreso. Continuar practicando métodos de sustitución.",
            status: "graded",
        },
        {
            id: 44,
            evaluationId: 20,
            studentId: 15,
            studentName: "Isabella Morales Castro",
            grade: 6.8,
            submittedDate: "2024-11-16",
            feedback: "Excelente dominio. Técnica muy sólida.",
            status: "graded",
        },

        // === ÁLGEBRA 4° B - Quiz Matrices (Evaluation ID: 21) ===
        {
            id: 45,
            evaluationId: 21,
            studentId: 13,
            studentName: "Carmen Jiménez Ruiz",
            grade: 6.2,
            submittedDate: "2024-11-08",
            feedback: "Buen dominio de operaciones básicas.",
            status: "graded",
        },
        {
            id: 46,
            evaluationId: 21,
            studentId: 14,
            studentName: "Roberto Silva Mendoza",
            grade: 5.7,
            submittedDate: "2024-11-08",
            feedback: "Mejorar en multiplicación de matrices.",
            status: "graded",
        },
        {
            id: 47,
            evaluationId: 21,
            studentId: 15,
            studentName: "Isabella Morales Castro",
            grade: 6.9,
            submittedDate: "2024-11-08",
            feedback: "Perfecto manejo de operaciones matriciales.",
            status: "graded",
        },

        // === QUÍMICA 2° C - Quiz Enlaces (Evaluation ID: 24) ===
        {
            id: 48,
            evaluationId: 24,
            studentId: 16,
            studentName: "Andrés Ramírez Soto",
            grade: 5.4,
            submittedDate: "2024-11-14",
            feedback: "Necesita reforzar conceptos básicos de enlace.",
            status: "graded",
        },
        {
            id: 49,
            evaluationId: 24,
            studentId: 17,
            studentName: "Camila Vargas Herrera",
            grade: 6.2,
            submittedDate: "2024-11-14",
            feedback: "Buen entendimiento del tema. Continuar así.",
            status: "graded",
        },

        // === QUÍMICA 2° C - Laboratorio Mezclas (Evaluation ID: 25) ===
        {
            id: 50,
            evaluationId: 25,
            studentId: 16,
            studentName: "Andrés Ramírez Soto",
            grade: 5.6,
            submittedDate: "2024-11-07",
            feedback: "Mejorar técnica de separación.",
            status: "graded",
        },
        {
            id: 51,
            evaluationId: 25,
            studentId: 17,
            studentName: "Camila Vargas Herrera",
            grade: 6.4,
            submittedDate: "2024-11-07",
            feedback: "Excelente trabajo experimental.",
            status: "graded",
        },
    ])

    const [attendance, setAttendance] = useState<Attendance[]>([
        {
            id: 1,
            studentId: 2,
            studentName: "Ana García López",
            course: "3° A",
            subject: "Matemáticas",
            date: "2024-11-20",
            status: "present",
            teacherId: 1,
            teacher: "Prof. María González",
        },
        {
            id: 2,
            studentId: 4,
            studentName: "Juan Martínez González",
            course: "3° A",
            subject: "Matemáticas",
            date: "2024-11-20",
            status: "late",
            teacherId: 1,
            teacher: "Prof. María González",
            notes: "Llegó 10 minutos tarde",
        },
        {
            id: 3,
            studentId: 10,
            studentName: "Sofía Rodríguez Pérez",
            course: "3° A",
            subject: "Matemáticas",
            date: "2024-11-20",
            status: "present",
            teacherId: 1,
            teacher: "Prof. María González",
        },
        {
            id: 4,
            studentId: 11,
            studentName: "Diego Fernández Silva",
            course: "3° A",
            subject: "Matemáticas",
            date: "2024-11-20",
            status: "absent",
            teacherId: 1,
            teacher: "Prof. María González",
            notes: "Justificado por cita médica",
        },
        {
            id: 5,
            studentId: 12,
            studentName: "Valentina Cruz Peña",
            course: "3° A",
            subject: "Matemáticas",
            date: "2024-11-20",
            status: "present",
            teacherId: 1,
            teacher: "Prof. María González",
        },
    ])

    const [observations, setObservations] = useState<Observation[]>([
        {
            id: 1,
            studentId: 2,
            studentName: "Ana García López",
            teacherId: 1,
            teacher: "Prof. María González",
            course: "3° A",
            type: "positive",
            title: "Excelente participación",
            description: "La estudiante mostró gran interés y participación activa en la clase de matemáticas.",
            date: "2024-11-18",
            priority: "low",
            status: "resolved",
        },
        {
            id: 2,
            studentId: 11,
            studentName: "Diego Fernández Silva",
            teacherId: 6,
            teacher: "Prof. Laura Martín",
            course: "3° A",
            type: "concern",
            title: "Dificultades en Física",
            description: "El estudiante presenta dificultades para comprender conceptos básicos de cinemática.",
            date: "2024-11-15",
            priority: "medium",
            status: "in_progress",
        },
        {
            id: 3,
            studentId: 12,
            studentName: "Valentina Cruz Peña",
            teacherId: 9,
            teacher: "Prof. Carmen López",
            course: "3° A",
            type: "positive",
            title: "Liderazgo en grupo",
            description: "Demostró excelentes habilidades de liderazgo durante el trabajo en equipo de literatura.",
            date: "2024-11-12",
            priority: "low",
            status: "resolved",
        },
    ])

    const [assignments, setAssignments] = useState<Assignment[]>([
        {
            id: 1,
            teacherId: 1,
            teacherName: "Prof. María González",
            course: "3° A",
            subject: "Matemáticas",
            classroom: "Aula 101",
            schedule: {
                day: "Lunes",
                startTime: "08:00",
                endTime: "09:30",
            },
            status: "active",
            conflicts: [],
        },
        {
            id: 2,
            teacherId: 3,
            teacherName: "Dr. Carlos Ruiz",
            course: "3° A",
            subject: "Historia",
            classroom: "Aula 102",
            schedule: {
                day: "Martes",
                startTime: "10:00",
                endTime: "11:30",
            },
            status: "active",
            conflicts: [],
        },
        {
            id: 3,
            teacherId: 6,
            teacherName: "Prof. Laura Martín",
            course: "3° A",
            subject: "Física",
            classroom: "Laboratorio 1",
            schedule: {
                day: "Miércoles",
                startTime: "14:00",
                endTime: "15:30",
            },
            status: "active",
            conflicts: [],
        },
        {
            id: 4,
            teacherId: 1,
            teacherName: "Prof. María González",
            course: "4° B",
            subject: "Álgebra",
            classroom: "Aula 103",
            schedule: {
                day: "Jueves",
                startTime: "09:00",
                endTime: "10:30",
            },
            status: "active",
            conflicts: [],
        },
    ])

    // User functions
    const addUser = (user: Omit<User, "id">) => {
        const newUser = {
            ...user,
            id: Math.max(...users.map((u) => u.id), 0) + 1,
        }
        setUsers((prev) => [...prev, newUser])
    }

    const updateUser = (id: number, updatedUser: Partial<User>) => {
        setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, ...updatedUser } : user)))
    }

    const deleteUser = (id: number) => {
        setUsers((prev) => prev.filter((user) => user.id !== id))
    }

    const getUserById = (id: number) => {
        return users.find((user) => user.id === id)
    }

    const getUsersByRole = (role: string) => {
        return users.filter((user) => user.role === role)
    }

    // Evaluation functions
    const addEvaluation = (evaluation: Omit<Evaluation, "id">) => {
        const newEvaluation = {
            ...evaluation,
            id: Math.max(...evaluations.map((e) => e.id), 0) + 1,
        }
        setEvaluations((prev) => [...prev, newEvaluation])
    }

    const updateEvaluation = (id: number, updatedEvaluation: Partial<Evaluation>) => {
        setEvaluations((prev) =>
            prev.map((evaluation) => (evaluation.id === id ? { ...evaluation, ...updatedEvaluation } : evaluation)),
        )
    }

    const deleteEvaluation = (id: number) => {
        setEvaluations((prev) => prev.filter((evaluation) => evaluation.id !== id))
    }

    const getEvaluationsByTeacher = (teacherId: number) => {
        return evaluations.filter((evaluation) => evaluation.teacherId === teacherId)
    }

    const getEvaluationsByCourse = (course: string) => {
        return evaluations.filter((evaluation) => evaluation.course === course)
    }

    // Grade functions
    const addGrade = (grade: Omit<Grade, "id">) => {
        const newGrade = {
            ...grade,
            id: Math.max(...grades.map((gradeItem) => gradeItem.id), 0) + 1,
        }
        setGrades((prev) => [...prev, newGrade])
    }

    const updateGrade = (id: number, updatedGrade: Partial<Grade>) => {
        setGrades((prev) => prev.map((grade) => (grade.id === id ? { ...grade, ...updatedGrade } : grade)))
    }

    const deleteGrade = (id: number) => {
        setGrades((prev) => prev.filter((grade) => grade.id !== id))
    }

    const getGradesByStudent = (studentId: number) => {
        return grades.filter((grade) => grade.studentId === studentId)
    }

    const getGradesByEvaluation = (evaluationId: number) => {
        return grades.filter((grade) => grade.evaluationId === evaluationId)
    }

    // Attendance functions
    const addAttendance = (attendanceRecord: Omit<Attendance, "id">) => {
        const newAttendance = {
            ...attendanceRecord,
            id: Math.max(...attendance.map((a) => a.id), 0) + 1,
        }
        setAttendance((prev) => [...prev, newAttendance])
    }

    const updateAttendance = (id: number, updatedAttendance: Partial<Attendance>) => {
        setAttendance((prev) => prev.map((record) => (record.id === id ? { ...record, ...updatedAttendance } : record)))
    }

    const getAttendanceByStudent = (studentId: number) => {
        return attendance.filter((record) => record.studentId === studentId)
    }

    const getAttendanceByTeacher = (teacherId: number) => {
        return attendance.filter((record) => record.teacherId === teacherId)
    }

    // Observation functions
    const addObservation = (observation: Omit<Observation, "id">) => {
        const newObservation = {
            ...observation,
            id: Math.max(...observations.map((o) => o.id), 0) + 1,
        }
        setObservations((prev) => [...prev, newObservation])
    }

    const updateObservation = (id: number, updatedObservation: Partial<Observation>) => {
        setObservations((prev) => prev.map((obs) => (obs.id === id ? { ...obs, ...updatedObservation } : obs)))
    }

    const deleteObservation = (id: number) => {
        setObservations((prev) => prev.filter((obs) => obs.id !== id))
    }

    const getObservationsByStudent = (studentId: number) => {
        return observations.filter((obs) => obs.studentId === studentId)
    }

    const getObservationsByTeacher = (teacherId: number) => {
        return observations.filter((obs) => obs.teacherId === teacherId)
    }

    // Assignment functions
    const checkConflicts = (newAssignment: Omit<Assignment, "id" | "conflicts">): string[] => {
        const conflicts: string[] = []

        assignments.forEach((existing) => {
            if (existing.status === "inactive") return

            // Check teacher conflict
            if (existing.teacherId === newAssignment.teacherId && existing.schedule.day === newAssignment.schedule.day) {
                const existingStart = existing.schedule.startTime
                const existingEnd = existing.schedule.endTime
                const newStart = newAssignment.schedule.startTime
                const newEnd = newAssignment.schedule.endTime

                if (
                    (newStart >= existingStart && newStart < existingEnd) ||
                    (newEnd > existingStart && newEnd <= existingEnd) ||
                    (newStart <= existingStart && newEnd >= existingEnd)
                ) {
                    conflicts.push(
                        `Conflicto de profesor: ${existing.teacherName} ya tiene clase de ${existingStart} a ${existingEnd}`,
                    )
                }
            }

            // Check classroom conflict
            if (existing.classroom === newAssignment.classroom && existing.schedule.day === newAssignment.schedule.day) {
                const existingStart = existing.schedule.startTime
                const existingEnd = existing.schedule.endTime
                const newStart = newAssignment.schedule.startTime
                const newEnd = newAssignment.schedule.endTime

                if (
                    (newStart >= existingStart && newStart < existingEnd) ||
                    (newEnd > existingStart && newEnd <= existingEnd) ||
                    (newStart <= existingStart && newEnd >= existingEnd)
                ) {
                    conflicts.push(
                        `Conflicto de aula: ${existing.classroom} ya está ocupada de ${existingStart} a ${existingEnd}`,
                    )
                }
            }

            // Check course conflict
            if (existing.course === newAssignment.course && existing.schedule.day === newAssignment.schedule.day) {
                const existingStart = existing.schedule.startTime
                const existingEnd = existing.schedule.endTime
                const newStart = newAssignment.schedule.startTime
                const newEnd = newAssignment.schedule.endTime

                if (
                    (newStart >= existingStart && newStart < existingEnd) ||
                    (newEnd > existingStart && newEnd <= existingEnd) ||
                    (newStart <= existingStart && newEnd >= existingEnd)
                ) {
                    conflicts.push(
                        `Conflicto de curso: ${existing.course} ya tiene ${existing.subject} de ${existingStart} a ${existingEnd}`,
                    )
                }
            }
        })

        return conflicts
    }

    const addAssignment = (assignment: Omit<Assignment, "id" | "conflicts">) => {
        const conflicts = checkConflicts(assignment)
        const newAssignment = {
            ...assignment,
            id: Math.max(...assignments.map((a) => a.id), 0) + 1,
            conflicts,
        }
        setAssignments((prev) => [...prev, newAssignment])
    }

    const updateAssignment = (id: number, updatedAssignment: Partial<Assignment>) => {
        setAssignments((prev) =>
            prev.map((assignment) => (assignment.id === id ? { ...assignment, ...updatedAssignment } : assignment)),
        )
    }

    const deleteAssignment = (id: number) => {
        setAssignments((prev) => prev.filter((assignment) => assignment.id !== id))
    }

    const value: DataContextType = {
        // Users
        users,
        addUser,
        updateUser,
        deleteUser,
        getUserById,
        getUsersByRole,

        // Evaluations
        evaluations,
        addEvaluation,
        updateEvaluation,
        deleteEvaluation,
        getEvaluationsByTeacher,
        getEvaluationsByCourse,

        // Grades
        grades,
        addGrade,
        updateGrade,
        deleteGrade,
        getGradesByStudent,
        getGradesByEvaluation,

        // Attendance
        attendance,
        addAttendance,
        updateAttendance,
        getAttendanceByStudent,
        getAttendanceByTeacher,

        // Observations
        observations,
        addObservation,
        updateObservation,
        deleteObservation,
        getObservationsByStudent,
        getObservationsByTeacher,

        // Assignments
        assignments,
        addAssignment,
        updateAssignment,
        deleteAssignment,
        checkConflicts,
    }

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
