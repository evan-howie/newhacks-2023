"use client";

import Image from "next/image";
import Link from "next/link";

export default function AddClassButton() {
  return (
    <Link
      href="/classes/add"
      className={"flex gap-2 rounded-full shadow-md p-3 text-white bg-add "}
    >
      <Image
        src="/images/add-class.svg"
        alt="Add Class Icon"
        width={20}
        height={20}
      />
      <span>Add Class</span>
    </Link>
  );
}
