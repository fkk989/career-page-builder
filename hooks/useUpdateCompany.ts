import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CompanyInput } from "@/lib/validations/company";
import { authStorage } from "@/lib/localStorage";

export function useUpdateCompany() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (input: CompanyInput) => {
      const token = authStorage.getToken();
      const res = await fetch("/api/company", {
        method: "PUT",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to update company");

      const data = await res.json();
      return data.data as CompanyInput & { id: string };
    },

    // Refresh cached company data
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["company"] });
    },
  });
}
