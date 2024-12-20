"use client";
import { Facebook, Mail } from "lucide-react";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="border-t bg-[#1f2122]">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-sm text-gray-300">
            © {year || "2024"} AESU. Todos los derechos reservados.
          </div>
          <div className="flex space-x-4">
            <a
              target="_blank"
              href="https://web.facebook.com/aesu.udima"
              className="text-gray-300 transition-colors hover:text-gray-500"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="mailto:contact@aesu.edu.pe"
              className="text-gray-300 transition-colors hover:text-gray-500"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
