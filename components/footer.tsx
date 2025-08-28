import Link from "next/link"

export default function Footer() {

  return (
    <footer className="bg-[#081737] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <img src="/LOGONUEVO.png" alt="Lezgo Suite" className="h-8 w-auto" />
            <p className="text-gray-300 leading-relaxed">
              La plataforma empresarial más avanzada para transformar tu negocio con IA y automatización.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#F59B1B]">Producto</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/gestion-ventas" className="hover:text-white transition-colors">
                  Gestión de Ventas
                </Link>
              </li>
              <li>
                <Link href="/integracion-total" className="hover:text-white transition-colors">
                  Integraciones
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Seguridad
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  API
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#F59B1B]">Empresa</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Carreras
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Prensa
                </Link>
              </li>
              <li>
                <Link href="/#contacto" className="hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#F59B1B]">Soporte</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Documentación
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Estado del Sistema
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Comunidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 Lezgo Suite. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacidad
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Términos
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
