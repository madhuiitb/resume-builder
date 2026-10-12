
"use client";

import { useActionState } from "react";
import {
  signInWithOAuthAction,
  type AuthState,
} from "./actions";

const initialState: AuthState = {};

export function AuthForm() {
  const [state, formAction, pending] = useActionState(
    signInWithOAuthAction,
    initialState,
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <section className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
        <p className="text-xl font-semibold tracking-tight">
          ResumeAI
        </p>

        <h1 className="mt-8 text-2xl font-semibold tracking-tight">
          Welcome to ResumeAI
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to build your resume and analyze its ATS compatibility.
        </p>

        <form action={formAction} className="mt-8 space-y-3">
          <button
            type="submit"
            name="provider"
            value="google"
            disabled={pending}
            className="flex w-full items-center justify-center rounded-lg border border-border px-4 py-3 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-60"
          >
            Continue with Google
          </button>

          <button
            type="submit"
            name="provider"
            value="github"
            disabled={pending}
            className="flex w-full items-center justify-center rounded-lg border border-border px-4 py-3 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-60"
          >
            Continue with GitHub
          </button>
        </form>

        {pending && (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Redirecting to your provider...
          </p>
        )}

        {state.error && (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {state.error}
          </p>
        )}

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to use ResumeAI in accordance with
          its terms and privacy policy.
        </p>
      </section>
    </main>
  );
}
