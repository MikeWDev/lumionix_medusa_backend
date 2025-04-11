import { Module } from "@medusajs/framework/utils";
import EventModuleService from "./service";

export const EVENT_MODULE = "eventModule";
export default Module(EVENT_MODULE, {
  service: EventModuleService,
});
