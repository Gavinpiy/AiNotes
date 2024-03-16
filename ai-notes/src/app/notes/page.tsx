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

  return <div>{JSON.stringify(allNotes)}</div>;
}
