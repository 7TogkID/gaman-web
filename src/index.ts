import { nunjucks } from "@gaman/nunjucks";
import mainBlock from "./main.block";
import { defineBootstrap } from "@gaman/core";
import { gamanStatic } from "@gaman/static";

defineBootstrap(mainBlock, (app) => {
  app.registerIntegration(
    nunjucks({
      autoescape: true,
      watch: true,
    }),
    gamanStatic()
  );
  app.listen(3521, "0.0.0.0", () => {
    Log.info(`Server is running on http://localhost:3521`);
  });
});
