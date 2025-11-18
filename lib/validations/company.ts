import { z } from "zod";

export const companySchema = z.object({
  name: z.string(),
  logo: z.string().optional().nullable(),
  banner: z.string().optional().nullable(),
  themeColor: z.string().optional().nullable(),
});

export type CompanyInput = z.infer<typeof companySchema>;
