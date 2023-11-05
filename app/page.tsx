import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-10 gap-10">
      <h1 className="text-6xl">Syllab US</h1>
      <div className="flex flex-col items-center">
        <Link href="/register">Register</Link>
        <Link href="/login">Login</Link>
      </div>
    </main>
  );
}
