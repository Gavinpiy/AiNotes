import Image from "next/image";
import logo from "@/assets/round_logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <main
      className="flex h-screen flex-col items-center justify-center gap-5"
      style={{
        backgroundImage: `url('/images/background.jpg')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="flex items-center gap-4">
        <Image src={logo} alt="AI-Notes" width={100} height={100} />
        <span className="text-4xl font-extrabold tracking-tight lg:text-5xl ">
          AI Notes
        </span>
      </div>
      <p className=" max-w-prose text-center">
        Notes Application with AI. Built with Next.js, OpenAI, Tailwind CSS, and
        Clerk.
      </p>
      <Button size="lg" asChild>
        <Link href="/notes">Get Started</Link>
      </Button>
    </main>
  );
}
