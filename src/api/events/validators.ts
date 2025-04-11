import { z } from "zod";

export const PostEvent = z.object({
  date: z.string(),
  event: z.string(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
});

export type PostEventType = z.infer<typeof PostEvent>;
