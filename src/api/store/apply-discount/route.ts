import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { updateCartPromotionsWorkflow } from "@medusajs/medusa/core-flows";
import { PromotionActions } from "@medusajs/framework/utils";

type Body = {
  cart_id: string;
  code: string;
};

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { cart_id, code } = req.body as Body;

  try {
    const result = await updateCartPromotionsWorkflow(req.scope).run({
      input: {
        cart_id: cart_id,
        promo_codes: [code],
        action: PromotionActions.ADD,
      },
    });

    res.send(result);
  } catch (error) {}
}
