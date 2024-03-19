import { useForm } from "react-hook-form";
import { createNoteSchema, CreateNoteInput } from "@/lib/validation/note";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { Textarea } from "./textarea";
import LoadingButton from "./loading-button";
import { useRouter } from "next/navigation";
import { Note } from "@prisma/client";

interface AddEditNoteProps {
  // props
  open: boolean;
  setOpen: (open: boolean) => void;
  //optional note to edit prop
  noteToEdit?: Note;
}
//pass optional note to edit to destructure
export default function AddEditNote({
  open,
  setOpen,
  noteToEdit,
}: AddEditNoteProps) {
  const router = useRouter();
  const form = useForm<CreateNoteInput>({
    resolver: zodResolver(createNoteSchema),

    //if we have a note to edit we can set the default values otherwise it is an empty string
    defaultValues: {
      title: noteToEdit?.title || "",
      content: noteToEdit?.content || "",
    },
  });

  async function onSubmit(data: CreateNoteInput) {
    //check if we have a note to edit
    try {
      if (noteToEdit) {
        const respose = await fetch("/api/notes", {
          method: "PUT",
          body: JSON.stringify({
            id: noteToEdit.id,
            ...data,
          }),
        });
      } else {
        const response = await fetch("/api/notes", {
          method: "POST",
          body: JSON.stringify(data),
        });
      }
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("Please try again!");
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Content" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <DialogFooter>
              <LoadingButton
                type="submit"
                loading={form.formState.isSubmitting}
              >
                Submit
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
