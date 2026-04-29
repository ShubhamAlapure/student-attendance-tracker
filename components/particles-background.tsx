"use client"

import React, { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  colorRGB: string
}

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let particles: Particle[] = []
    let animationFrameId: number
    let mouse = { x: -1000, y: -1000 }

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const googleColors = [
      "66, 133, 244",  // Blue
      "234, 67, 53",   // Red
      "251, 188, 5",   // Yellow
      "52, 168, 83"    // Green
    ]

    const initParticles = () => {
      particles = []
      // Number of particles depends on screen size
      const numParticles = Math.floor((canvas.width * canvas.height) / 15000)
      for (let i = 0; i < numParticles; i++) {
        const randomColor = googleColors[Math.floor(Math.random() * googleColors.length)]
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          radius: Math.random() * 2 + 1,
          colorRGB: randomColor,
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, index) => {
        // Move particles
        p.x += p.vx
        p.y += p.vy

        // Bounce off edges smoothly
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        // Keep particles within bounds just in case
        if (p.x < 0) p.x = 0;
        if (p.x > canvas.width) p.x = canvas.width;
        if (p.y < 0) p.y = 0;
        if (p.y > canvas.height) p.y = canvas.height;

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.colorRGB}, 0.8)`
        ctx.fill()

        // Connect nearby particles
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(${p.colorRGB}, ${0.3 * (1 - distance / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }

        // Interact with mouse
        const mouseDx = p.x - mouse.x
        const mouseDy = p.y - mouse.y
        const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy)

        if (mouseDistance < 150) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(${p.colorRGB}, ${0.5 * (1 - mouseDistance / 150)})`
          ctx.lineWidth = 1
          ctx.stroke()
          
          // Repel particles slightly from mouse
          p.x += mouseDx * 0.01
          p.y += mouseDy * 0.01
        }
      })

      animationFrameId = requestAnimationFrame(drawParticles)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseOut = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    window.addEventListener("resize", updateCanvasSize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseout", handleMouseOut)

    updateCanvasSize()
    drawParticles()

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseout", handleMouseOut)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme, resolvedTheme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  )
}
