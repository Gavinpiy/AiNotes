"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/round_logo.png";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddNote from "@/components/ui/AddEditNote";
import AiChatButton from "@/components/AiChatButton";

const Navbar = () => {
  const [showAddEditNote, setShowAddEditNote] = useState(false);

  return (
    <>
      <div className="px-6 py-2 shadow bg-gradient-to-b from-[#4b6f87e6] to-[#A5C9DFe6]">
        <div className="items flex max-w-7xl flex-wrap justify-between gap-3 ">
          <Link href="/notes" className="flex items-center gap-1">
            <Image src={logo} alt="AI-Notes" width="40" height="40" />
            <span className="font-bold">AI Notes</span>
          </Link>
          <div className="flex items-center gap-2">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: { avatarBox: { width: "2.5rem", height: "2.5rem" } },
              }}
            />
            <Button onClick={() => setShowAddEditNote(true)}>
              <Plus size={20} className="mr-2" />
              Add Note
            </Button>
            <AiChatButton />
          </div>
        </div>
      </div>
      <AddNote open={showAddEditNote} setOpen={setShowAddEditNote} />
    </>
  );
};

export default Navbar;
