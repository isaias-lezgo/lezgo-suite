
'use client'
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  BarChart3,
  Zap,
  CheckCircle,
  Star,
  Play,
  Building2,
  Target,
  Workflow,
  Menu,
  X,
  MessageCircle,
  Rocket,
  TrendingUp,
  Settings,
  Link2,
  MessageSquare,
} from "lucide-react"
import Image from "next/image"

// Import the new, centralized button components
import {
  HeroButtons,
  ExploreFeatureButton,
  PricingButton,
  ContactSpecialistButton,
  FaqToggleButton,
} from "@/components/custom/BotonesLanding" // Adjust the import path as needed
import { FaqSection } from "./FAQ"

import HeroSection from "./Hero"
import Funcionalidades from "./Funcionalidades"
import Precios from "./Precios"
import Pasos from "./Pasos"

export default function LandingPage() {

  return (
    <div className="relative overflow-hidden pt-8">
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating background elements */}
        <div className="hidden lg:block">
          <motion.div
            className="absolute w-[80%] h-[80%] bg-gradient-to-br blur-3xl from-orange-200 via-[#F59B1B] to-orange-400/50 opacity-5 rounded-2xl"
            animate={{
              x: [-200, -120, 80, -60, 100, 200, -80, -120, -200],
              y: [50, -50, 80, -200, 60],
              scale: [1, 1.1, 0.95, 1.05, 1],
              opacity: [0.15, 0.25, 0.2, 0.3, 0.18],
            }}
            transition={{
              duration: 27,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Floating particles */}
          {[
            {
              left: 20,
              top: 30,
              duration: 3.2,
              delay: 0.5,
              size: "w-3 h-3",
              color: "bg-amber-400",
              blur: false,
            },
            {
              left: 80,
              top: 15,
              duration: 4.1,
              delay: 1.2,
              size: "w-2 h-2",
              color: "bg-orange-300",
              blur: true,
            },
            {
              left: 45,
              top: 70,
              duration: 3.8,
              delay: 0.8,
              size: "w-4 h-4",
              color: "bg-yellow-400",
              blur: false,
            },
            {
              left: 90,
              top: 85,
              duration: 3.5,
              delay: 1.5,
              size: "w-1.5 h-1.5",
              color: "bg-amber-500",
              blur: true,
            },
            {
              left: 15,
              top: 60,
              duration: 4.3,
              delay: 0.3,
              size: "w-3 h-3",
              color: "bg-orange-400",
              blur: false,
            },
            {
              left: 70,
              top: 40,
              duration: 3.9,
              delay: 1.0,
              size: "w-2.5 h-2.5",
              color: "bg-yellow-300",
              blur: true,
            },
          ].map((particle, i) => (
            <motion.div
              key={i}
              className={`absolute ${particle.size} ${particle.color
                } rounded-full ${particle.blur ? "blur-[10px]" : "blur-[0px]"}`}
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                boxShadow: particle.blur
                  ? "0 0 20px rgba(245, 155, 27, 0.3)"
                  : "0 0 10px rgba(245, 155, 27, 0.2)",
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.sin(i) * 15, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative">
        <HeroSection />
        <Funcionalidades />
        <Pasos />
        <Precios />
      </div>
    </div>
  )
}