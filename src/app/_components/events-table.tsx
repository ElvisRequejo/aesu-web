"use client";

import { api } from "~/trpc/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import type { Event } from "~/server/db/schema";

export function EventsTable({ isPast }: { isPast: boolean }) {
  const { data: events } = isPast
    ? api.event.getPast.useQuery()
    : api.event.getFuture.useQuery();

  const deleteEvent = api.event.delete.useMutation({
    onSuccess: () => {
      // Refrescar la lista
    },
  });

  const handleDelete = async (id: Event["id"]) => {
    if (confirm("¿Estás seguro de eliminar este evento?")) {
      await deleteEvent.mutateAsync({ id });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Lugar</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events?.map((event) => (
          <TableRow key={event.id}>
            <TableCell>{event.title}</TableCell>
            <TableCell>
              {event.date ? new Date(event.date).toLocaleDateString() : "N/A"}
            </TableCell>
            <TableCell>{event.location || "N/A"}</TableCell>
            <TableCell>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(event.id)}
              >
                Eliminar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
