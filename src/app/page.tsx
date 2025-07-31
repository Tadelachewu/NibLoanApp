"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-64" />
      </div>
    </div>
  );
}
