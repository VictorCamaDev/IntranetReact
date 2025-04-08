import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Mail, Phone, Building } from "lucide-react"
import Image from "next/image"

export default function DirectoryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 md:p-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Directorio de Empleados</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar por nombre, departamento o cargo..." className="w-full pl-8" />
            </div>
            <Button>Buscar</Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
            {employees.map((employee, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden">
                      <Image
                        src={`/placeholder.svg?height=64&width=64`}
                        alt={employee.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{employee.name}</CardTitle>
                      <CardDescription>{employee.position}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{employee.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{employee.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{employee.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

// Datos de ejemplo
const employees = [
  {
    name: "Carlos Mendoza",
    position: "Gerente de Ventas",
    department: "Ventas",
    email: "carlos.mendoza@gruposilvestre.com",
    phone: "+51 987 654 321",
  },
  {
    name: "María Rodríguez",
    position: "Directora de Recursos Humanos",
    department: "Recursos Humanos",
    email: "maria.rodriguez@gruposilvestre.com",
    phone: "+51 987 654 322",
  },
  {
    name: "Juan Pérez",
    position: "Analista de Sistemas",
    department: "Tecnología",
    email: "juan.perez@gruposilvestre.com",
    phone: "+51 987 654 323",
  },
  {
    name: "Ana López",
    position: "Contadora Senior",
    department: "Finanzas",
    email: "ana.lopez@gruposilvestre.com",
    phone: "+51 987 654 324",
  },
  {
    name: "Roberto Torres",
    position: "Jefe de Producción",
    department: "Operaciones",
    email: "roberto.torres@gruposilvestre.com",
    phone: "+51 987 654 325",
  },
  {
    name: "Lucía Sánchez",
    position: "Especialista en Marketing",
    department: "Marketing",
    email: "lucia.sanchez@gruposilvestre.com",
    phone: "+51 987 654 326",
  },
]

