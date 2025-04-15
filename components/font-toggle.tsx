"use client";

import { useState } from "react";
import { Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function FontToggle() {
  const [currentFont, setCurrentFont] = useState("Inter");

  const setFont = (fontName: string) => {
    setCurrentFont(fontName);
    document.documentElement.style.setProperty(
      "--font-sans",
      fontName === "Inter"
        ? "var(--font-sans)"
        : fontName === "Source Code Pro"
        ? "SourceCodePro-Regular, monospace"
        : "NotoSerif-Regular, serif"
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Type className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle font</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setFont("Inter")}>
          Inter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setFont("Source Code Pro")}>
          Source Code Pro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setFont("Noto Serif")}>
          Noto Serif
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
