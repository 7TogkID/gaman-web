import mainBlock from "./main.block";
import gaman from "gaman";
import { gamanStatic } from "gaman/static";
import { nunjucks } from "gaman/nunjucks";

gaman.serv({
  integrations: [
    nunjucks({
      autoescape: true,
      watch: true,
    }),
    gamanStatic(),
  ],
  blocks: [mainBlock],
  server: {
    host: "0.0.0.0",
    port: 3521,
  },
});
