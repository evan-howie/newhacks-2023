import React from "react";
import { ClassDetails } from "@prisma/client";
import Link from "next/link";

type ClassCardProps = ClassDetails & { href: string };

export default function ClassCard({ name, description, href }: ClassCardProps) {
  return (
    <Link
      href={href}
      className="max-w-sm rounded overflow-hidden shadow-lg p-5 bg-white"
    >
      <div className="px-6 py-4">
        <h1 className="font-bold text-xl mb-2">{name}</h1>
        <span className="text-gray-700 text-base">{description}</span>
      </div>
    </Link>
  );
}
