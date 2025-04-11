import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { z } from "zod";
import { PostEvent } from "./validators";

type PostEventType = z.infer<typeof PostEvent>;

interface EventModuleService {
  createEvents(data: {
    date: Date;
    event: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
  }): Promise<any>;

  listEvents(options?: Record<string, unknown>): Promise<any[]>;
}
export const POST = async (
  req: MedusaRequest<PostEventType>,
  res: MedusaResponse
) => {
  const eventService = req.scope.resolve(
    "eventModuleService"
  ) as EventModuleService;

  const result = await eventService.createEvents({
    date: new Date(req.body.date),
    event: req.body.event,
    utm_source: req.body.utm_source,
    utm_medium: req.body.utm_medium,
    utm_campaign: req.body.utm_campaign,
    utm_term: req.body.utm_term,
    utm_content: req.body.utm_content,
  });

  res.json({ event: result });
};

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const eventService = req.scope.resolve(
    "eventModuleService"
  ) as EventModuleService;

  const events = await eventService.listEvents({});

  res.json({ events });
};
