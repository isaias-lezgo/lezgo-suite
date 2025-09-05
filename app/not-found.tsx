'use client'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home, Mail, Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
        <main className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center">
                {/* Large 404 */}
                <div className="mb-8">
                    <h1 className="text-9xl md:text-[12rem] font-bold text-orange-500 opacity-20 leading-none">
                        404
                    </h1>
                </div>

                {/* Error Message */}
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                        Página no encontrada
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 mb-2">
                        Lo sentimos, la página que estás buscando no existe.
                    </p>
                    <p className="text-gray-500">
                        Es posible que haya sido movida, eliminada o que hayas ingresado la URL incorrecta.
                    </p>
                </div>


                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <Button asChild className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                        <Link href="/">
                            <Home size={20} />
                            <span>Regresar al Inicio</span>
                        </Link>
                    </Button>

                    {/* Back button */}
                    <Button
                        variant="ghost"
                        className="flex cursor-pointer items-center space-x-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft size={20} />
                        <span>Volver a página anterior</span>
                    </Button>
                </div>



                {/* Help Section */}
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
                    <div className="mb-6">
                        <Mail className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">
                            ¿Necesitas ayuda?
                        </h3>
                        <p className="text-gray-600">
                            Si crees que esto es un error o necesitas asistencia, no dudes en contactarnos.
                        </p>
                    </div>

                    <Button asChild className=" items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                        <Link href="/contacto">
                            <Home size={20} />
                            <span>Contáctanos</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </main>
    )
}

export default NotFound