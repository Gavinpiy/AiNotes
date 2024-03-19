import Note from "@/components/ui/Note";
import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-Notes - Home",
};

export default async function NotesPage() {
  const { userId } = auth();
  if (!userId) {
    throw Error("User ID not found!");
  }
  const allNotes = await prisma.note.findMany({ where: { userId } });

  return (
    //map over notes and display them
    //import and render the Note component
    <div className="mx-14 my-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {allNotes.map((note) => (
        <Note note={note} key={note.id} />
      ))}
      {/* if no notes are found, display a message */}
      {allNotes.length === 0 && (
        <div className="col-span-full my-10 text-center text-gray-500">
          No notes found. Click on the Add Note button to add a note.
        </div>
      )}
    </div>
  );
}
