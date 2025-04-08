"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import {
  CalendarIcon,
  FileText,
  ShoppingCart,
  DollarSign,
  BarChart3,
  ChevronRight,
  ChevronLeft,
  Info,
} from "lucide-react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [chartData, setChartData] = useState<any>(null)

  useEffect(() => {
    // Datos de ejemplo para el gráfico
    const data = {
      labels: ["Lima", "Arequipa", "Trujillo", "Chiclayo", "Piura", "Cusco"],
      datasets: [
        {
          label: "Ventas por Zona",
          data: [35000, 25000, 18000, 15000, 12000, 10000],
          backgroundColor: "#7a9a01",
        },
      ],
    }

    setChartData(data)
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 2,
    }).format(value)
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tablero Principal</h1>
          <p className="text-muted-foreground">Resumen de indicadores y métricas clave</p>
        </div>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {date ? format(date, "MMMM yyyy", { locale: es }) : "Seleccione mes"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="p-3">
                <div className="flex justify-between mb-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newDate = new Date(date || new Date())
                      newDate.setFullYear(newDate.getFullYear() - 1)
                      setDate(newDate)
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-sm font-medium py-1">
                    {date ? format(date, "yyyy", { locale: es }) : new Date().getFullYear()}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newDate = new Date(date || new Date())
                      newDate.setFullYear(newDate.getFullYear() + 1)
                      setDate(newDate)
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 12 }, (_, i) => {
                    const monthDate = new Date()
                    monthDate.setMonth(i)
                    const monthName = format(monthDate, "MMM", { locale: es })
                    const isSelected = date ? date.getMonth() === i : false

                    return (
                      <Button
                        key={i}
                        variant={isSelected ? "default" : "outline"}
                        className="text-xs"
                        onClick={() => {
                          const newDate = new Date(date || new Date())
                          newDate.setMonth(i)
                          setDate(newDate)
                        }}
                      >
                        {monthName}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Registrados</CardTitle>
            <ShoppingCart className="h-4 w-4 text-[#115740]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">309</div>
            <p className="text-xs text-muted-foreground">+5% desde el mes pasado</p>
            <Button variant="link" size="sm" className="mt-2 h-auto p-0 text-xs text-[#115740]">
              Más Info <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Aprobados</CardTitle>
            <FileText className="h-4 w-4 text-[#115740]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(614933.26)}</div>
            <p className="text-xs text-muted-foreground">+12% desde el mes pasado</p>
            <Button variant="link" size="sm" className="mt-2 h-auto p-0 text-xs text-[#115740]">
              Más Info <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas del Mes</CardTitle>
            <DollarSign className="h-4 w-4 text-[#115740]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(205214.93)}</div>
            <p className="text-xs text-muted-foreground">+8% desde el mes pasado</p>
            <Button variant="link" size="sm" className="mt-2 h-auto p-0 text-xs text-[#115740]">
              Más Info <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas del Día</CardTitle>
            <BarChart3 className="h-4 w-4 text-[#115740]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(53200.75)}</div>
            <p className="text-xs text-muted-foreground">+15% desde ayer</p>
            <Button variant="link" size="sm" className="mt-2 h-auto p-0 text-xs text-[#115740]">
              Más Info <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ventas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ventas">Ventas</TabsTrigger>
          <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
          <TabsTrigger value="inventario">Inventario</TabsTrigger>
        </TabsList>

        <TabsContent value="ventas" className="space-y-4">
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Total Ventas por Zona</CardTitle>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Info className="h-3.5 w-3.5" />
                <span>Ayuda</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {chartData && (
                  <Bar
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            callback: (value) => formatCurrency(Number(value)),
                          },
                        },
                      },
                      plugins: {
                        legend: {
                          position: "top" as const,
                        },
                        title: {
                          display: false,
                        },
                      },
                    }}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pedidos" className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Estado de Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Contenido de la pestaña de pedidos en desarrollo.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventario" className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Estado de Inventario</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Contenido de la pestaña de inventario en desarrollo.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

