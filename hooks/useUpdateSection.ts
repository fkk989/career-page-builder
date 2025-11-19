"use client";

import { useMutation } from "@tanstack/react-query";
import { authStorage } from "@/lib/localStorage";
import { SectionInput } from "@/lib/validations/sections";

export function useUpdateSections() {
  return useMutation({
    mutationFn: async (sections: SectionInput[]) => {
      const token = authStorage.getToken();

      const res = await fetch(`/api/section`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ sections }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to update sections");

      return data;
    },
  });
}
