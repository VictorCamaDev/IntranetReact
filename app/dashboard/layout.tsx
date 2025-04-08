"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart3,
  ShoppingCart,
  FileText,
  DollarSign,
  Warehouse,
  Calculator,
  Scale,
  Settings,
  LogOut,
  ChevronDown,
  Wrench,
  ShoppingBag,
  Factory,
  Landmark,
  BadgeCheck,
  Info,
  Users,
  TrendingUp,
  Award,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserInfo {
  name: string
  role: string
  id: string
  zone: string
  department: string
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [selectedCompany, setSelectedCompany] = useState<string>("")

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const userInfoStr = localStorage.getItem("userInfo")
    const company = localStorage.getItem("selectedCompany")

    if (!userInfoStr || !company) {
      router.push("/login")
      return
    }

    setUserInfo(JSON.parse(userInfoStr))
    setSelectedCompany(company)
  }, [router])

  const handleLogout = () => {
    // Eliminar información de usuario
    localStorage.removeItem("userInfo")
    router.push("/login")
  }

  const getCompanyName = (code: string) => {
    const companies: Record<string, string> = {
      silvestre: "SILVESTRE",
      neoagrum: "NEOAGRUM",
      clenvi: "CLENVI",
      itagro: "ITAGRO",
    }
    return companies[code] || code.toUpperCase()
  }

  if (!userInfo) {
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-[#00a651] px-4 text-white md:px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-white hover:bg-[#00954a] hover:text-white" />
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <Image src="/logo-silvestre.png" alt="Grupo Silvestre" width={120} height={32} className="h-8 w-auto" />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-sm md:block">
              <div className="font-semibold">
                {userInfo.role}: {userInfo.department} - {userInfo.name}
              </div>
              <div className="flex justify-between text-xs">
                <span>ID VENDEDOR: {userInfo.id}</span>
                <span className="ml-4">ZONA: {userInfo.zone}</span>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-white hover:bg-[#00954a] hover:text-white"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={userInfo.name} />
                    <AvatarFallback className="bg-[#115740] text-white">
                      {userInfo.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2 md:hidden">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{userInfo.name}</p>
                    <p className="text-sm text-muted-foreground">ID: {userInfo.id}</p>
                  </div>
                </div>
                <DropdownMenuSeparator className="md:hidden" />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Mi Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">Configuración</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-[#00954a] hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Cerrar Sesión</span>
            </Button>
          </div>
        </header>

        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar className="border-r border-border">
            <SidebarHeader>
              <div className="flex flex-col space-y-2 p-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt={userInfo.name} />
                      <AvatarFallback className="bg-[#115740] text-white">
                        {userInfo.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{userInfo.id}</span>
                      <span className="text-xs text-muted-foreground">Conectado</span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full justify-between">
                      {getCompanyName(selectedCompany)}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                    <DropdownMenuItem onClick={() => router.push("/company-select")}>Cambiar empresa</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>MENÚ DE NAVEGACIÓN</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === "/dashboard"} tooltip="Tablero Principal">
                        <Link href="/dashboard">
                          <BarChart3 className="h-4 w-4" />
                          <span>Tablero Principal</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname.includes("/dashboard/comercial")}
                        tooltip="Comercial"
                      >
                        <Link href="/dashboard/comercial">
                          <ShoppingCart className="h-4 w-4" />
                          <span>Comercial</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname.includes("/dashboard/gsgana")} tooltip="GS Gana">
                        <Link href="/dashboard/gsgana">
                          <Award className="h-4 w-4" />
                          <span>GS Gana</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname.includes("/dashboard/finanzas")} tooltip="Finanzas">
                        <Link href="/dashboard/finanzas">
                          <DollarSign className="h-4 w-4" />
                          <span>Finanzas</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname.includes("/dashboard/almacen")} tooltip="Almacén">
                        <Link href="/dashboard/almacen">
                          <Warehouse className="h-4 w-4" />
                          <span>Almacén</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname.includes("/dashboard/contabilidad")}
                        tooltip="Contabilidad"
                      >
                        <Link href="/dashboard/contabilidad">
                          <Calculator className="h-4 w-4" />
                          <span>Contabilidad</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname.includes("/dashboard/legal")} tooltip="Legal">
                        <Link href="/dashboard/legal">
                          <Scale className="h-4 w-4" />
                          <span>Legal</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname.includes("/dashboard/mantenimiento")}
                        tooltip="Mantenimiento"
                      >
                        <Link href="/dashboard/mantenimiento">
                          <Wrench className="h-4 w-4" />
                          <span>Mantenimiento</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname.includes("/dashboard/documentos")}
                        tooltip="Doc. Electrónico"
                      >
                        <Link href="/dashboard/documentos">
                          <FileText className="h-4 w-4" />
                          <span>Doc. Electrónico</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname.includes("/dashboard/sistema")} tooltip="Sistema">
                        <Link href="/dashboard/sistema">
                          <Settings className="h-4 w-4" />
                          <span>Sistema</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname.includes("/dashboard/compras")} tooltip="Compras">
                        <Link href="/dashboard/compras">
                          <ShoppingBag className="h-4 w-4" />
                          <span>Compras</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname.includes("/dashboard/produccion")}
                        tooltip="Producción"
                      >
                        <Link href="/dashboard/produccion">
                          <Factory className="h-4 w-4" />
                          <span>Producción</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname.includes("/dashboard/tesoreria")}
                        tooltip="Tesorería"
                      >
                        <Link href="/dashboard/tesoreria">
                          <Landmark className="h-4 w-4" />
                          <span>Tesorería</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname.includes("/dashboard/calidad")} tooltip="Calidad">
                        <Link href="/dashboard/calidad">
                          <BadgeCheck className="h-4 w-4" />
                          <span>Calidad</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname.includes("/dashboard/informacion")}
                        tooltip="Información"
                      >
                        <Link href="/dashboard/informacion">
                          <Info className="h-4 w-4" />
                          <span>Información</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname.includes("/dashboard/rrhh")} tooltip="RRHH">
                        <Link href="/dashboard/rrhh">
                          <Users className="h-4 w-4" />
                          <span>RRHH</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname.includes("/dashboard/marketing")}
                        tooltip="Marketing"
                      >
                        <Link href="/dashboard/marketing">
                          <TrendingUp className="h-4 w-4" />
                          <span>Marketing</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
              <div className="flex items-center justify-between p-4">
                <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} Grupo Silvestre</div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only">Cerrar Sesión</span>
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            {children}

            <footer className="mt-auto border-t bg-white py-4">
              <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                  <div className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Grupo Silvestre. Todos los derechos reservados.
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                    <a
                      href="https://maps.google.com/?q=Calle+Arica+242+Miraflores+Lima+18"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-[#115740]"
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      <span>Calle Arica 242 Miraflores Lima 18 - Perú</span>
                    </a>

                    <a href="tel:+51617-3300" className="flex items-center gap-1 hover:text-[#115740]">
                      <Phone className="h-3.5 w-3.5" />
                      <span>617-3300</span>
                    </a>

                    <a href="mailto:sec@gruposilvestre.com.pe" className="flex items-center gap-1 hover:text-[#115740]">
                      <Mail className="h-3.5 w-3.5" />
                      <span>sec@gruposilvestre.com.pe</span>
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

