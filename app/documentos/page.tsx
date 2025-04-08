import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Download, Eye, Search, Filter } from "lucide-react"

export default function DocumentsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 md:p-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Repositorio de Documentos</h1>

          <Card>
            <CardHeader>
              <CardTitle>Filtros de búsqueda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Buscar documento..." className="pl-8" />
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    <SelectItem value="policies">Políticas</SelectItem>
                    <SelectItem value="procedures">Procedimientos</SelectItem>
                    <SelectItem value="forms">Formularios</SelectItem>
                    <SelectItem value="reports">Reportes</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los departamentos</SelectItem>
                    <SelectItem value="hr">Recursos Humanos</SelectItem>
                    <SelectItem value="finance">Finanzas</SelectItem>
                    <SelectItem value="operations">Operaciones</SelectItem>
                    <SelectItem value="it">Tecnología</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <Filter className="mr-2 h-4 w-4" />
                  Aplicar Filtros
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre del Documento</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          {doc.name}
                        </div>
                      </TableCell>
                      <TableCell>{doc.category}</TableCell>
                      <TableCell>{doc.department}</TableCell>
                      <TableCell>{doc.date}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Ver</span>
                          </Button>
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Descargar</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

// Datos de ejemplo
const documents = [
  {
    name: "Manual de Políticas y Procedimientos",
    category: "Políticas",
    department: "Recursos Humanos",
    date: "15/03/2024",
  },
  {
    name: "Formulario de Solicitud de Vacaciones",
    category: "Formularios",
    department: "Recursos Humanos",
    date: "10/02/2024",
  },
  {
    name: "Reporte Financiero Q1 2024",
    category: "Reportes",
    department: "Finanzas",
    date: "05/04/2024",
  },
  {
    name: "Procedimiento de Compras",
    category: "Procedimientos",
    department: "Operaciones",
    date: "20/01/2024",
  },
  {
    name: "Política de Seguridad de la Información",
    category: "Políticas",
    department: "Tecnología",
    date: "12/03/2024",
  },
  {
    name: "Plan Estratégico 2024",
    category: "Reportes",
    department: "Dirección",
    date: "05/01/2024",
  },
  {
    name: "Formulario de Evaluación de Desempeño",
    category: "Formularios",
    department: "Recursos Humanos",
    date: "18/02/2024",
  },
  {
    name: "Procedimiento de Atención al Cliente",
    category: "Procedimientos",
    department: "Ventas",
    date: "25/03/2024",
  },
]

