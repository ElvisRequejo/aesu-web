import { relations, sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  text,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `aesu-web_${name}`);

// Tabla de usuarios
export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  image: varchar("image", { length: 255 }),
  role: varchar("role", { length: 20 }).default("user").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

// Tabla de sesiones (para manejar sesiones activas)
export const sessions = createTable("session", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});

// Tabla de eventos
export const events = createTable(
  "event",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),

    // Campos comunes
    title: varchar("title", { length: 255 }).notNull(),
    subtitle: varchar("subtitle", { length: 255 }),
    description: text("description"),
    date: timestamp("date", { withTimezone: true }),
    time: varchar("time", { length: 10 }),
    location: varchar("location", { length: 255 }),
    images: text("images").array(), // Array de URLs de imágenes

    // Campos específicos para eventos futuros
    platform: varchar("platform", { length: 100 }),
    link: varchar("link", { length: 255 }),

    // Campos específicos para eventos pasados
    results: text("results"),
    isPast: boolean("is_past").default(false),

    // Referencia al usuario que creó el evento
    createdById: varchar("created_by", { length: 255 })
      .notNull()
      .references(() => users.id),
  },
  (event) => ({
    createdByIdIdx: index("event_created_by_idx").on(event.createdById),
    dateIdx: index("event_date_idx").on(event.date),
    isPastIdx: index("event_is_past_idx").on(event.isPast),
  }),
);

// Relaciones para usuarios
export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  events: many(events),
}));

// Relaciones para sesiones
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

// Relaciones para eventos
export const eventsRelations = relations(events, ({ one }) => ({
  createdBy: one(users, {
    fields: [events.createdById],
    references: [users.id],
  }),
}));

// Types para usar en la aplicación
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
