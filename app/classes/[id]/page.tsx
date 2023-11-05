"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import axios from "axios";
import { ClassDetails } from "@prisma/client";

export default function ClassDetail({ params }: { params: { id: string } }) {
  const [classDetail, setClassDetail] = useState<ClassDetails | null>(null);

  useEffect(() => {
    axios.get(`/api/class/${params.id}`).then((res) => {
      const data = res.data;
      setClassDetail(data);
    });
  }, []);

  return (
    <main className="min-h-screen bg-dashboard">
      <Header headerColor="dashboard" />
      {classDetail && (
        <div className="px-12 py-8">
          <h1 className="text-2xl">{classDetail.name}</h1>
          <h1 className="text-xl">{classDetail.description}</h1>
          <br />
          <p className="whitespace-pre-wrap">{classDetail.content}</p>
        </div>
      )}
    </main>
  );
}
