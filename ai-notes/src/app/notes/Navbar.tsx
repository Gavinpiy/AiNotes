import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.jpg";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Navbar = () => {
  return (
    <div className="p-4 shadow">
      <div className="items flex max-w-7xl flex-wrap justify-between gap-3 ">
        <Link href="/notes" className="flex items-center gap-1">
          <Image src={logo} alt="AI-Notes" width="40" height="40" />
          <span className="font-bold">AI Notes</span>
        </Link>
        <div className="flex items-center gap-2">
          <UserButton
            afterMultiSessionSingleSignOutUrl="/"
            appearance={{
              elements: { avatarBox: { width: "2.5rem", height: "2.5rem" } },
            }}
          />
          <Button>
            <Plus size={20} className="mr-2" />
            Add Note
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
