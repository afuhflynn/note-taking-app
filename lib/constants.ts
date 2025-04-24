import { Archive } from "@/public/icons/Archive";
import { Home } from "@/public/icons/Home";
import { v4 as uuid4 } from "uuid";

export const navItems = [
  {
    id: uuid4(),
    title: "All Notes",
    href: "/notes",
    Icon: Home,
  },
  {
    id: uuid4(),
    title: "Archived Notes",
    href: "/notes/archived",
    Icon: Archive,
  },
];
