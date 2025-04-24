"use client";
import { CustomLoader2 } from "./loader";

export const MainLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center h-screen w-full bg-secondary">
      <CustomLoader2 />
      <span>
        <p>Please wait.</p>
        <p>Do not refresh your browser.</p>
      </span>
    </div>
  );
};
