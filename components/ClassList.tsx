"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import db from "@/utils/db";

type ClassListProps = {
  user: { name: string; email: string; image: null };
};

export default function ClassList({ user }: ClassListProps) {
  const [classes, setClasses] = useState([]);
  useEffect(() => {}, [user]);

  return <div className="flex gap-6"></div>;
}
