"use client";

import { useEffect, useState } from "react";
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
      {classes.map((classDetail, index) => (
        <ClassCard
          {...classDetail}
          href={`/classes/${classDetail.id}`}
          key={index}
        />
      ))}
    </div>
  );
}
