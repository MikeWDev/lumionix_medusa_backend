import { createProductsWorkflow } from "@medusajs/medusa/core-flows";
import type { MedusaContainer } from "@medusajs/types";

export default async function seedProducts({
  container,
}: {
  container: MedusaContainer;
}) {
  await createProductsWorkflow(container).run({
    input: {
      products: [
        {
          title: "KOMET Camera Trigger",
          description:
            "KOMET Camera Trigger packed with: High-Speed, Wireless Flash Control, Timelapse, HDR, Geo-Tag, File Manager and more.",
          is_giftcard: false,
          options: [
            {
              title: "Bundle Type",
              values: ["Basic", "Essential", "Ultimate", "Trigger", "Receiver"],
            },
          ],
          variants: [
            {
              title: "Basic",
              options: { "Bundle Type": "Basic" },
              prices: [{ currency_code: "usd", amount: 35900 }],
              sku: "komet-basic",
              inventory_quantity: 100,
            },
            {
              title: "Essential",
              options: { "Bundle Type": "Essential" },
              prices: [{ currency_code: "usd", amount: 40900 }],
              sku: "komet-essential",
              inventory_quantity: 100,
            },
            {
              title: "Ultimate",
              options: { "Bundle Type": "Ultimate" },
              prices: [{ currency_code: "usd", amount: 49900 }],
              sku: "komet-ultimate",
              inventory_quantity: 100,
            },
            {
              title: "Trigger",
              options: { "Bundle Type": "Trigger" },
              prices: [{ currency_code: "usd", amount: 29900 }],
              sku: "komet-trigger",
              inventory_quantity: 100,
            },
            {
              title: "Receiver",
              options: { "Bundle Type": "Receiver" },
              prices: [{ currency_code: "usd", amount: 6000 }],
              sku: "komet-receiver",
              inventory_quantity: 100,
            },
          ],
        },
      ],
    },
  });

  console.log("✅ Seeded all KOMET bundles");
}
