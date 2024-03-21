import { notesIndex } from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";
import openai, { getEmbedding } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { ChatCompletionMessage } from "openai/resources/index.mjs";
import { OpenAIStream, StreamingTextResponse } from "ai";

//
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: ChatCompletionMessage[] = body.messages;

    // Truncate messages to only show the last 6 messages to save API token usage
    const messagesTruncated = messages.slice(-6);

    // Get the embedding of the messages and
    const embedding = await getEmbedding(
      //convert array insto string
      //get the content and join them with a line break
      messagesTruncated.map((m) => m.content).join("\n"),
    );
    //grab the user id from the auth from clerk
    const { userId } = auth();

    // Query the notes index with the embedding from pinecone
    //topK is the number of results to return (highter the more notes will be returned but uses more tokens)
    const vectorQueryResponse = await notesIndex.query({
      vector: embedding,
      topK: 3,
      filter: { userId },
    });

    // Get the related notes from the mongodb database
    const relatedNote = await prisma.note.findMany({
      where: {
        id: {
          //array returned from pinecone query matches the id of the notes in mongodb
          in: vectorQueryResponse.matches.map((match) => match.id),
        },
      },
    });

    console.log("relevant notes found: ", relatedNote);
    console.log(
      relatedNote
        .map((note) => `Title: ${note.title}\n\nContent:\n ${note.content}`)
        .join("\n\n"),
    );
    const systemMessage: ChatCompletionMessage = {
      role: "assistant",
      content:
        "You are an assistant that will answer any question I ask you based on information I provide to you" +
        "The relevant information for you are:\n" +
        relatedNote
          .map((note) => `Title: ${note.title}\n\nContent:\n ${note.content}`)
          .join("\n\n"),
    };

    //request to chatgpt
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [...messagesTruncated, systemMessage],
    });

    // use vercel ai SDK for streaming text
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
