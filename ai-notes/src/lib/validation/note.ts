import { z } from "zod";
//use zod for input validation

export const createNoteSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().optional(),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
