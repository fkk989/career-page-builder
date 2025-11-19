import { authStorage } from "@/lib/localStorage";
import { SectionInput } from "@/lib/validations/sections";
import { Job } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export function useJobs(company_slug: string) {
  return useQuery({
    queryKey: ["job"],
    queryFn: async () => {
      try {
        const token = authStorage.getToken();

        const res = await fetch(`/api/company/${company_slug}/job`, {
          method: "GET",
        });

        if (!res.ok) throw new Error("Failed to fetch sectionss");

        const data = await res.json();

        return data.data as Job[];
      } catch (error) {
        console.log("Error fetching company: ", error);
      }
    },
  });
}
