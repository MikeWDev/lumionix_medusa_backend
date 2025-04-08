import { model } from "@medusajs/framework/utils";

export const Event = model.define("event", {
  id: model.id().primaryKey(),
  ref: model.text(),
  date: model.dateTime(),
  event: model.text(),
});
