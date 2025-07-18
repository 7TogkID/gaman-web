import docsTree from "./docs.tree";
import { defineBlock, Response } from "gaman";

export default defineBlock({
  path: "/",
  routes: {
    ...docsTree,
    "/": () => {
      return Response.render("index", {
        title: "GamanJS | Web Application Framework",
        year: new Date().getFullYear(),
      });
    },
  },
});
