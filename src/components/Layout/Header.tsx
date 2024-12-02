import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Eventos", path: "#events" },
    { name: "Sobre AESU", path: "#about-aesu" },
    { name: "FAQ", path: "#faq-section" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <nav className="bg-transparent backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-white">
              AESU
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center space-x-8 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`${
                    isActive(item.path)
                      ? "font-medium text-blue-600"
                      : "text-gray-300 hover:text-blue-600"
                  } transition-colors duration-200`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-[60] text-gray-200 hover:text-blue-600 md:hidden"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <div className={`relative h-6 w-6 transition-all duration-300`}>
                <span
                  className={`absolute left-0 top-0 h-0.5 w-6 transform bg-current transition-all duration-300 ${
                    isOpen ? "top-3 rotate-45" : "rotate-0"
                  }`}
                ></span>
                <span
                  className={`absolute left-0 top-3 h-0.5 w-6 bg-current transition-all duration-300 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`absolute left-0 top-3 h-0.5 w-6 transform bg-current transition-all duration-300 ${
                    isOpen ? "-rotate-45" : "translate-y-3 rotate-0"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isOpen ? "translate-x-0" : "translate-x-full"
          } fixed inset-0 z-[55] h-screen w-full bg-gray-900/95 backdrop-blur-md transition-transform duration-300 ease-in-out md:hidden`}
        >
          <div className="flex h-full flex-col items-center justify-center space-y-8 px-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`${
                  isActive(item.path)
                    ? "font-medium text-blue-600"
                    : "text-white hover:text-blue-400"
                } text-center text-3xl`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
