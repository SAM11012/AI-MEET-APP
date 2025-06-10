import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import HomeView from "@/modules/home/ui/views/home-view";
import { headers } from "next/headers";

import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";

export default async function Home() {
  const session = await authClient.getSession()

  if (!session) redirect("/");

  return <HomeView />;
}
