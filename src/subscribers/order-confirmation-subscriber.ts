import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";

import { randomUUID } from "crypto";

export default async function orderConfirmationSubscriber({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const query = container.resolve("query");

  const { data: orders } = await query.graph({
    entity: "order",
    fields: ["*", "shipping_address.*", "customer.*"],
    filters: {
      id: data.id,
    },
  });

  const order = orders?.[0];

  if (!order) {
    console.error("⚠️ Order not found:", data.id);
    return;
  }
  const IDENTIFY_URL = `${process.env.DITTO_URL}/api/public/apps/identify`;
  const identifyPayload = {
    userId: order.customer_id,
    messageId: crypto.randomUUID(),
    traits: {
      email: order.email,
      firstName: order.shipping_address?.first_name,
    },
  };
  const payload = {
    event: "order_completed",
    userId: order.customer_id, 
    messageId: randomUUID(), 
    timestamp: new Date().toISOString(), 
    properties: {
      order_id: order.id,
      total: order.total,
      first_name: order.shipping_address?.first_name,
      last_name: order.shipping_address?.last_name,
      phone: order.shipping_address?.phone,
    },
  };

  try {
    await fetch(IDENTIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DITTOFEED_API_KEY}`,
      },
      body: JSON.stringify(identifyPayload),
    });

    const res = await fetch(`${process.env.DITTO_URL}/api/public/apps/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DITTOFEED_API_KEY}`, 
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("❌ Dittofeed response error:", res.status, error);
    }
  } catch (err) {
    console.error("❌ Failed to send event to Dittofeed:", err);
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
};
