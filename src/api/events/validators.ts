// src/api/events/validators.ts
import { z } from "zod";

export const PostEvent = z.object({
  ref: z.string(),
  date: z.string(), // or z.date() if you're passing a Date object
  event: z.string(),
});
