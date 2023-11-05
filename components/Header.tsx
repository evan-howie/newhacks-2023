"use client";

import Link from "next/link";
import Image from "next/image";

type HeaderProps = {
  headerColor: "dashboard" | "add";
};

export default function Header({ headerColor }: HeaderProps) {
  return (
    <header
      className={`justify-center md:justify-start md:px-24 py-8 flex gap-10 border-b-4 text-white border-white bg-${headerColor} items-center`}
    >
      <Link href="/classes">
        <Image
          src="/images/syllab-us.svg"
          alt="Syllab-US Logo"
          height={100}
          width={100}
        />
      </Link>
      <Link href="/classes">
        <h1 className="text-2xl md:text-6xl">Syllab-US</h1>
      </Link>
    </header>
  );
}
