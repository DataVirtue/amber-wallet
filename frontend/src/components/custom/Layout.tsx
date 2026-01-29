
import Header from './Header'
import Footer from './Footer'
import { Outlet } from "react-router-dom"
import React, { useState } from "react"

import { Toaster } from "@/components/ui/sonner"

export type LayoutOutletContext = {
  seedPhrase: string
  setSeedPhrase: React.Dispatch<React.SetStateAction<string>>
  accessToken: string
  setAccessToken: React.Dispatch<React.SetStateAction<string>>
}
export default function Layout() {
  const [seedPhrase, setSeedPhrase] = useState("")
  const [accessToken, setAccessToken] = useState("")

  return (
    <div className="flex flex-col flex-1 w-full h-full">
      <Header />
      <main className="w-full h-full overflow-y-auto">
        <Outlet context={{ seedPhrase, setSeedPhrase, accessToken, setAccessToken }} />
        <Toaster position="top-center" />
      </main>
      <Footer />
    </div>
  )
}
