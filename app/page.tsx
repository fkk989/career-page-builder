"use client"
import { Navbar } from "@/components/Navbar";
import { authStorage } from "@/lib/localStorage";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLogedIn, setIsLogedIn] = useState(false)

  useEffect(() => {
    const token = authStorage.getToken()
    if (token) {
      setIsLogedIn(true)
    }
  }, [])

  return (
    <main className="w-full min-h-screen flex flex-col">
      {isLogedIn && <Navbar />}

      <div className="flex flex-1 justify-center items-center flex-col text-center">
        <h1 className="text-3xl font-semibold mb-6">
          Welcome to Your Careers Platform
        </h1>

        {!isLogedIn ? (
          <Link
            href="/login"
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Recruiter Login
          </Link>
        ) : (
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Go to dashboard
          </Link>
        )}
      </div>
    </main>

  );
}