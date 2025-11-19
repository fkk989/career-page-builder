import { authStorage } from "@/lib/localStorage";
import { SectionInput } from "@/lib/validations/sections";
import { useQuery } from "@tanstack/react-query";

export function useSection() {
  return useQuery({
    queryKey: ["section"],
    queryFn: async () => {
      try {
        const token = authStorage.getToken();

        const res = await fetch("/api/section", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch sectionss");

        const data = await res.json();

        return data.data as (SectionInput & { id: string })[];
      } catch (error) {
        console.log("Error fetching company: ", error);
      }
    },
  });
}
