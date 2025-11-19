import { authStorage } from "@/lib/localStorage";
import { CompanyInput } from "@/lib/validations/company";
import { useQuery } from "@tanstack/react-query";

export function useCompany() {
  return useQuery({
    queryKey: ["company"],
    queryFn: async () => {
      try {
        const token = authStorage.getToken();

        const res = await fetch("/api/company", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch company");

        const data = await res.json();

        return data.data as CompanyInput & { id: string; slug: string };
      } catch (error) {
        console.log("Error fetching company: ", error);
      }
    },
  });
}

export function useCompanyPublic({ company_slug }: { company_slug: string }) {
  return useQuery({
    queryKey: ["company-public"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/company/${company_slug}`);

        if (!res.ok) throw new Error("Failed to fetch company");

        const data = await res.json();

        return data.data as CompanyInput & { id: string; slug: string };
      } catch (error) {
        console.log("Error fetching company: ", error);
      }
    },
  });
}
