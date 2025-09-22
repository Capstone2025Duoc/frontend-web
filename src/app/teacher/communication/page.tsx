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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Plus,
    Send,
    Inbox,
    MessageSquare,
    Users,
    Calendar,
    Paperclip,
    Search,
    Filter,
    MoreHorizontal,
    Reply,
    Forward,
    Archive,
} from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export default function CommunicationPage() {
    const [selectedTab, setSelectedTab] = useState("inbox")
    const [selectedRecipients, setSelectedRecipients] = useState<string[]>([])

    const messages = [
        {
            id: 1,
            from: "Dirección Académica",
            fromEmail: "direccion@colegio.edu",
            subject: "Reunión de Coordinación Académica",
            preview: "Se convoca a reunión para revisar el plan curricular del próximo semestre...",
            content:
                "Estimados profesores, se convoca a reunión de coordinación académica para el día viernes 24 de noviembre a las 14:00 horas en el aula magna. El objetivo es revisar el plan curricular del próximo semestre y coordinar las actividades de fin de año.",
            date: new Date("2024-11-20T10:30:00"),
            isRead: false,
            isImportant: true,
            hasAttachment: true,
        },
        {
            id: 2,
            from: "Ana García López",
            fromEmail: "ana.garcia@estudiante.edu",
            subject: "Consulta sobre Examen de Matemáticas",
            preview: "Profesora, tengo una duda sobre el tema que entra en el examen...",
            content:
                "Estimada Profesora González, espero se encuentre bien. Tengo una consulta sobre el examen de matemáticas del próximo viernes. ¿Podría confirmar si entra el tema de ecuaciones cuadráticas? Muchas gracias por su tiempo.",
            date: new Date("2024-11-19T16:45:00"),
            isRead: true,
            isImportant: false,
            hasAttachment: false,
        },
        {
            id: 3,
            from: "Coordinación Pedagógica",
            fromEmail: "pedagogia@colegio.edu",
            subject: "Entrega de Notas - Segundo Parcial",
            preview: "Recordatorio: La fecha límite para la entrega de notas es el 25 de noviembre...",
            content:
                "Estimados docentes, les recordamos que la fecha límite para la entrega de las calificaciones del segundo parcial es el día 25 de noviembre hasta las 18:00 horas. Por favor, asegúrense de subir todas las notas al sistema antes de la fecha indicada.",
            date: new Date("2024-11-18T09:15:00"),
            isRead: true,
            isImportant: true,
            hasAttachment: false,
        },
        {
            id: 4,
            from: "Carlos Rodríguez Pérez",
            fromEmail: "carlos.rodriguez@estudiante.edu",
            subject: "Solicitud de Tutoría",
            preview: "Profesor, me gustaría solicitar una tutoría para reforzar los temas de álgebra...",
            content:
                "Estimado Profesor, espero se encuentre bien. Me dirijo a usted para solicitar una tutoría adicional en los temas de álgebra, específicamente en factorización y productos notables. Tengo dificultades para entender algunos conceptos. ¿Sería posible coordinar una sesión la próxima semana?",
            date: new Date("2024-11-17T14:20:00"),
            isRead: false,
            isImportant: false,
            hasAttachment: false,
        },
        {
            id: 5,
            from: "Secretaría Académica",
            fromEmail: "secretaria@colegio.edu",
            subject: "Actualización de Datos Docentes",
            preview: "Se solicita actualizar la información personal en el sistema...",
            content:
                "Estimados profesores, se solicita actualizar su información personal en el sistema académico. Por favor, ingresen al portal docente y verifiquen que sus datos de contacto, formación académica y experiencia profesional estén actualizados.",
            date: new Date("2024-11-16T11:00:00"),
            isRead: true,
            isImportant: false,
            hasAttachment: true,
        },
    ]

    const sentMessages = [
        {
            id: 1,
            to: "3° A - Matemáticas",
            subject: "Recordatorio: Examen del Viernes",
            preview: "Estimados estudiantes, les recuerdo que el examen de matemáticas será el viernes...",
            date: new Date("2024-11-19T08:30:00"),
            recipients: 28,
        },
        {
            id: 2,
            to: "Padres de Familia - 3° A",
            subject: "Informe de Rendimiento Académico",
            preview: "Estimados padres, adjunto el informe de rendimiento del segundo parcial...",
            date: new Date("2024-11-18T15:45:00"),
            recipients: 28,
        },
    ]

    const courses = [
        { value: "3a-matematicas", label: "3° A - Matemáticas", students: 28 },
        { value: "4b-algebra", label: "4° B - Álgebra", students: 25 },
        { value: "2c-geometria", label: "2° C - Geometría", students: 30 },
    ]

    const recipientGroups = [
        { value: "students-3a", label: "Estudiantes 3° A", count: 28 },
        { value: "students-4b", label: "Estudiantes 4° B", count: 25 },
        { value: "students-2c", label: "Estudiantes 2° C", count: 30 },
        { value: "parents-3a", label: "Padres 3° A", count: 28 },
        { value: "parents-4b", label: "Padres 4° B", count: 25 },
        { value: "parents-2c", label: "Padres 2° C", count: 30 },
        { value: "teachers", label: "Profesores", count: 15 },
        { value: "administration", label: "Administración", count: 8 },
    ]

    const getMessageStats = () => {
        const unread = messages.filter((m) => !m.isRead).length
        const important = messages.filter((m) => m.isImportant).length
        const total = messages.length

        return { unread, important, total }
    }

    const stats = getMessageStats()

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
                            <BreadcrumbPage>Comunicación</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Comunicación</h1>
                        <p className="text-muted-foreground">
                            Gestiona la comunicación con estudiantes, padres y personal administrativo.
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline">
                            <Search className="mr-2 h-4 w-4" />
                            Buscar
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Nuevo Mensaje
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[700px]">
                                <DialogHeader>
                                    <DialogTitle>Redactar Nuevo Mensaje</DialogTitle>
                                    <DialogDescription>
                                        Envía un mensaje a estudiantes, padres o personal administrativo.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="recipients">Destinatarios</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar grupo de destinatarios" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {recipientGroups.map((group) => (
                                                    <SelectItem key={group.value} value={group.value}>
                                                        {group.label} ({group.count} personas)
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Asunto</Label>
                                        <Input id="subject" placeholder="Asunto del mensaje" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Mensaje</Label>
                                        <Textarea id="message" placeholder="Escribe tu mensaje aquí..." className="min-h-[150px]" />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="important" />
                                        <Label htmlFor="important">Marcar como importante</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="outline" size="sm">
                                            <Paperclip className="h-4 w-4 mr-1" />
                                            Adjuntar Archivo
                                        </Button>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline">Guardar Borrador</Button>
                                    <Button type="submit">
                                        <Send className="mr-2 h-4 w-4" />
                                        Enviar Mensaje
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Mensajes Totales</CardTitle>
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <p className="text-xs text-muted-foreground">En bandeja de entrada</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">No Leídos</CardTitle>
                            <Inbox className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{stats.unread}</div>
                            <p className="text-xs text-muted-foreground">Requieren atención</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Importantes</CardTitle>
                            <Calendar className="h-4 w-4 text-orange-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">{stats.important}</div>
                            <p className="text-xs text-muted-foreground">Marcados como importantes</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Enviados Hoy</CardTitle>
                            <Send className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">3</div>
                            <p className="text-xs text-muted-foreground">Mensajes enviados</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Messages Interface */}
                <Card>
                    <CardHeader>
                        <CardTitle>Centro de Mensajes</CardTitle>
                        <CardDescription>Gestiona tu comunicación con la comunidad educativa</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="inbox">
                                    <Inbox className="mr-2 h-4 w-4" />
                                    Bandeja de Entrada ({stats.unread})
                                </TabsTrigger>
                                <TabsTrigger value="sent">
                                    <Send className="mr-2 h-4 w-4" />
                                    Enviados
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="inbox" className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Button variant="outline" size="sm">
                                            <Filter className="h-4 w-4 mr-1" />
                                            Filtrar
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Archive className="h-4 w-4 mr-1" />
                                            Archivar
                                        </Button>
                                    </div>
                                    <Input placeholder="Buscar mensajes..." className="max-w-sm" />
                                </div>

                                <div className="space-y-2">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`border rounded-lg p-4 cursor-pointer transition-colors hover:bg-muted/50 ${!message.isRead ? "bg-blue-50 border-blue-200" : ""
                                                }`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start space-x-3 flex-1">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                                                        <AvatarFallback>
                                                            {message.from
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 space-y-1">
                                                        <div className="flex items-center space-x-2">
                                                            <h4 className={`font-medium ${!message.isRead ? "font-bold" : ""}`}>{message.from}</h4>
                                                            {message.isImportant && (
                                                                <Badge variant="destructive" className="text-xs">
                                                                    Importante
                                                                </Badge>
                                                            )}
                                                            {message.hasAttachment && <Paperclip className="h-3 w-3 text-muted-foreground" />}
                                                        </div>
                                                        <p className={`text-sm ${!message.isRead ? "font-semibold" : ""}`}>{message.subject}</p>
                                                        <p className="text-sm text-muted-foreground line-clamp-1">{message.preview}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-xs text-muted-foreground">
                                                        {format(message.date, "dd MMM HH:mm", { locale: es })}
                                                    </span>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-end space-x-2 mt-3">
                                                <Button variant="ghost" size="sm">
                                                    <Reply className="h-4 w-4 mr-1" />
                                                    Responder
                                                </Button>
                                                <Button variant="ghost" size="sm">
                                                    <Forward className="h-4 w-4 mr-1" />
                                                    Reenviar
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="sent" className="space-y-4">
                                <div className="space-y-2">
                                    {sentMessages.map((message) => (
                                        <div key={message.id} className="border rounded-lg p-4">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-1">
                                                    <div className="flex items-center space-x-2">
                                                        <h4 className="font-medium">{message.subject}</h4>
                                                        <Badge variant="outline">
                                                            <Users className="h-3 w-3 mr-1" />
                                                            {message.recipients} destinatarios
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">Para: {message.to}</p>
                                                    <p className="text-sm text-muted-foreground line-clamp-1">{message.preview}</p>
                                                </div>
                                                <span className="text-xs text-muted-foreground">
                                                    {format(message.date, "dd MMM HH:mm", { locale: es })}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
