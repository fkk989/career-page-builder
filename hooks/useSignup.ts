import { authStorage } from "@/lib/localStorage";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export interface SignupPayload {
  company: string;
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  success: boolean;
  message: string;
  token?: string;
  data?: {
    id: number;
    name: string;
    email: string;
    company: string;
  };
}

async function signupUser(payload: SignupPayload): Promise<SignupResponse> {
  const res = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw data;

  return data;
}

export function useSignup() {
  const navigate = useRouter();
  return useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      if (data.token) {
        authStorage.setToken(data.token);
        navigate.push("/dashboard");
      }
    },
  });
}
