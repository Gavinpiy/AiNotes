import { z } from "zod";

//use zod for input validation
export const createNoteSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().optional(),
});

//infer the type of the createNoteSchema
export type CreateNoteInput = z.infer<typeof createNoteSchema>;

//extend the createNoteSchema to create the updateNoteSchema
export const updateNoteSchema = createNoteSchema.extend({
  id: z.string().min(1),
});

export const deleteNoteSchema = z.object({
  id: z.string().min(1),
});
