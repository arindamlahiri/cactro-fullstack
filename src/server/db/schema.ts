import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  serial,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `cactro-fullstack_${name}`);

export const polls = createTable("poll", {
  id: uuid("id").defaultRandom().primaryKey(),
  question: varchar("question", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const options = createTable(
  "option",
  {
    id: serial("id").primaryKey(),
    pollId: uuid("poll_id")
      .notNull()
      .references(() => polls.id),
    text: varchar("text", { length: 256 }).notNull(),
    votes: integer("votes").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  },
  (option) => ({
    pollIdIndex: index("poll_id_idx").on(option.pollId),
  }),
);

// Define relationships between tables
export const pollsRelations = relations(polls, ({ many }) => ({
  options: many(options),
}));

export const optionsRelations = relations(options, ({ one }) => ({
  poll: one(polls, {
    fields: [options.pollId],
    references: [polls.id],
  }),
}));

export type InsertPoll = typeof polls.$inferInsert;
export type SelectPoll = typeof polls.$inferSelect;

export type InsertOption = typeof options.$inferInsert;
export type SelectOption = typeof options.$inferSelect;
