export default function WhatsApp() {
    return (
        <section className="py-20 relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-green-900/30">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="circle-lg absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-green-500/5 animate-float-slow blur-3xl"></div>
                <div className="circle-md absolute bottom-1/4 left-1/4 w-56 h-56 rounded-full bg-green-400/5 animate-float-reverse blur-2xl"></div>
                <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-green-500/10 to-transparent blur-3xl"></div>

                {/* WhatsApp icon watermark */}
                <div className="absolute bottom-0 right-0 opacity-5 transform translate-x-1/4 translate-y-1/4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-96 w-96" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z" />
                    </svg>
                </div>

                {/* Subtle particles */}
                <div className="absolute top-1/4 left-1/3 w-1 h-1 rounded-full bg-green-400/80 animate-ping" style={{ animationDelay: "1.2s" }}></div>
                <div className="absolute bottom-1/3 right-1/4 w-1 h-1 rounded-full bg-green-400/80 animate-ping" style={{ animationDelay: "0.7s" }}></div>
                <div className="absolute top-2/3 left-2/3 w-1 h-1 rounded-full bg-green-400/80 animate-ping" style={{ animationDelay: "1.5s" }}></div>
            </div>

            <div className="container relative mx-auto px-4 z-10">
                {/* Glass card container */}
                <div className="max-w-4xl mx-auto backdrop-blur-md bg-gray-800/40 rounded-2xl border border-gray-700/50 overflow-hidden shadow-xl">
                    {/* Top highlight line */}
                    <div className="h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-400"></div>

                    <div className="p-10 md:p-12">
                        <div className="text-center mb-10">
                            <div className="flex justify-center">
                                <div className="relative inline-flex items-center justify-center">
                                    {/* Glow effect behind icon */}
                                    <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full transform scale-150"></div>

                                    <div className="relative bg-gradient-to-br from-green-500/80 to-green-600/80 p-4 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-3 text-center text-white">
                                Conversemos en <span className="text-green-400">WhatsApp</span>
                            </h2>
                            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
                                Estamos a un mensaje de distancia para responder todas tus dudas
                                y ayudarte a planificar tu proyecto web de forma rápida y personalizada.
                            </p>
                        </div>

                        <div className="mt-8 flex flex-col items-center">
                            <a
                                href="https://wa.me/543217407700?text=Hola%2C%20estoy%20interesada%2Fo%20en%20crear%20una%20p%C3%A1gina%20web%20r%C3%A1pida%20y%20profesional%20con%20Soraia.%20%C2%BFPodemos%20hablar%3F%20%F0%9F%9A%80"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative overflow-hidden group inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-4 rounded-full hover:shadow-lg hover:shadow-green-500/25 transition-all transform hover:scale-105 duration-300"
                            >
                                {/* Button shine effect */}
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                                {/* Button content */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z" />
                                </svg>
                                <span className="text-lg font-bold">Chatea en WhatsApp</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>

                            <p className="text-green-400/80 text-sm mt-4">Respuesta garantizada en menos de 2 horas</p>
                        </div>
                    </div>
                </div>

                {/* Bottom decorative elements */}
                <div className="flex justify-center mt-8">
                    <div className="w-2 h-2 rounded-full bg-green-500 mx-1 animate-pulse" style={{ animationDelay: "0s" }}></div>
                    <div className="w-2 h-2 rounded-full bg-green-400 mx-1 animate-pulse" style={{ animationDelay: "0.3s" }}></div>
                    <div className="w-2 h-2 rounded-full bg-green-300 mx-1 animate-pulse" style={{ animationDelay: "0.6s" }}></div>
                </div>
            </div>
        </section>
    )
}