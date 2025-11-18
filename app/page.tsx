import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-6">
        <h1 className="text-3xl font-semibold mb-6">
          Welcome to Your Careers Platform
        </h1>

        <Link
          href="/login"
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Recruiter Login
        </Link>
      </div>
    </main>
  );
}