import mainBlock from "main.block";
import gaman from "gaman";
import { staticGaman } from "@gaman/static";
import nunjucks from "@gaman/nunjucks";

gaman.serv({
  integrations: [
    nunjucks({
      autoescape: true,
      watch: true,
    }),
    staticGaman(),
  ],
  blocks: [mainBlock],
});
