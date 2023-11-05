"use client";

import React, { FormEvent, useState } from "react";
import Header from "@/components/Header";
import axios from "axios";

type FormType = {
  className: string;
  classDescription: string;
  syllabusFile: File;
};

export default function AddClass() {
  const [data, setData] = useState<FormType>({
    className: "",
    classDescription: "",
    syllabusFile: null,
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set("name", data.className);
    formData.set("desc", data.classDescription);
    formData.set("file", data.syllabusFile);

    await axios.post("/api/class", formData);
  };

  return (
    <main className="bg-add min-h-screen flex flex-col gap-2">
      <Header headerColor="add" />
      <div className="flex flex-col items-center">
        <form className="bg-white w-3/5 p-4 rounded-lg" onSubmit={onSubmit}>
          <label
            htmlFor="class-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Class name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="class-name"
              id="class-name"
              autoComplete="class-name"
              className="block flex-1 border border-gray-300 rounded-md bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 w-2/3"
              placeholder="ECE 250"
              value={data.className}
              onChange={(e) => setData({ ...data, className: e.target.value })}
            />
          </div>

          <label
            htmlFor="class-description"
            className="block text-sm font-medium leading-6 text-gray-900 mt-3"
          >
            Class description
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="class-description"
              id="class-description"
              autoComplete="class-description"
              className="block flex-1 border border-gray-300 rounded-md bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 w-2/3"
              placeholder="Algorithms and Data Structures"
              value={data.classDescription}
              onChange={(e) =>
                setData({ ...data, classDescription: e.target.value })
              }
            />
          </div>

          <label
            htmlFor="upload"
            className="block text-sm font-medium leading-6 text-gray-900 mt-3"
          >
            Upload syllabus
          </label>
          <div className="mt-2">
            <input
              type="file"
              name="upload"
              id="upload"
              accept="application/pdf"
              className="block flex-1 border border-gray-300 rounded-md bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 file:border-none file:rounded-full file:bg-add file:text-white file:px-2 file:py-1"
              onChange={(e) =>
                setData({ ...data, syllabusFile: e.target.files[0] })
              }
            />
          </div>

          <button
            type="submit"
            className="mt-3 px-3 py-2 bg-add rounded-full text-white"
          >
            Add Class
          </button>
        </form>
      </div>
    </main>
  );
}
