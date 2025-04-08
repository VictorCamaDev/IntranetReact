"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Lock, Mail, User } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedCompany, setSelectedCompany] = useState<string>("")

  useEffect(() => {
    // Recuperar la empresa seleccionada
    const company = localStorage.getItem("selectedCompany")
    if (!company) {
      router.push("/company-select")
    } else {
      setSelectedCompany(company)
    }
  }, [router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulación de login
    setTimeout(() => {
      // Guardar información de usuario en localStorage
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          name: "VICTOR CAMA ALBURQUEQUE",
          role: "OPERADOR SISTEMAS",
          id: "76030404",
          zone: "LIMA - OFICINA",
          department: "SIST",
        }),
      )

      router.push("/dashboard")
    }, 1500)
  }

  const handleMicrosoftLogin = () => {
    setLoading(true)

    // Abrir ventana de Microsoft para autenticación
    const microsoftAuthUrl = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize"
    const redirectUri = window.location.origin + "/auth/microsoft-callback"
    const clientId = "YOUR_MICROSOFT_CLIENT_ID" // Esto debe ser reemplazado con el ID real

    const authUrl = `${microsoftAuthUrl}?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&response_mode=query&scope=openid%20profile%20email%20offline_access&state=${encodeURIComponent(selectedCompany)}`

    // Abrir ventana de autenticación
    const authWindow = window.open(authUrl, "Microsoft Login", "width=600,height=600")

    // Verificar si la ventana se abrió correctamente
    if (!authWindow) {
      alert("Por favor, permita ventanas emergentes para iniciar sesión con Microsoft")
      setLoading(false)
      return
    }

    // Simulación de login exitoso (para demo)
    setTimeout(() => {
      if (authWindow) authWindow.close()

      // Guardar información de usuario en localStorage
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          name: "VICTOR CAMA ALBURQUEQUE",
          role: "OPERADOR SISTEMAS",
          id: "76030404",
          zone: "LIMA - OFICINA",
          department: "SIST",
        }),
      )

      router.push("/dashboard")
    }, 3000)
  }

  const getCompanyName = (code: string) => {
    const companies: Record<string, string> = {
      silvestre: "SILVESTRE",
      silvestre_peru: "SILVESTRE PERÚ",
      neoagrum: "NEOAGRUM",
      procampo: "PROCAMPO",
    }
    return companies[code] || code.toUpperCase()
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-transparent">
      <div className="flex w-full max-w-6xl flex-col md:flex-row">
        {/* Logo y branding en el lado izquierdo */}
        <div className="flex flex-1 flex-col items-center justify-center p-8 md:items-start md:p-16">
          <div className="mb-8 w-64">
            <Image
              src="/gslogo-i.png?height=150&width=300"
              alt="Grupo Silvestre"
              width={300}
              height={150}
              priority
              className="h-auto w-full"
            />
          </div>
          <h1 className="text-2xl font-bold text-[#fff] md:text-3xl">Bienvenido al Portal Corporativo</h1>
          <p className="mt-4 text-center text-muted-foreground md:text-left text-[#fff]">
            Acceda a todas las herramientas y recursos de su empresa
          </p>
        </div>

        {/* Formulario de login en el lado derecho */}
        <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 p-8 md:p-16">
          <div className="w-full max-w-md space-y-6">
            <div className="flex items-center justify-between">
              <Link
                href="/company-select"
                className="flex items-center text-sm font-medium text-[#115740] hover:underline"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Cambiar empresa
              </Link>
              <div className="text-right">
                <h2 className="text-lg font-semibold text-[#115740]">{getCompanyName(selectedCompany)}</h2>
              </div>
            </div>

            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <Tabs defaultValue="microsoft" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="microsoft">Microsoft 365</TabsTrigger>
                    <TabsTrigger value="credentials">Usuario y Contraseña</TabsTrigger>
                  </TabsList>

                  <TabsContent value="microsoft" className="space-y-4 pt-4">
                    <div className="flex flex-col items-center space-y-4">
                      <p className="text-center text-sm text-muted-foreground">
                        Inicie sesión con su cuenta corporativa de Microsoft 365
                      </p>
                      <Button
                        onClick={handleMicrosoftLogin}
                        className="w-full bg-[#0078d4] text-white hover:bg-[#106ebe]"
                        disabled={loading}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        {loading ? "Conectando..." : "Continuar con Microsoft"}
                      </Button>
                      <div className="text-center text-xs text-muted-foreground">
                        Se abrirá una ventana para autenticar su cuenta de Microsoft
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="credentials" className="space-y-4 pt-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Usuario</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="username" placeholder="Ingrese su nombre de usuario" className="pl-10" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Contraseña</Label>
                          <Link href="#" className="text-sm text-[#115740] hover:underline">
                            ¿Olvidó su contraseña?
                          </Link>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="Ingrese su contraseña"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-[#00a651] text-white hover:bg-[#00954a]"
                        disabled={loading}
                      >
                        {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="text-center text-sm text-muted-foreground">
              ¿Problemas para acceder?{" "}
              <Link href="#" className="text-[#115740] hover:underline">
                Contacte a soporte
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

