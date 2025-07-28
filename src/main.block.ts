import { defineBlock } from "@gaman/core/block";
import docsRoutes from "docs.routes";
import mainRoutes from "main.routes";

export default defineBlock({
  path: "/",
  routes: [mainRoutes, docsRoutes]
});
