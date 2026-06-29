'use client'
import { track } from "@vercel/analytics";
import { CalendarCheck, MessageCircleMore } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

const FloatingWhatsApp = () => {
  const pathname = usePathname();
  if (pathname === '/guia-productiva') return null;

  const phoneNumber = "5214426702559";
  const message =
    "¡Hola! Me interesa más información de Lezgo Suite. Vengo de la Página Web.";

  const handleWhatsAppClick = () => {
    track("Botón Whatsapp Página");
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'Contact');
    }
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push({
      event: 'click_whatsapp',
      form_location: window.location.pathname,
    })
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  const handleAdvisorClick = () => {
    track("Botón Asesor Flotante");
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('trackCustom', 'Botón Asesor Flotante');
    }
  };

  return (
    <>
      {/* Advisor — mobile: pill button */}
      <a
        href="https://app.lezgosuite.com/widget/bookings/conocelezgosuite"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleAdvisorClick}
        className="sm:hidden fixed right-4 bottom-4 z-50 flex items-center gap-2 bg-[#F59B1B] hover:bg-[#e08d18] active:scale-95 transition-all duration-200 rounded-2xl px-4 py-3 shadow-lg"
      >
        <CalendarCheck className="text-white w-5 h-5 shrink-0" />
        <span className="text-white text-sm font-bold leading-tight">
          Agendar<br />demo
        </span>
      </a>

      {/* Advisor — desktop: card anchored to right edge */}
      <a
        href="https://app.lezgosuite.com/widget/bookings/conocelezgosuite"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleAdvisorClick}
        className="hidden sm:flex fixed right-0 bottom-6 z-50 flex-col items-center gap-2.5 pt-4 px-3 pb-3 bg-[oklch(0.17_0.015_250)] border-t border-l border-b border-white/10 rounded-l-2xl shadow-2xl hover:bg-[oklch(0.21_0.015_250)] transition-colors duration-300 group w-[100px]"
      >
        <div className="w-11 h-11 bg-[#F59B1B] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
          <CalendarCheck className="w-6 h-6 text-white" />
        </div>
        <span className="text-white/90 text-[11px] font-semibold text-center leading-snug">
          ¿Tienes<br />dudas?
        </span>
        <span className="bg-[#F59B1B] text-white text-[10px] font-bold px-2 py-1.5 rounded-lg text-center leading-tight w-full block">
          Hablar con<br />un asesor
        </span>
      </a>

      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50">
        <div
          className="relative cursor-pointer group"
          onClick={handleWhatsAppClick}
        >
          <div className="bg-green-500 hover:bg-green-600 transition-all duration-300 rounded-full p-4 sm:p-5 shadow-lg hover:shadow-xl transform hover:scale-110">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
            >
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
          <div className="hidden md:block absolute bottom-full left-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            ¡Chatea con nosotros!
            <div className="absolute top-full left-4 w-2 h-2 bg-gray-800 transform rotate-45 translate-y-[-50%]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingWhatsApp;
