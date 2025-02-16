"use server";

import { db } from "@/server/db";
import { options, polls } from "./db/schema";
import { and, eq, sql } from "drizzle-orm";

export async function createPoll({
  question,
  optionTitles,
}: {
  question: string;
  optionTitles: string[];
}) {
  return db.transaction(async (tx) => {
    const [newPoll] = await tx
      .insert(polls)
      .values({
        question,
      })
      .returning({ insertedId: polls.id });

    if (!newPoll?.insertedId) {
      tx.rollback();
    }

    await tx.insert(options).values(
      optionTitles.map((title) => ({
        pollId: newPoll!.insertedId,
        text: title,
      })),
    );

    return newPoll!.insertedId;
  });
}

export async function votePoll(pollId: string, optionId: number) {
  await db
    .update(options)
    .set({ votes: sql`${options.votes} + 1` })
    .where(and(eq(options.id, optionId), eq(options.pollId, pollId)));
}
