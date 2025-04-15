// import { signIn } from "@/lib/auth";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { Github } from "lucide-react";

export function GitHubButton() {
  const [isPending, startTransition] = useTransition();
  return (
    <form
      action={async () => {
        startTransition(() => {
          // await signIn("github");
        });
      }}
      className="w-full h-auto"
    >
      <Button
        variant="outline"
        className="w-full border-input rounded-xl flex items-center gap-3 py-5"
      >
        <Github className="w-auto h-auto dark:text-white" />
        GitHub
      </Button>
    </form>
  );
}
