"use client";

import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { CreateEventForm } from "~/app/_components/create-event-form";
import { EventsTable } from "~/app/_components/events-table";
import { AdminHeader } from "~/app/_components/header-admin";

export default function AdminPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = "/login";
    },
  });

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <main className="container mx-auto p-6">
        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">Próximos Eventos</TabsTrigger>
            <TabsTrigger value="past">Eventos Pasados</TabsTrigger>
            <TabsTrigger value="create">Crear Evento</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <EventsTable isPast={false} />
          </TabsContent>

          <TabsContent value="past">
            <EventsTable isPast={true} />
          </TabsContent>

          <TabsContent value="create">
            <CreateEventForm />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
