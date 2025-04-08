"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function CompanySelect() {
  const router = useRouter()
  const [selectedCompany, setSelectedCompany] = useState<string>("")

  const handleContinue = () => {
    if (selectedCompany) {
      // Guardar la empresa seleccionada en localStorage
      localStorage.setItem("selectedCompany", selectedCompany)
      router.push("/login")
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white">
      <div className="flex w-full max-w-6xl flex-col md:flex-row">
        {/* Logo y branding en el lado izquierdo */}
        <div className="flex flex-1 flex-col items-center justify-center p-8 md:items-start md:p-16">
          <div className="mb-8 w-64">
            <Image
              src="/placeholder.svg?height=150&width=300"
              alt="Grupo Silvestre"
              width={300}
              height={150}
              priority
              className="h-auto w-full"
            />
          </div>
          <h1 className="text-2xl font-bold text-[#115740] md:text-3xl">Bienvenido al Portal Corporativo</h1>
          <p className="mt-4 text-center text-muted-foreground md:text-left">
            Acceda a todas las herramientas y recursos de su empresa
          </p>
        </div>

        {/* Selector de empresa en el lado derecho */}
        <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 p-8 md:p-16">
          <div className="w-full max-w-md space-y-6">
            <h2 className="text-center text-xl font-semibold text-[#115740] md:text-left">GRUPO SILVESTRE</h2>

            <div className="space-y-2">
              <label htmlFor="company-select" className="text-sm font-medium">
                Seleccione su empresa
              </label>
              <Select onValueChange={setSelectedCompany} value={selectedCompany}>
                <SelectTrigger id="company-select" className="w-full border-[#115740] focus:ring-[#115740]">
                  <SelectValue placeholder="Seleccione una empresa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="silvestre">SILVESTRE</SelectItem>
                  <SelectItem value="neoagrum">NEOAGRUM</SelectItem>
                  <SelectItem value="clenvi">CLENVI</SelectItem>
                  <SelectItem value="itagro">ITAGRO</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleContinue}
              disabled={!selectedCompany}
              className="w-full bg-[#00a651] text-white hover:bg-[#00954a]"
            >
              INGRESAR
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

