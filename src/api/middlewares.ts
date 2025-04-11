import cors from "cors";
import { parseCorsOrigins } from "@medusajs/utils";
import { defineMiddlewares } from "@medusajs/framework";

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/apply-discount*",
      middlewares: [
        (req, res, next) => {
          const configModule = req.scope.resolve("configModule");

          return cors({
            origin: parseCorsOrigins(configModule.projectConfig.http.storeCors),
            credentials: true,
          })(req, res, next);
        },
      ],
    },
    {
      matcher: "/events*",
      middlewares: [
        (req, res, next) => {
          const configModule = req.scope.resolve("configModule");

          return cors({
            origin: parseCorsOrigins(configModule.projectConfig.http.storeCors),
            credentials: true,
          })(req, res, next);
        },
      ],
    },
  ],
});
