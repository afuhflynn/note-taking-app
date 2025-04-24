import { navItems } from "@/lib/constants";
import { NotesLogo } from "../ui/logo";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

export const NavBar = () => {
  const pathName = usePathname();

  return (
    <nav>
      <NotesLogo className="dark:fill-white" />
      <div>
        {navItems.map((item, index) => (
          <Button asChild key={`${item.id}-${index}`} variant="ghost">
            <Link href={item.href}>
              <item.Icon
                className={`${pathName === item.href ? "fill-primary" : ""}`}
              />{" "}
              <span>{item.title}</span>
              {pathName === item.href && <ChevronRight />}
            </Link>
          </Button>
        ))}
      </div>
      <div>tags</div>
    </nav>
  );
};
