'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { track } from "@vercel/analytics" // Import Vercel's track function

// Handler for all button clicks with Pixel and Vercel tracking
const handleTrackingAndNavigate = (eventName: string, link: string, params?: Record<string, any>) => {
  // Vercel Analytics
  track(eventName, params);
  
  // Facebook Pixel
  if (typeof (window as any).fbq === "function") {
    (window as any).fbq("trackCustom", eventName, params);
  }
};

interface Plan {
  name: string
  link: string
  popular: boolean
}

export const HeroButtons = () => {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 justify-center">
      <Button
        asChild
        size="lg"
        onClick={() => 
          handleTrackingAndNavigate(
            "Prueba Gratis Hero",
            "https://app.lezgosuite.com/payment-link/68ae46632ba55c5eda290d56"
          )
        }
        className="bg-gradient-to-r animate-bounce from-[#F59B1B] to-orange-600 hover:from-orange-600 hover:to-[#F59B1B] text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
      >
        <a
          href="https://app.lezgosuite.com/payment-link/68ae46632ba55c5eda290d56"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center"
        >
          <span className="text-sm sm:text-base lg:text-lg">
            Comienza tu prueba de 30 días GRATIS
          </span>
          <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
        </a>
      </Button>
      <Button
        asChild
        size="lg"
        onClick={() =>
          handleTrackingAndNavigate(
            "Demo Hero",
            "https://app.lezgosuite.com/widget/bookings/conocelezgosuite"
          )
        }
        variant="outline"
        className="border-2 border-[#F59B1B] text-[#F59B1B] hover:bg-[#F59B1B] hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-300 bg-transparent w-full sm:w-auto"
      >
        <a
          href="https://app.lezgosuite.com/widget/bookings/conocelezgosuite"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center"
        >
          <span className="text-sm sm:text-base lg:text-lg">
            Habla con un especialista
          </span>
        </a>
      </Button>
    </div>
  )
}

export const ExploreFeatureButton = ({ href }: { href: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-6"
      style={{ willChange: "transform, opacity" }}
    >
      <Button
        asChild
        variant="ghost"
        onClick={() => 
          handleTrackingAndNavigate("Explorar funcionalidades", href, { target_href: href })
        }
        className="text-[#F59B1B] cursor-pointer p-0 font-semibold"
      >
        <Link href={href}>
          Explorar más
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </motion.div>
  )
}

export const PricingButton = ({ plan }: { plan: Plan }) => {
  return (
    <Button
      asChild
      onClick={() =>
        handleTrackingAndNavigate(
          `Empezar plan - ${plan}`,
          plan.link,
          { plan_name: plan.name }
        )
      }
      className={`w-full ${
        plan.popular
          ? "bg-gradient-to-r from-[#F59B1B] to-orange-600 hover:from-orange-600 hover:to-[#F59B1B] text-white"
          : "border-2 border-[#F59B1B] text-[#F59B1B] hover:bg-[#F59B1B] hover:text-white"
      } font-semibold py-3 transition-all duration-300`}
      variant={plan.popular ? "default" : "outline"}
    >
      <a href={plan.link} target="_blank" rel="noopener noreferrer">
        Comenzar Ahora
      </a>
    </Button>
  )
}

export const ContactSpecialistButton = () => {
  return (
    <Button asChild variant="secondary" className="animate-bounce"
        onClick={() =>
          handleTrackingAndNavigate(
            "Demo",
            "https://app.lezgosuite.com/widget/bookings/conocelezgosuite"
          )
        }>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://app.lezgosuite.com/widget/bookings/conocelezgosuite"
      >
        Agenda una llamada con un especialista
      </a>
    </Button>
  )
}

export const FaqToggleButton = ({
  onClick,
  question,
  isOpen,
}: {
  onClick: () => void
  question: string
  isOpen: boolean
}) => {
  const handleToggle = () => {
    const eventName = "Toggle - FAQ";
    const eventParams = {
        question: question,
        state: isOpen ? "closed" : "opened"
    };

    // Vercel Analytics
    track(eventName, eventParams);

    // Facebook Pixel
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq("trackCustom", eventName, eventParams);
    }
    onClick();
  };

  return (
    <button
      className="w-full p-6 text-left flex items-center justify-between hover:bg-[#F59B1B]/5 transition-colors"
      onClick={handleToggle}
    >
      <span className="font-semibold text-black text-lg">{question}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDown className="h-5 w-5 text-[#F59B1B]" />
      </motion.div>
    </button>
  )
}