import { pgTable, index } from "drizzle-orm/pg-core";

// Define a reusable `createdAt` timestamp column with default value set to now
const createdAt = timestamp("createdAt").notNull().defaultNow()

// Define a reusable `updatedAt` timestamp column with automatic update on modification
const updatedAt = timestamp("updatedAt")
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date())  // automatically updates to current time on update
// Define the "events" table with fields like name, description, and duration
export const EventTable = pgTable(
  "events", // table name in the database
  {
    id: uuid("id").primaryKey().defaultRandom(),
    // unique ID with default UUID
    // uuid("id"): Defines a column named "id" with the UUID type.

    // .primaryKey(): Makes this UUID the primary key of the table.

    // .defaultRandom(): Automatically fills this column with a randomly generated UUID (v4) if no valu is provided.
    name: text("name").notNull(), // event name
    description: text("description"),   // optional description
    durationInMinutes: integer("durationInMinutes").notNull(), //duration of the event
    clerkUserId: text("clearkUserId").notNull(),    // ID of the user who created it (from Clerk)
    isActive: boolean("isActive").notNull().default(true),  // whether the event is currently active
    createdAt, // timestamp when event was created
    updatedAt,  // timestamp when event was last updated
  },
  table => ([
    index("clerkUserIdIndex").on(table.clerkUserId), // index on clerkUserId for faster querying
  ])
  ,)
