// src/components/ProtectedRoute.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { username, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!username && !loading) {
      router.push("/login");
    }
  }, [username, loading, router]);

  if (loading || !username) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <p>{username}</p>
      {children}
    </>
  );
}
