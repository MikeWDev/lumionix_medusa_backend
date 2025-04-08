// src/modules/event/index.ts
import { Module } from "@medusajs/framework/utils";
import EventModuleService from "./service";
console.log("✅ Event module loaded");

export const EVENT_MODULE = "eventModule";
export default Module(EVENT_MODULE, {
  service: EventModuleService,
});
