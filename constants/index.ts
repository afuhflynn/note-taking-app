import { Archive } from "lucide-react";
import { v4 as uuid4 } from "uuid";

// Base API configuration
export const API_BASE = "/api";

export const navItems = [
  {
    id: "home",
    title: "All Notes",
    href: "/notes",
  },
  {
    id: "archive",
    title: "Archived Notes",
    href: "/notes/archived",
  },
];

export const dummyTags = [
  {
    id: 1,
    tag: "web-development",
  },
  {
    id: 2,
    tag: "web-console",
  },
  {
    id: 3,
    tag: "internet",
  },
  {
    id: 5,
    tag: "web",
  },
  {
    id: 6,
    tag: "dev",
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
