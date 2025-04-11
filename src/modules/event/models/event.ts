import { model } from "@medusajs/framework/utils";

export const Event = model.define("event", {
  id: model.id().primaryKey(),
  date: model.dateTime(),
  event: model.text(),
  utm_source: model.text().nullable(),
  utm_medium: model.text().nullable(),
  utm_campaign: model.text().nullable(),
  utm_term: model.text().nullable(),
  utm_content: model.text().nullable(),
});
