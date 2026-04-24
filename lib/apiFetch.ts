export async function apiFetch<T = any>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    credentials: "include", // ✅ always send cookies
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  let data: any = null;

  try {
    data = await res.json();
  } catch {
    // ignore empty body
  }

  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
}