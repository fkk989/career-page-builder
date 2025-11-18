import { authStorage } from "@/lib/localStorage";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  data?: {
    id: number;
    name: string;
    email: string;
    company: any;
  };
}

async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw data;

  return data;
}

export function useLogin() {
  const navigate = useRouter();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.token) {
        authStorage.setToken(data.token);
        navigate.push("/dashboard");
      }
    },
  });
}
