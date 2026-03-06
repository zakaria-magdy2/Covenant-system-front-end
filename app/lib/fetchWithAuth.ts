export async function fetchWithAuth(
  url: string,
  options?: RequestInit,
): Promise<Response> {
  const res = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (res.status === 401) {
    alert("انتهت الجلسة، برجاء تسجيل الدخول مرة أخرى");
    window.location.href = "/login";
    throw new Error("Session expired");
  }

  return res;
}
