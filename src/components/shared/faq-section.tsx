"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "¿Qué es AESU y cuál es su función principal?",
      answer:
        "AESU es la Asociación Estudiantil Superior Udimeña, cuya función principal es representar y defender los intereses de los estudiantes. Trabajamos para mejorar la experiencia universitaria a través de diversos programas y actividades.",
    },
    {
      question: "¿Cómo puedo formar parte de AESU?",
      answer:
        "Puedes unirte a AESU completando el formulario de membresía en nuestra página web o visitando nuestra oficina. Realizamos convocatorias al inicio de cada semestre académico y buscamos estudiantes comprometidos con el desarrollo universitario.",
    },
    {
      question: "¿Qué beneficios obtengo al ser miembro de AESU?",
      answer:
        "Como miembro de AESU, tendrás acceso a networking con otros estudiantes y profesionales, participación en eventos exclusivos, oportunidades de liderazgo, programas de mentoría y la posibilidad de contribuir activamente en la mejora de nuestra universidad.",
    },
    {
      question: "¿Con qué frecuencia organizan eventos?",
      answer:
        "Organizamos eventos regularmente durante todo el semestre académico, incluyendo talleres, charlas, actividades sociales y programas de desarrollo profesional. El calendario de eventos se actualiza mensualmente en nuestra plataforma.",
    },
    {
      question: "¿Cómo puedo proponer una iniciativa o proyecto?",
      answer:
        "Puedes presentar tus propuestas a través de nuestro formulario en línea o directamente en nuestras reuniones mensuales. Valoramos las ideas innovadoras que beneficien a la comunidad estudiantil.",
    },
  ];

  return (
    <div className="relative" id="faq-section">
      <div className="relative mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Título de la sección */}
        <div className="mb-16 text-center">
          <motion.h2
            className="text-4xl font-bold tracking-tight text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Preguntas Frecuentes
          </motion.h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded bg-blue-500"></div>
          <p className="mt-6 text-lg text-gray-300">
            Encuentra respuestas a las preguntas más comunes sobre AESU
          </p>
        </div>

        {/* Lista de FAQs */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="overflow-hidden rounded-lg bg-[#2563EB] backdrop-blur-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-medium text-white">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-blue-400 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="border-t border-white/10 px-6 pb-6 pt-4">
                      <p className="text-gray-300">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
