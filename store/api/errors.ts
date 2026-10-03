/** Turns any RTK Query / fetch error into a message safe to show to a user. */
export function getApiErrorMessage(error: unknown): string {
  const fallback = "Something went wrong. Please try again.";

  if (typeof error !== "object" || error === null) return fallback;

  if ("data" in error) {
    const data = (error as { data?: unknown }).data;

    if (
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof (data as { error: unknown }).error === "string"
    ) {
      return (data as { error: string }).error;
    }
  }

  return fallback;
}