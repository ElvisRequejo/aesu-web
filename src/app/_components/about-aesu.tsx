"use client";

import { motion } from "framer-motion";
import { Target, Eye, Compass } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

export const AboutAesu = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="relative bg-[#2563EB]" id="about-aesu">
      {/* Imagen de fondo */}
      {/* <div className="absolute inset-0">
        <img
          src="/bosques-nublados.jpg" // Asegúrate de tener esta imagen en tu proyecto
          alt="Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div> */}

      {/* Contenido */}
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <section>
          {/* Título de la sección */}
          <div className="mb-16 text-left">
            <motion.h2
              className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Sobre AESU
            </motion.h2>
          </div>

          {/* Grid de Misión, Visión y Objetivos */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Misión */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <Card className="group h-full overflow-hidden bg-black/40 backdrop-blur-md transition-all duration-300 hover:bg-black/50">
                <CardContent className="p-6">
                  <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-blue-500/20 p-4 transition-all duration-300 group-hover:scale-110">
                      <Compass className="h-8 w-8 text-blue-400" />
                    </div>
                  </div>
                  <h3 className="mb-4 text-center text-2xl font-semibold text-white">
                    Misión
                  </h3>
                  <p className="text-center text-gray-200">
                    Representar y empoderar a los estudiantes universitarios,
                    promoviendo su desarrollo académico, profesional y personal
                    a través de iniciativas innovadoras y una participación
                    activa en la comunidad universitaria.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Visión */}
            <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
              <Card className="group h-full overflow-hidden bg-black/40 backdrop-blur-md transition-all duration-300 hover:bg-black/50">
                <CardContent className="p-6">
                  <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-purple-500/20 p-4 transition-all duration-300 group-hover:scale-110">
                      <Eye className="h-8 w-8 text-purple-400" />
                    </div>
                  </div>
                  <h3 className="mb-4 text-center text-2xl font-semibold text-white">
                    Visión
                  </h3>
                  <p className="text-center text-gray-200">
                    Ser reconocidos como una asociación estudiantil líder que
                    inspira y transforma la experiencia universitaria,
                    fomentando la excelencia académica y el desarrollo integral
                    de nuestros estudiantes.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Objetivos */}
            <motion.div {...fadeInUp} transition={{ delay: 0.6 }}>
              <Card className="group h-full overflow-hidden bg-black/40 backdrop-blur-md transition-all duration-300 hover:bg-black/50">
                <CardContent className="p-6">
                  <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-green-500/20 p-4 transition-all duration-300 group-hover:scale-110">
                      <Target className="h-8 w-8 text-green-400" />
                    </div>
                  </div>
                  <h3 className="mb-4 text-center text-2xl font-semibold text-white">
                    Objetivos
                  </h3>
                  <ul className="space-y-3 text-gray-200">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-400"></span>
                      <span>
                        Promover la participación estudiantil en la toma de
                        decisiones universitarias
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-400"></span>
                      <span>
                        Desarrollar programas de mentoría y apoyo académico
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-400"></span>
                      <span>
                        Organizar eventos y actividades que enriquezcan la vida
                        universitaria
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-400"></span>
                      <span>
                        Fomentar la conexión entre estudiantes y oportunidades
                        profesionales
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};
