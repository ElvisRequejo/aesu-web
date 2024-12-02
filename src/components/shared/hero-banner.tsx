import Image from "next/image";
import Link from "next/link";

const HeroBanner = () => {
  return (
    <section className="relative flex min-h-screen items-center bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="absolute inset-0">
        <Image
          src="/bosques-nublados.jpg"
          alt="AESU Background"
          className="h-full w-full object-cover opacity-30"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/80" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-32 text-center">
        <h1 className="mb-6 font-serif text-4xl text-white md:text-6xl">
          Formando Líderes,
          <br />
          Construyendo Futuro
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-lg text-white/80 md:text-xl">
          Asociación de Estudiantes Superiores Udimenos, trabajando por una
          mejor educación y representación estudiantil
        </p>
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <Link href="#events">
            <button className="max-w-[200px] rounded-full bg-blue-600 px-8 py-3 text-white transition-colors hover:bg-blue-700">
              Conoce Más
            </button>
          </Link>
          <button className="max-w-[200px] rounded-full border border-white px-8 py-3 text-white transition-colors hover:bg-white/10">
            <Link href="https://forms.gle/cGjqfc6JD5DEo8U98" target="_blank">
              Únete a AESU
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
