"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirigir a la página de selección de empresa
    router.push("/company-select")
  }, [router])

  return null
}

