import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Link as LinkIcon,
  Monitor,
} from "lucide-react";
import type { Event } from "~/server/db/schema";
import { api } from "~/trpc/server";
import Image from "next/image";

// Las props de los componentes con su tipo
interface EventCardProps {
  event: Event;
}

// Componente para eventos futuros
export const FutureEventCard = ({ event }: EventCardProps) => {
  return (
    <Card className="group overflow-hidden bg-[#1f2122]">
      <div className="relative aspect-[5/3] overflow-hidden">
        {event.images?.[0] && (
          <Image
            src={event.images[0]}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            width={1920}
            height={1080}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
      </div>

      <CardHeader className="relative -mt-20 xs:-mt-16 sm:-mt-16 md:-mt-20 lg:-mt-16">
        <CardTitle className="text-xl font-semibold leading-5 text-white">
          {event.title}
        </CardTitle>
        {event.subtitle && (
          <p className="text-sm text-white/80">{event.subtitle}</p>
        )}
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        <p className="line-clamp-3 text-sm text-gray-200">
          {event.description}
        </p>

        <div className="space-y-2 text-sm">
          {event.date && (
            <div className="flex items-center gap-2 text-gray-200">
              <Clock className="h-4 w-4" />
              <time>
                {new Date(event.date).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {event.time && ` - ${event.time}`}
              </time>
            </div>
          )}

          {event.location && (
            <div className="flex items-center gap-2 text-gray-200">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          )}

          {event.platform && (
            <div className="flex items-center gap-2 text-gray-200">
              <Monitor className="h-4 w-4" />
              <span>{event.platform}</span>
            </div>
          )}

          {event.link && (
            <div className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4 text-blue-600" />
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Link
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Componente para eventos pasados
export const PastEventCard = ({ event }: EventCardProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    if (event.images && currentImage < event.images.length - 1) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const prevImage = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  return (
    <Card className="group overflow-hidden">
      <div className="relative h-48">
        {event.images && event.images.length > 0 && (
          <>
            {event.images?.[currentImage] ? (
              <Image
                src={event.images[currentImage]}
                alt={`${event.title} - imagen ${currentImage + 1}`}
                className="h-full w-full object-cover"
                width={1920}
                height={1080}
              />
            ) : (
              <div className="h-full w-full bg-gray-200" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />

            {event.images.length > 1 && (
              <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-2">
                <button
                  onClick={prevImage}
                  className="rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  disabled={currentImage === 0}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  disabled={currentImage === event.images.length - 1}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            )}

            {event.images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
                {event.images.map((_, idx) => (
                  <button
                    key={idx}
                    className={`h-1.5 w-1.5 rounded-full transition-all ${
                      idx === currentImage ? "w-3 bg-white" : "bg-white/50"
                    }`}
                    onClick={() => setCurrentImage(idx)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <CardHeader className="relative -mt-12">
        <CardTitle className="text-lg font-semibold text-white">
          {event.title}
        </CardTitle>
        {event.subtitle && (
          <p className="text-sm text-white/80">{event.subtitle}</p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="line-clamp-3 text-sm text-gray-200">
          {event.description}
        </p>

        {event.results && (
          <div className="rounded-lg bg-gray-50 p-3">
            <h4 className="mb-1 text-sm font-medium text-gray-300">
              Resultados:
            </h4>
            <p className="text-sm text-gray-600">{event.results}</p>
          </div>
        )}

        {event.date && (
          <div className="flex items-center gap-2 text-sm text-gray-200">
            <Clock className="h-4 w-4" />
            <time>
              {new Date(event.date).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
