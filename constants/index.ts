import { Archive } from "lucide-react";
import { HomeIcon } from "lucide-react";
import { v4 as uuid4 } from "uuid";

// Base API configuration
export const API_BASE = "/api";

export const navItems = [
  {
    id: uuid4(),
    title: "All Notes",
    href: "/notes",
    Icon: HomeIcon,
  },
  {
    id: uuid4(),
    title: "Archived Notes",
    href: "/notes/archived",
    Icon: Archive,
  },
];

export const dummyNotes = [
  {
    id: uuid4(),
    title: "Web Assembly programming",
    tag: "web development",
  },
  {
    id: uuid4(),
    title: "Web Server programming",
    tag: "web console",
  },
  {
    id: uuid4(),
    title: "Intro to html",
    tag: "internet",
  },
  {
    id: uuid4(),
    title: "Intro to html",
    tag: "internet",
  },
  {
    id: uuid4(),
    title: "Intro to html",
    tag: "internet",
  },
  {
    id: uuid4(),
    title: "Intro to html",
    tag: "internet",
  },
  {
    id: uuid4(),
    title: "Intro to html",
    tag: "internet",
  },
  {
    id: uuid4(),
    title: "Intro to html",
    tag: "internet",
  },
  {
    id: uuid4(),
    title: "Intro to html",
    tag: "internet",
  },
  {
    id: uuid4(),
    title: "Intro to html",
    tag: "internet",
  },
  {
    id: uuid4(),
    title: "Intro to html",
    tag: "internet",
  },
  {
    id: uuid4(),
    title: "Intro to html",
    tag: "internet",
  },
  {
    id: uuid4(),
    title: "Intro to html",
    tag: "internet",
  },
];

export const dummyNoteItems = [
  {
    id: uuid4(),
    title: "Web Assembly programming",
    tags: ["web development", "react"],
    updatedAt: new Date(),
  },
  {
    id: uuid4(),
    title: "Web Server programming",
    tags: ["web console", "SRS"],
    updatedAt: new Date(),
  },
  {
    id: uuid4(),
    title: "Intro to html",
    tags: ["internet", "SSR"],
    updatedAt: new Date(),
  },
  {
    id: uuid4(),
    title: "Intro to html",
    tags: ["internet", "web protocols"],
    updatedAt: new Date(),
  },
  {
    id: uuid4(),
    title: "Intro to html",
    tags: ["internet", "web protocols"],
    updatedAt: new Date(),
  },
  {
    id: uuid4(),
    title: "Intro to html",
    tags: ["internet", "web protocols"],
    updatedAt: new Date(),
  },
  {
    id: uuid4(),
    title: "Intro to html",
    tags: ["internet", "web protocols"],
    updatedAt: new Date(),
  },
  {
    id: uuid4(),
    title: "Intro to html",
    tags: ["internet", "web protocols"],
    updatedAt: new Date(),
  },
  {
    id: uuid4(),
    title: "Intro to html",
    tags: ["internet", "web protocols"],
    updatedAt: new Date(),
  },
  {
    id: uuid4(),
    title: "Intro to html",
    tags: ["internet", "web protocols"],
    updatedAt: new Date(),
  },
  {
    id: uuid4(),
    title: "Intro to html",
    tags: ["internet", "web protocols"],
    updatedAt: new Date(),
  },
  {
    id: uuid4(),
    title: "Intro to html",
    tags: ["internet", "web protocols"],
    updatedAt: new Date(),
  },
  {
    id: uuid4(),
    title: "Intro to html",
    tags: ["internet", "web protocols"],
    updatedAt: new Date(),
  },
];
