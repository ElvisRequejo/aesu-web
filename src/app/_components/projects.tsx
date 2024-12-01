"use client";

import { api } from "~/trpc/react";
import { FutureEventCard, PastEventCard } from "./events-card";

export const Projects = () => {
  const { data: futureEvents } = api.event.getFuture.useQuery();
  const { data: pastEvents } = api.event.getPast.useQuery();

  const getGridCols = (events: typeof futureEvents | typeof pastEvents) => {
    if (!events) return "";
    switch (events.length) {
      case 1:
        return "grid-cols-1 max-w-xl mx-auto";
      case 2:
      default:
        return "grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto";
    }
  };

  return (
    <section className="py-20" id="events">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Eventos Futuros */}
        {futureEvents && futureEvents.length > 0 && (
          <section className="mb-24">
            <div className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
                Próximos Eventos
              </h2>
              <div className="mt-4 h-1 w-20 rounded bg-blue-600"></div>
            </div>
            <div className={`grid gap-8 ${getGridCols(futureEvents)}`}>
              {futureEvents.map((event) => (
                <FutureEventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* Eventos Pasados */}
        {pastEvents && pastEvents.length > 0 && (
          <section className="mb-24">
            <div className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
                Eventos Pasados
              </h2>
              <div className="mt-4 h-1 w-20 rounded bg-blue-600"></div>
            </div>
            <div className={`grid gap-8 ${getGridCols(pastEvents)}`}>
              {pastEvents.map((event) => (
                <PastEventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
};
