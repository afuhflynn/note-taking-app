"use client";

import { MainLoader } from "@/components/main-loader";
import { NotesWrapper } from "@/components/notes/notes-wrapper";
import { useUserStore } from "@/store/user.store";
// import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function ArchivedNotesPage() {
  const { getUserProfile, user, isGettingUserProfile } = useUserStore();
  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  // Redirect if a valid user object exists
  useEffect(() => {
    if (!user) {
      // redirect("/sign-in");
    }
  }, [user]);

  if (isGettingUserProfile) {
    return <MainLoader />;
  }

  return (
    <div className="w-full h-full">
      <NotesWrapper />
    </div>
  );
}
