"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import db from "@/utils/db";
import axios from "axios";
import ClassCard from "./ClassCard";
import { ClassDetails } from "@prisma/client";

type ClassListProps = {
  user: { name?: string; email?: string; image?: string };
};

export default function ClassList({ user }: ClassListProps) {
  const [classes, setClasses] = useState<ClassDetails[]>([]);
  useEffect(() => {
    axios
      .get("/api/class")
      .then((res) => {
        console.log(res.data);
        setClasses(res.data);
      })
      .catch((e) => console.error(e));
  }, [user]);

  return (
    <div className="flex gap-6">
      {classes.map((classDetail) => (
        <ClassCard {...classDetail} href={`/classes/${classDetail.id}`} />
      ))}
    </div>
  );
}
