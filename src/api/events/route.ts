import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { z } from "zod";
import { PostEvent } from "./validators";

type PostEventType = z.infer<typeof PostEvent>;

// Define a custom interface for your event service
interface EventModuleService {
  createEvents(data: { ref: string; date: Date; event: string }): Promise<any>;
  listEvents(options?: Record<string, unknown>): Promise<any[]>;
}

export const POST = async (
  req: MedusaRequest<PostEventType>,
  res: MedusaResponse
) => {
  // Cast the resolved service to your custom interface
  const eventService = req.scope.resolve(
    "eventModuleService"
  ) as EventModuleService;

  const result = await eventService.createEvents({
    ref: req.body.ref,
    date: new Date(req.body.date),
    event: req.body.event,
  });

  res.json({ event: result });
};

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  // Cast the resolved service to your custom interface
  const eventService = req.scope.resolve(
    "eventModuleService"
  ) as EventModuleService;

  const events = await eventService.listEvents({});

  res.json({ events });
};
