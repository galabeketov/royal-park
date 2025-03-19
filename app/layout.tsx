"use client"

import { useEffect, useState, useCallback } from "react"
import { Poppins } from "next/font/google"
import Image from "next/image"
import { Loader } from "@/components/Loader"
import "@/styles/globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-poppins",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const updateCursorPosition = useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    })
  }, [])

  useEffect(() => {
    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    const interactiveElements = document.querySelectorAll('a, button, input, [role="button"]')
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter)
      element.addEventListener("mouseleave", handleMouseLeave)
    })

    window.addEventListener("mousemove", updateCursorPosition)

    // Simulate loading time (remove this in production and use real loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("mousemove", updateCursorPosition)
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter)
        element.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [updateCursorPosition])

  return (
    <html lang="en" className={`${poppins.variable} font-sans`}>
      <body>
        {isLoading && <Loader />}
        <div className={`fixed inset-0 z-0 transition-all duration-1000 ${isLoading ? "blur-3xl" : "blur-none"}`}>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-b0m9O1QEBHRhGRcIwzfxdJ324BLxfi.png"
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
            className="opacity-40 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.1),transparent_70%)]" />
        </div>
        <div
          className={`cursor-spotlight ${isHovering ? "hovering" : ""}`}
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: `translate(-50%, -50%)`,
          }}
        >
          <div className="inner-circle"></div>
        </div>
        <div className={`transition-all duration-1000 ${isLoading ? "opacity-0 blur-xl" : "opacity-100 blur-none"}`}>
          {children}
        </div>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
