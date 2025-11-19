import { z } from "zod";

export const aboutSectionSchema = z.object({
  type: z.literal("about"),
  order: z.number(),
  content: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
});

export const jobSectionSchema = z.object({
  type: z.literal("job"),
  order: z.number(),
});

export const sectionSchema = z.discriminatedUnion("type", [
  aboutSectionSchema,
  jobSectionSchema,
]);

export type SectionType = "about" | "job";

export type SectionInput = z.infer<typeof sectionSchema>;
