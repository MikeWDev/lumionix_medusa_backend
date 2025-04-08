export default async function seedKomet(container) {
  const productService = container.resolve("productModuleService");

  const product = await productService.create({
    title: "KOMET",
    description: "KOMET Camera Trigger packed with high-tech features.",
    handle: "komet",
    options: [
      {
        title: "Bundle",
      },
    ],
    variants: [
      {
        title: "Basic",
        options: [{ value: "Basic" }],
        prices: [
          {
            currency_code: "usd",
            amount: 35900, // in cents
          },
        ],
        inventory_quantity: 100,
        sku: "komet-basic",
      },
      {
        title: "Essential",
        options: [{ value: "Essential" }],
        prices: [
          {
            currency_code: "usd",
            amount: 40900,
          },
        ],
        inventory_quantity: 100,
        sku: "komet-essential",
      },
    ],
  });

  console.log("✅ Product created:", product.id);
}
