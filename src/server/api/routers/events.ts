import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { events } from "~/server/db/schema";
import { eq, desc } from "drizzle-orm";

const eventInput = z.object({
  title: z.string().min(1, "El título es requerido"),
  subtitle: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  date: z.string().optional().nullable(),
  time: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  platform: z.string().optional().nullable(),
  link: z.string().url().optional().nullable(),
  results: z.string().optional().nullable(),
  images: z.array(z.string()).optional().nullable(),
  isPast: z.boolean().default(false),
});

export const eventRouter = createTRPCRouter({
  // Procedimientos públicos (no requieren autenticación)
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(events).orderBy(desc(events.date));
  }),

  getFuture: publicProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(events)
      .where(eq(events.isPast, false))
      .orderBy(desc(events.date));
  }),

  getPast: publicProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(events)
      .where(eq(events.isPast, true))
      .orderBy(desc(events.date));
  }),

  // Procedimientos protegidos (requieren autenticación)
  create: protectedProcedure
    .input(eventInput)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Debes iniciar sesión para crear eventos",
        });
      }

      // Validar el tamaño del array de imágenes
      if (input.images && input.images.length > 10) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No puedes subir más de 10 imágenes por evento",
        });
      }

      return ctx.db.insert(events).values({
        ...input,
        createdById: ctx.session.user.id,
        date: input.date ? new Date(input.date) : null,
        images: input.images ?? [],
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        ...eventInput.shape,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Debes iniciar sesión para actualizar eventos",
        });
      }

      // Verificar que el usuario es el creador del evento o es admin
      const event = await ctx.db
        .select()
        .from(events)
        .where(eq(events.id, input.id))
        .limit(1);

      if (!event[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Evento no encontrado",
        });
      }

      if (event[0].createdById !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "No tienes permiso para editar este evento",
        });
      }

      const { id, ...data } = input;
      return ctx.db
        .update(events)
        .set({
          ...data,
          date: data.date ? new Date(data.date) : null,
          updatedAt: new Date(),
        })
        .where(eq(events.id, id));
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Debes iniciar sesión para eliminar eventos",
        });
      }

      // Verificar que el usuario es el creador del evento o es admin
      const event = await ctx.db
        .select()
        .from(events)
        .where(eq(events.id, input.id))
        .limit(1);

      if (!event[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Evento no encontrado",
        });
      }

      if (event[0].createdById !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "No tienes permiso para eliminar este evento",
        });
      }

      return ctx.db.delete(events).where(eq(events.id, input.id));
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(events)
        .where(eq(events.id, input.id));

      if (!result[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Evento no encontrado",
        });
      }

      return result[0];
    }),
});
