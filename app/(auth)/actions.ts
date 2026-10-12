
"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthState = {
  error?: string;
};

export async function signInWithOAuthAction(
  _previousState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const provider = formData.get("provider");

  if (provider !== "google" && provider !== "github") {
    return { error: "Please select a supported sign-in provider." };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  let redirectTo: string;

  try {
    redirectTo = new URL("/auth/callback", siteUrl).toString();
  } catch {
    return { error: "Authentication is not configured correctly." };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  });

  if (error || !data.url) {
    return {
      error: "Unable to start sign-in. Please try again.",
    };
  }

  redirect(data.url);
}


export async function signOutAction(): Promise<void> {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/login");
}
