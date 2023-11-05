"use client";

import React from "react";
import Header from "@/components/Header";
import AddClassButton from "@/components/AddClassButton";
import ClassList from "@/components/ClassList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Classes() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") return router.push("/login");

  return (
    <main className="bg-dashboard min-h-screen flex flex-col gap-2">
      <div className="relative">
        <Header headerColor="dashboard" />
        <div className="absolute right-10 md:right-24 bottom-0 translate-y-1/2">
          <AddClassButton />
        </div>
      </div>
      <div className="px-12 py-8">
        <ClassList user={session?.user} />
      </div>
    </main>
  );
}
