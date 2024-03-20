import { notesIndex } from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";
import { getEmbedding } from "@/lib/openai";
import {
  createNoteSchema,
  deleteNoteSchema,
  updateNoteSchema,
} from "@/lib/validation/note";
import { auth } from "@clerk/nextjs";
import { get } from "http";

//post request to create a note
export async function POST(req: Request) {
  try {
    const body = await req.json();
    // validate the input using zod
    const parseResult = createNoteSchema.safeParse(body);
    //using safeparse lets us use our own error messages

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid Input" }, { status: 400 });
    }

    const { title, content } = parseResult.data;

    // grab the userId from the clerk auth
    const { userId } = auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    //create embedding for the note
    const embedding = await getEmbeddingForNote(title, content);
    // use a transaction to create the note and the embedding. if one fails, the other will not be created
    const note = await prisma.$transaction(async (tx) => {
      // create the note in mongodb
      const note = await prisma.note.create({
        data: {
          title,
          content,
          userId,
        },
      });
      // create the embedding in pinecone. this will fail if the note is not created
      await notesIndex.upsert([
        {
          id: note.id,
          values: embedding,
          metadata: { userId },
        },
      ]);
      //console.log(embedding);
    });

    //return the note with a status of 201
    return Response.json({ note }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

//put request to update a note
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const parseResult = updateNoteSchema.safeParse(body);
    //using safeparse lets us use our own error messages

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid Input" }, { status: 400 });
    }

    // create the note. we can now access the id
    const { id, title, content } = parseResult.data;

    // find the note by id
    const note = await prisma.note.findUnique({ where: { id } });
    if (!note) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }
    const { userId } = auth();
    // check if the user is authorized to update the note
    // if the note does not belong to the user, return unauthorized
    if (!userId || note.userId !== userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const embedding = await getEmbeddingForNote(title, content);
    // update the embedding in pinecone
    const updatedNote = await prisma.$transaction(async (tx) => {
      const updatedNote = await tx.note.update({
        where: { id },
        data: { title, content },
      });

      await notesIndex.upsert([
        {
          id,
          values: embedding,
          metadata: { userId },
        },
      ]);

      return updatedNote;
    });

    //return the updated note with a status of 200
    return Response.json({ note: updatedNote }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

//delete request to delete a note
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const parseResult = deleteNoteSchema.safeParse(body);
    //using safeparse lets us use our own error messages

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid Input" }, { status: 400 });
    }

    // we can now access the id
    const { id } = parseResult.data;

    // find the note by id
    const note = await prisma.note.findUnique({ where: { id } });
    if (!note) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }
    const { userId } = auth();
    // check if the user is authorized to update the note
    // if the note does not belong to the user, return unauthorized
    if (!userId || note.userId !== userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // delete the note from pinecone
    await prisma.$transaction(async (tx) => {
      // delete the note
      await tx.note.delete({ where: { id } });
      await notesIndex.deleteOne(id);
    });

    //return a status of 204
    return Response.json({ message: "Successfully deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

async function getEmbeddingForNote(title: string, content: string | undefined) {
  // get the embedding for the note with line break
  return getEmbedding(title + "\n\n" + content ?? "");
}
