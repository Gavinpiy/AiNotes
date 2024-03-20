import prisma from "@/lib/db/prisma";
import {
  createNoteSchema,
  deleteNoteSchema,
  updateNoteSchema,
} from "@/lib/validation/note";
import { auth } from "@clerk/nextjs";

//post request to create a note
export async function POST(req: Request) {
  try {
    const body = await req.json();
    // validate the input
    const parseResult = createNoteSchema.safeParse(body);
    //using safeparse lets us use our own error messages

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid Input" }, { status: 400 });
    }

    // create the note
    const { title, content } = parseResult.data;

    const { userId } = auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId,
      },
    });

    return Response.json({ note }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

//put request to update a note
// export async function PUT(req: Request) {
//   try {
//     const body = await req.json();
//     const parseResult = updateNoteSchema.safeParse(body);
//     //using safeparse lets us use our own error messages

//     if (!parseResult.success) {
//       console.error(parseResult.error);
//       return Response.json({ error: "Invalid Input" }, { status: 400 });
//     }

//     // create the note. we can now access the id
//     const { id, title, content } = parseResult.data;

//     // find the note by id
//     const note = await prisma.note.findUnique({ where: { id } });
//     if (!note) {
//       return Response.json({ error: "Note not found" }, { status: 404 });
//     }
//     const { userId } = auth();
//     // check if the user is authorized to update the note
//     // if the note does not belong to the user, return unauthorized
//     if (!userId || note.userId !== userId) {
//       return Response.json({ error: "Unauthorized" }, { status: 401 });
//     }
//     // update the note
//     const updatedNote = await prisma.note.update({
//       where: { id },
//       data: { title, content },
//     });
//     //return the updated note with a status of 200
//     return Response.json({ note: updatedNote }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

//delete request to delete a note
// export async function DELETE(req: Request) {
//   try {
//     const body = await req.json();
//     const parseResult = deleteNoteSchema.safeParse(body);
//     //using safeparse lets us use our own error messages

//     if (!parseResult.success) {
//       console.error(parseResult.error);
//       return Response.json({ error: "Invalid Input" }, { status: 400 });
//     }

//     // we can now access the id
//     const { id } = parseResult.data;

//     // find the note by id
//     const note = await prisma.note.findUnique({ where: { id } });
//     if (!note) {
//       return Response.json({ error: "Note not found" }, { status: 404 });
//     }
//     const { userId } = auth();
//     // check if the user is authorized to update the note
//     // if the note does not belong to the user, return unauthorized
//     if (!userId || note.userId !== userId) {
//       return Response.json({ error: "Unauthorized" }, { status: 401 });
//     }
//     // delete the note
//     await prisma.note.delete({ where: { id } });

//     //return a status of 204
//     return Response.json({ message: "Successfully deleted" }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
