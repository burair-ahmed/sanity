'use client';

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <Link href={"/"}>
      <div className="mx-auto px-4 py-3 flex justify-center items-center">
        <h1 className="bg-gradient-to-tl from-[#743c08] via-[#df760b] to-[#f6b61e] bg-clip-text text-transparent text-3xl font-bold mx-auto">
          Blogging Website by Burair
        </h1>
      </div>
      </Link>
    </header>
  );
}
